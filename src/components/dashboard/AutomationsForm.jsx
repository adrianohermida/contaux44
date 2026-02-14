import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AutomationsForm({ tenantId, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    automation_type: 'scheduled',
    schedule_type: 'simple',
    repeat_interval: 5,
    repeat_unit: 'minutes',
    function_name: '',
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
      // Chamada para criar automação (será implementado no backend)
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Automação criada:', formData);
      onSave?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nome da Automação"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Select value={formData.automation_type} onValueChange={(val) => setFormData(prev => ({ ...prev, automation_type: val }))}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="scheduled">Agendada</SelectItem>
            <SelectItem value="entity">Por Entidade</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Função"
          name="function_name"
          value={formData.function_name}
          onChange={handleChange}
          required
        />
        {formData.automation_type === 'scheduled' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Intervalo"
                name="repeat_interval"
                value={formData.repeat_interval}
                onChange={handleChange}
                min="5"
              />
              <Select value={formData.repeat_unit} onValueChange={(val) => setFormData(prev => ({ ...prev, repeat_unit: val }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutos</SelectItem>
                  <SelectItem value="hours">Horas</SelectItem>
                  <SelectItem value="days">Dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
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