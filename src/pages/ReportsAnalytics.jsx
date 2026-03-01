import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useGlobalAuth } from '@/components/auth/useGlobalAuth';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RevenueChart from '@/components/dashboard/RevenueChart';
import PaymentStatusChart from '@/components/dashboard/PaymentStatusChart';
import TicketAnalyticsChart from '@/components/dashboard/TicketAnalyticsChart';
import ComparisonCard from '@/components/dashboard/ComparisonCard';
import PredictiveAnalyticsDashboard from '@/components/dashboard/analytics/PredictiveAnalyticsDashboard';
import CustomerInsightsDashboard from '@/components/dashboard/analytics/CustomerInsightsDashboard';
import RevenueForecaster from '@/components/dashboard/analytics/RevenueForecaster';
import ExportReportButton from '@/components/dashboard/ExportReportButton';
import { TrendingUp, CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * REPORTS - ANALYTICS MODULE
 * Core analytics & insights
 */
export default function ReportsAnalytics() {
  const { workspaceId, loading: authLoading } = useGlobalAuth('internal');
  const [activeTab, setActiveTab] = useState('overview');

  const { data: analyticsData, isLoading: analyticsLoading, refetch: refetchAnalytics, error: analyticsError } = useQuery({
    queryKey: ['reports-analytics', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return null;
      try {
        const [invoices, tickets, clients] = await Promise.all([
          base44.entities.Invoice.filter({ tenant_id: workspaceId }),
          base44.entities.Ticket.filter({ tenant_id: workspaceId }),
          base44.entities.Client.filter({ tenant_id: workspaceId })
        ]);

        const today = new Date();
        const totalInvoiced = invoices.reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const overdue = invoices.filter(i => new Date(i.due_date) < today && i.status !== 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0);

        return {
          invoices,
          tickets,
          clients,
          metrics: {
            totalInvoiced,
            totalPaid,
            overdue,
            paymentRate: totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 0
          }
        };
      } catch (err) {
        toast.error('Erro ao carregar analytics');
        throw err;
      }
    },
    enabled: !!workspaceId && !authLoading,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2
  });

  if (authLoading || analyticsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  if (analyticsError && !analyticsData) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Relatórios - Analytics</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-600 mb-4">Erro ao carregar dados de análise</p>
          <Button onClick={() => refetchAnalytics()} className="gap-2">
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
          <h1 className="text-3xl font-bold text-slate-900">Relatórios - Analytics</h1>
          <p className="text-slate-600 mt-1">Dashboard de análises e insights</p>
        </div>
        <ExportReportButton tenantId={workspaceId} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Dashboard</TabsTrigger>
          <TabsTrigger value="predictive">Previsões</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
          <TabsTrigger value="revenue">Receita</TabsTrigger>
          <TabsTrigger value="comparison">Comparação</TabsTrigger>
        </TabsList>

        {/* Overview Dashboard */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {analyticsData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-600 text-sm">Total Faturado</p>
                      <p className="text-2xl font-bold mt-1">R$ {analyticsData.metrics.totalInvoiced.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-600 text-sm">Total Recebido</p>
                      <p className="text-2xl font-bold mt-1">R$ {analyticsData.metrics.totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-600 text-sm">Vencido</p>
                      <p className="text-2xl font-bold mt-1">R$ {analyticsData.metrics.overdue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-amber-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-600 text-sm">Taxa de Recebimento</p>
                      <p className="text-2xl font-bold mt-1">{analyticsData.metrics.paymentRate}%</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500 opacity-20" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Receita Mensal</h3>
                  <RevenueChart invoices={analyticsData.invoices} />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Status de Pagamentos</h3>
                  <PaymentStatusChart invoices={analyticsData.invoices} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Tickets por Status</h3>
                <TicketAnalyticsChart tickets={analyticsData.tickets} />
              </div>
            </>
          )}
        </TabsContent>

        {/* Predictive Analytics */}
        <TabsContent value="predictive" className="mt-6">
          {analyticsData && <PredictiveAnalyticsDashboard invoices={analyticsData.invoices} />}
        </TabsContent>

        {/* Customer Insights */}
        <TabsContent value="customers" className="mt-6">
          {workspaceId && <CustomerInsightsDashboard workspaceId={workspaceId} />}
        </TabsContent>

        {/* Revenue Forecaster */}
        <TabsContent value="revenue" className="mt-6">
          {analyticsData && <RevenueForecaster invoices={analyticsData.invoices} />}
        </TabsContent>

        {/* Comparison Card */}
        <TabsContent value="comparison" className="mt-6">
          {workspaceId && <ComparisonCard tenantId={workspaceId} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}