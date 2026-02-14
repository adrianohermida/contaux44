import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import { Zap } from 'lucide-react';

export default function Automations() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Automações</h1>
            <p className="text-slate-600 mt-1">Gerenciar fluxos automáticos</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-600" />
              <h2 className="text-lg font-semibold">Automações Disponíveis</h2>
            </div>
            <div className="text-center text-slate-500 py-12">
              <p className="mb-2">Módulo de automações</p>
              <p className="text-sm">Funcionalidades a serem implementadas</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}