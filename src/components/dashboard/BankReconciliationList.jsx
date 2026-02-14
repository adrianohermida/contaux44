import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BankReconciliationList({ tenantId, onEdit, onRefresh }) {
  const [reconciliations, setReconciliations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReconciliations = async () => {
      try {
        const data = await base44.entities.JournalEntry.filter({
          tenant_id: tenantId,
          description: { $regex: 'Reconciliação Bancária' }
        });
        setReconciliations(data);
      } finally {
        setLoading(false);
      }
    };
    loadReconciliations();
  }, [tenantId, onRefresh]);

  const handleDelete = async (id) => {
    if (confirm('Deletar esta reconciliação?')) {
      await base44.entities.JournalEntry.delete(id);
      setReconciliations(reconciliations.filter(r => r.id !== id));
    }
  };

  if (loading) return <div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="text-left py-3 px-4">Banco</th>
            <th className="text-left py-3 px-4">Data</th>
            <th className="text-left py-3 px-4">Saldo Conciliado</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {reconciliations.length === 0 ? (
            <tr><td colSpan="5" className="text-center py-8 text-slate-500">Nenhuma reconciliação</td></tr>
          ) : (
            reconciliations.map(recon => (
              <tr key={recon.id} className="border-b hover:bg-slate-50">
                <td className="py-3 px-4 font-medium">{recon.description.split('-')[1]?.trim()}</td>
                <td className="py-3 px-4">{new Date(recon.entry_date).toLocaleDateString('pt-BR')}</td>
                <td className="py-3 px-4">R$ {(recon.line_items[0]?.debit_amount || 0).toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${recon.is_posted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {recon.is_posted ? 'Concluído' : 'Pendente'}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => onEdit(recon)}><Edit className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(recon.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}