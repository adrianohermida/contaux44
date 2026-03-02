/**
 * Audit Dashboard
 * View audit logs and compliance reports
 */

import React, { useState, useMemo } from 'react';
import { Loader2, Filter, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AuditDashboard({ workspaceId }) {
  const [actionFilter, setActionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchEmail, setSearchEmail] = useState('');
  const [dateRange, setDateRange] = useState('7days');

  // Calculate date range
  const getDateRange = () => {
    const now = new Date();
    const ranges = {
      '24hours': subDays(now, 1),
      '7days': subDays(now, 7),
      '30days': subDays(now, 30),
      'all': null,
    };
    return ranges[dateRange];
  };

  // Fetch audit logs
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['audit-logs', workspaceId, actionFilter, statusFilter, dateRange],
    queryFn: async () => {
      const query = { workspace_id: workspaceId };
      if (actionFilter !== 'all') query.action = actionFilter;
      if (statusFilter !== 'all') query.status = statusFilter;
      
      let allLogs = await base44.entities.AuditLog?.filter(query) || [];
      
      // Filter by date
      const startDate = getDateRange();
      if (startDate) {
        allLogs = allLogs.filter(log => new Date(log.created_date) >= startDate);
      }

      return allLogs;
    },
    enabled: !!workspaceId,
  });

  // Client-side search by email
  const filteredLogs = useMemo(() => {
    if (!searchEmail) return logs;
    return logs.filter(log =>
      log.user_email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  }, [logs, searchEmail]);

  // Sort by date (newest first)
  const sortedLogs = useMemo(
    () => filteredLogs.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)),
    [filteredLogs]
  );

  // Statistics
  const stats = useMemo(() => {
    const totalActions = sortedLogs.length;
    const successCount = sortedLogs.filter(l => l.status === 'success').length;
    const failedCount = sortedLogs.filter(l => l.status === 'failed').length;
    const deniedCount = sortedLogs.filter(l => l.status === 'denied').length;
    const uniqueUsers = new Set(sortedLogs.map(l => l.user_email)).size;

    return { totalActions, successCount, failedCount, deniedCount, uniqueUsers };
  }, [sortedLogs]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-5 h-5 animate-spin text-blue-600 mr-2" aria-hidden="true" />
        <span>Carregando logs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {stats.totalActions}
          </p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-xs text-green-700 dark:text-green-400 mb-1">Sucesso</p>
          <p className="text-2xl font-bold text-green-900 dark:text-green-300">
            {stats.successCount}
          </p>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-xs text-red-700 dark:text-red-400 mb-1">Falha</p>
          <p className="text-2xl font-bold text-red-900 dark:text-red-300">
            {stats.failedCount}
          </p>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-yellow-700 dark:text-yellow-400 mb-1">Negado</p>
          <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">
            {stats.deniedCount}
          </p>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-700 dark:text-blue-400 mb-1">Usuários</p>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
            {stats.uniqueUsers}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-40 min-h-[40px]">
            <SelectValue placeholder="Ação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as ações</SelectItem>
            <SelectItem value="create">Criar</SelectItem>
            <SelectItem value="read">Ler</SelectItem>
            <SelectItem value="update">Atualizar</SelectItem>
            <SelectItem value="delete">Deletar</SelectItem>
            <SelectItem value="export">Exportar</SelectItem>
            <SelectItem value="login">Login</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 min-h-[40px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="success">Sucesso</SelectItem>
            <SelectItem value="failed">Falha</SelectItem>
            <SelectItem value="denied">Negado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-40 min-h-[40px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24hours">Últimas 24h</SelectItem>
            <SelectItem value="7days">Últimos 7 dias</SelectItem>
            <SelectItem value="30days">Últimos 30 dias</SelectItem>
            <SelectItem value="all">Todos</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Filtrar por email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="flex-1 min-h-[40px] min-w-[200px]"
          aria-label="Filtrar por email"
        />
      </div>

      {/* Logs Table */}
      {sortedLogs.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-700">
          <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" aria-hidden="true" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Nenhum log encontrado
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left p-3 font-medium text-slate-900 dark:text-slate-100">
                  Data/Hora
                </th>
                <th className="text-left p-3 font-medium text-slate-900 dark:text-slate-100">
                  Usuário
                </th>
                <th className="text-left p-3 font-medium text-slate-900 dark:text-slate-100">
                  Ação
                </th>
                <th className="text-left p-3 font-medium text-slate-900 dark:text-slate-100">
                  Entidade
                </th>
                <th className="text-left p-3 font-medium text-slate-900 dark:text-slate-100">
                  Status
                </th>
                <th className="text-left p-3 font-medium text-slate-900 dark:text-slate-100">
                  IP
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedLogs.slice(0, 50).map(log => (
                <tr
                  key={log.id}
                  className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="p-3 text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {format(new Date(log.created_date), 'dd MMM HH:mm', { locale: ptBR })}
                  </td>
                  <td className="p-3 text-slate-900 dark:text-slate-100 max-w-xs break-words">
                    {log.user_email}
                  </td>
                  <td className="p-3">
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded capitalize">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 text-xs">
                    {log.entity_type}
                    {log.entity_name && ` (${log.entity_name})`}
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded capitalize ${
                      log.status === 'success'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : log.status === 'failed'
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 text-xs font-mono break-all">
                    {log.ip_address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sortedLogs.length > 50 && (
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          Mostrando 50 de {sortedLogs.length} logs
        </p>
      )}
    </div>
  );
}