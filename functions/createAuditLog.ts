import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Função de auditoria automática para entity automations
 * Registra todas as alterações em entities
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { event, data, old_data } = body;
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const workspaceId = data?.workspace_id || user.workspace_id;
    
    if (!workspaceId) {
      return Response.json({ error: 'Workspace ID required' }, { status: 403 });
    }

    // Determina ação baseada no tipo de evento
    let action = 'update';
    if (event.type === 'create') action = 'create';
    if (event.type === 'delete') action = 'delete';

    // Cria log de auditoria
    await base44.asServiceRole.entities.AuditLog.create({
      tenant_id: workspaceId,
      user_email: user.email,
      action,
      entity_type: event.entity_name,
      entity_id: event.entity_id,
      old_values: old_data || null,
      new_values: data || null,
      ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown',
      status: 'success',
      timestamp: new Date().toISOString()
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Erro ao criar auditlog:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});