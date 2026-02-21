import React, { useState } from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import AutomationsList from '../components/dashboard/AutomationsList';
import AutomationsForm from '../components/dashboard/AutomationsForm';
import { Button } from '@/components/ui/button';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';

export default function Automations() {
  const { workspaceId, loading } = useMultitenantAuthOptimized('internal');
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  const handleSave = () => {
    setShowForm(false);
    setEditingWorkflow(null);
    setRefreshKey(prev => prev + 1);
    toast.success('Automação salva com sucesso');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Automações</h1>
          <p className="text-slate-600 mt-1">Gerenciar fluxos automáticos</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Nova Automação
        </Button>
      </div>

      {showForm && (
        <AutomationsForm
          workflow={editingWorkflow}
          tenantId={workspaceId}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingWorkflow(null); }}
        />
      )}

      <AutomationsList
        tenantId={workspaceId}
        onEdit={(workflow) => { setEditingWorkflow(workflow); setShowForm(true); }}
        onRefresh={refreshKey}
      />
    </div>
  );
}