import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Trash2 } from 'lucide-react';

export default function JournalEntryForm({ entry, onSave, onCancel, tenantId }) {
  const initialFormData = useMemo(() => entry || {
    tenant_id: tenantId,
    client_id: '',
    entry_date: new Date().toISOString().split('T')[0],
    reference_number: '',
    description: '',
    line_items: [{ account_id: '', account_name: '', debit_amount: 0, credit_amount: 0 }],
    memo: '',
    is_posted: false
  }, [entry, tenantId]);

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const { data: accounts = [], isLoading: accountsLoading } = useQuery({
    queryKey: ['accounts', tenantId],
    queryFn: async () => {
      if (!tenantId) return [];
      return base44.entities.Account.filter({ tenant_id: tenantId });
    },
    enabled: !!tenantId
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleLineChange = useCallback((index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.line_items];
      newItems[index] = { 
        ...newItems[index], 
        [field]: field.includes('amount') ? parseFloat(value) || 0 : value 
      };
      return { ...prev, line_items: newItems };
    });
  }, []);

  const addLineItem = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      line_items: [...prev.line_items, { account_id: '', account_name: '', debit_amount: 0, credit_amount: 0 }]
    }));
  }, []);

  const removeLine = useCallback((index) => {
    if (formData.line_items.length === 1) {
      toast.error('Deve haver pelo menos uma linha no lançamento');
      return;
    }
    setFormData(prev => ({
      ...prev,
      line_items: prev.line_items.filter((_, i) => i !== index)
    }));
  }, [formData.line_items.length]);

  const validateForm = () => {
    if (!formData.entry_date) {
      toast.error('Por favor, preencha a data do lançamento');
      return false;
    }
    if (!formData.description || formData.description.trim() === '') {
      toast.error('Por favor, preencha a descrição');
      return false;
    }
    if (!formData.line_items || formData.line_items.length === 0) {
      toast.error('O lançamento deve ter pelo menos uma linha');
      return false;
    }

    let totalDebito = 0;
    let totalCredito = 0;
    for (const item of formData.line_items) {
      if (!item.account_id) {
        toast.error('Todas as linhas devem ter uma conta selecionada');
        return false;
      }
      totalDebito += item.debit_amount || 0;
      totalCredito += item.credit_amount || 0;
    }

    if (Math.abs(totalDebito - totalCredito) > 0.01) {
      toast.error(`Débito total (${totalDebito.toFixed(2)}) deve ser igual ao Crédito total (${totalCredito.toFixed(2)})`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const dataToSave = {
        ...formData,
        tenant_id: tenantId,
        description: formData.description.trim()
      };

      if (entry?.id) {
        await base44.entities.JournalEntry.update(entry.id, dataToSave);
        toast.success('Lançamento atualizado com sucesso');
      } else {
        await base44.entities.JournalEntry.create(dataToSave);
        toast.success('Lançamento criado com sucesso');
      }
      onSave();
    } catch (err) {
      console.error('Erro ao salvar:', err);
      toast.error('Erro ao salvar lançamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{entry ? 'Editar Lançamento' : 'Novo Lançamento'}</h2>
          <button onClick={onCancel} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Input label="Data" type="date" name="entry_date" value={formData.entry_date} onChange={handleChange} required />
            <Input label="Número Ref." name="reference_number" value={formData.reference_number} onChange={handleChange} />
            <Input label="Descrição" name="description" value={formData.description} onChange={handleChange} required />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Linhas do Lançamento</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Conta</th>
                    <th className="text-right py-2 px-2">Débito</th>
                    <th className="text-right py-2 px-2">Crédito</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.line_items.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-2">
                        <Select value={item.account_id} onValueChange={(v) => {
                          const acc = accounts.find(a => a.id === v);
                          handleLineChange(idx, 'account_id', v);
                          handleLineChange(idx, 'account_name', acc?.account_name || '');
                        }}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map(acc => (
                              <SelectItem key={acc.id} value={acc.id}>{acc.account_name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-2 px-2">
                        <Input type="number" step="0.01" value={item.debit_amount} onChange={(e) => handleLineChange(idx, 'debit_amount', e.target.value)} className="text-right" />
                      </td>
                      <td className="py-2 px-2">
                        <Input type="number" step="0.01" value={item.credit_amount} onChange={(e) => handleLineChange(idx, 'credit_amount', e.target.value)} className="text-right" />
                      </td>
                      <td className="py-2 px-2">
                        <Button variant="ghost" size="icon" onClick={() => removeLine(idx)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button type="button" variant="outline" onClick={addLineItem} className="mt-2">
              <Plus className="w-4 h-4 mr-2" /> Adicionar Linha
            </Button>
          </div>

          <textarea className="w-full border rounded-lg p-2 text-sm" placeholder="Memo" name="memo" value={formData.memo} onChange={handleChange} rows={2}></textarea>

          <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-700 border border-blue-200">
            Débitos e Créditos devem ser iguais para equilibrar o lançamento
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit" disabled={loading || accountsLoading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? 'Salvando...' : entry ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}