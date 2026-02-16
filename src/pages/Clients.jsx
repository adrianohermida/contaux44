import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import ClientForm from '../components/dashboard/ClientForm';
import ClientList from '../components/dashboard/ClientList';
import { Button } from '@/components/ui/button';
import { useMultitenantAuth } from '../components/auth/useMultitenantAuth';

export default function Clients() {
  const { workspaceId, loading } = useMultitenantAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = useCallback(() => {
    setShowForm(false);
    setEditingClient(null);
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleEdit = useCallback((client) => {
    setEditingClient(client);
    setShowForm(true);
  }, []);

  const handleNewClient = useCallback(() => {
    setEditingClient(null);
    setShowForm(true);
  }, []);

  const handleCancel = useCallback(() => {
    setShowForm(false);
    setEditingClient(null);
  }, []);

  return (
    <ProtectedInternalRoute>
      <div className="space-y-6">
           <div className="flex justify-between items-center">
             <div>
               <h1 className="text-3xl font-bold text-slate-900">CRM - Clientes</h1>
               <p className="text-slate-600 mt-1">Gerenciar clientes e contatos</p>
             </div>
             <Button 
               onClick={handleNewClient}
               className="bg-blue-600 hover:bg-blue-700"
             >
               <Plus className="w-5 h-5 mr-2" />
               Novo Cliente
             </Button>
           </div>

           {showForm && (
             <ClientForm
               client={editingClient}
               tenantId={workspaceId}
               onSave={handleSave}
               onCancel={handleCancel}
             />
           )}

           <ClientList
             tenantId={workspaceId}
             onEdit={handleEdit}
             onRefresh={refreshKey}
           />
        </div>
        </ProtectedInternalRoute>
        );
        }