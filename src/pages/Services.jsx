import React, { useState } from 'react';
import ServicesForm from '../components/dashboard/ServicesForm';
import ServicesList from '../components/dashboard/ServicesList';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';

export default function Services() {
  const { tenantId } = useUserAndTenant();
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = () => {
    setShowForm(false);
    setEditingService(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  if (!tenantId) return <div className="text-center py-8">Carregando...</div>;

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
          tenantId={tenantId}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingService(null); }}
        />
      )}

      <ServicesList
        tenantId={tenantId}
        onEdit={handleEdit}
        onRefresh={refreshKey}
      />
    </div>
  );
}