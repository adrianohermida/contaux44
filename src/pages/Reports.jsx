import React, { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useMultitenantAuthOptimized } from '@/components/auth/useMultitenantAuthOptimized';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExportReportButton from '@/components/dashboard/ExportReportButton';
import ReportBuilder from '@/components/dashboard/reports/ReportBuilder';
import AdvancedReportBuilder from '@/components/dashboard/AdvancedReportBuilder';
import RevenueChart from '@/components/dashboard/RevenueChart';
import PaymentStatusChart from '@/components/dashboard/PaymentStatusChart';
import TicketAnalyticsChart from '@/components/dashboard/TicketAnalyticsChart';
import ComparisonCard from '@/components/dashboard/ComparisonCard';
import PredictiveAnalyticsDashboard from '@/components/dashboard/analytics/PredictiveAnalyticsDashboard';
import ScheduledReportsManager from '@/components/dashboard/analytics/ScheduledReportsManager';
import AIReportBuilder from '@/components/dashboard/analytics/AIReportBuilder';
import CustomerInsightsDashboard from '@/components/dashboard/analytics/CustomerInsightsDashboard';
import RevenueForecaster from '@/components/dashboard/analytics/RevenueForecaster';
import ExportEngine from '@/components/dashboard/export/ExportEngine';
import AdvancedScheduler from '@/components/dashboard/export/AdvancedScheduler';
import DataEnrichment from '@/components/dashboard/export/DataEnrichment';
import AlertSystem from '@/components/dashboard/realtime/AlertSystem';
import LiveCharts from '@/components/dashboard/realtime/LiveCharts';
import MonitoringDashboard from '@/components/dashboard/realtime/MonitoringDashboard';
import MFASetup from '@/components/dashboard/security/MFASetup';
import DataEncryption from '@/components/dashboard/security/DataEncryption';
import ComplianceReporting from '@/components/dashboard/security/ComplianceReporting';
import RoleBasedAccess from '@/components/dashboard/security/RoleBasedAccess';
import AIRecommendations from '@/components/dashboard/ai/AIRecommendations';
import WorkflowAutomation from '@/components/dashboard/automation/WorkflowAutomation';
import AdvancedAnalytics from '@/components/dashboard/ai/AdvancedAnalytics';
import NLPTextAnalysis from '@/components/dashboard/ai/NLPTextAnalysis';
import StripeIntegration from '@/components/dashboard/integrations/StripeIntegration';
import GoogleWorkspaceSync from '@/components/dashboard/integrations/GoogleWorkspaceSync';
import BundleOptimizer from '@/components/dashboard/performance/BundleOptimizer';
import UsageAnalytics from '@/components/dashboard/monitoring/UsageAnalytics';
import CIPipelineManager from '@/components/dashboard/devops/CIPipelineManager';
import InfrastructureManager from '@/components/dashboard/devops/InfrastructureManager';
import AlertingManager from '@/components/dashboard/devops/AlertingManager';
import APIDocumentation from '@/components/dashboard/documentation/APIDocumentation';
import { FileText, Download, Trash2, BarChart3, TrendingUp, AlertCircle, CheckCircle, Clock, RefreshCw, Sparkles, Brain, Users, Package, Activity, Zap, Shield, Lock, Lightbulb, MessageSquare, CreditCard, Mail, GitBranch, Server, Bell, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Reports() {
  const { workspaceId, loading: authLoading } = useMultitenantAuthOptimized('internal');
  const [activeTab, setActiveTab] = useState('analytics');

  // Query para dados de análise
  const { data: analyticsData, isLoading: analyticsLoading, refetch: refetchAnalytics, error: analyticsError } = useQuery({
    queryKey: ['reports-analytics', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return null;
      try {
        const [invoices, payments, tickets, clients] = await Promise.all([
          base44.entities.Invoice.filter({ tenant_id: workspaceId }),
          base44.entities.Payment.filter({ tenant_id: workspaceId }),
          base44.entities.Ticket.filter({ tenant_id: workspaceId }),
          base44.entities.Client.filter({ tenant_id: workspaceId })
        ]);

        const today = new Date();
        const totalInvoiced = invoices.reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const overdue = invoices.filter(i => new Date(i.due_date) < today && i.status !== 'paid').reduce((sum, i) => sum + (i.total_amount || 0), 0);
        const avgTicketResolution = tickets.length > 0 ? Math.round(tickets.filter(t => t.status === 'closed').length / tickets.length * 100) : 0;

        return {
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
        };
      } catch (err) {
        console.error('Erro ao carregar analytics:', err);
        toast.error('Erro ao carregar dados de análise');
        throw err;
      }
    },
    enabled: !!workspaceId && !authLoading,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000
  });

  // Query para relatórios salvos
  const { data: reports = [], refetch: refetchReports, error: reportsError } = useQuery({
    queryKey: ['reports-list', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      return base44.entities.Report.filter({ tenant_id: workspaceId });
    },
    enabled: !!workspaceId && !authLoading,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1
  });

  const handleDelete = useCallback(async (id, name) => {
    if (!confirm(`Tem certeza que deseja deletar o relatório "${name}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await base44.entities.Report.delete(id);
      toast.success('Relatório deletado com sucesso');
      refetchReports();
    } catch (err) {
      console.error('Erro ao deletar:', err);
      toast.error('Erro ao deletar relatório. Tente novamente.');
    }
  }, [refetchReports]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  if (analyticsError && !analyticsData) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Relatórios & Análises</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-600 mb-4">Erro ao carregar dados de análise</p>
          <Button onClick={() => refetchAnalytics()} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Relatórios & Análises</h1>
          <p className="text-slate-600 mt-1">Dashboard completo de análises e relatórios</p>
        </div>
        <ExportReportButton tenantId={workspaceId} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-31 overflow-x-auto">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="predictive" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Previsões</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">IA</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Clientes</span>
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Receita</span>
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Exportar</span>
          </TabsTrigger>
          <TabsTrigger value="scheduler" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Agendador</span>
          </TabsTrigger>
          <TabsTrigger value="enrichment" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Dados</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Alertas</span>
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Live</span>
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Monitor</span>
          </TabsTrigger>
          <TabsTrigger value="mfa" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">MFA</span>
          </TabsTrigger>
          <TabsTrigger value="encryption" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Cripto</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Legal</span>
          </TabsTrigger>
          <TabsTrigger value="rbac" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="ai-rec" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">IA Rec</span>
          </TabsTrigger>
          <TabsTrigger value="workflow" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Fluxo</span>
          </TabsTrigger>
          <TabsTrigger value="ml-analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">ML</span>
          </TabsTrigger>
          <TabsTrigger value="nlp" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">NLP</span>
          </TabsTrigger>
          <TabsTrigger value="stripe" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Stripe</span>
          </TabsTrigger>
          <TabsTrigger value="google" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Google</span>
          </TabsTrigger>
          <TabsTrigger value="bundle" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Bundle</span>
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Uso</span>
          </TabsTrigger>
          <TabsTrigger value="cicd" className="flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">CI/CD</span>
          </TabsTrigger>
          <TabsTrigger value="infra" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Infra</span>
          </TabsTrigger>
          <TabsTrigger value="alerting" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Alertas</span>
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Docs</span>
          </TabsTrigger>
          <TabsTrigger value="builder" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Construtor</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Avançado</span>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Agendados</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Salvos</span>
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

              <ComparisonCard tenantId={workspaceId} />

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Clientes Ativos</h4>
                  <p className="text-3xl font-bold text-blue-600">{analyticsData.clients.filter(c => c.status === 'active').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Tickets Abertos</h4>
                  <p className="text-3xl font-bold text-amber-600">{analyticsData.tickets.filter(t => t.status === 'open').length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Taxa de Resolução</h4>
                  <p className="text-3xl font-bold text-green-600">{analyticsData.metrics.avgTicketResolution}%</p>
                </div>
              </div>
            </>
          )}
        </TabsContent>

        {/* Predictive Analytics */}
        <TabsContent value="predictive" className="mt-6">
          {analyticsData && <PredictiveAnalyticsDashboard invoices={analyticsData.invoices} />}
        </TabsContent>

        {/* AI Report Builder */}
        <TabsContent value="ai" className="mt-6">
          {workspaceId && <AIReportBuilder workspaceId={workspaceId} />}
        </TabsContent>

        {/* Customer Insights */}
        <TabsContent value="customers" className="mt-6">
          {workspaceId && <CustomerInsightsDashboard workspaceId={workspaceId} />}
        </TabsContent>

        {/* Revenue Forecaster */}
        <TabsContent value="revenue" className="mt-6">
          {analyticsData && <RevenueForecaster invoices={analyticsData.invoices} />}
        </TabsContent>

        {/* Export Engine */}
        <TabsContent value="export" className="mt-6">
          <ExportEngine data={analyticsData || {}} reportName="Relatório de Análises" />
        </TabsContent>

        {/* Advanced Scheduler */}
        <TabsContent value="scheduler" className="mt-6">
          {workspaceId && <AdvancedScheduler workspaceId={workspaceId} />}
        </TabsContent>

        {/* Data Enrichment */}
        <TabsContent value="enrichment" className="mt-6">
          {workspaceId && <DataEnrichment workspaceId={workspaceId} />}
        </TabsContent>

        {/* Alert System */}
        <TabsContent value="alerts" className="mt-6">
          {workspaceId && <AlertSystem workspaceId={workspaceId} alerts={alerts} />}
        </TabsContent>

        {/* Live Charts */}
        <TabsContent value="live" className="mt-6">
          {analyticsData && <LiveCharts data={analyticsData.invoices} metric="revenue" interval={5000} />}
        </TabsContent>

        {/* Monitoring Dashboard */}
        <TabsContent value="monitoring" className="mt-6">
          {workspaceId && <MonitoringDashboard workspaceId={workspaceId} />}
        </TabsContent>

        {/* MFA Setup */}
        <TabsContent value="mfa" className="mt-6">
          <MFASetup />
        </TabsContent>

        {/* Data Encryption */}
        <TabsContent value="encryption" className="mt-6">
          {workspaceId && <DataEncryption workspaceId={workspaceId} />}
        </TabsContent>

        {/* Compliance Reporting */}
        <TabsContent value="compliance" className="mt-6">
          {workspaceId && <ComplianceReporting workspaceId={workspaceId} />}
        </TabsContent>

        {/* Role-Based Access Control */}
        <TabsContent value="rbac" className="mt-6">
          {workspaceId && <RoleBasedAccess workspaceId={workspaceId} />}
        </TabsContent>

        {/* AI Recommendations */}
        <TabsContent value="ai-rec" className="mt-6">
          {workspaceId && <AIRecommendations workspaceId={workspaceId} />}
        </TabsContent>

        {/* Workflow Automation */}
        <TabsContent value="workflow" className="mt-6">
          {workspaceId && <WorkflowAutomation workspaceId={workspaceId} />}
        </TabsContent>

        {/* Advanced Analytics */}
        <TabsContent value="ml-analytics" className="mt-6">
          {workspaceId && <AdvancedAnalytics workspaceId={workspaceId} />}
        </TabsContent>

        {/* NLP Text Analysis */}
        <TabsContent value="nlp" className="mt-6">
          <NLPTextAnalysis />
        </TabsContent>

        {/* Stripe Integration */}
        <TabsContent value="stripe" className="mt-6">
          {workspaceId && <StripeIntegration workspaceId={workspaceId} />}
        </TabsContent>

        {/* Google Workspace Sync */}
        <TabsContent value="google" className="mt-6">
          {workspaceId && <GoogleWorkspaceSync workspaceId={workspaceId} />}
        </TabsContent>

        {/* Bundle Optimizer */}
        <TabsContent value="bundle" className="mt-6">
          <BundleOptimizer />
        </TabsContent>

        {/* Usage Analytics */}
        <TabsContent value="usage" className="mt-6">
          {workspaceId && <UsageAnalytics workspaceId={workspaceId} />}
        </TabsContent>

        {/* CI/CD Pipeline */}
        <TabsContent value="cicd" className="mt-6">
          {workspaceId && <CIPipelineManager workspaceId={workspaceId} />}
        </TabsContent>

        {/* Infrastructure */}
        <TabsContent value="infra" className="mt-6">
          {workspaceId && <InfrastructureManager workspaceId={workspaceId} />}
        </TabsContent>

        {/* Alerting */}
        <TabsContent value="alerting" className="mt-6">
          {workspaceId && <AlertingManager workspaceId={workspaceId} />}
        </TabsContent>

        {/* API Documentation */}
        <TabsContent value="docs" className="mt-6">
          <APIDocumentation />
        </TabsContent>

        {/* Report Builder */}
        <TabsContent value="builder" className="mt-6">
          {workspaceId && <ReportBuilder tenantId={workspaceId} onSuccess={() => refetchReports()} />}
        </TabsContent>

        {/* Advanced Report Builder */}
        <TabsContent value="advanced" className="mt-6">
          {workspaceId && <AdvancedReportBuilder tenantId={workspaceId} onSuccess={() => refetchReports()} />}
        </TabsContent>

        {/* Scheduled Reports */}
        <TabsContent value="scheduled" className="mt-6">
          {workspaceId && <ScheduledReportsManager workspaceId={workspaceId} />}
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
                        {report.file_url && <Button variant="ghost" size="sm" onClick={() => window.open(report.file_url)} title="Download"><Download className="w-4 h-4" /></Button>}
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(report.id, report.report_name)} title="Deletar"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>


      </Tabs>
    </div>
  );
}