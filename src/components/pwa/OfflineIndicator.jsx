import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

/**
 * Offline Indicator - Mostra status online/offline
 */
export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-orange-100 border-b border-orange-300 p-3 flex items-center justify-center gap-2">
      <WifiOff className="w-4 h-4 text-orange-700" />
      <span className="text-sm font-medium text-orange-800">
        Você está offline. Algumas funcionalidades podem não estar disponíveis.
      </span>
    </div>
  );
}