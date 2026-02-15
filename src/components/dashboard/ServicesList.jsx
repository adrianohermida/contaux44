import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Edit, Trash2, Loader2 } from 'lucide-react';
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
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadServices = useCallback(async () => {
    try {
      const data = await base44.entities.Service.filter({ tenant_id: tenantId });
      setServices(data);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadServices();
  }, [loadServices, onRefresh]);

  const handleDelete = useCallback(async (id) => {
    if (confirm('Tem certeza que deseja deletar este serviço?')) {
      await base44.entities.Service.delete(id);
      setServices(prev => prev.filter(s => s.id !== id));
    }
  }, []);

  if (loading) return <div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>;

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