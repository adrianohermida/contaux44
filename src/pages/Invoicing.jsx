import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import InvoiceForm from '../components/dashboard/InvoiceForm';
import InvoiceList from '../components/dashboard/InvoiceList';
import { Button } from '@/components/ui/button';

export default function Invoicing() {
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [tenantId, setTenantId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const getCurrentTenant = async () => {
      try {
        const user = await base44.auth.me();
        setTenantId(user.email.split('@')[0]);
      } catch (error) {
        console.error('Erro ao obter tenant:', error);
      }
    };
    getCurrentTenant();
  }, []);

  const handleSave = () => {
    setShowForm(false);
    setEditingInvoice(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
  };

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Faturamento</h1>
              <p className="text-slate-600 mt-1">Gerenciar faturas e faturamento</p>
            </div>
            <Button 
              onClick={() => { setEditingInvoice(null); setShowForm(true); }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Fatura
            </Button>
          </div>

          {showForm && (
            <InvoiceForm
              invoice={editingInvoice}
              tenantId={tenantId}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingInvoice(null); }}
            />
          )}

          <InvoiceList
            tenantId={tenantId}
            onEdit={handleEdit}
            onRefresh={refreshKey}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}