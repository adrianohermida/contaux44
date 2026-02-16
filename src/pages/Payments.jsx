import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import PaymentForm from '../components/dashboard/PaymentForm';
import PaymentList from '../components/dashboard/PaymentList';
import { Button } from '@/components/ui/button';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';

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

  return (
    <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Pagamentos</h1>
              <p className="text-slate-600 mt-1">Gerenciar pagamentos recebidos</p>
            </div>
            <Button 
              onClick={() => { setEditingPayment(null); setShowForm(true); }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Pagamento
            </Button>
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