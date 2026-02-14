import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export default function PaymentForm({ payment, onSave, onCancel, tenantId }) {
  const [formData, setFormData] = useState(payment || {
    tenant_id: tenantId,
    client_id: '',
    invoice_id: '',
    payment_number: '',
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'bank_transfer',
    status: 'pending',
    transaction_id: '',
    notes: ''
  });
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, [tenantId]);

  const loadInvoices = async () => {
    try {
      const data = await base44.entities.Invoice.filter({ tenant_id: tenantId });
      setInvoices(data);
    } catch (error) {
      console.error('Erro ao carregar faturas:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) : value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (payment?.id) {
        await base44.entities.Payment.update(payment.id, formData);
      } else {
        await base44.entities.Payment.create(formData);
      }
      onSave();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{payment ? 'Editar Pagamento' : 'Novo Pagamento'}</h2>
          <button onClick={onCancel} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fatura</label>
              <Select value={formData.invoice_id} onValueChange={(v) => handleSelectChange('invoice_id', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma fatura" />
                </SelectTrigger>
                <SelectContent>
                  {invoices.map(inv => (
                    <SelectItem key={inv.id} value={inv.id}>{inv.invoice_number}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input label="Nº Pagamento" name="payment_number" value={formData.payment_number} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Valor" type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} required />
            <Input label="Data do Pagamento" type="date" name="payment_date" value={formData.payment_date} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select value={formData.payment_method} onValueChange={(v) => handleSelectChange('payment_method', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Método de Pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">Transferência Bancária</SelectItem>
                <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                <SelectItem value="debit_card">Cartão de Débito</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="check">Cheque</SelectItem>
                <SelectItem value="cash">Dinheiro</SelectItem>
              </SelectContent>
            </Select>
            <Select value={formData.status} onValueChange={(v) => handleSelectChange('status', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="failed">Falhou</SelectItem>
                <SelectItem value="reversed">Revertido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input label="ID da Transação" name="transaction_id" value={formData.transaction_id} onChange={handleChange} />
          <textarea className="w-full border rounded-lg p-2 text-sm" placeholder="Notas" name="notes" value={formData.notes} onChange={handleChange} rows={3}></textarea>

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