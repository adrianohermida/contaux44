import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * Hook para autenticação multitenant com validação de role e workspace
 * Retorna: { user, workspace, loading, error, hasAccess }
 */
export function useMultitenantAuth(requiredType = null) {
  const [user, setUser] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          base44.auth.redirectToLogin(window.location.href);
          return;
        }

        const currentUser = await base44.auth.me();
        
        // Validar workspace_id
        if (!currentUser.workspace_id) {
          setError('Workspace não configurado');
          setLoading(false);
          return;
        }

        // Validar user_type
        if (requiredType && currentUser.user_type !== requiredType) {
          setError(`Acesso negado. Requer tipo: ${requiredType}`);
          setLoading(false);
          return;
        }

        // Carregar workspace
        const workspaces = await base44.entities.Workspace.filter(
          { id: currentUser.workspace_id }
        );
        
        if (workspaces.length === 0) {
          setError('Workspace não encontrado');
          setLoading(false);
          return;
        }

        setUser(currentUser);
        setWorkspace(workspaces[0]);
        
        // Log de acesso
        await logAccess(currentUser, 'login', 'system', 'success');
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    authenticate();
  }, [requiredType]);

  const logAccess = async (user, action, resource, status) => {
    try {
      await base44.entities.AccessLog.create({
        workspace_id: user.workspace_id,
        user_email: user.email,
        user_type: user.user_type,
        action,
        resource,
        status,
        ip_address: 'browser',
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.error('Erro ao registrar acesso:', e);
    }
  };

  const hasAccess = (requiredType) => {
    return user && user.user_type === requiredType;
  };

  return {
    user,
    workspace,
    loading,
    error,
    hasAccess,
    logAccess
  };
}