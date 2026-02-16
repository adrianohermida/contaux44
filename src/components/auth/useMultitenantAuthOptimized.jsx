import { useQuery } from '@tanstack/react-query';
import { useAuth } from './AuthContext';

/**
 * Hook otimizado com React Query para autenticação multitenant
 * Cached por 5 minutos (staleTime)
 */
export function useMultitenantAuthOptimized(requiredType = null) {
  const { user: contextUser, loading: contextLoading, error: contextError } = useAuth();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['multitenant-auth', requiredType],
    queryFn: () => {
      if (!contextUser) return null;

      // Validar workspace_id e user_type
      if (!contextUser.workspace_id || !contextUser.user_type) {
        throw new Error('Usuário não configurado corretamente');
      }

      // Validar tipo requerido
      if (requiredType && contextUser.user_type !== requiredType) {
        throw new Error(`Acesso restrito para usuários do tipo ${requiredType}`);
      }

      return contextUser;
    },
    enabled: !contextLoading && !!contextUser,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });

  const loading = contextLoading || isLoading;
  const appError = contextError || error?.message;

  return {
    user,
    loading,
    error: appError,
    hasAccess: (type) => user?.user_type === type || user?.role === `user_${type}`,
    isInternal: () =>
      user?.user_type === 'internal' || user?.role === 'user_internal' || user?.role === 'admin',
    isClient: () => user?.user_type === 'client' || user?.role === 'user_client',
    workspaceId: user?.workspace_id,
  };
}