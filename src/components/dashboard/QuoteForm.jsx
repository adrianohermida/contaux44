import React, { useState, useCallback, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Trash2 } from 'lucide-react';

export default function QuoteForm({ quote, onSave, onCancel, tenantId }) {
  const initialFormData = useMemo(() => quote || {
    tenant_id: tenantId,
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

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleItemChange = useCallback((index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { 
        ...newItems[index], 
        [field]: field === 'quantity' || field === 'unit_price' || field === 'tax_rate' ? parseFloat(value) || 0 : value 
      };
      return { ...prev, items: newItems };
    });
  }, []);

  const addItem = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unit_price: 0, tax_rate: 0 }]
    }));
  }, []);

  const removeItem = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (quote?.id) {
        await base44.entities.Quote.update(quote.id, formData);
      } else {
        await base44.entities.Quote.create(formData);
      }
      onSave();
    } finally {
      setLoading(false);
    }
  }, [quote, formData, onSave]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{quote ? 'Editar Orçamento' : 'Novo Orçamento'}</h2>
          <button onClick={onCancel} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Input label="Nº Orçamento" name="quote_number" value={formData.quote_number} onChange={handleChange} required />
            <Input label="Data de Emissão" type="date" name="issue_date" value={formData.issue_date} onChange={handleChange} required />
            <Input label="Data de Validade" type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} required />
            <Select value={formData.status} onValueChange={(v) => handleSelectChange('status', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="sent">Enviado</SelectItem>
                <SelectItem value="accepted">Aceito</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
                <SelectItem value="converted">Convertido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Itens do Orçamento</h3>
            {formData.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-5 gap-2 mb-2">
                <Input placeholder="Descrição" value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} />
                <Input placeholder="Qtd" type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)} />
                <Input placeholder="Preço" type="number" step="0.01" value={item.unit_price} onChange={(e) => handleItemChange(idx, 'unit_price', e.target.value)} />
                <Input placeholder="Imposto %" type="number" step="0.01" value={item.tax_rate} onChange={(e) => handleItemChange(idx, 'tax_rate', e.target.value)} />
                <Button variant="ghost" size="icon" onClick={() => removeItem(idx)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addItem} className="mt-2">
              <Plus className="w-4 h-4 mr-2" /> Adicionar Item
            </Button>
          </div>

          <textarea className="w-full border rounded-lg p-2 text-sm" placeholder="Termos e condições" name="notes" value={formData.notes} onChange={handleChange} rows={3}></textarea>

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