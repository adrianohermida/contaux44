import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ChartOfAccountsForm from '../components/dashboard/ChartOfAccountsForm';
import ChartOfAccountsList from '../components/dashboard/ChartOfAccountsList';
import { Button } from '@/components/ui/button';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';

export default function ChartOfAccounts() {
  const { workspaceId, loading } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
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
    setEditingAccount(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Plano de Contas</h1>
          <p className="text-slate-600 mt-1">Gerenciar contas contábeis</p>
        </div>
        <Button 
          onClick={() => { setEditingAccount(null); setShowForm(true); }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Conta
        </Button>
      </div>

      {showForm && (
         <ChartOfAccountsForm
           account={editingAccount}
           tenantId={workspaceId}
           onSave={handleSave}
           onCancel={() => { setShowForm(false); setEditingAccount(null); }}
         />
       )}

       <ChartOfAccountsList
         tenantId={workspaceId}
         onEdit={handleEdit}
         onRefresh={refreshKey}
       />
    </div>
  );
}