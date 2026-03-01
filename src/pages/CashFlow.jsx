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
    return <div className="flex items-center justify-center h-96 text-slate-500">Carregando...</div>;
  }

  if (error && !payments.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Fluxo de Caixa</h1>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Fluxo de Caixa</h1>
          <p className="text-slate-600 mt-1">Entradas e saídas de caixa</p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2" disabled={isLoading}>
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Entradas Confirmadas</p>
                  <p className="text-3xl font-bold text-green-600">{inflow.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg shadow p-6 border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Saídas Registradas</p>
                  <p className="text-3xl font-bold text-amber-600">{outflow.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
                </div>
                <TrendingDown className="w-10 h-10 text-amber-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Movimentações Recentes</h2>
            {payments.length === 0 ? (
              <p className="text-center text-slate-500 py-8">Nenhuma movimentação registrada</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-2">Data</th>
                      <th className="text-left py-2">Número</th>
                      <th className="text-left py-2">Método</th>
                      <th className="text-left py-2">Valor</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPayments.map(p => (
                      <tr key={p.id} className="border-b hover:bg-slate-50">
                        <td className="py-2">{new Date(p.payment_date).toLocaleDateString('pt-BR')}</td>
                        <td className="py-2">{p.payment_number}</td>
                        <td className="py-2">{p.payment_method}</td>
                        <td className="py-2 font-medium">{p.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            p.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            p.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {p.status}
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