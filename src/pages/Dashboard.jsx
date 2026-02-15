import React, { useState, useEffect, useMemo } from 'react';
import { Users, Ticket, FileText, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import StatCard from '../components/dashboard/StatCard';
import AlertsCenter from '../components/dashboard/AlertsCenter';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';

export default function Dashboard() {
  const { tenantId } = useUserAndTenant();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!tenantId) return;
      
      try {
        const [clients, processes, tickets, invoices, quotes] = await Promise.all([
          base44.entities.Client.filter({ tenant_id: tenantId, status: 'active' }),
          base44.entities.LegalProcess.filter({ tenant_id: tenantId, status: 'in_progress' }),
          base44.entities.Ticket.filter({ tenant_id: tenantId, status: 'open' }),
          base44.entities.Invoice.filter({ tenant_id: tenantId }),
          base44.entities.Quote.filter({ tenant_id: tenantId, status: 'draft' })
        ]);

        const currentMonth = new Date().getMonth();
        const monthlyInvoices = invoices.filter(i => new Date(i.issue_date).getMonth() === currentMonth);
        const monthlyRevenue = monthlyInvoices.reduce((sum, i) => sum + (i.total_amount || 0), 0);

        const upcomingDeadlines = processes.filter(p => {
          const nextDate = new Date(p.next_hearing_date);
          const today = new Date();
          const daysUntil = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
          return daysUntil <= 7 && daysUntil > 0;
        }).length;

        setDashboardData({
          clientsCount: clients.length,
          processesCount: processes.length,
          ticketsCount: tickets.length,
          monthlyRevenue,
          upcomingDeadlines,
          quotesCount: quotes.length
        });
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      }
    };

    loadDashboardData();
  }, [tenantId]);

  const stats = useMemo(() => {
    if (!dashboardData) {
      return [
        { icon: Users, title: 'Clientes Ativos', value: '0', subtitle: 'Total de clientes', color: 'blue' },
        { icon: FileText, title: 'Processos em Andamento', value: '0', subtitle: 'Processos ativos', color: 'green' },
        { icon: Ticket, title: 'Tickets Abertos', value: '0', subtitle: 'Aguardando atendimento', color: 'yellow' },
        { icon: DollarSign, title: 'Receita do Mês', value: 'R$ 0,00', subtitle: 'Faturamento atual', color: 'purple' },
        { icon: AlertCircle, title: 'Prazos Críticos', value: '0', subtitle: 'Próximos 7 dias', color: 'red' },
        { icon: TrendingUp, title: 'Orçamentos Pendentes', value: '0', subtitle: 'Aguardando aprovação', color: 'blue' }
      ];
    }

    return [
      { icon: Users, title: 'Clientes Ativos', value: dashboardData.clientsCount.toString(), subtitle: 'Total de clientes', color: 'blue' },
      { icon: FileText, title: 'Processos em Andamento', value: dashboardData.processesCount.toString(), subtitle: 'Processos ativos', color: 'green' },
      { icon: Ticket, title: 'Tickets Abertos', value: dashboardData.ticketsCount.toString(), subtitle: 'Aguardando atendimento', color: 'yellow' },
      { icon: DollarSign, title: 'Receita do Mês', value: `R$ ${dashboardData.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, subtitle: 'Faturamento atual', color: 'purple' },
      { icon: AlertCircle, title: 'Prazos Críticos', value: dashboardData.upcomingDeadlines.toString(), subtitle: 'Próximos 7 dias', color: 'red' },
      { icon: TrendingUp, title: 'Orçamentos Pendentes', value: dashboardData.quotesCount.toString(), subtitle: 'Aguardando aprovação', color: 'blue' }
    ];
  }, [dashboardData]);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Welcome */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Bem-vindo ao sistema Contaux</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Alerts Center */}
           {tenantId && (
             <div>
               <h2 className="text-lg font-semibold mb-3 text-slate-900">Alertas</h2>
               <AlertsCenter tenantId={tenantId} />
             </div>
           )}

          {/* Quick Actions */}
           <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white rounded-lg shadow p-6">
               <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  + Novo Cliente
                </button>
                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  + Novo Processo
                </button>
                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  + Novo Ticket
                </button>
                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  + Nova Fatura
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
              <div className="text-center text-slate-500 py-8">
                <p className="text-sm">Nenhuma atividade recente</p>
              </div>
            </div>
          </div>

          {/* Quick Stats - Período */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Comparativo Período</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded">
                <p className="text-sm text-slate-600">Receita Atual</p>
                <p className="text-xl font-bold text-blue-600">+12%</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <p className="text-sm text-slate-600">Pagamentos</p>
                <p className="text-xl font-bold text-green-600">+8%</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded">
                <p className="text-sm text-slate-600">Tickets</p>
                <p className="text-xl font-bold text-yellow-600">-5%</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <p className="text-sm text-slate-600">Clientes Novos</p>
                <p className="text-xl font-bold text-purple-600">+3</p>
              </div>
            </div>
          </div>

          {/* Link to Analytics */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Análise Detalhada</h3>
            <p className="text-blue-100 mb-4">Veja relatórios completos, gráficos e métricas de evolução</p>
            <a href="/AnalyticsDashboard" className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Acessar Analytics
            </a>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}