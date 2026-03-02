import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import TicketForm from '../components/dashboard/TicketForm';
import TicketList from '../components/dashboard/TicketList';
import { Button } from '@/components/ui/button';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';

export default function Tickets() {
  const { workspaceId, loading } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
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
    setEditingTicket(null);
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleEdit = useCallback((ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  }, []);

  const handleNewTicket = useCallback(() => {
    setEditingTicket(null);
    setShowForm(true);
  }, []);

  const handleCancel = useCallback(() => {
    setShowForm(false);
    setEditingTicket(null);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Helpdesk - Tickets</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gerenciar solicitações de suporte</p>
        </div>
        <Button
          onClick={handleNewTicket}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          aria-label="Criar novo ticket"
        >
          <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
          Novo Ticket
        </Button>
      </div>

      {showForm && (
        <TicketForm
          ticket={editingTicket}
          tenantId={workspaceId}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <TicketList
        tenantId={workspaceId}
        onEdit={handleEdit}
        onRefresh={refreshKey}
      />
    </div>
  );
}