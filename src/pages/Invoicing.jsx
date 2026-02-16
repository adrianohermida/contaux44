import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import InvoiceForm from '../components/dashboard/InvoiceForm';
import InvoiceList from '../components/dashboard/InvoiceList';
import { Button } from '@/components/ui/button';
import { useMultitenantAuth } from '../components/auth/useMultitenantAuth';

export default function Invoicing() {
  const { workspaceId } = useMultitenantAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

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