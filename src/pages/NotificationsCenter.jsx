import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Trash2, Settings, Clock, AlertCircle, Info, CheckCircle } from 'lucide-react';

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Novo Comentário no Blog',
      message: 'Um novo comentário foi adicionado ao post "5 Estratégias de Gestão"',
      timestamp: '2 minutos atrás',
      read: false,
      category: 'blog'
    },
    {
      id: 2,
      type: 'success',
      title: 'Post Publicado com Sucesso',
      message: 'Seu artigo sobre contabilidade foi publicado',
      timestamp: '1 hora atrás',
      read: false,
      category: 'blog'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Taxa de Leitura Baixa',
      message: 'O post "Legislação Trabalhista" teve menos visualizações do que o esperado',
      timestamp: '3 horas atrás',
      read: true,
      category: 'analytics'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Falha na Sincronização',
      message: 'Erro ao sincronizar dados com o Google Sheets',
      timestamp: '5 horas atrás',
      read: true,
      category: 'system'
    },
    {
      id: 5,
      type: 'info',
      title: 'Novo Subscriber',
      message: 'Uma nova pessoa se inscreveu na newsletter',
      timestamp: '1 dia atrás',
      read: true,
      category: 'newsletter'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'alert': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.category === filter);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Centro de Notificações</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gerencie suas notificações e atualizações
          </p>
        </div>
        <Bell className="h-8 w-8 text-slate-600" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Não Lidas</CardTitle>
            <Bell className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Clock className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Configurações</CardTitle>
            <Settings className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">Preferências</Button>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Todas
        </Button>
        <Button 
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          Não Lidas ({unreadCount})
        </Button>
        <Button 
          variant={filter === 'blog' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('blog')}
        >
          Blog
        </Button>
        <Button 
          variant={filter === 'analytics' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('analytics')}
        >
          Analytics
        </Button>
        <Button 
          variant={filter === 'newsletter' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('newsletter')}
        >
          Newsletter
        </Button>

        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto"
            onClick={markAllAsRead}
          >
            Marcar todas como lidas
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Nenhuma notificação nesta categoria</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map(notification => (
            <Card 
              key={notification.id}
              className={!notification.read ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' : ''}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {notification.category}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        {!notification.read && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            title="Marcar como lida"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          title="Deletar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}