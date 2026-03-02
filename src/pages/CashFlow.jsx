import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';
import { Button } from '@/components/ui/button';
import { TrendingDown, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

export default function CashFlow() {
  const { workspaceId, loading: authLoading } = useGlobalAuth('internal');

  const { data: payments = [], isLoading, refetch, error } = useQuery({
    queryKey: ['Payment-list', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      return base44.entities.Payment.filter({ tenant_id: workspaceId }, '-payment_date', 100);
    },
    enabled: !!workspaceId && !authLoading,
    staleTime: 10 * 60 * 1000,
    retry: 2
  });

  const { inflow, outflow } = useMemo(() => ({
    inflow: payments.filter(p => p.status === 'confirmed').reduce((sum, p) => sum + p.amount, 0),
    outflow: payments.filter(p => p.payment_method === 'check').reduce((sum, p) => sum + p.amount, 0)
  }), [payments]);

  const sortedPayments = useMemo(() => 
    payments.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date)).slice(0, 10),
    [payments]
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

  if (error && !payments.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Fluxo de Caixa</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-600 mb-4">Erro ao carregar fluxo de caixa</p>
          <Button onClick={() => refetch()} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </Button>
        </div>
        </div>
        );
        }

  const statusLabel = { confirmed: 'Confirmado', pending: 'Pendente', cancelled: 'Cancelado' };
  const methodLabel = { pix: 'PIX', bank_transfer: 'Transferência', credit_card: 'Cartão de Crédito', debit_card: 'Cartão de Débito', check: 'Cheque', cash: 'Dinheiro' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Fluxo de Caixa</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Entradas e saídas de caixa</p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700" disabled={isLoading} aria-label="Atualizar fluxo de caixa">
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Entradas Confirmadas</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{inflow.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-500 dark:text-green-400" aria-hidden="true" />
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl shadow p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Saídas Registradas</p>
              <p className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400">{outflow.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
            </div>
            <TrendingDown className="w-10 h-10 text-amber-500 dark:text-amber-400" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 sm:p-6 border border-slate-100 dark:border-slate-700">
        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Movimentações Recentes</h2>
        {payments.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-8">Nenhuma movimentação registrada</p>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm min-w-[480px]" role="table" aria-label="Movimentações recentes de caixa">
              <thead className="border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="text-left py-2 px-4 sm:px-0 font-semibold text-slate-700 dark:text-slate-300">Data</th>
                  <th className="text-left py-2 px-2 font-semibold text-slate-700 dark:text-slate-300">Número</th>
                  <th className="text-left py-2 px-2 font-semibold text-slate-700 dark:text-slate-300">Método</th>
                  <th className="text-left py-2 px-2 font-semibold text-slate-700 dark:text-slate-300">Valor</th>
                  <th className="text-left py-2 px-2 font-semibold text-slate-700 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedPayments.map(p => (
                  <tr key={p.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="py-3 px-4 sm:px-0 text-slate-600 dark:text-slate-400">{new Date(p.payment_date).toLocaleDateString('pt-BR')}</td>
                    <td className="py-3 px-2 text-slate-900 dark:text-slate-200">{p.payment_number}</td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{methodLabel[p.payment_method] || p.payment_method}</td>
                    <td className="py-3 px-2 font-medium text-slate-900 dark:text-slate-200">{p.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.status === 'confirmed' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400' :
                        p.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400' :
                        'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        {statusLabel[p.status] || p.status}
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