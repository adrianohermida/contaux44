import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import ReportsCharts from '../components/dashboard/ReportsCharts';

export default function Reports() {
  const [tenantId, setTenantId] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await base44.auth.me();
        const tenant = user.email.split('@')[0];
        setTenantId(tenant);
        
        const invData = await base44.entities.Invoice.filter({ tenant_id: tenant });
        const payData = await base44.entities.Payment.filter({ tenant_id: tenant });
        
        setInvoices(invData);
        setPayments(payData);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total_amount, 0);
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total_amount, 0);
  const totalPending = totalRevenue - totalPaid;

  if (loading) return <ProtectedRoute><DashboardLayout><div className="text-center py-8">Carregando...</div></DashboardLayout></ProtectedRoute>;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Relatórios</h1>
            <p className="text-slate-600 mt-1">Análise e visualização de dados</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg shadow p-6 border-l-4 border-blue-500">
              <p className="text-slate-600 text-sm mb-1">Receita Total</p>
              <p className="text-2xl font-bold text-blue-600">{totalRevenue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
            </div>
            <div className="bg-green-50 rounded-lg shadow p-6 border-l-4 border-green-500">
              <p className="text-slate-600 text-sm mb-1">Valor Recebido</p>
              <p className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
            </div>
            <div className="bg-red-50 rounded-lg shadow p-6 border-l-4 border-red-500">
              <p className="text-slate-600 text-sm mb-1">Pendência</p>
              <p className="text-2xl font-bold text-red-600">{totalPending.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
            </div>
          </div>

          <ReportsCharts invoices={invoices} payments={payments} />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}