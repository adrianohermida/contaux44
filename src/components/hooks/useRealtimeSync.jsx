import { useEffect, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import wsService from '../services/WebSocketService';

/**
 * Hook para sincronização em tempo real de entidades
 * Invalida cache automaticamente quando dados mudam
 */
export function useRealtimeSync(entityName, workspaceId) {
  const queryClient = useQueryClient();
  const unsubscribeRef = useRef(() => {});

  useEffect(() => {
    if (!workspaceId) return;

    // Conectar ao WebSocket
    wsService.connect(workspaceId);

    // Subscribe a eventos da entidade
    const unsubscribe = wsService.on(`entity:${entityName}`, (payload) => {
      const { action, data, entity_id } = payload;

      if (action === 'created') {
        queryClient.invalidateQueries({
          queryKey: [`${entityName}-list`, workspaceId]
        });
      } else if (action === 'updated') {
        queryClient.setQueryData(
          [`${entityName}-detail`, entity_id],
          data
        );
        queryClient.invalidateQueries({
          queryKey: [`${entityName}-list`, workspaceId]
        });
      } else if (action === 'deleted') {
        queryClient.removeQueries({
          queryKey: [`${entityName}-detail`, entity_id]
        });
        queryClient.invalidateQueries({
          queryKey: [`${entityName}-list`, workspaceId]
        });
      }
    });

    unsubscribeRef.current = unsubscribe;

    return () => {
      unsubscribe();
    };
  }, [entityName, workspaceId, queryClient]);

  const syncEntity = useCallback((action, data) => {
    wsService.send('entity:update', {
      entity: entityName,
      action,
      data,
      workspace_id: workspaceId
    });
  }, [entityName, workspaceId]);

  return {
    isConnected: wsService.isConnected,
    syncEntity
  };
}