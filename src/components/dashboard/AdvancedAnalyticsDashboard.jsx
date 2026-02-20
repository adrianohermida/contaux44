import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Download, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdvancedAnalyticsDashboard({ clientId, tenantId }) {
  const [dateRange, setDateRange] = useState({ from: 90, to: 0 }); // últimos 90 dias
  const [compareMode, setCompareMode] = useState(false);
  const [comparePeriod, setComparePeriod] = useState({ from: 180, to: 90 });

  // Calcular datas
  const getDateRange = (daysAgo) => {
    const today = new Date();
    return new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  };

  const startDate = getDateRange(dateRange.from);
  const endDate = getDateRange(dateRange.to);

  // Query: Dados de faturamento
  const { data: invoiceData, isLoading: invoiceLoading } = useQuery({
    queryKey: ['analytics-invoices', clientId, tenantId, dateRange],
    queryFn: async () => {
      if (!clientId || !tenantId) return null;
      
      const invoices = await base44.entities.Invoice.filter({
        client_id: clientId,
        tenant_id: tenantId
      });

      const filtered = invoices.filter(inv => {
        const invDate = new Date(inv.issue_date);
        return invDate >= startDate && invDate <= endDate;
      });

      // Agrupar por data
      const grouped = {};
      filtered.forEach(inv => {
        const date = new Date(inv.issue_date).toISOString().split('T')[0];
        if (!grouped[date]) grouped[date] = { date, amount: 0, count: 0, paid: 0 };
        grouped[date].amount += inv.total_amount || 0;
        grouped[date].count += 1;
        if (inv.status === 'paid') grouped[date].paid += 1;
      });

      return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    enabled: !!clientId && !!tenantId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  // Query: Status das faturas (Pie chart)
  const { data: invoiceStatusData, isLoading: statusLoading } = useQuery({
    queryKey: ['analytics-invoice-status', clientId, tenantId],
    queryFn: async () => {
      if (!clientId || !tenantId) return null;
      
      const invoices = await base44.entities.Invoice.filter({
        client_id: clientId,
        tenant_id: tenantId
      });

      const statusCounts = {};
      invoices.forEach(inv => {
        statusCounts[inv.status] = (statusCounts[inv.status] || 0) + 1;
      });

      return Object.entries(statusCounts).map(([status, count]) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: count,
        status
      }));
    },
    enabled: !!clientId && !!tenantId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  // Query: Pagamentos por período
  const { data: paymentData, isLoading: paymentLoading } = useQuery({
    queryKey: ['analytics-payments', clientId, tenantId, dateRange],
    queryFn: async () => {
      if (!clientId || !tenantId) return null;
      
      const payments = await base44.entities.Payment.filter({
        client_id: clientId,
        tenant_id: tenantId
      });

      const filtered = payments.filter(pay => {
        const payDate = new Date(pay.payment_date);
        return payDate >= startDate && payDate <= endDate;
      });

      const grouped = {};
      filtered.forEach(pay => {
        const date = new Date(pay.payment_date).toISOString().split('T')[0];
        if (!grouped[date]) grouped[date] = { date, amount: 0, count: 0 };
        grouped[date].amount += pay.amount || 0;
        grouped[date].count += 1;
      });

      return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    enabled: !!clientId && !!tenantId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  // Calcular KPIs
  const kpis = useMemo(() => {
    if (!invoiceData || !paymentData) return null;

    const totalInvoices = invoiceData.reduce((sum, d) => sum + d.amount, 0);
    const totalPaid = paymentData.reduce((sum, d) => sum + d.amount, 0);
    const avgInvoice = totalInvoices / invoiceData.length || 0;
    const receivablePct = totalInvoices > 0 ? (totalPaid / totalInvoices) * 100 : 0;

    return {
      totalInvoices: totalInvoices.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      totalPaid: totalPaid.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      avgInvoice: avgInvoice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      receivablePct: receivablePct.toFixed(1) + '%'
    };
  }, [invoiceData, paymentData]);

  const handleExport = async () => {
    try {
      const data = {
        period: `${startDate.toLocaleDateString()} a ${endDate.toLocaleDateString()}`,
        invoices: invoiceData,
        payments: paymentData,
        status: invoiceStatusData,
        kpis
      };

      const csv = generateCSV(data);
      downloadCSV(csv, `analytics-${clientId}-${new Date().toISOString().split('T')[0]}.csv`);
      toast.success('Relatório exportado com sucesso');
    } catch (error) {
      toast.error('Erro ao exportar relatório');
    }
  };

  const generateCSV = (data) => {
    let csv = `Análise Avançada - ${data.period}\n\n`;
    csv += `KPI,Valor\n`;
    csv += `Faturamento Total,${data.kpis.totalInvoices}\n`;
    csv += `Pagamentos Recebidos,${data.kpis.totalPaid}\n`;
    csv += `Média por Fatura,${data.kpis.avgInvoice}\n`;
    csv += `Taxa de Recebimento,${data.kpis.receivablePct}\n`;
    
    return csv;
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  const isLoading = invoiceLoading || statusLoading || paymentLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Analytics Avançada</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => setDateRange({ from: 30, to: 0 })}
            size="sm"
          >
            30d
          </Button>
          <Button
            variant="outline"
            onClick={() => setDateRange({ from: 90, to: 0 })}
            size="sm"
          >
            90d
          </Button>
          <Button
            variant="outline"
            onClick={() => setDateRange({ from: 365, to: 0 })}
            size="sm"
          >
            1 Ano
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={isLoading}
            className="gap-2"
            size="sm"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Carregando dados...</span>
        </div>
      ) : (
        <>
          {/* KPIs */}
          {kpis && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">Faturamento</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{kpis.totalInvoices}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">Recebimentos</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{kpis.totalPaid}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">Média/Fatura</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{kpis.avgInvoice}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">Taxa Recebimento</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{kpis.receivablePct}</p>
              </div>
            </div>
          )}

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Faturamento Timeline */}
            {invoiceData && invoiceData.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Faturamento por Período</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={invoiceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#3b82f6" name="Faturamento" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Status Distribuição */}
            {invoiceStatusData && invoiceStatusData.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Distribuição de Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={invoiceStatusData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                      {invoiceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Pagamentos Timeline */}
            {paymentData && paymentData.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 lg:col-span-2">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Pagamentos Recebidos</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={paymentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#10b981" name="Pagamentos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}