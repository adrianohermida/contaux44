import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Backend validation para Row Level Security
 * Garante que usuários só acessem dados do seu tenant
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ valid: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { tenantId, entityType, entityId } = body;

    // Extrai tenant_id do usuário
    const userTenantId = user.tenant_id || user.email.split('@')[0];

    // Valida se tenant solicitado pertence ao usuário
    if (tenantId !== userTenantId) {
      // Log de tentativa de acesso não autorizado
      await base44.asServiceRole.entities.SecurityLog.create({
        tenant_id: userTenantId,
        user_email: user.email,
        event_type: 'permission_denied',
        severity: 'high',
        description: `Tentativa de acesso ao tenant ${tenantId} por usuário do tenant ${userTenantId}`,
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        device_info: req.headers.get('user-agent') || 'unknown',
        action_taken: 'blocked',
        resolved: false,
        timestamp: new Date().toISOString()
      });

      return Response.json({ valid: false, error: 'Tenant mismatch' }, { status: 403 });
    }

    // Se entityId foi fornecido, valida que o record pertence ao tenant
    if (entityId && entityType) {
      const entity = await base44.asServiceRole.entities[entityType].list();
      const record = entity.find(r => r.id === entityId && r.tenant_id === tenantId);
      
      if (!record) {
        await base44.asServiceRole.entities.SecurityLog.create({
          tenant_id: userTenantId,
          user_email: user.email,
          event_type: 'permission_denied',
          severity: 'medium',
          description: `Tentativa de acesso a ${entityType}/${entityId} não pertencente ao tenant`,
          ip_address: req.headers.get('x-forwarded-for') || 'unknown',
          device_info: req.headers.get('user-agent') || 'unknown',
          action_taken: 'blocked',
          resolved: false,
          timestamp: new Date().toISOString()
        });

        return Response.json({ valid: false, error: 'Resource not found' }, { status: 404 });
      }
    }

    return Response.json({ valid: true, tenantId: userTenantId });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});