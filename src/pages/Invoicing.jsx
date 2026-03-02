import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import InvoiceForm from '../components/dashboard/InvoiceForm';
import InvoiceList from '../components/dashboard/InvoiceList';
import { Button } from '@/components/ui/button';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';

export default function Invoicing() {
  const { workspaceId, loading } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  const handleSave = useCallback(() => {
    setShowForm(false);
    setEditingInvoice(null);
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleEdit = useCallback((invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Faturamento</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gerenciar faturas e faturamento</p>
        </div>
        <Button
          onClick={() => { setEditingInvoice(null); setShowForm(true); }}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          aria-label="Criar nova fatura"
        >
          <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
          Nova Fatura
        </Button>
      </div>

      {showForm && (
        <InvoiceForm
          invoice={editingInvoice}
          tenantId={workspaceId}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingInvoice(null); }}
        />
      )}

      <InvoiceList
        tenantId={workspaceId}
        onEdit={handleEdit}
        onRefresh={refreshKey}
      />
    </div>
  );
}