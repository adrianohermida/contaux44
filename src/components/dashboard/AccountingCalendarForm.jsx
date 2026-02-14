import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AccountingCalendarForm({ tenantId, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    due_date: '',
    priority: 'medium',
    category: 'accounting',
    description: ''
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await base44.entities.Ticket.create({
        tenant_id: tenantId,
        client_id: 'accounting-calendar',
        ticket_number: `EV-${Date.now()}`,
        title: formData.title,
        category: formData.category,
        priority: formData.priority,
        status: 'open',
        description: formData.description,
        due_date: formData.due_date
      });
      onSave?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Título do Evento"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Data do Evento"
          name="due_date"
          type="date"
          value={formData.due_date}
          onChange={handleChange}
          required
        />
        <Select value={formData.priority} onValueChange={(val) => setFormData(prev => ({ ...prev, priority: val }))}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Baixa</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="urgent">Urgente</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="flex gap-3">
          <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700">
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}