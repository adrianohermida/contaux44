import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useCacheStrategy } from '../hooks/useCacheStrategy';
import { useRealtimeSync } from '../hooks/useRealtimeSync';

const TicketRow = React.memo(({ ticket, onEdit, onDelete, getStatusColor }) => (
  <tr className="hover:bg-slate-50">
    <td className="px-6 py-4 text-sm font-medium">{ticket.ticket_number}</td>
    <td className="px-6 py-4 text-sm">{ticket.title}</td>
    <td className="px-6 py-4 text-sm capitalize">{ticket.category}</td>
    <td className="px-6 py-4 text-sm">
      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
        {ticket.status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit(ticket)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(ticket.id)}>
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </td>
  </tr>
));

TicketRow.displayName = 'TicketRow';

export default function TicketList({ tenantId, onEdit, onRefresh }) {
  const { invalidateRelated } = useCacheStrategy();
  const { isConnected } = useRealtimeSync('Ticket', tenantId);

  const { data: tickets = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['Ticket-list', tenantId],
    queryFn: async () => {
      if (!tenantId) return [];
      return base44.entities.Ticket.filter({ 
        workspace_id: tenantId 
      });
    },
    enabled: !!tenantId,
    staleTime: 2 * 60 * 1000,
  });

  useEffect(() => {
    if (onRefresh) refetch();
  }, [onRefresh, refetch]);

  const handleDelete = useCallback(async (id) => {
    if (confirm('Tem certeza?')) {
      try {
        await base44.entities.Ticket.delete(id);
        toast.success('Ticket deletado');
        invalidateRelated('Ticket', id);
        refetch();
      } catch (error) {
        toast.error('Erro ao deletar ticket');
      }
    }
  }, [invalidateRelated, refetch]);

  const getStatusColor = useCallback((status) => {
    const colors = {
      open: 'bg-red-100 text-red-800',
      in_progress: 'bg-blue-100 text-blue-800',
      waiting_client: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-slate-100 text-slate-800'
    };
    return colors[status] || 'bg-slate-100';
  }, []);

  if (loading) return <div className="text-center py-8 text-slate-500">Carregando tickets...</div>;

  if (tickets.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-slate-600">Nenhum ticket cadastrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Nº Ticket</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Título</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Categoria</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {tickets.map((t) => (
            <TicketRow 
              key={t.id} 
              ticket={t} 
              onEdit={onEdit} 
              onDelete={handleDelete} 
              getStatusColor={getStatusColor} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}