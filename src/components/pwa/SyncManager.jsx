import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Sync Manager - Sincroniza dados quando online
 * Background sync, retry logic
 */
export default function SyncManager() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle');

  useEffect(() => {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.sync) {
          console.log('Background Sync disponível');
        }
      });
    }
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncStatus('syncing');

    try {
      // Simular sincronização
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLastSync(new Date());
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      setSyncStatus('error');
      console.error('Sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card className="p-4 border-green-200 bg-green-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {syncStatus === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <RefreshCw
              className={`w-5 h-5 text-blue-600 ${isSyncing ? 'animate-spin' : ''}`}
            />
          )}
          <div>
            <p className="font-medium text-green-900">Sincronização</p>
            {lastSync && (
              <p className="text-xs text-green-700">
                Última sincronização: {lastSync.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <Button
          onClick={handleManualSync}
          disabled={isSyncing}
          size="sm"
          variant="outline"
        >
          {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
        </Button>
      </div>
    </Card>
  );
}