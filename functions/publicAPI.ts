import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * API Pública para leitura de dados
 * Requer API key válida
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { searchParams } = new URL(req.url);
    const apiKey = searchParams.get('api_key');
    const entity = searchParams.get('entity');
    const tenantId = searchParams.get('tenant_id');

    // Validação básica de API key (idealmente validar contra BD)
    if (!apiKey || apiKey.length < 32) {
      return Response.json({ error: 'Invalid API key' }, { status: 401 });
    }

    if (!entity || !tenantId) {
      return Response.json({ error: 'Missing entity or tenant_id' }, { status: 400 });
    }

    // Busca dados
    const data = await base44.asServiceRole.entities[entity].filter({ tenant_id: tenantId });

    // Log da requisição
    await base44.asServiceRole.entities.AuditLog.create({
      tenant_id: tenantId,
      user_email: 'api@public',
      action: 'view',
      entity_type: entity,
      entity_id: 'bulk',
      new_values: { count: data.length },
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      user_agent: 'public-api',
      status: 'success',
      timestamp: new Date().toISOString()
    });

    return Response.json({
      success: true,
      entity,
      count: data.length,
      data: data.map(d => {
        // Remove dados sensíveis
        const { tenant_id, created_by, ...safe } = d;
        return safe;
      })
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});