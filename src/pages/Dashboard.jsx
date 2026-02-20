import React, { useMemo, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Ticket, FileText, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import StatCard from '../components/dashboard/StatCard';
import StatCardSkeleton from '../components/dashboard/StatCardSkeleton';
import AlertsCenter from '../components/dashboard/AlertsCenter';
import AlertsLoader from '../components/dashboard/AlertsLoader';
import VirtualCounterWidget from '../components/dashboard/widgets/VirtualCounterWidget';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';

const Dashboard = memo(function Dashboard() {
  const { workspaceId } = useMultitenantAuthOptimized('internal');

  // Query crítica (dados principais) - FASE 1
  const { data: criticalData } = useQuery({
    queryKey: ['dashboard-critical', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return null;
      
      const [clients, tickets] = await Promise.all([
        base44.entities.Client.filter({ workspace_id: workspaceId, status: 'active' }),
        base44.entities.Ticket.filter({ workspace_id: workspaceId, status: 'open' })
      ]);

      return {
        clientsCount: clients.length,
        ticketsCount: tickets.length,
      };
    },
    enabled: !!workspaceId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  // Query secundária (carrega depois) - FASE 2
  const { data: secondaryData } = useQuery({
    queryKey: ['dashboard-secondary', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return null;
      
      const [processes, invoices, quotes] = await Promise.all([
        base44.entities.LegalProcess.filter({ workspace_id: workspaceId, status: 'in_progress' }),
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

      return {
        processesCount: processes.length,
        monthlyRevenue,
        upcomingDeadlines,
        quotesCount: quotes.length
      };
    },
    enabled: !!workspaceId && !!criticalData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  // Combinar dados
  const dashboardData = useMemo(() => {
    if (!criticalData) return null;
    return {
      ...criticalData,
      ...(secondaryData || {
        processesCount: 0,
        monthlyRevenue: 0,
        upcomingDeadlines: 0,
        quotesCount: 0
      })
    };
  }, [criticalData, secondaryData]);

  const stats = useMemo(() => {
    if (!dashboardData) {
      return [
        { icon: Users, title: 'Clientes Ativos', value: '0', subtitle: 'Total de clientes', color: 'blue' },
        { icon: FileText, title: 'Processos em Andamento', value: '0', subtitle: 'Processos ativos', color: 'green' },
        { icon: Ticket, title: 'Tickets Abertos', value: '0', subtitle: 'Aguardando atendimento', color: 'yellow' },
        { icon: DollarSign, title: 'Receita do Mês', value: 'R$ 0,00', subtitle: 'Faturamento atual', color: 'blue' },
        { icon: AlertCircle, title: 'Prazos Críticos', value: '0', subtitle: 'Próximos 7 dias', color: 'yellow' },
        { icon: TrendingUp, title: 'Orçamentos Pendentes', value: '0', subtitle: 'Aguardando aprovação', color: 'blue' }
      ];
    }

    return [
      { icon: Users, title: 'Clientes Ativos', value: dashboardData.clientsCount.toString(), subtitle: 'Total de clientes', color: 'blue' },
      { icon: FileText, title: 'Processos em Andamento', value: dashboardData.processesCount.toString(), subtitle: 'Processos ativos', color: 'green' },
      { icon: Ticket, title: 'Tickets Abertos', value: dashboardData.ticketsCount.toString(), subtitle: 'Aguardando atendimento', color: 'yellow' },
      { icon: DollarSign, title: 'Receita do Mês', value: `R$ ${dashboardData.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, subtitle: 'Faturamento atual', color: 'blue' },
      { icon: AlertCircle, title: 'Prazos Críticos', value: dashboardData.upcomingDeadlines.toString(), subtitle: 'Próximos 7 dias', color: 'yellow' },
      { icon: TrendingUp, title: 'Orçamentos Pendentes', value: dashboardData.quotesCount.toString(), subtitle: 'Aguardando aprovação', color: 'blue' }
    ];
  }, [dashboardData]);

  const { isLoading: alertsLoading } = useQuery({
    queryKey: ['alerts-check', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return null;
      return base44.entities.Invoice.filter({ tenant_id: workspaceId });
    },
    enabled: !!workspaceId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  return (
    <div className="space-y-4 md:space-y-6 w-full">
      {/* Welcome Section */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1">
          Bem-vindo ao sistema Contaux
        </p>
      </div>

      {/* Stats Grid - Mobile First */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {dashboardData ? stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        )) : [1,2,3,4,5,6].map(i => <StatCardSkeleton key={i} />)}
      </div>

      {/* Alerts Center */}
      {workspaceId && (
        <div className="w-full">
          <h2 className="text-base md:text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
            Alertas
          </h2>
          {alertsLoading ? <AlertsLoader /> : <AlertsCenter tenantId={workspaceId} />}
        </div>
      )}

      {/* Balcão Virtual Widget */}
      <VirtualCounterWidget />

      {/* Quick Actions & Recent Activity - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 md:p-6 transition-colors">
          <h3 className="text-base md:text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
            Ações Rápidas
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 text-sm md:text-base bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-900 dark:text-slate-100 rounded-lg transition-colors duration-150 font-medium">
              + Novo Cliente
            </button>
            <button className="w-full text-left px-4 py-3 text-sm md:text-base bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-900 dark:text-slate-100 rounded-lg transition-colors duration-150 font-medium">
              + Novo Processo
            </button>
            <button className="w-full text-left px-4 py-3 text-sm md:text-base bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-900 dark:text-slate-100 rounded-lg transition-colors duration-150 font-medium">
              + Novo Ticket
            </button>
            <button className="w-full text-left px-4 py-3 text-sm md:text-base bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-900 dark:text-slate-100 rounded-lg transition-colors duration-150 font-medium">
              + Nova Fatura
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 md:p-6 transition-colors">
          <h3 className="text-base md:text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
            Atividades Recentes
          </h3>
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            <p className="text-sm">Nenhuma atividade recente</p>
          </div>
        </div>
      </div>

      {/* Comparativo Período - Mobile Optimized */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 md:p-6 transition-colors">
        <h3 className="text-base md:text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
          Comparativo Período
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="text-center p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors">
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-1">Receita Atual</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">+12%</p>
          </div>
          <div className="text-center p-3 md:p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg transition-colors">
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-1">Pagamentos</p>
            <p className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">+8%</p>
          </div>
          <div className="text-center p-3 md:p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg transition-colors">
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-1">Tickets</p>
            <p className="text-xl md:text-2xl font-bold text-yellow-600 dark:text-yellow-400">-5%</p>
          </div>
          <div className="text-center p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors">
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-1">Clientes Novos</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">+3</p>
          </div>
        </div>
      </div>

      {/* Call to Action - Reports */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg shadow p-4 md:p-6 text-white transition-colors">
        <h3 className="text-base md:text-lg font-semibold mb-2">Análise Detalhada</h3>
        <p className="text-sm md:text-base text-blue-100 mb-4">
          Veja relatórios completos, gráficos e métricas de evolução
        </p>
        <a 
          href="/reports" 
          className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm md:text-base hover:bg-blue-50 transition-colors shadow-sm"
        >
          Acessar Relatórios
        </a>
      </div>
    </div>
  );
});

          export default Dashboard;