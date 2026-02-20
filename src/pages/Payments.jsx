import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import PaymentForm from '../components/dashboard/PaymentForm';
import PaymentList from '../components/dashboard/PaymentList';
import { Button } from '@/components/ui/button';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import { base44 } from '@/api/base44Client';

export default function Payments() {
  const { workspaceId } = useMultitenantAuthOptimized('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

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
      
      // Preparar dados CSV
      const headers = ['Data', 'Cliente', 'Valor', 'Método', 'Status', 'Referência'];
      const rows = payments.map(p => [
        new Date(p.payment_date).toLocaleDateString('pt-BR'),
        p.client_name || '-',
        `R$ ${(p.amount || 0).toFixed(2)}`,
        p.payment_method || '-',
        p.status || '-',
        p.reference_number || '-'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      // Download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `pagamentos_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar pagamentos');
    }
  };

  return (
    <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Pagamentos</h1>
              <p className="text-slate-600 mt-1">Gerenciar pagamentos recebidos</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleExport}
                variant="outline"
                className="border-slate-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Exportar CSV
              </Button>
              <Button 
                onClick={() => { setEditingPayment(null); setShowForm(true); }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
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