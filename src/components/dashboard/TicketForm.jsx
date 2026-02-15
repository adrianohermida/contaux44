import React, { useState, useCallback, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export default function TicketForm({ ticket, onSave, onCancel, tenantId }) {
  const initialFormData = useMemo(() => ticket || {
    tenant_id: tenantId,
    client_id: '',
    ticket_number: '',
    title: '',
    description: '',
    category: 'other',
    priority: 'medium',
    status: 'open',
    assigned_to: '',
    due_date: '',
    resolution_notes: ''
  }, [ticket, tenantId]);

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (ticket?.id) {
        await base44.entities.Ticket.update(ticket.id, formData);
      } else {
        await base44.entities.Ticket.create(formData);
      }
      onSave();
    } finally {
      setLoading(false);
    }
  }, [ticket, formData, onSave]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{ticket ? 'Editar Ticket' : 'Novo Ticket'}</h2>
          <button onClick={onCancel} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nº Ticket" name="ticket_number" value={formData.ticket_number} onChange={handleChange} required />
            <Input label="Título" name="title" value={formData.title} onChange={handleChange} required />
            <Select value={formData.category} onValueChange={(v) => handleSelectChange('category', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accounting">Contabilidade</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="tax">Fiscal</SelectItem>
                <SelectItem value="financial">Financeiro</SelectItem>
                <SelectItem value="technical">Técnico</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
            <Select value={formData.priority} onValueChange={(v) => handleSelectChange('priority', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
            <Input label="Atribuir a" name="assigned_to" value={formData.assigned_to} onChange={handleChange} />
            <Input label="Data de Vencimento" type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
            <Select value={formData.status} onValueChange={(v) => handleSelectChange('status', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Aberto</SelectItem>
                <SelectItem value="in_progress">Em Progresso</SelectItem>
                <SelectItem value="waiting_client">Aguardando Cliente</SelectItem>
                <SelectItem value="resolved">Resolvido</SelectItem>
                <SelectItem value="closed">Fechado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}