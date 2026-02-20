import React, { useCallback, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { base44 } from '@/api/base44Client';
import { Trash2, Edit2, Eye } from 'lucide-react';
import { useMultitenantAuthOptimized } from '../auth/useMultitenantAuthOptimized';
import { useCacheStrategy } from '../hooks/useCacheStrategy';

export default function ClientList({ refresh, onEdit }) {
  const { workspaceId } = useMultitenantAuthOptimized('internal');
  const { invalidateRelated } = useCacheStrategy();
  const parentRef = useRef(null);

  const { data: clients = [], isLoading, refetch } = useQuery({
    queryKey: ['clients', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      return base44.entities.Client.filter({ 
        workspace_id: workspaceId,
        status: 'active'
      });
    },
    enabled: !!workspaceId,
    staleTime: 10 * 60 * 1000, // ✅ 10 min - dados mudam pouco
  });

  // Virtualização - renderiza apenas itens visíveis
  const virtualizer = useVirtualizer({
    count: clients.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // altura estimada de cada linha
    overscan: 5, // renderizar 5 itens extras acima/abaixo
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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Empresa</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Email</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Telefone</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-slate-900">Ações</th>
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
                className="border-b hover:bg-slate-50 absolute top-0 left-0 w-full"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <td className="px-6 py-4 text-sm text-slate-900">{client.company_name}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{client.email}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{client.phone}</td>
                <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                  <button onClick={() => onEdit(client)} className="p-1 hover:bg-slate-200 rounded">
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(client.id)} className="p-1 hover:bg-slate-200 rounded">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}