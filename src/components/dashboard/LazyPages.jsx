import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load de páginas do dashboard
export const LazyDashboard = lazy(() => import('../../pages/Dashboard'));
export const LazyClients = lazy(() => import('../../pages/Clients'));
export const LazyTickets = lazy(() => import('../../pages/Tickets'));
export const LazyLegalProcesses = lazy(() => import('../../pages/LegalProcesses'));
export const LazyInvoicing = lazy(() => import('../../pages/Invoicing'));
export const LazyPayments = lazy(() => import('../../pages/Payments'));
export const LazyQuotes = lazy(() => import('../../pages/Quotes'));
export const LazySales = lazy(() => import('../../pages/Sales'));
export const LazyCashFlow = lazy(() => import('../../pages/CashFlow'));
export const LazyServices = lazy(() => import('../../pages/Services'));
export const LazyEntries = lazy(() => import('../../pages/Entries'));
export const LazyImportCSV = lazy(() => import('../../pages/ImportCSV'));
export const LazyBankReconciliation = lazy(() => import('../../pages/BankReconciliation'));
export const LazyManualPosting = lazy(() => import('../../pages/ManualPosting'));
export const LazyChartOfAccounts = lazy(() => import('../../pages/ChartOfAccounts'));
export const LazyTaxInvoices = lazy(() => import('../../pages/TaxInvoices'));
export const LazyAccountingCalendar = lazy(() => import('../../pages/AccountingCalendar'));
export const LazyAutomations = lazy(() => import('../../pages/Automations'));
export const LazyReports = lazy(() => import('../../pages/Reports'));
export const LazyCommunication = lazy(() => import('../../pages/Communication'));
export const LazyClientPortal = lazy(() => import('../../pages/ClientPortal'));
export const LazySettings = lazy(() => import('../../pages/SettingsPage'));
export const LazyBlogManager = lazy(() => import('../../pages/BlogManager'));

// Lazy load de componentes pesados
export const LazyBlogEditor = lazy(() => import('./blog/BlogEditor'));
export const LazyReportForm = lazy(() => import('./ReportForm'));
export const LazyDocumentTemplateForm = lazy(() => import('./DocumentTemplateForm'));
export const LazyAIAssistant = lazy(() => import('./blog/AIAssistant'));
export const LazyAnalyticsDashboard = lazy(() => import('./AnalyticsDashboard'));
export const LazyReportsCharts = lazy(() => import('./ReportsCharts'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[300px]">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
      <p className="text-slate-600 text-sm">Carregando módulo...</p>
    </div>
  </div>
);

export function LazyComponentWrapper({ children }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  );
}