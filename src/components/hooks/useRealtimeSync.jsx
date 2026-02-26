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
    // WebSocket support disabled for now - app works without real-time sync
    return () => {};
  }, []);

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