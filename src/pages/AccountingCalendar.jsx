import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AccountingCalendarList from '../components/dashboard/AccountingCalendarList';
import AccountingCalendarForm from '../components/dashboard/AccountingCalendarForm';
import { Button } from '@/components/ui/button';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';

export default function AccountingCalendar() {
  const { workspaceId, loading } = useMultitenantAuthOptimized('internal');
  const [editingEvent, setEditingEvent] = useState(null);
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
    setEditingEvent(null);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Calendário Contábil</h1>
          <p className="text-slate-600 mt-1">Prazos e eventos contábeis</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Novo Evento
        </Button>
      </div>

      {showForm && (
        <AccountingCalendarForm
          event={editingEvent}
          tenantId={workspaceId}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingEvent(null); }}
        />
      )}

      <AccountingCalendarList
        tenantId={workspaceId}
        onEdit={(event) => { setEditingEvent(event); setShowForm(true); }}
        onRefresh={refreshKey}
      />
    </div>
  );
}