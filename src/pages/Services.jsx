import React, { useState } from 'react';
import ServicesForm from '../components/dashboard/ServicesForm';
import ServicesList from '../components/dashboard/ServicesList';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';

export default function Services() {
  const { workspaceId, loading } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
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
    setEditingService(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Prestação de Serviços</h1>
          <p className="text-slate-600 mt-1">Gerenciar serviços prestados</p>
        </div>
        <Button 
          onClick={() => { setEditingService(null); setShowForm(true); }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Serviço
        </Button>
      </div>

      {showForm && (
         <ServicesForm
           service={editingService}
           tenantId={workspaceId}
           onSave={handleSave}
           onCancel={() => { setShowForm(false); setEditingService(null); }}
         />
       )}

       <ServicesList
         tenantId={workspaceId}
         onEdit={handleEdit}
         onRefresh={refreshKey}
       />
    </div>
  );
}