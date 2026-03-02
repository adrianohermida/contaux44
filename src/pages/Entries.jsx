import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import JournalEntryForm from '../components/dashboard/JournalEntryForm';
import JournalEntryList from '../components/dashboard/JournalEntryList';
import { Button } from '@/components/ui/button';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';

export default function Entries() {
  const { workspaceId, loading } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-white dark:bg-slate-900">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setShowForm(false);
    setEditingEntry(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900 pb-20 transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Lançamentos Contábeis</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gerenciar entradas de diário</p>
        </div>
        <Button 
          onClick={() => { setEditingEntry(null); setShowForm(true); }}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 gap-2"
          aria-label="Criar novo lançamento"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline">Novo Lançamento</span>
          <span className="sm:hidden">Novo</span>
        </Button>
      </div>

      {showForm && (
        <JournalEntryForm
          entry={editingEntry}
          tenantId={workspaceId}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingEntry(null); }}
        />
      )}

      <JournalEntryList
        tenantId={workspaceId}
        onEdit={handleEdit}
        onRefresh={refreshKey}
      />
    </div>
  );
}