import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';

export default function Analytics() {
  const { tenantId } = useUserAndTenant();

  if (!tenantId) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="text-center py-8">Carregando...</div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Análise Avançada</h1>
            <p className="text-slate-600 mt-1">Relatórios e métricas de desempenho multitenant</p>
          </div>
          
          <AnalyticsDashboard tenantId={tenantId} />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}