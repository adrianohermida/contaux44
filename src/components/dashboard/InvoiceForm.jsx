import React, { useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useFormState } from '@/components/modals/useFormState';
import { useFormValidation } from '@/components/hooks/useFormValidation';
import { useFormSubmit } from '@/components/modals/useFormSubmit';
import ModalWrapper from '@/components/modals/ModalWrapper';
import FormField from '@/components/modals/FormField';
import FormActions from '@/components/modals/FormActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

const VALIDATION_RULES = {
  invoice_number: { label: 'Nº Fatura', required: true },
  due_date: { label: 'Data de Vencimento', required: true }
};

export default function InvoiceForm({ invoice, onSave, onCancel, tenantId, isOpen = true }) {
  const initialData = useMemo(() => invoice || {
    workspace_id: tenantId,
    client_id: '',
    invoice_number: '',
    status: 'draft',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    total_amount: 0,
    tax_amount: 0,
    paid_amount: 0,
    currency: 'BRL',
    items: [{ description: '', quantity: 1, unit_price: 0, tax_rate: 0 }],
    notes: ''
  }, [invoice, tenantId]);

  const { formData, handleChange, setFieldValue, isDirty, reset } = useFormState(initialData);
  const { errors, validateForm, clearErrors } = useFormValidation();
  const { loading, submit } = useFormSubmit();

  const statusOptions = [
    { value: 'draft', label: 'Rascunho' },
    { value: 'sent', label: 'Enviada' },
    { value: 'paid', label: 'Paga' },
    { value: 'overdue', label: 'Vencida' }
  ];

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'quantity' || field === 'unit_price' || field === 'tax_rate' ? parseFloat(value) || 0 : value
    };
    setFieldValue('items', newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    if (!validateForm(formData, VALIDATION_RULES)) return;

    await submit(
      async () => {
        if (invoice?.id) {
          await base44.entities.Invoice.update(invoice.id, formData);
        } else {
          await base44.entities.Invoice.create(formData);
        }
      },
      {
        onSuccess: () => { reset(); onSave(); },
        successMessage: invoice ? 'Fatura atualizada!' : 'Fatura criada!',
        errorMessage: 'Erro ao salvar fatura.',
        tenantId,
        entityType: 'Invoice',
        action: invoice ? 'update' : 'create'
      }
    );
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onCancel} title={invoice ? 'Editar Fatura' : 'Nova Fatura'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Nº Fatura" name="invoice_number" value={formData.invoice_number} onChange={handleChange} error={errors.invoice_number} required />
          <FormField label="Data Emissão" type="date" name="issue_date" value={formData.issue_date} onChange={handleChange} required />
          <FormField label="Data Vencimento" type="date" name="due_date" value={formData.due_date} onChange={handleChange} error={errors.due_date} required />
          <FormField label="Status" type="select" name="status" value={formData.status} onChange={(v) => setFieldValue('status', v)} options={statusOptions} />
        </div>

        <div className="border rounded-lg p-4 space-y-2">
          <h3 className="font-semibold">Itens da Fatura</h3>
          {formData.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-2">
              <Input placeholder="Descrição" value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} />
              <Input placeholder="Qtd" type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)} />
              <Input placeholder="Preço" type="number" step="0.01" value={item.unit_price} onChange={(e) => handleItemChange(idx, 'unit_price', e.target.value)} />
              <Input placeholder="Imposto %" type="number" step="0.01" value={item.tax_rate} onChange={(e) => handleItemChange(idx, 'tax_rate', e.target.value)} />
              <Button variant="ghost" size="icon" onClick={() => setFieldValue('items', formData.items.filter((_, i) => i !== idx))}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => setFieldValue('items', [...formData.items, { description: '', quantity: 1, unit_price: 0, tax_rate: 0 }])} className="mt-2">
            <Plus className="w-4 h-4 mr-2" /> Adicionar Item
          </Button>
        </div>

        <FormField label="Notas" type="textarea" name="notes" value={formData.notes} onChange={handleChange} rows={2} />
        <FormActions onCancel={onCancel} onSubmit={handleSubmit} loading={loading} submitLabel={invoice ? 'Atualizar' : 'Criar'} isDirty={isDirty} />
      </form>
    </ModalWrapper>
  );
}