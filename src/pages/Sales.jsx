import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

export default function Sales() {
  const { workspaceId, loading: authLoading } = useMultitenantAuthOptimized('internal');

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
    return <div className="flex items-center justify-center h-96 text-slate-500">Carregando...</div>;
  }

  if (error && !invoices.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Vendas</h1>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Vendas</h1>
          <p className="text-slate-600 mt-1">Análise de faturamento e vendas</p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2" disabled={isLoading}>
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-slate-600 text-sm mb-1">Receita Total</p>
          <p className="text-3xl font-bold">{totalRevenue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            Últimas 30 dias
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-slate-600 text-sm mb-1">Faturas Pagas</p>
          <p className="text-3xl font-bold">{paidInvoices}</p>
          <p className="text-slate-500 text-sm mt-2">De {invoices.length} faturas</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-slate-600 text-sm mb-1">Taxa de Conversão</p>
          <p className="text-3xl font-bold">{conversionRate}%</p>
          <p className="text-slate-500 text-sm mt-2">Faturas concluídas</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Últimas Vendas</h2>
        {invoices.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Nenhuma venda registrada</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Número</th>
                  <th className="text-left py-2">Data</th>
                  <th className="text-left py-2">Valor</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedInvoices.map(inv => (
                  <tr key={inv.id} className="border-b hover:bg-slate-50">
                    <td className="py-2">{inv.invoice_number}</td>
                    <td className="py-2">{new Date(inv.issue_date).toLocaleDateString('pt-BR')}</td>
                    <td className="py-2 font-medium">{inv.total_amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        inv.status === 'paid' ? 'bg-green-100 text-green-800' :
                        inv.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {inv.status}
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