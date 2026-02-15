import { base44 } from '@/api/base44Client';

/**
 * Hook para registrar ações de auditoria
 */
export function useAuditLog() {
  const logAction = async (action, entityType, entityId, oldValues = null, newValues = null) => {
    try {
      const user = await base44.auth.me();
      if (!user) return;

      await base44.entities.AuditLog.create({
        tenant_id: user.tenant_id || user.email.split('@')[0],
        user_email: user.email,
        action,
        entity_type: entityType,
        entity_id: entityId,
        old_values: oldValues,
        new_values: newValues,
        ip_address: await getClientIP(),
        user_agent: navigator.userAgent,
        status: 'success',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erro ao registrar auditoria:', error);
    }
  };

  const logSecurityEvent = async (eventType, severity, description, actionTaken = 'alert_sent') => {
    try {
      const user = await base44.auth.me();
      if (!user) return;

      await base44.entities.SecurityLog.create({
        tenant_id: user.tenant_id || user.email.split('@')[0],
        user_email: user.email,
        event_type: eventType,
        severity,
        description,
        ip_address: await getClientIP(),
        device_info: navigator.userAgent,
        action_taken: actionTaken,
        resolved: false,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erro ao registrar evento de segurança:', error);
    }
  };

  return { logAction, logSecurityEvent };
}

async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
}