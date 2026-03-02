/**
 * Analytics Dashboard Widget
 * Compact analytics for the main dashboard
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, TrendingUp, DollarSign, Target, BarChart2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { subDays, format, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AnalyticsDashboard({ workspaceId }) {
  const { data: contacts = [] } = useQuery({
    queryKey: ['dash-analytics-contacts', workspaceId],
    queryFn: () => base44.entities.Client.filter({ workspace_id: workspaceId }),
    enabled: !!workspaceId,
    staleTime: 2 * 60 * 1000,
  });

  const { data: opportunities = [] } = useQuery({
    queryKey: ['dash-analytics-ops', workspaceId],
    queryFn: () => base44.entities.SalesOpportunity.filter({ workspace_id: workspaceId }),
    enabled: !!workspaceId,
    staleTime: 2 * 60 * 1000,
  });

  const now = new Date();
  const monthStart = startOfMonth(now);
  const newThisMonth = contacts.filter(c => new Date(c.created_date) >= monthStart).length;
  const activeContacts = contacts.filter(c => c.status === 'active').length;
  const pipelineValue = opportunities
    .filter(o => !['won', 'lost'].includes(o.pipeline_stage))
    .reduce((sum, o) => sum + (o.deal_value || 0), 0);
  const wonOps = opportunities.filter(o => o.pipeline_stage === 'won');
  const convRate = opportunities.length > 0
    ? ((wonOps.length / opportunities.length) * 100).toFixed(1)
    : '0.0';

  // Mini chart data
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const date = subDays(now, (5 - i) * 30);
    const count = contacts.filter(c => {
      const d = new Date(c.created_date);
      return d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
    }).length;
    return { mes: format(date, 'MMM', { locale: ptBR }), contatos: count };
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-blue-600" aria-hidden="true" />
          Analytics Resumido
        </h3>
        <Link
          to={createPageUrl('ReportsAnalytics')}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          Ver tudo →
        </Link>
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" aria-hidden="true" />
          <p className="text-lg font-bold text-blue-900 dark:text-blue-200">{contacts.length}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400">Contatos</p>
        </div>
        <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" aria-hidden="true" />
          <p className="text-lg font-bold text-green-900 dark:text-green-200">+{newThisMonth}</p>
          <p className="text-xs text-green-600 dark:text-green-400">Novos/mês</p>
        </div>
        <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <DollarSign className="w-4 h-4 text-orange-600 dark:text-orange-400 mx-auto mb-1" aria-hidden="true" />
          <p className="text-lg font-bold text-orange-900 dark:text-orange-200">
            {(pipelineValue / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-orange-600 dark:text-orange-400">Pipeline</p>
        </div>
        <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Target className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" aria-hidden="true" />
          <p className="text-lg font-bold text-purple-900 dark:text-purple-200">{convRate}%</p>
          <p className="text-xs text-purple-600 dark:text-purple-400">Conversão</p>
        </div>
      </div>

      {/* Mini chart */}
      {contacts.length > 0 && (
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: -30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="contatos"
                stroke="#3b82f6"
                fill="rgba(59,130,246,0.12)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}