import React, { useState } from 'react';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';
import TaxInvoicesTable from '../components/dashboard/TaxInvoicesTable';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TaxInvoices() {
  const { workspaceId, loading } = useGlobalAuth('internal');
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  const handleCreateNFe = () => {
    // TODO: Abrir modal para criar nova NFe
    alert('Modal para criar nova NFe - em desenvolvimento');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Notas Fiscais Eletrônicas</h1>
          <p className="text-slate-600 mt-1">Gerenciar NFes e integração com Sefaz</p>
        </div>
        <Button onClick={handleCreateNFe} className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="w-5 h-5" />
          Nova NFe
        </Button>
      </div>

      <TaxInvoicesTable
        tenantId={workspaceId}
        onEdit={() => {}}
        onRefresh={refreshKey}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
      />
    </div>
  );
}