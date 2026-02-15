import React, { useEffect, useState } from 'react';
import ProtectedClientRoute from '../components/auth/ProtectedClientRoute';
import { base44 } from '@/api/base44Client';
import { useMultitenantAuth } from '../components/auth/useMultitenantAuth';
import { FileText, CreditCard, Eye, Download } from 'lucide-react';

export default function ClientPanel() {
  const { user, loading, workspaceId } = useMultitenantAuth('client');
  const [invoices, setInvoices] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (user && workspaceId) {
      loadInvoices();
    }
  }, [user, workspaceId]);

  const loadInvoices = async () => {
    try {
      setDataLoading(true);
      // Buscar apenas faturas do cliente logado
      const clientInvoices = await base44.entities.Invoice.filter({
        workspace_id: workspaceId,
        client_id: user.id
      });
      setInvoices(clientInvoices);
    } catch (error) {
      console.error('Erro ao carregar faturas:', error);
    } finally {
      setDataLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ProtectedClientRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Meu Painel</h1>
            <p className="text-slate-600 mt-2">
              Bem-vindo, {user?.full_name || 'Cliente'}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total de Faturas</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{invoices.length}</p>
                </div>
                <FileText className="w-10 h-10 text-blue-600 opacity-10" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Pendentes</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {invoices.filter(i => i.status !== 'paid').length}
                  </p>
                </div>
                <CreditCard className="w-10 h-10 text-amber-600 opacity-10" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Pagas</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {invoices.filter(i => i.status === 'paid').length}
                  </p>
                </div>
                <Eye className="w-10 h-10 text-green-600 opacity-10" />
              </div>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Minhas Faturas</h2>
            </div>

            {dataLoading ? (
              <div className="p-6 text-center text-slate-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : invoices.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                Nenhuma fatura encontrada
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                        Fatura
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {invoices.map(invoice => (
                      <tr key={invoice.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          {invoice.invoice_number}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(invoice.issue_date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                          R$ {invoice.total_amount?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'paid' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {invoice.status === 'paid' ? 'Paga' : 'Pendente'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedClientRoute>
  );
}