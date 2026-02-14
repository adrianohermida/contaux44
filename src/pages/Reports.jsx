import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import { BarChart3 } from 'lucide-react';

export default function Reports() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Relatórios</h1>
            <p className="text-slate-600 mt-1">Análise e visualização de dados</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Receita por Cliente</h3>
              </div>
              <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                <p className="text-slate-400">Gráfico será implementado</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold">Gastos por Categoria</h3>
              </div>
              <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                <p className="text-slate-400">Gráfico será implementado</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold">Fluxo de Caixa</h3>
              </div>
              <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                <p className="text-slate-400">Gráfico será implementado</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold">Processos Judiciais</h3>
              </div>
              <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                <p className="text-slate-400">Gráfico será implementado</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}