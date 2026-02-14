import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import { CheckCircle2 } from 'lucide-react';

export default function BankReconciliation() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Conciliação Bancária</h1>
            <p className="text-slate-600 mt-1">Reconciliar transações bancárias</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-semibold">Status de Conciliação</h2>
            </div>
            <div className="text-center text-slate-500 py-12">
              <p className="mb-2">Módulo de conciliação bancária</p>
              <p className="text-sm">Funcionalidades a serem implementadas</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}