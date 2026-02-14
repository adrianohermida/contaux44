import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export default function ChartOfAccountsForm({ account, onSave, onCancel, tenantId }) {
  const [formData, setFormData] = useState(account || {
    tenant_id: tenantId,
    client_id: '',
    account_number: '',
    account_name: '',
    account_type: 'Asset',
    description: '',
    balance: 0,
    is_active: true
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'balance' ? parseFloat(value) : value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (account?.id) {
        await base44.entities.Account.update(account.id, formData);
      } else {
        await base44.entities.Account.create(formData);
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
          <h2 className="text-2xl font-bold">{account ? 'Editar Conta' : 'Nova Conta'}</h2>
          <button onClick={onCancel} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nº da Conta" name="account_number" value={formData.account_number} onChange={handleChange} required />
            <Input label="Nome da Conta" name="account_name" value={formData.account_name} onChange={handleChange} required />
          </div>

          <Select value={formData.account_type} onValueChange={(v) => handleSelectChange('account_type', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Conta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Asset">Ativo</SelectItem>
              <SelectItem value="Liability">Passivo</SelectItem>
              <SelectItem value="Equity">Patrimônio</SelectItem>
              <SelectItem value="Revenue">Receita</SelectItem>
              <SelectItem value="Expense">Despesa</SelectItem>
            </SelectContent>
          </Select>

          <textarea className="w-full border rounded-lg p-2 text-sm" placeholder="Descrição" name="description" value={formData.description} onChange={handleChange} rows={3}></textarea>

          <div className="flex items-center justify-between pt-4 border-t">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))} />
              <span className="text-sm">Ativa</span>
            </label>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onCancel}>Cancelar</Button>
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}