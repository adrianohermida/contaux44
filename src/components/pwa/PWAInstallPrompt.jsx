import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * PWA Install Prompt - Prompt para instalar app
 * Detecta beforeinstallprompt event
 */
export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    }
  };

  if (!showPrompt) return null;

  return (
    <Card className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-40 border-blue-200 bg-blue-50 p-4 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-blue-900 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Instalar App
          </h3>
          <p className="text-sm text-blue-800 mt-1">
            Use offline e acesso rápido na tela inicial
          </p>
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="text-blue-600 hover:text-blue-800 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        <Button
          onClick={handleInstall}
          size="sm"
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          Instalar
        </Button>
        <Button
          onClick={() => setShowPrompt(false)}
          size="sm"
          variant="outline"
          className="flex-1"
        >
          Depois
        </Button>
      </div>
    </Card>
  );
}