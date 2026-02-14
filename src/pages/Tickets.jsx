import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';

export default function Tickets() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Helpdesk - Tickets</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-slate-600">Módulo de tickets será implementado no Sprint 2</p>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}