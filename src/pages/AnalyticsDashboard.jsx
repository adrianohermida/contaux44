import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { TrendingUp, DollarSign, Clock, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import KPICard from '../components/dashboard/KPICard';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import ExportButtons from '../components/dashboard/ExportButtons';

export default function AnalyticsDashboard() {
  const [tenantId, setTenantId] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await base44.auth.me();
        setTenantId(user.email.split('@')[0]);

        const [inv, pay] = await Promise.all([
          base44.entities.Invoice.filter({ tenant_id: user.email.split('@')[0] }),
          base44.entities.Payment.filter({ tenant_id: user.email.split('@')[0] })
        ]);
        setInvoices(inv);
        setPayments(pay);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total_amount || 0), 0);
  const totalReceived = payments.reduce((sum, pay) => sum + (pay.amount || 0), 0);
  const pendingAmount = totalRevenue - totalReceived;
  const paidInvoices = invoices.filter(i => i.status === 'paid').length;

  if (loading || !tenantId) return <ProtectedRoute><DashboardLayout><div className="text-center py-8">Carregando...</div></DashboardLayout></ProtectedRoute>;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
              <p className="text-slate-600 mt-1">Visão geral de receitas e pagamentos</p>
            </div>
            <ExportButtons data={invoices} type="invoices" />
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard 
              icon={DollarSign} 
              label="Receita Total" 
              value={`R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              color="green"
            />
            <KPICard 
              icon={TrendingUp} 
              label="Recebido" 
              value={`R$ ${totalReceived.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              color="blue"
            />
            <KPICard 
              icon={Clock} 
              label="Pendente" 
              value={`R$ ${pendingAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              color="purple"
            />
            <KPICard 
              icon={AlertCircle} 
              label="Taxa de Recebimento" 
              value={`${totalRevenue > 0 ? ((totalReceived / totalRevenue) * 100).toFixed(1) : 0}%`}
              color="red"
            />
          </div>

          {/* Gráficos */}
          <AnalyticsCharts invoices={invoices} payments={payments} />

          {/* Tabela de Resumo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Faturas por Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Pagas</span>
                  <span className="font-semibold">{invoices.filter(i => i.status === 'paid').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Enviadas</span>
                  <span className="font-semibold">{invoices.filter(i => i.status === 'sent').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Atrasadas</span>
                  <span className="font-semibold text-red-600">{invoices.filter(i => i.status === 'overdue').length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total de Faturas</span>
                  <span className="font-semibold">{invoices.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total de Pagamentos</span>
                  <span className="font-semibold">{payments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ticket Médio</span>
                  <span className="font-semibold">R$ {invoices.length > 0 ? (totalRevenue / invoices.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}