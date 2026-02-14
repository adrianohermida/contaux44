import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import { TrendingUp } from 'lucide-react';

export default function Sales() {
  const [tenantId, setTenantId] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await base44.auth.me();
        const tenant = user.email.split('@')[0];
        setTenantId(tenant);
        
        const data = await base44.entities.Invoice.filter({ tenant_id: tenant });
        setInvoices(data);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total_amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;

  if (loading) return <ProtectedRoute><DashboardLayout><div className="text-center py-8">Carregando...</div></DashboardLayout></ProtectedRoute>;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Vendas</h1>
            <p className="text-slate-600 mt-1">Análise de faturamento e vendas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-slate-600 text-sm mb-1">Receita Total</p>
              <p className="text-3xl font-bold">{totalRevenue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                Últimas 30 dias
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-slate-600 text-sm mb-1">Faturas Pagas</p>
              <p className="text-3xl font-bold">{paidInvoices}</p>
              <p className="text-slate-500 text-sm mt-2">De {invoices.length} faturas</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-slate-600 text-sm mb-1">Taxa de Conversão</p>
              <p className="text-3xl font-bold">{invoices.length > 0 ? Math.round((paidInvoices / invoices.length) * 100) : 0}%</p>
              <p className="text-slate-500 text-sm mt-2">Faturas concluídas</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Últimas Vendas</h2>
            {invoices.length === 0 ? (
              <p className="text-center text-slate-500 py-8">Nenhuma venda registrada</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-2">Número</th>
                      <th className="text-left py-2">Data</th>
                      <th className="text-left py-2">Valor</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date)).slice(0, 10).map(inv => (
                      <tr key={inv.id} className="border-b hover:bg-slate-50">
                        <td className="py-2">{inv.invoice_number}</td>
                        <td className="py-2">{new Date(inv.issue_date).toLocaleDateString('pt-BR')}</td>
                        <td className="py-2 font-medium">{inv.total_amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            inv.status === 'paid' ? 'bg-green-100 text-green-800' :
                            inv.status === 'overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}