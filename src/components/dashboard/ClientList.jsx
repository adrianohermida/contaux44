import React, { useCallback, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { base44 } from '@/api/base44Client';
import { Trash2, Edit2 } from 'lucide-react';
import { useMultitenantAuthOptimized } from '../auth/useMultitenantAuthOptimized';
import { useCacheStrategy } from '../hooks/useCacheStrategy';
import ClientCardMobile from './ClientCardMobile';

export default function ClientList({ refresh, onEdit }) {
  const { workspaceId } = useMultitenantAuthOptimized('internal');
  const { invalidateRelated } = useCacheStrategy();
  const parentRef = useRef(null);

  const { data: clients = [], isLoading, refetch } = useQuery({
    queryKey: ['clients', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      return base44.entities.Client.filter({ 
        tenant_id: workspaceId,
        status: 'active'
      });
    },
    enabled: !!workspaceId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  // Virtualização - renderiza apenas itens visíveis
  const virtualizer = useVirtualizer({
    count: clients.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  React.useEffect(() => {
    if (refresh) refetch();
  }, [refresh, refetch]);

  const handleDelete = useCallback(async (clientId) => {
    if (!window.confirm('Tem certeza que deseja deletar este cliente?')) return;
    
    try {
      await base44.entities.Client.delete(clientId);
      invalidateRelated('Client', clientId);
      refetch();
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  }, [invalidateRelated, refetch]);

  if (isLoading) {
    return <div className="text-center py-8 text-slate-500">Carregando clientes...</div>;
  }

  return (
    <div>
      {/* Desktop: Table */}
      <div className="hidden md:block bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Tipo</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Empresa/Nome</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">Telefone</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-slate-900 dark:text-white">Ações</th>
              </tr>
            </thead>
            <tbody 
              ref={parentRef}
              className="relative"
              style={{ height: `${virtualizer.getTotalSize()}px` }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const client = clients[virtualRow.index];
                return (
                  <tr 
                    key={client.id} 
                    className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 absolute top-0 left-0 w-full transition-colors"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        client.client_type === 'pf' 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                          : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      }`}>
                        {client.client_type === 'pf' ? 'PF' : 'PJ'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{client.company_name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{client.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{client.phone}</td>
                    <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                      <button onClick={() => onEdit(client)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button onClick={() => handleDelete(client.id)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: Cards */}
      <div className="md:hidden space-y-3">
        {clients.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            Nenhum cliente cadastrado
          </div>
        ) : (
          clients.map((client) => (
            <ClientCardMobile 
              key={client.id}
              client={client}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}