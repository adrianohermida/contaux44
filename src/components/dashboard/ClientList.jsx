import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, Search } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

export default function ClientList({ tenantId, onEdit, onRefresh }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const loadClients = useCallback(async () => {
    try {
      const data = await base44.entities.Client.filter({ tenant_id: tenantId });
      setClients(data);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadClients();
  }, [loadClients, onRefresh]);

  const handleDelete = useCallback(async (id) => {
    if (confirm('Tem certeza que deseja deletar este cliente?')) {
      await base44.entities.Client.delete(id);
      loadClients();
    }
  }, [loadClients]);

  const filteredClients = useMemo(() => {
    if (!debouncedSearch) return clients;
    
    const search = debouncedSearch.toLowerCase();
    return clients.filter(client => 
      client.company_name?.toLowerCase().includes(search) ||
      client.email?.toLowerCase().includes(search) ||
      client.phone?.toLowerCase().includes(search)
    );
  }, [clients, debouncedSearch]);

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Buscar por empresa, email ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

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
            {filteredClients.map((client) => (
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
            {filteredClients.length === 0 && clients.length > 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-slate-500">
                  Nenhum cliente encontrado
                </td>
              </tr>
            )}
            {clients.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-slate-500">
                  Nenhum cliente cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}