import React, { useState, useEffect, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useUserAndTenantOptimized } from '@/components/hooks/useUserAndTenantOptimized';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExportReportButton from '@/components/dashboard/ExportReportButton';
import ReportBuilder from '@/components/dashboard/reports/ReportBuilder';
import AdvancedReportBuilder from '@/components/dashboard/AdvancedReportBuilder';
import RevenueChart from '@/components/dashboard/RevenueChart';
import PaymentStatusChart from '@/components/dashboard/PaymentStatusChart';
import TicketAnalyticsChart from '@/components/dashboard/TicketAnalyticsChart';
import ComparisonCard from '@/components/dashboard/ComparisonCard';
import { FileText, Download, Trash2, BarChart3, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Reports() {
  const { tenantId } = useUserAndTenantOptimized();
  const [reports, setReports] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [activeTab, setActiveTab] = useState('analytics');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!tenantId) return;
      try {
        const [reportsList, invoices, payments, tickets, clients] = await Promise.all([
          base44.entities.Report.filter({ tenant_id: tenantId }),
          base44.entities.Invoice.filter({ tenant_id: tenantId }),
          base44.entities.Payment.filter({ tenant_id: tenantId }),
          base44.entities.Ticket.filter({ tenant_id: tenantId }),
          base44.entities.Client.filter({ tenant_id: tenantId })
        ]);

        const today = new Date();
        const totalInvoiced = invoices.reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const overdue = invoices.filter(i => new Date(i.due_date) < today && i.status !== 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const avgTicketResolution = tickets.length > 0 ? Math.round(tickets.filter(t => t.status === 'closed').length / tickets.length * 100) : 0;

        setReports(reportsList || []);
        setAnalyticsData({
          invoices,
          payments,
          tickets,
          clients,
          metrics: {
            totalInvoiced,
            totalPaid,
            overdue,
            avgTicketResolution,
            paymentRate: totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 0
          }
        });
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [tenantId]);

  const handleDelete = async (id) => {
    if (confirm('Deletar este relatório?')) {
      await base44.entities.Report.delete(id);
      setReports(reports.filter(r => r.id !== id));
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Relatórios & Análises</h1>
        <ExportReportButton tenantId={tenantId} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="builder" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Construtor</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Salvos</span>
          </TabsTrigger>
          <TabsTrigger value="historic" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Histórico</span>
          </TabsTrigger>
        </TabsList>

        {/* Analytics Dashboard */}
        <TabsContent value="analytics" className="mt-6 space-y-6">
          {analyticsData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-600 text-sm">Total Faturado</p>
                      <p className="text-2xl font-bold mt-1">R$ {analyticsData.metrics.totalInvoiced.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-600 text-sm">Total Recebido</p>
                      <p className="text-2xl font-bold mt-1">R$ {analyticsData.metrics.totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-600 text-sm">Vencido</p>
                      <p className="text-2xl font-bold mt-1">R$ {analyticsData.metrics.overdue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-amber-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-600 text-sm">Taxa de Recebimento</p>
                      <p className="text-2xl font-bold mt-1">{analyticsData.metrics.paymentRate}%</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500 opacity-20" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Receita Mensal</h3>
                  <RevenueChart invoices={analyticsData.invoices} />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Status de Pagamentos</h3>
                  <PaymentStatusChart invoices={analyticsData.invoices} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Tickets por Status</h3>
                <TicketAnalyticsChart tickets={analyticsData.tickets} />
              </div>

              <ComparisonCard tenantId={tenantId} />

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Clientes Ativos</h4>
                  <p className="text-3xl font-bold text-blue-600">{analyticsData.clients.filter(c => c.status === 'active').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Tickets Abertos</h4>
                  <p className="text-3xl font-bold text-yellow-600">{analyticsData.tickets.filter(t => t.status === 'open').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Taxa de Resolução</h4>
                  <p className="text-3xl font-bold text-green-600">{analyticsData.metrics.avgTicketResolution}%</p>
                </div>
              </div>
            </>
          )}
        </TabsContent>

        {/* Report Builder */}
        <TabsContent value="builder" className="mt-6">
          {tenantId && <ReportBuilder tenantId={tenantId} />}
        </TabsContent>

        {/* Saved Reports */}
        <TabsContent value="saved" className="mt-6">
          {reports.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">Nenhum relatório salvo</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Tipo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Período</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium">{report.report_name}</td>
                      <td className="px-6 py-4 text-sm capitalize">{report.report_type}</td>
                      <td className="px-6 py-4 text-sm">{new Date(report.period_start).toLocaleDateString('pt-BR')} - {new Date(report.period_end).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-medium ${report.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{report.status}</span></td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {report.file_url && <Button variant="ghost" size="sm" onClick={() => window.open(report.file_url)}><Download className="w-4 h-4" /></Button>}
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(report.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* Historic */}
        <TabsContent value="historic" className="mt-6">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600">Histórico de relatórios</p>
            <p className="text-xs text-slate-500 mt-2">Em desenvolvimento...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}