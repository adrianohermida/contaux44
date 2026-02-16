/**
 * WebSocket Service para sincronização em tempo real
 * Gerencia conexões, eventos e auto-reconnect
 */
class WebSocketService {
  constructor() {
    this.ws = null;
    this.workspaceId = null;
    this.listeners = new Map();
    this.messageQueue = [];
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000;
  }

  connect(workspaceId, serverUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000') {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.workspaceId = workspaceId;
    
    try {
      this.ws = new WebSocket(`${serverUrl}?workspace=${workspaceId}`);
      
      this.ws.onopen = () => {
        console.log('[WS] Connected');
        this.reconnectAttempts = 0;
        this.flushQueue();
        this.emit('connected', { timestamp: Date.now() });
      };

      this.ws.onmessage = (event) => {
        try {
          const { type, entity, action, data, timestamp } = JSON.parse(event.data);
          this.emit(type, { entity, action, data, timestamp });
        } catch (err) {
          console.error('[WS] Message parse error:', err);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[WS] Error:', error);
        this.emit('error', { error });
      };

      this.ws.onclose = () => {
        console.log('[WS] Disconnected');
        this.emit('disconnected', {});
        this.attemptReconnect();
      };
    } catch (err) {
      console.error('[WS] Connection error:', err);
      this.attemptReconnect();
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`[WS] Reconnecting (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => {
        this.connect(this.workspaceId);
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      this.emit('connection_failed', {});
    }
  }

  emit(eventType, payload) {
    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType).forEach(cb => {
        try {
          cb(payload);
        } catch (err) {
          console.error(`[WS] Listener error for ${eventType}:`, err);
        }
      });
    }
  }

  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType).add(callback);

    return () => {
      this.listeners.get(eventType).delete(callback);
    };
  }

  send(type, payload) {
    const message = JSON.stringify({
      type,
      workspace_id: this.workspaceId,
      timestamp: Date.now(),
      ...payload
    });

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  flushQueue() {
    while (this.messageQueue.length > 0 && this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(this.messageQueue.shift());
    }
  }

  disconnect() {
    this.maxReconnectAttempts = 0;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
  }

  isConnected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const wsService = new WebSocketService();