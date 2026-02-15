import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

const InvoiceRow = React.memo(({ invoice, onEdit, onDelete, getStatusColor }) => (
  <tr className="hover:bg-slate-50">
    <td className="px-6 py-4 text-sm font-medium">{invoice.invoice_number}</td>
    <td className="px-6 py-4 text-sm">{new Date(invoice.issue_date).toLocaleDateString('pt-BR')}</td>
    <td className="px-6 py-4 text-sm">{invoice.total_amount.toLocaleString('pt-BR', {style: 'currency', currency: invoice.currency})}</td>
    <td className="px-6 py-4 text-sm">
      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(invoice.status)}`}>
        {invoice.status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit(invoice)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(invoice.id)}>
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </td>
  </tr>
));

InvoiceRow.displayName = 'InvoiceRow';

export default function InvoiceList({ tenantId, onEdit, onRefresh }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInvoices = useCallback(async () => {
    try {
      const data = await base44.entities.Invoice.filter({ tenant_id: tenantId });
      setInvoices(data);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices, onRefresh]);

  const handleDelete = useCallback(async (id) => {
    if (confirm('Tem certeza?')) {
      await base44.entities.Invoice.delete(id);
      loadInvoices();
    }
  }, [loadInvoices]);

  const getStatusColor = useCallback((status) => {
    const colors = { draft: 'bg-slate-100 text-slate-800', sent: 'bg-blue-100 text-blue-800', paid: 'bg-green-100 text-green-800', overdue: 'bg-red-100 text-red-800' };
    return colors[status] || 'bg-slate-100';
  }, []);

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Nº Fatura</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Data</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Valor</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {invoices.map((inv) => (
            <InvoiceRow 
              key={inv.id} 
              invoice={inv} 
              onEdit={onEdit} 
              onDelete={handleDelete} 
              getStatusColor={getStatusColor} 
            />
          ))}
        </tbody>
      </table>
      {invoices.length === 0 && <div className="text-center py-8 text-slate-500">Nenhuma fatura cadastrada</div>}
    </div>
  );
}