import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download } from 'lucide-react';

export default function AuditLogs() {
  const [logs] = useState([
    { id: 1, timestamp: '2026-02-20 14:32:15', user: 'admin@contaux.com', action: 'create', entity: 'Invoice', entityId: '6990182468d9fddbfdbb4bcf', details: 'Criada fatura #2026-001', ip: '192.168.1.100' },
    { id: 2, timestamp: '2026-02-20 14:28:42', user: 'maria@contaux.com', action: 'update', entity: 'BlogPost', entityId: '69927c671f4022dbc14d7272', details: 'Atualizou título', ip: '192.168.1.105' },
    { id: 3, timestamp: '2026-02-20 13:45:10', user: 'admin@contaux.com', action: 'delete', entity: 'BlogComment', entityId: 'comment-123', details: 'Deletou comentário spam', ip: '192.168.1.100' },
    { id: 4, timestamp: '2026-02-20 13:22:55', user: 'carlos@contaux.com', action: 'login', entity: 'User', entityId: 'user-456', details: 'Acesso bem-sucedido', ip: '192.168.1.110' },
    { id: 5, timestamp: '2026-02-20 12:15:30', user: 'system', action: 'backup', entity: 'Database', entityId: 'db-1', details: 'Backup automático concluído', ip: 'internal' }
  ]);

  const [filterAction, setFilterAction] = useState('all');

  const getActionBadge = (action) => {
    const colors = {
      create: 'bg-green-100 text-green-800',
      update: 'bg-blue-100 text-blue-800',
      delete: 'bg-red-100 text-red-800',
      login: 'bg-purple-100 text-purple-800',
      backup: 'bg-yellow-100 text-yellow-800'
    };
    return colors[action] || 'bg-slate-100 text-slate-800';
  };

  const filteredLogs = filterAction === 'all' ? logs : logs.filter(log => log.action === filterAction);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Log de Auditoria</h1>
          <p className="text-slate-600 dark:text-slate-400">Registre todas as ações e alterações</p>
        </div>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition">
          <Download className="h-5 w-5" />
        </button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {['all', 'create', 'update', 'delete', 'login', 'backup'].map(action => (
              <button
                key={action}
                onClick={() => setFilterAction(action)}
                className={`px-4 py-2 rounded-lg transition ${
                  filterAction === action
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {action === 'all' ? 'Todos' : action.charAt(0).toUpperCase() + action.slice(1)}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logs */}
      <div className="space-y-3">
        {filteredLogs.map(log => (
          <Card key={log.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="font-medium">{log.entity}</p>
                      <p className="text-sm text-slate-600">{log.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-2">{log.details}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span>👤 {log.user}</span>
                    <span>🌐 {log.ip}</span>
                  </div>
                </div>
                <Badge className={getActionBadge(log.action)}>
                  {log.action.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">125</p>
            <p className="text-xs text-slate-600">Hoje</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">2.4K</p>
            <p className="text-xs text-slate-600">Esta semana</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">8.7K</p>
            <p className="text-xs text-slate-600">Este mês</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-slate-600">Usuários</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">30</p>
            <p className="text-xs text-slate-600">Dias retenção</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}