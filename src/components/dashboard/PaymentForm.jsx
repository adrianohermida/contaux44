import React, { useEffect, useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useFormState } from '@/components/modals/useFormState';
import { useFormValidation } from '@/components/hooks/useFormValidation';
import { useFormSubmit } from '@/components/modals/useFormSubmit';
import ModalWrapper from '@/components/modals/ModalWrapper';
import FormField from '@/components/modals/FormField';
import FormActions from '@/components/modals/FormActions';

const VALIDATION_RULES = {
  payment_number: { label: 'Nº Pagamento', required: true },
  amount: { label: 'Valor', required: true }
};

export default function PaymentForm({ payment, onSave, onCancel, tenantId, isOpen = true }) {
  const initialData = useMemo(() => payment || {
    workspace_id: tenantId,
    client_id: '',
    invoice_id: '',
    payment_number: '',
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'bank_transfer',
    status: 'pending',
    transaction_id: '',
    notes: ''
  }, [payment, tenantId]);

  const { formData, handleChange, setFieldValue, isDirty, reset } = useFormState(initialData);
  const { errors, validateForm, clearErrors } = useFormValidation();
  const { loading, submit } = useFormSubmit();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    (async () => {
       try {
         const data = await base44.entities.Invoice.filter({ workspace_id: tenantId });
         setInvoices(data || []);
       } catch (error) {
         console.error('Erro ao carregar faturas:', error);
       }
     })();
    }, [tenantId]);

  const paymentMethodOptions = [
    { value: 'bank_transfer', label: 'Transferência Bancária' },
    { value: 'credit_card', label: 'Cartão de Crédito' },
    { value: 'debit_card', label: 'Cartão de Débito' },
    { value: 'pix', label: 'PIX' },
    { value: 'check', label: 'Cheque' },
    { value: 'cash', label: 'Dinheiro' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'failed', label: 'Falhou' },
    { value: 'reversed', label: 'Revertido' }
  ];

  const invoiceOptions = invoices.map(inv => ({ value: inv.id, label: inv.invoice_number }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!validateForm(formData, VALIDATION_RULES)) return;

    await submit(
      async () => {
        if (payment?.id) {
          await base44.entities.Payment.update(payment.id, formData);
        } else {
          await base44.entities.Payment.create(formData);
        }
      },
      {
        onSuccess: () => { reset(); onSave(); },
        successMessage: payment ? 'Pagamento atualizado!' : 'Pagamento criado!',
        errorMessage: 'Erro ao salvar pagamento.',
        tenantId,
        entityType: 'Payment',
        action: payment ? 'update' : 'create'
      }
    );
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onCancel} title={payment ? 'Editar Pagamento' : 'Novo Pagamento'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Fatura" type="select" name="invoice_id" value={formData.invoice_id} onChange={(v) => setFieldValue('invoice_id', v)} options={invoiceOptions} />
          <FormField label="Nº Pagamento" name="payment_number" value={formData.payment_number} onChange={handleChange} error={errors.payment_number} required />
          <FormField label="Valor" type="number" name="amount" value={formData.amount} onChange={handleChange} error={errors.amount} required />
          <FormField label="Data do Pagamento" type="date" name="payment_date" value={formData.payment_date} onChange={handleChange} required />
          <FormField label="Método" type="select" name="payment_method" value={formData.payment_method} onChange={(v) => setFieldValue('payment_method', v)} options={paymentMethodOptions} />
          <FormField label="Status" type="select" name="status" value={formData.status} onChange={(v) => setFieldValue('status', v)} options={statusOptions} />
          <FormField label="ID da Transação" name="transaction_id" value={formData.transaction_id} onChange={handleChange} />
        </div>
        <FormField label="Notas" type="textarea" name="notes" value={formData.notes} onChange={handleChange} rows={2} />
        <FormActions onCancel={onCancel} onSubmit={handleSubmit} loading={loading} submitLabel={payment ? 'Atualizar' : 'Criar'} isDirty={isDirty} />
      </form>
    </ModalWrapper>
  );
}