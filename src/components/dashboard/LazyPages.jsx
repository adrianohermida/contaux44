
import { lazy } from 'react';

// Lazy load all dashboard pages
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
