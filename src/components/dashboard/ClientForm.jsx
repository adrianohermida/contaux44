import React, { useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useFormState } from '@/components/modals/useFormState';
import { useFormValidation } from '@/components/hooks/useFormValidation';
import { useFormSubmit } from '@/components/modals/useFormSubmit';
import ModalWrapper from '@/components/modals/ModalWrapper';
import FormField from '@/components/modals/FormField';
import FormActions from '@/components/modals/FormActions';

const VALIDATION_RULES = {
  company_name: {
    label: 'Razão Social',
    required: true,
    minLength: 2
  },
  email: {
    label: 'Email',
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: 'Email inválido'
  }
};

export default function ClientForm({ client, onSave, onCancel, tenantId, isOpen = true }) {
  const initialData = useMemo(() => client || {
    tenant_id: tenantId,
    company_name: '',
    email: '',
    phone: '',
    address: '',
    fiscal_year_start: '',
    currency: 'BRL',
    status: 'active'
  }, [client, tenantId]);

  const { formData, handleChange, setFieldValue, isDirty, reset } = useFormState(initialData);
  const { errors, validateForm, setFieldError, clearErrors } = useFormValidation();
  const { loading, submit } = useFormSubmit();

  const currencyOptions = [
    { value: 'BRL', label: 'Real (BRL)' },
    { value: 'USD', label: 'Dólar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!validateForm(formData, VALIDATION_RULES)) {
      return;
    }

    await submit(
      async () => {
        if (client?.id) {
          await base44.entities.Client.update(client.id, formData);
        } else {
          await base44.entities.Client.create(formData);
        }
      },
      {
        onSuccess: () => {
          reset();
          onSave();
        },
        successMessage: client ? 'Cliente atualizado com sucesso!' : 'Cliente criado com sucesso!',
        errorMessage: 'Erro ao salvar cliente. Tente novamente.'
      }
    );
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onCancel}
      title={client ? 'Editar Cliente' : 'Novo Cliente'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Razão Social"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            error={errors.company_name}
            required
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <FormField
            label="Telefone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormField
            label="Endereço"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <FormField
            label="Início do Ano Fiscal"
            type="date"
            name="fiscal_year_start"
            value={formData.fiscal_year_start}
            onChange={handleChange}
          />
          <FormField
            label="Moeda"
            type="select"
            name="currency"
            value={formData.currency}
            onChange={(value) => setFieldValue('currency', value)}
            options={currencyOptions}
          />
          <FormField
            label="Status"
            type="select"
            name="status"
            value={formData.status}
            onChange={(value) => setFieldValue('status', value)}
            options={statusOptions}
          />
        </div>

        <FormActions
          onCancel={onCancel}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel={client ? 'Atualizar' : 'Criar'}
          isDirty={isDirty}
        />
      </form>
    </ModalWrapper>
  );
}