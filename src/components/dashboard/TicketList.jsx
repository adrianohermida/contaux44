import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

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
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = useCallback(async () => {
    try {
      const data = await base44.entities.Ticket.filter({ tenant_id: tenantId });
      setTickets(data);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets, onRefresh]);

  const handleDelete = useCallback(async (id) => {
    if (confirm('Tem certeza?')) {
      await base44.entities.Ticket.delete(id);
      loadTickets();
    }
  }, [loadTickets]);

  const getStatusColor = useCallback((status) => {
    const colors = { open: 'bg-red-100 text-red-800', in_progress: 'bg-blue-100 text-blue-800', waiting_client: 'bg-yellow-100 text-yellow-800', resolved: 'bg-green-100 text-green-800', closed: 'bg-slate-100 text-slate-800' };
    return colors[status] || 'bg-slate-100';
  }, []);

  if (loading) return <div className="text-center py-8">Carregando...</div>;

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
      {tickets.length === 0 && <div className="text-center py-8 text-slate-500">Nenhum ticket cadastrado</div>}
    </div>
  );
}