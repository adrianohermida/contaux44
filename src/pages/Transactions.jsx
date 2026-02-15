import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, ArrowDownLeft, Plus, Download, Search } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Transactions() {
  const { tenantId } = useUserAndTenant();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const loadData = useCallback(async () => {
    if (!tenantId) return;
    
    try {
      const accounts = await base44.entities.BankAccount.filter({ tenant_id: tenantId });
      setBankAccounts(accounts);

      const txns = await base44.entities.Transaction.filter(
        { tenant_id: tenantId },
        '-transaction_date',
        200
      );
      setTransactions(txns);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredTransactions = transactions.filter(txn => {
    const matchesAccount = selectedAccount === 'all' || txn.bank_account_id === selectedAccount;
    const matchesType = filterType === 'all' || txn.transaction_type === filterType;
    const matchesSearch = txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.counterparty?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAccount && matchesType && matchesSearch;
  });

  const stats = {
    totalInflows: filteredTransactions
      .filter(t => t.transaction_type === 'credit').reduce((sum, t) => sum + t.amount, 0),
    totalOutflows: filteredTransactions
      .filter(t => t.transaction_type === 'debit').reduce((sum, t) => sum + t.amount, 0),
    pending: filteredTransactions.filter(t => t.status === 'pending').length,
    reconciled: filteredTransactions.filter(t => t.status === 'reconciled').length
  };

  if (!tenantId) return <ProtectedRoute><DashboardLayout><div className="text-center py-8">Carregando...</div></DashboardLayout></ProtectedRoute>;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Transações Bancárias</h1>
              <p className="text-slate-600 mt-1">Histórico de movimentações bancárias</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Entradas</p>
                    <p className="text-2xl font-bold text-green-600">R$ {stats.totalInflows.toFixed(2)}</p>
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Saídas</p>
                    <p className="text-2xl font-bold text-red-600">R$ {stats.totalOutflows.toFixed(2)}</p>
                  </div>
                  <ArrowDownLeft className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div>
                  <p className="text-sm text-slate-600">Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div>
                  <p className="text-sm text-slate-600">Reconciliadas</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.reconciled}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[250px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Buscar por descrição ou beneficiário..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Conta Bancária" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as contas</SelectItem>
                    {bankAccounts.map(acc => (
                      <SelectItem key={acc.id} value={acc.id}>{acc.bank_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="debit">Débito</SelectItem>
                    <SelectItem value="credit">Crédito</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transações */}
          <Card>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-8">Carregando transações...</div>
              ) : filteredTransactions.length === 0 ? (
                <div className="text-center py-8 text-slate-600">Nenhuma transação encontrada</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-200">
                      <tr>
                        <th className="text-left p-3">Data</th>
                        <th className="text-left p-3">Descrição</th>
                        <th className="text-left p-3">Beneficiário</th>
                        <th className="text-left p-3">Tipo</th>
                        <th className="text-right p-3">Valor</th>
                        <th className="text-left p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((txn) => (
                        <tr key={txn.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-3 text-xs text-slate-600">
                            {format(new Date(txn.transaction_date), 'dd/MM/yyyy', { locale: ptBR })}
                          </td>
                          <td className="p-3 font-medium">{txn.description}</td>
                          <td className="p-3 text-slate-600">{txn.counterparty}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              txn.transaction_type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {txn.transaction_type === 'credit' ? 'Crédito' : 'Débito'}
                            </span>
                          </td>
                          <td className="p-3 text-right font-medium">
                            R$ {txn.amount.toFixed(2)}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              txn.status === 'reconciled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {txn.status === 'reconciled' ? 'Reconciliada' : 'Pendente'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}