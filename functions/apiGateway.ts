import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * API Gateway - REST API pública com autenticação e rate limiting
 * Suporta múltiplas versões, autenticação via API Key
 */
const API_VERSION = '1.0.0';
const RATE_LIMIT_WINDOW = 60000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requisições por minuto

// Store de rate limiting em memória (usar Redis em produção)
const rateLimitStore = new Map();

function getRateLimitKey(apiKey) {
  const now = Date.now();
  return `${apiKey}:${Math.floor(now / RATE_LIMIT_WINDOW)}`;
}

function checkRateLimit(apiKey) {
  const key = getRateLimitKey(apiKey);
  const current = rateLimitStore.get(key) || 0;
  
  if (current >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  rateLimitStore.set(key, current + 1);
  
  // Limpeza de entries antigas
  if (rateLimitStore.size > 10000) {
    const now = Date.now();
    for (const [k] of rateLimitStore) {
      const windowTime = parseInt(k.split(':')[1]);
      if (now - (windowTime * RATE_LIMIT_WINDOW) > RATE_LIMIT_WINDOW * 2) {
        rateLimitStore.delete(k);
      }
    }
  }
  
  return true;
}

function validateApiKey(apiKey) {
  // Validar formato de API Key (simples validação)
  return apiKey && apiKey.startsWith('sk_') && apiKey.length > 20;
}

function buildResponse(data, status = 200, headers = {}) {
  return Response.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Version': API_VERSION,
      ...headers,
    },
  });
}

async function handleListClients(base44, query = {}) {
  const limit = Math.min(parseInt(query.limit) || 10, 100);
  const skip = parseInt(query.skip) || 0;
  
  const clients = await base44.entities.Client.list();
  const filtered = clients.slice(skip, skip + limit);
  
  return {
    data: filtered,
    meta: {
      total: clients.length,
      limit,
      skip,
      hasMore: skip + limit < clients.length,
    },
  };
}

async function handleListInvoices(base44, query = {}) {
  const limit = Math.min(parseInt(query.limit) || 10, 100);
  const skip = parseInt(query.skip) || 0;
  
  const invoices = await base44.entities.Invoice.list();
  const filtered = invoices.slice(skip, skip + limit);
  
  return {
    data: filtered,
    meta: {
      total: invoices.length,
      limit,
      skip,
      hasMore: skip + limit < invoices.length,
    },
  };
}

async function handleGetClient(base44, clientId) {
  if (!clientId) {
    throw new Error('Client ID is required');
  }
  
  const clients = await base44.entities.Client.list();
  const client = clients.find(c => c.id === clientId);
  
  if (!client) {
    throw new Error('Client not found');
  }
  
  return { data: client };
}

async function handleGetInvoice(base44, invoiceId) {
  if (!invoiceId) {
    throw new Error('Invoice ID is required');
  }
  
  const invoices = await base44.entities.Invoice.list();
  const invoice = invoices.find(i => i.id === invoiceId);
  
  if (!invoice) {
    throw new Error('Invoice not found');
  }
  
  return { data: invoice };
}

Deno.serve(async (req) => {
  try {
    // CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
        },
      });
    }

    // Parse URL
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    // Validar versão da API
    const version = pathParts[1];
    if (!version || !version.startsWith('v')) {
      return buildResponse({ error: 'Invalid API version' }, 400);
    }

    // Validar autenticação via API Key
    const apiKey = req.headers.get('X-API-Key');
    if (!apiKey) {
      return buildResponse({ error: 'X-API-Key header required' }, 401);
    }

    if (!validateApiKey(apiKey)) {
      return buildResponse({ error: 'Invalid API key format' }, 401);
    }

    // Rate limiting
    if (!checkRateLimit(apiKey)) {
      return buildResponse(
        { error: 'Rate limit exceeded' },
        429,
        { 'Retry-After': '60' }
      );
    }

    // Inicializar Base44
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return buildResponse({ error: 'Unauthorized' }, 401);
    }

    // Rotear requisições
    const resource = pathParts[2];
    const id = pathParts[3];

    let response;

    if (resource === 'clients') {
      if (req.method === 'GET' && !id) {
        response = await handleListClients(base44, Object.fromEntries(url.searchParams));
      } else if (req.method === 'GET' && id) {
        response = await handleGetClient(base44, id);
      } else {
        return buildResponse({ error: 'Method not allowed' }, 405);
      }
    } else if (resource === 'invoices') {
      if (req.method === 'GET' && !id) {
        response = await handleListInvoices(base44, Object.fromEntries(url.searchParams));
      } else if (req.method === 'GET' && id) {
        response = await handleGetInvoice(base44, id);
      } else {
        return buildResponse({ error: 'Method not allowed' }, 405);
      }
    } else {
      return buildResponse({ error: 'Resource not found' }, 404);
    }

    return buildResponse(response, 200);
  } catch (error) {
    return buildResponse(
      {
        error: error.message,
        type: 'api_error',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});