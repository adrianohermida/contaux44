import React, { useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useFormState } from '@/components/modals/useFormState';
import { useFormValidation } from '@/components/hooks/useFormValidation';
import { useFormSubmit } from '@/components/modals/useFormSubmit';
import ModalWrapper from '@/components/modals/ModalWrapper';
import FormField from '@/components/modals/FormField';
import FormActions from '@/components/modals/FormActions';

const VALIDATION_RULES = {
  ticket_number: { label: 'Nº Ticket', required: true },
  title: { label: 'Título', required: true, minLength: 3 }
};

export default function TicketForm({ ticket, onSave, onCancel, tenantId, isOpen = true }) {
  const initialData = useMemo(() => ticket || {
    workspace_id: tenantId,
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

  const { formData, handleChange, setFieldValue, isDirty, reset } = useFormState(initialData);
  const { errors, validateForm, clearErrors } = useFormValidation();
  const { loading, submit } = useFormSubmit();

  const categoryOptions = [
    { value: 'accounting', label: 'Contabilidade' },
    { value: 'legal', label: 'Legal' },
    { value: 'tax', label: 'Fiscal' },
    { value: 'financial', label: 'Financeiro' },
    { value: 'technical', label: 'Técnico' },
    { value: 'other', label: 'Outro' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente' }
  ];

  const statusOptions = [
    { value: 'open', label: 'Aberto' },
    { value: 'in_progress', label: 'Em Progresso' },
    { value: 'waiting_client', label: 'Aguardando Cliente' },
    { value: 'resolved', label: 'Resolvido' },
    { value: 'closed', label: 'Fechado' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!validateForm(formData, VALIDATION_RULES)) return;

    await submit(
      async () => {
        if (ticket?.id) {
          await base44.entities.Ticket.update(ticket.id, formData);
        } else {
          await base44.entities.Ticket.create(formData);
        }
      },
      {
        onSuccess: () => { reset(); onSave(); },
        successMessage: ticket ? 'Ticket atualizado!' : 'Ticket criado!',
        errorMessage: 'Erro ao salvar ticket.',
        tenantId,
        entityType: 'Ticket',
        action: ticket ? 'update' : 'create'
      }
    );
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onCancel} title={ticket ? 'Editar Ticket' : 'Novo Ticket'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Nº Ticket" name="ticket_number" value={formData.ticket_number} onChange={handleChange} error={errors.ticket_number} required />
          <FormField label="Título" name="title" value={formData.title} onChange={handleChange} error={errors.title} required />
          <FormField label="Categoria" type="select" name="category" value={formData.category} onChange={(v) => setFieldValue('category', v)} options={categoryOptions} />
          <FormField label="Prioridade" type="select" name="priority" value={formData.priority} onChange={(v) => setFieldValue('priority', v)} options={priorityOptions} />
          <FormField label="Atribuir a" name="assigned_to" value={formData.assigned_to} onChange={handleChange} />
          <FormField label="Data de Vencimento" type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
          <FormField label="Status" type="select" name="status" value={formData.status} onChange={(v) => setFieldValue('status', v)} options={statusOptions} />
        </div>
        <FormActions onCancel={onCancel} onSubmit={handleSubmit} loading={loading} submitLabel={ticket ? 'Atualizar' : 'Criar'} isDirty={isDirty} />
      </form>
    </ModalWrapper>
  );
}