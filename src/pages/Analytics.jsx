import React from 'react';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';

export default function Analytics() {
  const { tenantId } = useUserAndTenant();

  return (
    <ProtectedInternalRoute>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Análise Avançada</h1>
            <p className="text-slate-600 mt-1">Relatórios e métricas de desempenho multitenant</p>
          </div>
          
          {tenantId && <AnalyticsDashboard tenantId={tenantId} />}
          </div>
          </ProtectedInternalRoute>
          );
          }