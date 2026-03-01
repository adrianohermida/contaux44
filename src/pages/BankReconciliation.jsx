import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import BankReconciliationForm from '../components/dashboard/BankReconciliationForm';
import BankReconciliationList from '../components/dashboard/BankReconciliationList';
import { Button } from '@/components/ui/button';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';

export default function BankReconciliation() {
  const { workspaceId, loading } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingRecon, setEditingRecon] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  const handleSave = () => {
    setShowForm(false);
    setEditingRecon(null);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Conciliação Bancária</h1>
              <p className="text-slate-600 mt-1">Reconciliar transações bancárias</p>
            </div>
            <Button 
              onClick={() => { setEditingRecon(null); setShowForm(true); }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Conciliação
            </Button>
          </div>

          {showForm && (
            <BankReconciliationForm
              recon={editingRecon}
              tenantId={workspaceId}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingRecon(null); }}
            />
          )}

          <BankReconciliationList
            tenantId={workspaceId}
            onEdit={(recon) => { setEditingRecon(recon); setShowForm(true); }}
            onRefresh={refreshKey}
          />
        </div>
        );
        }