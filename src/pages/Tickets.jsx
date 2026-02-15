import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import TicketForm from '../components/dashboard/TicketForm';
import TicketList from '../components/dashboard/TicketList';
import { Button } from '@/components/ui/button';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';

export default function Tickets() {
  const { tenantId } = useUserAndTenant();
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = () => {
    setShowForm(false);
    setEditingTicket(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
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
              <h1 className="text-3xl font-bold text-slate-900">Helpdesk - Tickets</h1>
              <p className="text-slate-600 mt-1">Gerenciar solicitações de suporte</p>
            </div>
            <Button 
              onClick={() => { setEditingTicket(null); setShowForm(true); }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Ticket
            </Button>
          </div>

          {showForm && (
            <TicketForm
              ticket={editingTicket}
              tenantId={tenantId}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingTicket(null); }}
            />
          )}

          <TicketList
            tenantId={tenantId}
            onEdit={handleEdit}
            onRefresh={refreshKey}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}