import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import { FileText, DollarSign, AlertCircle } from 'lucide-react';

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
        
        const tenantId = userData.email.split('@')[0];
        const invoiceData = await base44.entities.Invoice.filter({ tenant_id: tenantId });
        setInvoices(invoiceData);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <ProtectedRoute><DashboardLayout><div className="text-center py-8">Carregando...</div></DashboardLayout></ProtectedRoute>;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Meu Painel</h1>
            <p className="text-slate-600 mt-1">Bem-vindo, {user?.full_name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Faturas Pendentes</p>
                  <p className="text-2xl font-bold">{invoices.filter(i => i.status !== 'paid').length}</p>
                </div>
                <FileText className="w-10 h-10 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Valor Devido</p>
                  <p className="text-2xl font-bold">R$ 0,00</p>
                </div>
                <DollarSign className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Alertas</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <AlertCircle className="w-10 h-10 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Faturas Recentes</h2>
            {invoices.length === 0 ? (
              <p className="text-slate-500 text-center py-8">Nenhuma fatura disponível</p>
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
                    {invoices.map(inv => (
                      <tr key={inv.id} className="border-b hover:bg-slate-50">
                        <td className="py-2">{inv.invoice_number}</td>
                        <td className="py-2">{new Date(inv.issue_date).toLocaleDateString('pt-BR')}</td>
                        <td className="py-2 font-medium">{inv.total_amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${inv.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {inv.status === 'paid' ? 'Paga' : 'Pendente'}
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