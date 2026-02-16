import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import AccountingCalendarList from '../components/dashboard/AccountingCalendarList';
import AccountingCalendarForm from '../components/dashboard/AccountingCalendarForm';
import { Button } from '@/components/ui/button';

export default function AccountingCalendar() {
  const [tenantId, setTenantId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getCurrentTenant = async () => {
      try {
        const user = await base44.auth.me();
        setTenantId(user.email.split('@')[0]);
      } catch (error) {
        console.error('Erro ao obter tenant:', error);
      }
    };
    getCurrentTenant();
  }, []);

  const handleSave = () => {
    setShowForm(false);
    setRefreshKey(prev => prev + 1);
  };

  if (!tenantId) return <ProtectedRoute><DashboardLayout><div className="text-center py-8">Carregando...</div></DashboardLayout></ProtectedRoute>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Calendário Contábil</h1>
          <p className="text-slate-600 mt-1">Prazos e eventos contábeis</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Novo Evento
        </Button>
      </div>

      {showForm && (
        <AccountingCalendarForm
          tenantId={tenantId}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <AccountingCalendarList
        tenantId={tenantId}
        onEdit={() => {}}
        onRefresh={refreshKey}
      />
    </div>
  );
}