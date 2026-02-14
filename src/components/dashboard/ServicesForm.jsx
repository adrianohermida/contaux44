import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ServicesForm({ service, tenantId, onSave, onCancel }) {
  const [formData, setFormData] = useState(service || {
    service_name: '',
    description: '',
    hourly_rate: 0,
    category: 'consulting',
    status: 'active'
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (service?.id) {
        await base44.entities.Service.update(service.id, formData);
      } else {
        await base44.entities.Service.create({ ...formData, tenant_id: tenantId });
      }
      onSave();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nome do serviço"
          name="service_name"
          value={formData.service_name}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          placeholder="Taxa horária (R$)"
          name="hourly_rate"
          type="number"
          value={formData.hourly_rate}
          onChange={handleChange}
          step="0.01"
          required
        />
        <Select value={formData.category} onValueChange={(val) => handleSelectChange('category', val)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="accounting">Contabilidade</SelectItem>
            <SelectItem value="tax">Fiscal</SelectItem>
            <SelectItem value="consulting">Consultoria</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
        <Select value={formData.status} onValueChange={(val) => handleSelectChange('status', val)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
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