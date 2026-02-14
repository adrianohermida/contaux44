import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Calendar, Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AccountingCalendarList({ tenantId, onEdit, onRefresh }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await base44.entities.Ticket.filter({
          tenant_id: tenantId,
          category: 'accounting'
        });
        setEvents(data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)));
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [tenantId, onRefresh]);

  const handleDelete = async (id) => {
    if (confirm('Deletar este evento?')) {
      await base44.entities.Ticket.delete(id);
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const getDaysUntil = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  if (loading) return <div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="text-left py-3 px-4">Evento</th>
            <th className="text-left py-3 px-4">Data</th>
            <th className="text-left py-3 px-4">Dias</th>
            <th className="text-left py-3 px-4">Prioridade</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr><td colSpan="6" className="text-center py-8 text-slate-500">Nenhum evento agendado</td></tr>
          ) : (
            events.map(event => {
              const daysUntil = getDaysUntil(event.due_date);
              return (
                <tr key={event.id} className="border-b hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    {event.title}
                  </td>
                  <td className="py-3 px-4">{new Date(event.due_date).toLocaleDateString('pt-BR')}</td>
                  <td className="py-3 px-4">
                    <span className={daysUntil <= 7 ? 'text-red-600 font-semibold' : 'text-slate-600'}>
                      {daysUntil} dias
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${event.priority === 'urgent' ? 'bg-red-100 text-red-800' : event.priority === 'high' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                      {event.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${event.status === 'closed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => onEdit(event)}><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(event.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}