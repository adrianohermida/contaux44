import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Edit, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const ServiceRow = React.memo(({ service, onEdit, onDelete }) => (
  <tr className="border-b hover:bg-slate-50">
    <td className="py-3 px-4 font-medium">{service.service_name}</td>
    <td className="py-3 px-4">{service.category}</td>
    <td className="py-3 px-4">R$ {service.hourly_rate.toFixed(2)}</td>
    <td className="py-3 px-4">
      <span className={`px-2 py-1 rounded text-xs ${service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {service.status === 'active' ? 'Ativo' : 'Inativo'}
      </span>
    </td>
    <td className="py-3 px-4 flex gap-2">
      <Button size="icon" variant="ghost" onClick={() => onEdit(service)}><Edit className="w-4 h-4" /></Button>
      <Button size="icon" variant="ghost" onClick={() => onDelete(service.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
    </td>
  </tr>
));

ServiceRow.displayName = 'ServiceRow';

export default function ServicesList({ tenantId, onEdit, onRefresh }) {
  const { data: services = [], isLoading: loading, refetch, error } = useQuery({
    queryKey: ['services', tenantId, onRefresh],
    queryFn: async () => {
      if (!tenantId) return [];
      return base44.entities.Service.filter({ tenant_id: tenantId });
    },
    enabled: !!tenantId,
    staleTime: 3 * 60 * 1000,
    retry: 2,
    retryDelay: 1000
  });

  const handleDelete = useCallback(async (id) => {
    if (!confirm('Tem certeza? Esta ação não pode ser desfeita. O serviço será deletado permanentemente.')) return;
    try {
      await base44.entities.Service.delete(id);
      toast.success('Serviço deletado com sucesso');
      refetch();
    } catch (err) {
      console.error('Erro ao deletar:', err);
      toast.error('Erro ao deletar serviço. Tente novamente.');
    }
  }, [refetch]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-600 mb-4">Erro ao carregar serviços</p>
        <button onClick={() => refetch()} className="text-red-500 hover:text-red-700 underline">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (loading) return <div className="text-center py-8 text-slate-500">Carregando serviços...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="text-left py-3 px-4">Serviço</th>
            <th className="text-left py-3 px-4">Categoria</th>
            <th className="text-left py-3 px-4">Taxa Horária</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr><td colSpan="5" className="text-center py-8 text-slate-500">Nenhum serviço cadastrado</td></tr>
          ) : (
            services.map(service => (
              <ServiceRow key={service.id} service={service} onEdit={onEdit} onDelete={handleDelete} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}