import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, AlertCircle } from 'lucide-react';

const PaymentRow = React.memo(({ payment, onEdit, onDelete, getStatusColor, getMethodLabel }) => (
  <tr className="hover:bg-slate-50">
    <td className="px-6 py-4 text-sm font-medium">{payment.payment_number}</td>
    <td className="px-6 py-4 text-sm">{new Date(payment.payment_date).toLocaleDateString('pt-BR')}</td>
    <td className="px-6 py-4 text-sm">{payment.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
    <td className="px-6 py-4 text-sm">{getMethodLabel(payment.payment_method)}</td>
    <td className="px-6 py-4 text-sm">
      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(payment.status)}`}>
        {payment.status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit(payment)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(payment.id)}>
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </td>
  </tr>
));

PaymentRow.displayName = 'PaymentRow';

export default function PaymentList({ tenantId, onEdit, onRefresh }) {
  const { data: payments = [], isLoading: loading, error, refetch } = useQuery({
    queryKey: ['Payment-list', tenantId, onRefresh],
    queryFn: async () => {
      if (!tenantId) return [];
      return base44.entities.Payment.filter({ tenant_id: tenantId });
    },
    enabled: !!tenantId,
    staleTime: 3 * 60 * 1000,
    retry: 2,
    retryDelay: 1000
  });

  const handleDelete = useCallback(async (id) => {
    if (confirm('Tem certeza? Esta ação não pode ser desfeita.')) {
      try {
        await base44.entities.Payment.delete(id);
        refetch();
      } catch (err) {
        console.error('Erro ao deletar:', err);
        alert('Erro ao deletar pagamento. Tente novamente.');
      }
    }
  }, [refetch]);

  const getStatusColor = useCallback((status) => {
    const colors = { pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-green-100 text-green-800', failed: 'bg-red-100 text-red-800', reversed: 'bg-slate-100 text-slate-800' };
    return colors[status] || 'bg-slate-100';
  }, []);

  const getMethodLabel = useCallback((method) => {
    const labels = { bank_transfer: 'Transferência', credit_card: 'Crédito', debit_card: 'Débito', pix: 'PIX', check: 'Cheque', cash: 'Dinheiro' };
    return labels[method] || method;
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-600 mb-4">Erro ao carregar pagamentos</p>
        <button onClick={() => refetch()} className="text-red-500 hover:text-red-700 underline">
          Tentar novamente
        </button>
      </div>
    );
  }

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
            <PaymentRow 
              key={pay.id} 
              payment={pay} 
              onEdit={onEdit} 
              onDelete={handleDelete} 
              getStatusColor={getStatusColor} 
              getMethodLabel={getMethodLabel} 
            />
          ))}
        </tbody>
      </table>
      {payments.length === 0 && <div className="text-center py-8 text-slate-500">Nenhum pagamento cadastrado</div>}
    </div>
  );
}