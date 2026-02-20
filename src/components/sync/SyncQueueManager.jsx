import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Sync Queue Manager - Gerencia fila de sincronização
 */
export default function SyncQueueManager() {
  const [queue, setQueue] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [stats, setStats] = useState({ pending: 0, completed: 0, failed: 0 });

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = () => {
    const stored = localStorage.getItem('syncQueue') || '[]';
    setQueue(JSON.parse(stored));
    updateStats(JSON.parse(stored));
  };

  const updateStats = (items) => {
    setStats({
      pending: items.filter(i => i.status === 'pending').length,
      completed: items.filter(i => i.status === 'completed').length,
      failed: items.filter(i => i.status === 'failed').length,
    });
  };

  const addToQueue = (item) => {
    const newItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...item,
    };
    const updated = [...queue, newItem];
    setQueue(updated);
    localStorage.setItem('syncQueue', JSON.stringify(updated));
    updateStats(updated);
  };

  const processPendingQueue = async () => {
    setSyncing(true);
    const pending = queue.filter(i => i.status === 'pending');
    
    for (const item of pending) {
      try {
        // Simular processamento
        await new Promise(resolve => setTimeout(resolve, 500));
        updateItemStatus(item.id, 'completed');
      } catch (error) {
        updateItemStatus(item.id, 'failed', error.message);
      }
    }
    setSyncing(false);
  };

  const updateItemStatus = (id, status, error = null) => {
    const updated = queue.map(item =>
      item.id === id
        ? { ...item, status, error, updatedAt: new Date().toISOString() }
        : item
    );
    setQueue(updated);
    localStorage.setItem('syncQueue', JSON.stringify(updated));
    updateStats(updated);
  };

  const clearCompleted = () => {
    const updated = queue.filter(i => i.status !== 'completed');
    setQueue(updated);
    localStorage.setItem('syncQueue', JSON.stringify(updated));
    updateStats(updated);
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (status === 'failed') return <AlertCircle className="w-4 h-4 text-red-600" />;
    return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 bg-blue-50">
          <p className="text-xs text-blue-600">Pendentes</p>
          <p className="text-2xl font-bold text-blue-900">{stats.pending}</p>
        </Card>
        <Card className="p-3 bg-green-50">
          <p className="text-xs text-green-600">Concluídos</p>
          <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
        </Card>
        <Card className="p-3 bg-red-50">
          <p className="text-xs text-red-600">Falhas</p>
          <p className="text-2xl font-bold text-red-900">{stats.failed}</p>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={processPendingQueue}
          disabled={syncing || stats.pending === 0}
          className="flex-1"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Processar Fila
        </Button>
        <Button
          variant="outline"
          onClick={clearCompleted}
          disabled={stats.completed === 0}
        >
          Limpar Concluídos
        </Button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {queue.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Fila vazia</p>
        ) : (
          queue.map(item => (
            <Card key={item.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <div>
                    <p className="font-medium text-sm">{item.entity}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium capitalize px-2 py-1 rounded bg-gray-100">
                  {item.status}
                </span>
              </div>
              {item.error && (
                <p className="text-xs text-red-600 mt-2">{item.error}</p>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}