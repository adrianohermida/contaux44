import React, { useState, useEffect, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useUserAndTenant } from '@/components/hooks/useUserAndTenant';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProtectedRoute from '@/components/dashboard/ProtectedRoute';
import RevenueChart from '@/components/dashboard/RevenueChart';
import PaymentStatusChart from '@/components/dashboard/PaymentStatusChart';
import TicketAnalyticsChart from '@/components/dashboard/TicketAnalyticsChart';
import ComparisonCard from '@/components/dashboard/ComparisonCard';
import ExportReportButton from '@/components/dashboard/ExportReportButton';
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function AnalyticsDashboard() {
  const { tenantId } = useUserAndTenant();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!tenantId) return;

      try {
        const [invoices, payments, tickets, clients] = await Promise.all([
          base44.entities.Invoice.filter({ tenant_id: tenantId }),
          base44.entities.Payment.filter({ tenant_id: tenantId }),
          base44.entities.Ticket.filter({ tenant_id: tenantId }),
          base44.entities.Client.filter({ tenant_id: tenantId })
        ]);

        const today = new Date();
        const totalInvoiced = invoices.reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const overdue = invoices.filter(i => new Date(i.due_date) < today && i.status !== 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const avgTicketResolution = tickets.length > 0 ? Math.round(tickets.filter(t => t.status === 'closed').length / tickets.length * 100) : 0;

        setData({
          invoices,
          payments,
          tickets,
          clients,
          metrics: {
            totalInvoiced,
            totalPaid,
            overdue,
            avgTicketResolution,
            paymentRate: totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 0
          }
        });
      } catch (error) {
        console.error('Erro ao carregar analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [tenantId]);

  if (loading) return <div className="flex items-center justify-center h-screen">Carregando analytics...</div>;
  if (!data) return <div className="flex items-center justify-center h-screen">Erro ao carregar dados</div>;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
            <ExportReportButton tenantId={tenantId} />
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-600 text-sm">Total Faturado</p>
                  <p className="text-2xl font-bold mt-1">R$ {data.metrics.totalInvoiced.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-600 text-sm">Total Recebido</p>
                  <p className="text-2xl font-bold mt-1">R$ {data.metrics.totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-600 text-sm">Vencido</p>
                  <p className="text-2xl font-bold mt-1">R$ {data.metrics.overdue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-600 text-sm">Taxa de Recebimento</p>
                  <p className="text-2xl font-bold mt-1">{data.metrics.paymentRate}%</p>
                </div>
                <Clock className="w-8 h-8 text-purple-500 opacity-20" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Receita Mensal (2026)</h3>
              <RevenueChart invoices={data.invoices} />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Status de Pagamentos</h3>
              <PaymentStatusChart invoices={data.invoices} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Tickets por Status</h3>
            <TicketAnalyticsChart tickets={data.tickets} />
          </div>

          {/* Comparison Card */}
          <ComparisonCard tenantId={tenantId} />

          {/* Additional Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Evolução de Clientes</h4>
              <p className="text-3xl font-bold text-blue-600">{data.clients.filter(c => c.status === 'active').length}</p>
              <p className="text-sm text-slate-600 mt-2">Clientes ativos</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Tickets Abertos</h4>
              <p className="text-3xl font-bold text-yellow-600">{data.tickets.filter(t => t.status === 'open').length}</p>
              <p className="text-sm text-slate-600 mt-2">Aguardando atendimento</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Taxa de Resolução</h4>
              <p className="text-3xl font-bold text-green-600">{data.metrics.avgTicketResolution}%</p>
              <p className="text-sm text-slate-600 mt-2">Tickets resolvidos</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}