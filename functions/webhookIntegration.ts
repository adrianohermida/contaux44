import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Webhook para integração externa
 * Dispara eventos quando dados são criados/atualizados
 */
Deno.serve(async (req) => {
  try {
    // Valida método
    if (req.method !== 'POST') {
      return Response.json({ error: 'Only POST allowed' }, { status: 405 });
    }

    const body = await req.json();
    const { event, entity_type, entity_id, tenant_id, webhook_url } = body;

    if (!webhook_url || !event) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Busca dados da entidade
    const base44 = createClientFromRequest(req);
    const entities = await base44.asServiceRole.entities[entity_type].list();
    const entity = entities.find(e => e.id === entity_id && e.tenant_id === tenant_id);

    if (!entity) {
      return Response.json({ error: 'Entity not found' }, { status: 404 });
    }

    // Envia webhook
    const webhookResponse = await fetch(webhook_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        entity_type,
        entity_id,
        tenant_id,
        data: entity,
        timestamp: new Date().toISOString()
      })
    });

    // Log do webhook
    await base44.asServiceRole.entities.AuditLog.create({
      tenant_id,
      user_email: 'webhook@integration',
      action: 'export',
      entity_type: 'Webhook',
      entity_id: webhook_url,
      new_values: { event, status: webhookResponse.status },
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      user_agent: 'webhook-service',
      status: webhookResponse.ok ? 'success' : 'failed',
      timestamp: new Date().toISOString()
    });

    return Response.json({ 
      success: webhookResponse.ok, 
      statusCode: webhookResponse.status 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});