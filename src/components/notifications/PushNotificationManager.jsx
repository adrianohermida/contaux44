/**
 * Push Notification Manager
 * Handle Web Push subscriptions for PWA
 */

import React, { useState, useEffect } from 'react';
import { Bell, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState(null);

  // Check if push notifications are supported
  useEffect(() => {
    const supported =
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window;
    setIsSupported(supported);

    if (supported) {
      checkSubscriptionStatus();
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (err) {
      console.warn('Failed to check subscription:', err);
    }
  };

  const subscribe = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        setError('Permissão de notificação foi negada');
        return;
      }

      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
      });

      setIsSubscribed(true);
      setShowPrompt(false);
      setError(null);

      // Send subscription to backend
      // await base44.functions.invoke('savePushSubscription', { subscription });
    } catch (err) {
      console.error('Push subscription failed:', err);
      setError('Falha ao habilitar notificações push');
    }
  };

  const unsubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        setIsSubscribed(false);
        setError(null);
      }
    } catch (err) {
      console.error('Unsubscribe failed:', err);
      setError('Falha ao desabilitar notificações');
    }
  };

  if (!isSupported) return null;

  return (
    <>
      {error && (
        <div className="p-3 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-sm text-blue-900 dark:text-blue-300">
                Notificações Push
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                {isSubscribed
                  ? 'Você está recebendo notificações push'
                  : 'Habilite notificações para receber atualizações'}
              </p>
            </div>
          </div>

          {isSubscribed ? (
            <div className="flex gap-2">
              <Check className="w-5 h-5 text-green-600" aria-hidden="true" />
              <Button
                onClick={() => setShowPrompt(true)}
                variant="outline"
                size="sm"
                className="text-xs min-h-[36px]"
              >
                Desabilitar
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setShowPrompt(true)}
              size="sm"
              className="text-xs min-h-[36px]"
            >
              Habilitar
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showPrompt} onOpenChange={setShowPrompt}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isSubscribed ? 'Desabilitar Notificações?' : 'Habilitar Notificações?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isSubscribed
                ? 'Você não receberá mais notificações push'
                : 'Você receberá notificações importantes sobre seus contatos e atividades'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={isSubscribed ? unsubscribe : subscribe}
              className={isSubscribed ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              {isSubscribed ? 'Desabilitar' : 'Habilitar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}