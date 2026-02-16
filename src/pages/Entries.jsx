import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import JournalEntryForm from '../components/dashboard/JournalEntryForm';
import JournalEntryList from '../components/dashboard/JournalEntryList';
import { Button } from '@/components/ui/button';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';

export default function Entries() {
  const { tenantId } = useUserAndTenant();
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = () => {
    setShowForm(false);
    setEditingEntry(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Lançamentos Contábeis</h1>
          <p className="text-slate-600 mt-1">Gerenciar entradas de diário</p>
        </div>
        <Button 
          onClick={() => { setEditingEntry(null); setShowForm(true); }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Lançamento
        </Button>
      </div>

      {showForm && (
        <JournalEntryForm
          entry={editingEntry}
          tenantId={tenantId}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingEntry(null); }}
        />
      )}

      <JournalEntryList
        tenantId={tenantId}
        onEdit={handleEdit}
        onRefresh={refreshKey}
      />
    </div>
  );
}