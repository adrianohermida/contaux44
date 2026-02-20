import React, { useState, useEffect } from 'react';
import { Bell, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * Push Notification Manager - Gerencia inscrições e envio de notificações
 */
export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supported =
      'serviceWorker' in navigator && 'PushManager' in window &&
      'Notification' in window;
    setIsSupported(supported);

    if (supported) {
      checkSubscription();
    }
  }, []);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error('Erro ao verificar inscrição:', error);
    }
  };

  const requestNotificationPermission = async () => {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) {
        alert('Permissão de notificação recusada');
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
      });

      setSubscription(sub);
      // Enviar subscription para servidor
      await saveSubscription(sub);
    } catch (error) {
      console.error('Erro ao inscrever:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    try {
      if (subscription) {
        await subscription.unsubscribe();
        setSubscription(null);
      }
    } catch (error) {
      console.error('Erro ao desinscrever:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSubscription = async (sub) => {
    // Enviar para backend
    console.log('Inscrição salva:', sub);
  };

  if (!isSupported) {
    return (
      <Card className="p-4 border-red-200 bg-red-50">
        <div className="flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>Seu navegador não suporta notificações push</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium">Notificações Push</p>
            <p className="text-xs text-gray-600">
              {subscription ? 'Inscrito' : 'Não inscrito'}
            </p>
          </div>
        </div>
        <Button
          onClick={subscription ? handleUnsubscribe : handleSubscribe}
          disabled={loading}
          variant={subscription ? 'destructive' : 'default'}
          size="sm"
        >
          {loading ? 'Processando...' : subscription ? 'Desinscrever' : 'Inscrever'}
        </Button>
      </div>
    </Card>
  );
}