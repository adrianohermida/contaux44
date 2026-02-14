import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';

export default function Clients() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">CRM - Clientes</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-slate-600">Módulo de clientes será implementado no Sprint 1</p>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}