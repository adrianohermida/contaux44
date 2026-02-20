import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Notification Center - Exibe histórico de notificações
 */
export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Carregar notificações do localStorage
    const stored = localStorage.getItem('notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  const addNotification = (notification) => {
    const updated = [
      {
        id: Date.now(),
        timestamp: new Date(),
        read: false,
        ...notification,
      },
      ...notifications,
    ];
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const removeNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  if (notifications.length === 0) {
    return (
      <Card className="p-8 text-center text-gray-500">
        <p>Nenhuma notificação</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <p className="font-medium text-sm">
          {notifications.length} notificação(ões)
        </p>
        <Button
          onClick={clearAll}
          size="sm"
          variant="outline"
          className="flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" />
          Limpar tudo
        </Button>
      </div>

      {notifications.map((notif) => (
        <Card
          key={notif.id}
          className={`p-4 flex items-start justify-between ${
            notif.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">{notif.title}</p>
            <p className="text-sm text-gray-600">{notif.body}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(notif.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={() => removeNotification(notif.id)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </Card>
      ))}
    </div>
  );
}