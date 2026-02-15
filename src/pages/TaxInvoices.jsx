import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import TaxInvoicesTable from '../components/dashboard/TaxInvoicesTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';

export default function TaxInvoices() {
  const { tenantId } = useUserAndTenant();
  const [refreshKey, setRefreshKey] = useState(0);

  if (!tenantId) return <ProtectedRoute><DashboardLayout><div className="text-center py-8">Carregando...</div></DashboardLayout></ProtectedRoute>;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Notas Fiscais</h1>
              <p className="text-slate-600 mt-1">Gerenciar notas fiscais eletrônicas</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Nova NFe
            </Button>
          </div>

          <TaxInvoicesTable
            tenantId={tenantId}
            onEdit={() => {}}
            onRefresh={refreshKey}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}