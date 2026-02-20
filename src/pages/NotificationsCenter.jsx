import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell, Check, Trash2, Settings, Eye, EyeOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'blog_published',
      title: 'Novo post publicado',
      message: 'Seu artigo "5 Estratégias de Gestão" foi publicado com sucesso',
      icon: '📝',
      timestamp: new Date(Date.now() - 2 * 60000),
      read: false,
      priority: 'high',
    },
    {
      id: 2,
      type: 'comment_received',
      title: 'Novo comentário',
      message: 'João Silva comentou em "Gestão de Fluxo de Caixa"',
      icon: '💬',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      priority: 'medium',
    },
    {
      id: 3,
      type: 'analytics_milestone',
      title: 'Milestone alcançado',
      message: 'Um artigo ultrapassou 1000 visualizações',
      icon: '📈',
      timestamp: new Date(Date.now() - 1 * 3600000),
      read: true,
      priority: 'low',
    },
    {
      id: 4,
      type: 'newsletter_sent',
      title: 'Newsletter enviada',
      message: 'Newsletter para 1,234 subscribers enviada com sucesso',
      icon: '📧',
      timestamp: new Date(Date.now() - 3 * 3600000),
      read: true,
      priority: 'medium',
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
      medium: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
      low: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
    };
    return colors[priority] || colors.low;
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-8 h-8 text-slate-900 dark:text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notificações</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 mt-1">Mantenha-se atualizado sobre seu blog</p>
        </div>

        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead} className="gap-2">
              <Check className="w-4 h-4" /> Marcar tudo como lido
            </Button>
          )}
          <Button variant="outline" onClick={() => setShowSettings(!showSettings)} className="gap-2">
            <Settings className="w-4 h-4" /> Configurações
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Preferências de Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-medium">Posts publicados</label>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Novos comentários</label>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Milestones de analytics</label>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Newsletter enviada</label>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Notificações por email</label>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">Todas ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Não lidas ({unreadCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-3 mt-6">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 dark:text-slate-400">Nenhuma notificação neste filtro</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-l-4 ${getPriorityColor(notification.priority)} cursor-pointer hover:shadow-md transition-shadow`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="text-2xl">{notification.icon}</div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-semibold ${notification.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                            {notification.title}
                          </h3>
                          <p className={`text-sm mt-1 ${notification.read ? 'text-slate-500 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
                            {notification.message}
                          </p>
                        </div>

                        {/* Unread Indicator */}
                        {!notification.read && (
                          <div className="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                        )}
                      </div>

                      {/* Time and Actions */}
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatTime(notification.timestamp)}
                        </p>

                        <div className="flex gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400"
                              title="Marcar como lido"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400"
                            title="Deletar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">Total de Notificações</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{notifications.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">Não Lidas</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{unreadCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">Lidas</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{notifications.length - unreadCount}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}