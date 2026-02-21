import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function CashFlowForecast() {
  const { workspaceId, loading: authLoading } = useMultitenantAuthOptimized('internal');
  const { data: projections = [], isLoading, refetch, error } = useQuery({
    queryKey: ['cash-flow-projections', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      return base44.entities.CashFlowProjection.filter(
        { tenant_id: workspaceId },
        'projection_date',
        90
      );
    },
    enabled: !!workspaceId && !authLoading,
    staleTime: 15 * 60 * 1000,
    retry: 2
  });

  const chartData = projections.map(p => ({
    date: format(new Date(p.projection_date), 'dd/MM', { locale: ptBR }),
    opening: p.opening_balance,
    closing: p.closing_balance,
    inflows: p.projected_inflows,
    outflows: p.projected_outflows
  }));

  const stats = {
    averageBalance: projections.length > 0 ? 
      (projections.reduce((sum, p) => sum + p.closing_balance, 0) / projections.length) : 0,
    minBalance: projections.length > 0 ? 
      Math.min(...projections.map(p => p.closing_balance)) : 0,
    maxBalance: projections.length > 0 ? 
      Math.max(...projections.map(p => p.closing_balance)) : 0,
    criticalDays: projections.filter(p => p.closing_balance < 0).length
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  if (error && !projections.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Previsão de Fluxo de Caixa</h1>
          <p className="text-slate-600 mt-1">Projeção de caixa para os próximos 90 dias</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-600 mb-4">Erro ao carregar projeções</p>
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Previsão de Fluxo de Caixa</h1>
          <p className="text-slate-600 mt-1">Projeção de caixa para os próximos 90 dias</p>
        </div>
        <Button onClick={() => refetch()} size="sm" variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </Button>
      </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div>
                  <p className="text-sm text-slate-600">Saldo Médio</p>
                  <p className="text-2xl font-bold text-blue-600">R$ {stats.averageBalance.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Saldo Mínimo</p>
                    <p className={`text-2xl font-bold ${stats.minBalance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      R$ {stats.minBalance.toFixed(2)}
                    </p>
                  </div>
                  {stats.minBalance < 0 && <AlertTriangle className="w-8 h-8 text-red-500" />}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div>
                  <p className="text-sm text-slate-600">Saldo Máximo</p>
                  <p className="text-2xl font-bold text-green-600">R$ {stats.maxBalance.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Dias Críticos</p>
                    <p className={`text-2xl font-bold ${stats.criticalDays > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {stats.criticalDays}
                    </p>
                  </div>
                  {stats.criticalDays > 0 && <AlertTriangle className="w-8 h-8 text-red-500" />}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Saldo Projetado</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Carregando dados...</div>
              ) : chartData.length === 0 ? (
                <div className="text-center py-8 text-slate-600">Nenhuma projeção disponível</div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                    <Legend />
                    <Line type="monotone" dataKey="opening" stroke="#3b82f6" name="Saldo Inicial" />
                    <Line type="monotone" dataKey="closing" stroke="#10b981" name="Saldo Final" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Entradas vs Saídas Projetadas</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="inflows" fill="#10b981" name="Entradas" />
                    <Bar dataKey="outflows" fill="#ef4444" name="Saídas" />
                  </BarChart>
                </ResponsiveContainer>
              ) : null}
            </CardContent>
        </Card>
      </div>
    );
  }