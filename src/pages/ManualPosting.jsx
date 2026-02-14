import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import { FileText } from 'lucide-react';

export default function ManualPosting() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Baixa Manual</h1>
            <p className="text-slate-600 mt-1">Registrar baixa manual de documentos</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold">Documentos</h2>
            </div>
            <div className="text-center text-slate-500 py-12">
              <p className="mb-2">Módulo de baixa manual</p>
              <p className="text-sm">Funcionalidades a serem implementadas</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}