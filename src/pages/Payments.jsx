/**
 * Payments Page
 * Complete payment management interface
 */

import React, { useState, useCallback } from 'react';
import { useGlobalAuth } from '@/components/auth/useGlobalAuth';
import { Button } from '@/components/ui/button';
import PaymentForm from '@/components/dashboard/PaymentForm';
import PaymentList from '@/components/dashboard/PaymentList';
import PaymentReconciliation from '@/components/dashboard/PaymentReconciliation';
import { Plus, Scale } from 'lucide-react';

export default function Payments() {
  const { user, workspaceId } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [showReconciliation, setShowReconciliation] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('list'); // list | reconciliation

  const handleOpenForm = useCallback(() => {
    setEditingPayment(null);
    setShowForm(true);
  }, []);

  const handleEditPayment = useCallback((payment) => {
    setEditingPayment(payment);
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingPayment(null);
  }, []);

  const handleSavePayment = useCallback(() => {
    handleCloseForm();
    setRefreshKey(prev => prev + 1);
  }, [handleCloseForm]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600 dark:text-slate-400">
          Você precisa estar autenticado para acessar esta página
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Pagamentos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gerencie e reconcilie pagamentos de faturas
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            onClick={handleOpenForm}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Pagamento
          </Button>
          <Button
            onClick={() => setActiveTab(activeTab === 'list' ? 'reconciliation' : 'list')}
            variant="outline"
            className="flex-1 sm:flex-none dark:border-slate-600 dark:text-slate-300"
          >
            <Scale className="w-4 h-4 mr-2" />
            {activeTab === 'list' ? 'Reconciliar' : 'Ver Pagamentos'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 border-b-2 font-medium transition-colors ${
            activeTab === 'list'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Histórico de Pagamentos
        </button>
        <button
          onClick={() => setActiveTab('reconciliation')}
          className={`px-4 py-2 border-b-2 font-medium transition-colors ${
            activeTab === 'reconciliation'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          Reconciliação
        </button>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        {activeTab === 'list' ? (
          <div className="p-6">
            <PaymentList
              tenantId={workspaceId}
              onEdit={handleEditPayment}
              onRefresh={refreshKey}
            />
          </div>
        ) : (
          <PaymentReconciliation tenantId={workspaceId} />
        )}
      </div>

      {/* Payment Form Modal */}
      <PaymentForm
        payment={editingPayment}
        tenantId={workspaceId}
        isOpen={showForm}
        onSave={handleSavePayment}
        onCancel={handleCloseForm}
      />
    </div>
  );
}