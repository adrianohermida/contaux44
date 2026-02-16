import React, { useState, useEffect, useMemo } from 'react';
import { Users, Ticket, FileText, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import StatCard from '../components/dashboard/StatCard';
import AlertsCenter from '../components/dashboard/AlertsCenter';
import { useMultitenantAuth } from '../components/auth/useMultitenantAuth';

export default function Dashboard() {
  const { workspaceId, loading } = useMultitenantAuth('internal');
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!workspaceId) return;
      
      try {
        const [clients, processes, tickets, invoices, quotes] = await Promise.all([
          base44.entities.Client.filter({ workspace_id: workspaceId, status: 'active' }),
          base44.entities.LegalProcess.filter({ workspace_id: workspaceId, status: 'in_progress' }),
          base44.entities.Ticket.filter({ workspace_id: workspaceId, status: 'open' }),
          base44.entities.Invoice.filter({ workspace_id: workspaceId }),
          base44.entities.Quote.filter({ workspace_id: workspaceId, status: 'draft' })
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
  }, [workspaceId]);

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
    <ProtectedInternalRoute>
      <div className="space-y-4 sm:space-y-6">
           {/* Welcome */}
           <div>
             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
             <p className="text-sm sm:text-base text-slate-600 mt-1">Bem-vindo ao sistema Contaux</p>
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
             {stats.map((stat, index) => (
               <StatCard key={index} {...stat} />
             ))}
           </div>

           {/* Alerts Center */}
            {workspaceId && (
              <div>
                <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-slate-900">Alertas</h2>
                <AlertsCenter tenantId={workspaceId} />
              </div>
            )}

          {/* Quick Actions */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
             <div className="bg-white rounded-lg shadow p-4 sm:p-6">
               <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150">
                  + Novo Cliente
                </button>
                <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150">
                  + Novo Processo
                </button>
                <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150">
                  + Novo Ticket
                </button>
                <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150">
                  + Nova Fatura
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Atividades Recentes</h3>
              <div className="text-center text-slate-500 py-6 sm:py-8">
                <p className="text-xs sm:text-sm">Nenhuma atividade recente</p>
              </div>
            </div>
          </div>

          {/* Quick Stats - Período */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Comparativo Período</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              <div className="text-center p-2 sm:p-3 bg-blue-50 rounded">
                <p className="text-xs sm:text-sm text-slate-600">Receita Atual</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600 mt-1">+12%</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-green-50 rounded">
                <p className="text-xs sm:text-sm text-slate-600">Pagamentos</p>
                <p className="text-lg sm:text-xl font-bold text-green-600 mt-1">+8%</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-yellow-50 rounded">
                <p className="text-xs sm:text-sm text-slate-600">Tickets</p>
                <p className="text-lg sm:text-xl font-bold text-yellow-600 mt-1">-5%</p>
              </div>
              <div className="text-center p-2 sm:p-3 bg-purple-50 rounded">
                <p className="text-xs sm:text-sm text-slate-600">Clientes Novos</p>
                <p className="text-lg sm:text-xl font-bold text-purple-600 mt-1">+3</p>
              </div>
            </div>
          </div>

          {/* Link to Analytics */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow p-4 sm:p-6 text-white">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Análise Detalhada</h3>
            <p className="text-xs sm:text-sm text-blue-100 mb-3 sm:mb-4">Veja relatórios completos, gráficos e métricas de evolução</p>
            <a href="/AnalyticsDashboard" className="inline-block bg-white text-blue-600 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base hover:bg-blue-50 transition-colors">
              Acessar Analytics
            </a>
          </div>
        </div>
    </ProtectedInternalRoute>
  );
}