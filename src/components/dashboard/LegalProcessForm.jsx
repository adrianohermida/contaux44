import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export default function LegalProcessForm({ process, onSave, onCancel, tenantId }) {
  const [formData, setFormData] = useState(process || {
    tenant_id: tenantId,
    client_id: '',
    process_number: '',
    title: '',
    court: '',
    judge: '',
    process_type: 'civil',
    status: 'in_progress',
    priority: 'medium',
    filing_date: '',
    next_hearing_date: '',
    description: '',
    responsible_lawyer: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (process?.id) {
        await base44.entities.LegalProcess.update(process.id, formData);
      } else {
        await base44.entities.LegalProcess.create(formData);
      }
      onSave();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{process ? 'Editar Processo' : 'Novo Processo Judicial'}</h2>
          <button onClick={onCancel} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nº Processo" name="process_number" value={formData.process_number} onChange={handleChange} required />
            <Input label="Título" name="title" value={formData.title} onChange={handleChange} required />
            <Input label="Tribunal" name="court" value={formData.court} onChange={handleChange} />
            <Input label="Juiz" name="judge" value={formData.judge} onChange={handleChange} />
            <Select value={formData.process_type} onValueChange={(v) => handleSelectChange('process_type', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil">Civil</SelectItem>
                <SelectItem value="criminal">Criminal</SelectItem>
                <SelectItem value="administrative">Administrativo</SelectItem>
                <SelectItem value="labor">Trabalhista</SelectItem>
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
            <Input label="Data de Protocolo" type="date" name="filing_date" value={formData.filing_date} onChange={handleChange} />
            <Input label="Próxima Audiência" type="date" name="next_hearing_date" value={formData.next_hearing_date} onChange={handleChange} />
            <Input label="Advogado Responsável" name="responsible_lawyer" value={formData.responsible_lawyer} onChange={handleChange} />
            <Select value={formData.status} onValueChange={(v) => handleSelectChange('status', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="awaiting_decision">Aguardando Decisão</SelectItem>
                <SelectItem value="closed">Fechado</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
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