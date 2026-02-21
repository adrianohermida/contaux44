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
  quote_number: { label: 'Nº Orçamento', required: true },
  expiry_date: { label: 'Data de Validade', required: true }
};

export default function QuoteForm({ quote, onSave, onCancel, tenantId, isOpen = true }) {
  const initialData = useMemo(() => quote || {
    workspace_id: tenantId,
    client_id: '',
    quote_number: '',
    status: 'draft',
    issue_date: new Date().toISOString().split('T')[0],
    expiry_date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    total_amount: 0,
    tax_amount: 0,
    currency: 'BRL',
    items: [{ description: '', quantity: 1, unit_price: 0, tax_rate: 0 }],
    notes: '',
    converted_invoice_id: ''
  }, [quote, tenantId]);

  const { formData, handleChange, setFieldValue, isDirty, reset } = useFormState(initialData);
  const { errors, validateForm, clearErrors } = useFormValidation();
  const { loading, submit } = useFormSubmit();

  const statusOptions = [
    { value: 'draft', label: 'Rascunho' },
    { value: 'sent', label: 'Enviado' },
    { value: 'accepted', label: 'Aceito' },
    { value: 'rejected', label: 'Rejeitado' },
    { value: 'converted', label: 'Convertido' }
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

    // Validar client_id obrigatório
    if (!formData.client_id || formData.client_id.trim() === '') {
      alert('Por favor, selecione um cliente');
      return;
    }

    // Validar items obrigatório
    if (!formData.items || formData.items.length === 0 || 
        formData.items.every(item => !item.description || item.unit_price === 0)) {
      alert('Por favor, adicione pelo menos um item com descrição e preço');
      return;
    }

    // Calcular totals
    const totalAmount = formData.items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.unit_price;
      const itemTax = itemTotal * (item.tax_rate || 0) / 100;
      return sum + itemTotal + itemTax;
    }, 0);

    const taxAmount = formData.items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.unit_price;
      return sum + (itemTotal * (item.tax_rate || 0) / 100);
    }, 0);

    // Validar datas
    if (new Date(formData.expiry_date) <= new Date(formData.issue_date)) {
      alert('Data de validade deve ser após data de emissão');
      return;
    }

    const updatedFormData = {
      ...formData,
      workspace_id: formData.workspace_id || tenantId,
      tenant_id: tenantId,
      total_amount: parseFloat(totalAmount.toFixed(2)),
      tax_amount: parseFloat(taxAmount.toFixed(2))
    };

    await submit(
      async () => {
        if (quote?.id) {
          await base44.entities.Quote.update(quote.id, updatedFormData);
        } else {
          await base44.entities.Quote.create(updatedFormData);
        }
      },
      {
        onSuccess: () => { reset(); onSave(); },
        successMessage: quote ? 'Orçamento atualizado!' : 'Orçamento criado!',
        errorMessage: 'Erro ao salvar orçamento.',
        tenantId,
        entityType: 'Quote',
        action: quote ? 'update' : 'create'
      }
    );
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onCancel} title={quote ? 'Editar Orçamento' : 'Novo Orçamento'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Cliente" name="client_id" value={formData.client_id} onChange={handleChange} placeholder="ID ou nome do cliente" required />
          <FormField label="Nº Orçamento" name="quote_number" value={formData.quote_number} onChange={handleChange} error={errors.quote_number} required />
          <FormField label="Status" type="select" name="status" value={formData.status} onChange={(v) => setFieldValue('status', v)} options={statusOptions} />
          <FormField label="Data Emissão" type="date" name="issue_date" value={formData.issue_date} onChange={handleChange} required />
          <FormField label="Data Validade" type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} error={errors.expiry_date} required />
          <FormField label="Moeda" type="select" name="currency" value={formData.currency} onChange={(v) => setFieldValue('currency', v)} options={[{ value: 'BRL', label: 'BRL' }, { value: 'USD', label: 'USD' }, { value: 'EUR', label: 'EUR' }]} />
        </div>

        <div className="border rounded-lg p-4 space-y-2">
          <h3 className="font-semibold">Itens do Orçamento</h3>
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

        <FormField label="Termos e Condições" type="textarea" name="notes" value={formData.notes} onChange={handleChange} rows={2} />
        <FormActions onCancel={onCancel} onSubmit={handleSubmit} loading={loading} submitLabel={quote ? 'Atualizar' : 'Criar'} isDirty={isDirty} />
      </form>
    </ModalWrapper>
  );
}