import React from 'react';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';
import DashboardStatsRow from '../components/dashboard/DashboardStatsRow';
import DashboardActivityRow from '../components/dashboard/DashboardActivityRow';
import DashboardSalesRow from '../components/dashboard/DashboardSalesRow';
import DashboardInsightsRow from '../components/dashboard/DashboardInsightsRow';
import DashboardCampaignRow from '../components/dashboard/DashboardCampaignRow';

export default function Dashboard() {
  const { workspaceId, loading } = useGlobalAuth('internal');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Visão geral do seu workspace</p>
      </div>

      <DashboardStatsRow workspaceId={workspaceId} />
      <DashboardActivityRow workspaceId={workspaceId} />
      <DashboardSalesRow workspaceId={workspaceId} />
      <DashboardInsightsRow workspaceId={workspaceId} />
      <DashboardCampaignRow workspaceId={workspaceId} />
    </div>
  );
}