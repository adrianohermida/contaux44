import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

export default function Sales() {
  const { workspaceId, loading: authLoading } = useGlobalAuth('internal');

  const { data: invoices = [], isLoading, refetch, error } = useQuery({
    queryKey: ['Invoice-list', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      return base44.entities.Invoice.filter({ tenant_id: workspaceId }, '-issue_date', 100);
    },
    enabled: !!workspaceId && !authLoading,
    staleTime: 10 * 60 * 1000,
    retry: 2
  });

  const { totalRevenue, paidInvoices, conversionRate } = useMemo(() => {
    const total = invoices.reduce((sum, inv) => sum + inv.total_amount, 0);
    const paid = invoices.filter(inv => inv.status === 'paid').length;
    const rate = invoices.length > 0 ? Math.round((paid / invoices.length) * 100) : 0;
    return { totalRevenue: total, paidInvoices: paid, conversionRate: rate };
  }, [invoices]);

  const sortedInvoices = useMemo(() => 
    invoices.sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date)).slice(0, 10),
    [invoices]
  );

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error && !invoices.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Vendas</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-600 mb-4">Erro ao carregar vendas</p>
          <Button onClick={() => refetch()} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  const statusLabel = { paid: 'Pago', overdue: 'Vencido', pending: 'Pendente', draft: 'Rascunho' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Vendas</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Análise de faturamento e vendas</p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2" disabled={isLoading} aria-label="Atualizar dados de vendas">
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border border-slate-100 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Receita Total</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{totalRevenue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
          <div className="flex items-center gap-1 mt-2 text-green-600 dark:text-green-400 text-sm">
            <TrendingUp className="w-4 h-4" aria-hidden="true" />
            Últimas 30 dias
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border border-slate-100 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Faturas Pagas</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{paidInvoices}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">De {invoices.length} faturas</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 border border-slate-100 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Taxa de Conversão</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{conversionRate}%</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Faturas concluídas</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 sm:p-6 border border-slate-100 dark:border-slate-700">
        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Últimas Vendas</h2>
        {invoices.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-8">Nenhuma venda registrada</p>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm min-w-[400px]" role="table" aria-label="Lista de vendas recentes">
              <thead className="border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="text-left py-2 px-4 sm:px-0 font-semibold text-slate-700 dark:text-slate-300">Número</th>
                  <th className="text-left py-2 px-2 font-semibold text-slate-700 dark:text-slate-300">Data</th>
                  <th className="text-left py-2 px-2 font-semibold text-slate-700 dark:text-slate-300">Valor</th>
                  <th className="text-left py-2 px-2 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedInvoices.map(inv => (
                  <tr key={inv.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="py-3 px-4 sm:px-0 text-slate-900 dark:text-slate-200">{inv.invoice_number}</td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{new Date(inv.issue_date).toLocaleDateString('pt-BR')}</td>
                    <td className="py-3 px-2 font-medium text-slate-900 dark:text-slate-200">{inv.total_amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inv.status === 'paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                        inv.status === 'overdue' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                      }`}>
                        {statusLabel[inv.status] || inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}