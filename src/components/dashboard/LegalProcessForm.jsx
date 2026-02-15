import React, { useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useFormState } from '@/components/modals/useFormState';
import { useFormValidation } from '@/components/hooks/useFormValidation';
import { useFormSubmit } from '@/components/modals/useFormSubmit';
import ModalWrapper from '@/components/modals/ModalWrapper';
import FormField from '@/components/modals/FormField';
import FormActions from '@/components/modals/FormActions';

const VALIDATION_RULES = {
  process_number: { label: 'Nº Processo', required: true },
  title: { label: 'Título', required: true, minLength: 3 }
};

export default function LegalProcessForm({ process, onSave, onCancel, tenantId, isOpen = true }) {
  const initialData = useMemo(() => process || {
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
  }, [process, tenantId]);

  const { formData, handleChange, setFieldValue, isDirty, reset } = useFormState(initialData);
  const { errors, validateForm, clearErrors } = useFormValidation();
  const { loading, submit } = useFormSubmit();

  const processTypeOptions = [
    { value: 'civil', label: 'Civil' },
    { value: 'criminal', label: 'Criminal' },
    { value: 'administrative', label: 'Administrativo' },
    { value: 'labor', label: 'Trabalhista' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'in_progress', label: 'Em Andamento' },
    { value: 'awaiting_decision', label: 'Aguardando Decisão' },
    { value: 'closed', label: 'Fechado' },
    { value: 'archived', label: 'Arquivado' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!validateForm(formData, VALIDATION_RULES)) return;

    await submit(
      async () => {
        if (process?.id) {
          await base44.entities.LegalProcess.update(process.id, formData);
        } else {
          await base44.entities.LegalProcess.create(formData);
        }
      },
      {
        onSuccess: () => { reset(); onSave(); },
        successMessage: process ? 'Processo atualizado!' : 'Processo criado!',
        errorMessage: 'Erro ao salvar processo.',
        tenantId,
        entityType: 'LegalProcess',
        action: process ? 'update' : 'create'
      }
    );
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onCancel} title={process ? 'Editar Processo' : 'Novo Processo Judicial'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Nº Processo" name="process_number" value={formData.process_number} onChange={handleChange} error={errors.process_number} required />
          <FormField label="Título" name="title" value={formData.title} onChange={handleChange} error={errors.title} required />
          <FormField label="Tribunal" name="court" value={formData.court} onChange={handleChange} />
          <FormField label="Juiz" name="judge" value={formData.judge} onChange={handleChange} />
          <FormField label="Tipo" type="select" name="process_type" value={formData.process_type} onChange={(v) => setFieldValue('process_type', v)} options={processTypeOptions} />
          <FormField label="Prioridade" type="select" name="priority" value={formData.priority} onChange={(v) => setFieldValue('priority', v)} options={priorityOptions} />
          <FormField label="Data de Protocolo" type="date" name="filing_date" value={formData.filing_date} onChange={handleChange} />
          <FormField label="Próxima Audiência" type="date" name="next_hearing_date" value={formData.next_hearing_date} onChange={handleChange} />
          <FormField label="Advogado Responsável" name="responsible_lawyer" value={formData.responsible_lawyer} onChange={handleChange} />
          <FormField label="Status" type="select" name="status" value={formData.status} onChange={(v) => setFieldValue('status', v)} options={statusOptions} />
        </div>
        <FormActions onCancel={onCancel} onSubmit={handleSubmit} loading={loading} submitLabel={process ? 'Atualizar' : 'Criar'} isDirty={isDirty} />
      </form>
    </ModalWrapper>
  );
}