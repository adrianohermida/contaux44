import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useMultitenantAuth } from '../components/auth/useMultitenantAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AuditLogs() {
  const { workspaceId } = useMultitenantAuth('internal');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');

  const loadLogs = useCallback(async () => {
    if (!workspaceId) return;
    
    try {
      const data = await base44.entities.AuditLog.filter(
        { tenant_id: workspaceId },
        '-timestamp',
        100
      );
      setLogs(data);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.entity_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  const handleExportCSV = useCallback(() => {
    const headers = ['Data/Hora', 'Usuário', 'Ação', 'Entidade', 'ID Entidade', 'Status'];
    const rows = filteredLogs.map(log => [
      format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
      log.user_email,
      log.action,
      log.entity_type,
      log.entity_id || '-',
      log.status
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().getTime()}.csv`;
    a.click();
  }, [filteredLogs]);

  return (
    <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Logs de Auditoria</h1>
            <p className="text-slate-600 mt-1">Histórico de ações e alterações no sistema</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[250px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Buscar por usuário ou entidade..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Ação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as ações</SelectItem>
                    <SelectItem value="create">Criar</SelectItem>
                    <SelectItem value="update">Atualizar</SelectItem>
                    <SelectItem value="delete">Deletar</SelectItem>
                    <SelectItem value="view">Visualizar</SelectItem>
                    <SelectItem value="export">Exportar</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleExportCSV} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-8">Carregando logs...</div>
              ) : filteredLogs.length === 0 ? (
                <div className="text-center py-8 text-slate-600">Nenhum log encontrado</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-200">
                      <tr>
                        <th className="text-left p-3">Data/Hora</th>
                        <th className="text-left p-3">Usuário</th>
                        <th className="text-left p-3">Ação</th>
                        <th className="text-left p-3">Entidade</th>
                        <th className="text-left p-3">ID</th>
                        <th className="text-left p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-3 text-xs text-slate-600">
                            {format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })}
                          </td>
                          <td className="p-3 font-medium">{log.user_email}</td>
                          <td className="p-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                              {log.action}
                            </span>
                          </td>
                          <td className="p-3">{log.entity_type}</td>
                          <td className="p-3 text-slate-600">{log.entity_id || '-'}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        );
        }