import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Plus } from 'lucide-react';

export default function ClientList({ tenantId, onEdit, onRefresh }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, [tenantId, onRefresh]);

  const loadClients = async () => {
    try {
      const data = await base44.entities.Client.filter({ tenant_id: tenantId });
      setClients(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      await base44.entities.Client.delete(id);
      loadClients();
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Empresa</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Telefone</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm font-medium text-slate-900">{client.company_name}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{client.email}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{client.phone || '-'}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                }`}>
                  {client.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(client)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(client.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {clients.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          Nenhum cliente cadastrado
        </div>
      )}
    </div>
  );
}