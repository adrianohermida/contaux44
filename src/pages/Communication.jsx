import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import CommunicationCenter from '../components/CommunicationCenter';

export default function Communication() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Central de Comunicação</h1>
          <CommunicationCenter />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}