/**
 * useRealtimeSync Hook
 * Manage real-time data synchronization
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { useWebSocket } from './useWebSocket';

export function useRealtimeSync(channel, userId, entityType = null) {
  const [syncData, setSyncData] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, synced, error
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [conflictQueue, setConflictQueue] = useState([]);
  
  const { isConnected, lastMessage, sendMessage } = useWebSocket(channel, userId);
  const syncTimerRef = useRef(null);

  // Handle incoming messages
  useEffect(() => {
    if (!lastMessage) return;

    setSyncStatus('syncing');
    
    // Process different message types
    if (lastMessage.type === 'entity_update') {
      setSyncData(lastMessage.data);
      setLastSyncTime(new Date());
      setSyncStatus('synced');
    } else if (lastMessage.type === 'conflict') {
      setConflictQueue(prev => [...prev, lastMessage.conflict]);
      setSyncStatus('error');
    } else if (lastMessage.type === 'sync_error') {
      setSyncStatus('error');
    }
  }, [lastMessage]);

  // Subscribe to channel
  const subscribe = useCallback(
    (opts = {}) => {
      if (isConnected) {
        sendMessage({
          type: 'subscribe',
          channel,
          userId,
          entityType,
          options: opts,
        });
      }
    },
    [channel, userId, entityType, isConnected, sendMessage]
  );

  // Unsubscribe from channel
  const unsubscribe = useCallback(() => {
    if (isConnected) {
      sendMessage({
        type: 'unsubscribe',
        channel,
      });
    }
  }, [channel, isConnected, sendMessage]);

  // Publish changes
  const publish = useCallback(
    (data) => {
      if (isConnected) {
        sendMessage({
          type: 'publish',
          channel,
          userId,
          data,
          timestamp: new Date().toISOString(),
        });
      }
    },
    [channel, userId, isConnected, sendMessage]
  );

  // Resolve conflict
  const resolveConflict = useCallback(
    (conflictId, resolution) => {
      if (isConnected) {
        sendMessage({
          type: 'resolve_conflict',
          conflictId,
          resolution,
          timestamp: new Date().toISOString(),
        });
        setConflictQueue(prev => prev.filter(c => c.id !== conflictId));
        if (conflictQueue.length <= 1) {
          setSyncStatus('synced');
        }
      }
    },
    [isConnected, sendMessage, conflictQueue]
  );

  // Auto-sync every 30 seconds if needed
  useEffect(() => {
    if (isConnected && syncStatus === 'synced') {
      syncTimerRef.current = setInterval(() => {
        subscribe();
      }, 30000);
    }

    return () => {
      if (syncTimerRef.current) clearInterval(syncTimerRef.current);
    };
  }, [isConnected, syncStatus, subscribe]);

  // Subscribe on connect
  useEffect(() => {
    if (isConnected) {
      subscribe();
    }
  }, [isConnected, subscribe]);

  return {
    syncData,
    syncStatus,
    lastSyncTime,
    conflictQueue,
    isConnected,
    publish,
    subscribe,
    unsubscribe,
    resolveConflict,
  };
}

export default useRealtimeSync;