import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BankReconciliationForm({ tenantId, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    bank_name: '',
    statement_date: '',
    reconciled_balance: 0,
    actual_balance: 0,
    differences: [],
    status: 'pending'
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
      // Criar registro de reconciliação como um Journa Entry customizado
      await base44.entities.JournalEntry.create({
        tenant_id: tenantId,
        client_id: 'bank-recon',
        entry_date: formData.statement_date,
        description: `Reconciliação Bancária - ${formData.bank_name}`,
        line_items: [{
          account_id: 'bank-reconciliation',
          account_name: `Reconciliação ${formData.bank_name}`,
          debit_amount: Math.abs(formData.reconciled_balance - formData.actual_balance)
        }],
        is_posted: formData.status === 'completed'
      });
      onSave?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nome do Banco"
          name="bank_name"
          value={formData.bank_name}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Data do Extrato"
          name="statement_date"
          type="date"
          value={formData.statement_date}
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Saldo Conciliado (R$)"
          name="reconciled_balance"
          type="number"
          value={formData.reconciled_balance}
          onChange={handleChange}
          step="0.01"
        />
        <Input
          placeholder="Saldo Atual (R$)"
          name="actual_balance"
          type="number"
          value={formData.actual_balance}
          onChange={handleChange}
          step="0.01"
        />
        <Select value={formData.status} onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="in_progress">Em Progresso</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
          </SelectContent>
        </Select>
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