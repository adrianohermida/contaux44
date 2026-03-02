/**
 * Sales Page
 * Main interface for managing sales opportunities and pipeline
 */

import React, { useState } from 'react';
import { useGlobalAuth } from '@/components/auth/useGlobalAuth';
import SalesOpportunityForm from '@/components/dashboard/SalesOpportunityForm';
import SalesOpportunityList from '@/components/dashboard/SalesOpportunityList';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp } from 'lucide-react';

export default function SalesPage() {
  const { user, loading } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-600 dark:text-slate-400">
        Carregando...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center text-red-600 dark:text-red-400">
        Acesso restrito a usuários internos
      </div>
    );
  }

  const handleSave = () => {
    setShowForm(false);
    setEditingOpportunity(null);
    setRefreshKey(k => k + 1);
  };

  const handleEdit = (opportunity) => {
    setEditingOpportunity(opportunity);
    setShowForm(true);
  };

  return (
    <div className="space-y-6 dark:bg-slate-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            Pipeline de Vendas
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Gerenciar oportunidades e rastrear vendas</p>
        </div>
        <Button
          onClick={() => {
            setEditingOpportunity(null);
            setShowForm(true);
          }}
          className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <Plus className="w-5 h-5" />
          Nova Oportunidade
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <SalesOpportunityForm
          opportunity={editingOpportunity}
          workspaceId={user.workspace_id}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingOpportunity(null);
          }}
          isOpen={showForm}
        />
      )}

      {/* List */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <SalesOpportunityList
          key={refreshKey}
          workspaceId={user.workspace_id}
          onEdit={handleEdit}
          onRefresh={() => setRefreshKey(k => k + 1)}
        />
      </div>
    </div>
  );
}