import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

export default function PaymentList({ tenantId, onEdit, onRefresh }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, [tenantId, onRefresh]);

  const loadPayments = async () => {
    try {
      const data = await base44.entities.Payment.filter({ tenant_id: tenantId });
      setPayments(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza?')) {
      await base44.entities.Payment.delete(id);
      loadPayments();
    }
  };

  const getStatusColor = (status) => {
    const colors = { pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-green-100 text-green-800', failed: 'bg-red-100 text-red-800', reversed: 'bg-slate-100 text-slate-800' };
    return colors[status] || 'bg-slate-100';
  };

  const getMethodLabel = (method) => {
    const labels = { bank_transfer: 'Transferência', credit_card: 'Crédito', debit_card: 'Débito', pix: 'PIX', check: 'Cheque', cash: 'Dinheiro' };
    return labels[method] || method;
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Nº Pagamento</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Data</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Valor</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Método</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {payments.map((pay) => (
            <tr key={pay.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm font-medium">{pay.payment_number}</td>
              <td className="px-6 py-4 text-sm">{new Date(pay.payment_date).toLocaleDateString('pt-BR')}</td>
              <td className="px-6 py-4 text-sm">{pay.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
              <td className="px-6 py-4 text-sm">{getMethodLabel(pay.payment_method)}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(pay.status)}`}>
                  {pay.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(pay)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(pay.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {payments.length === 0 && <div className="text-center py-8 text-slate-500">Nenhum pagamento cadastrado</div>}
    </div>
  );
}