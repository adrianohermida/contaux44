import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import PaymentForm from '../components/dashboard/PaymentForm';
import PaymentList from '../components/dashboard/PaymentList';
import { Button } from '@/components/ui/button';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';
import { base44 } from '@/api/base44Client';

export default function Payments() {
  const { workspaceId, loading } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  const handleSave = () => {
    setShowForm(false);
    setEditingPayment(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setShowForm(true);
  };

  const handleExport = async () => {
    try {
      const payments = await base44.entities.Payment.filter({ tenant_id: workspaceId });
      
      if (!payments || payments.length === 0) {
        alert('Nenhum pagamento para exportar');
        return;
      }

      const headers = ['Data', 'Nº Pagamento', 'Valor', 'Método', 'Status', 'ID Transação'];
      const rows = payments.map(p => [
        new Date(p.payment_date).toLocaleDateString('pt-BR'),
        p.payment_number || '-',
        `R$ ${(p.amount || 0).toFixed(2)}`,
        p.payment_method || '-',
        p.status || '-',
        p.transaction_id || '-'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `pagamentos_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar pagamentos. Tente novamente.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Pagamentos</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gerenciar pagamentos recebidos</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleExport}
            variant="outline"
            className="border-slate-300 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
            aria-label="Exportar pagamentos como CSV"
          >
            <Download className="w-4 h-4 mr-2" aria-hidden="true" />
            Exportar CSV
          </Button>
          <Button
            onClick={() => { setEditingPayment(null); setShowForm(true); }}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            aria-label="Registrar novo pagamento"
          >
            <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
            Novo Pagamento
          </Button>
        </div>
      </div>

      {showForm && (
        <PaymentForm
          payment={editingPayment}
          tenantId={workspaceId}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingPayment(null); }}
        />
      )}

      <PaymentList
        tenantId={workspaceId}
        onEdit={handleEdit}
        onRefresh={refreshKey}
      />
    </div>
  );
}