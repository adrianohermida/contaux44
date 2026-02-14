import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TaxInvoicesTable({ tenantId, onEdit, onRefresh }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await base44.entities.TaxInvoice.filter({ tenant_id: tenantId });
        setInvoices(data);
      } finally {
        setLoading(false);
      }
    };
    loadInvoices();
  }, [tenantId, onRefresh]);

  const handleDelete = async (id) => {
    if (confirm('Deletar esta nota fiscal?')) {
      await base44.entities.TaxInvoice.delete(id);
      setInvoices(invoices.filter(i => i.id !== id));
    }
  };

  if (loading) return <div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="text-left py-3 px-4">Número NFe</th>
            <th className="text-left py-3 px-4">Data</th>
            <th className="text-left py-3 px-4">Valor</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr><td colSpan="5" className="text-center py-8 text-slate-500">Nenhuma NFe cadastrada</td></tr>
          ) : (
            invoices.map(inv => (
              <tr key={inv.id} className="border-b hover:bg-slate-50">
                <td className="py-3 px-4 font-medium">{inv.nfe_number}</td>
                <td className="py-3 px-4">{new Date(inv.issue_date).toLocaleDateString('pt-BR')}</td>
                <td className="py-3 px-4">R$ {inv.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${inv.status === 'issued' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => onEdit(inv)}><Edit className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(inv.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}