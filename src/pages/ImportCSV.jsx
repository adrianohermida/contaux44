import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ImportCSV() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6 max-w-2xl">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Importação CSV</h1>
            <p className="text-slate-600 mt-1">Importar dados contábeis</p>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-900 font-semibold mb-1">Arrastar arquivo aqui</p>
              <p className="text-slate-500 text-sm">ou clique para selecionar um arquivo CSV</p>
              <p className="text-slate-400 text-xs mt-2">Máximo 5MB - Formato CSV</p>
            </div>

            <div className="mt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Selecionar Arquivo
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}