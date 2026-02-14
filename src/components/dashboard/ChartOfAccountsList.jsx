import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

export default function ChartOfAccountsList({ tenantId, onEdit, onRefresh }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, [tenantId, onRefresh]);

  const loadAccounts = async () => {
    try {
      const data = await base44.entities.Account.filter({ tenant_id: tenantId });
      setAccounts(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza?')) {
      await base44.entities.Account.delete(id);
      loadAccounts();
    }
  };

  const getTypeColor = (type) => {
    const colors = { Asset: 'bg-blue-100 text-blue-800', Liability: 'bg-red-100 text-red-800', Equity: 'bg-purple-100 text-purple-800', Revenue: 'bg-green-100 text-green-800', Expense: 'bg-orange-100 text-orange-800' };
    return colors[type] || 'bg-slate-100';
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Nº Conta</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Tipo</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Saldo</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {accounts.map((acc) => (
            <tr key={acc.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm font-medium">{acc.account_number}</td>
              <td className="px-6 py-4 text-sm">{acc.account_name}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(acc.account_type)}`}>
                  {acc.account_type}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-medium">{acc.balance.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded text-xs font-medium ${acc.is_active ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                  {acc.is_active ? 'Ativa' : 'Inativa'}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(acc)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(acc.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {accounts.length === 0 && <div className="text-center py-8 text-slate-500">Nenhuma conta cadastrada</div>}
    </div>
  );
}