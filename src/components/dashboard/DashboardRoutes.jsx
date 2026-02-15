import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LazyPageWrapper from './LazyPageWrapper';
import {
  LazyDashboard,
  LazyClients,
  LazyTickets,
  LazyLegalProcesses,
  LazyInvoicing,
  LazyPayments,
  LazyQuotes,
  LazySales,
  LazyCashFlow,
  LazyServices,
  LazyEntries,
  LazyImportCSV,
  LazyBankReconciliation,
  LazyManualPosting,
  LazyChartOfAccounts,
  LazyTaxInvoices,
  LazyAccountingCalendar,
  LazyAutomations,
  LazyReports,
  LazyCommunication,
  LazyClientPortal,
  LazySettings,
  LazyBlogManager
} from './LazyPages';

const LazyAnalytics = lazy(() => import('../../pages/Analytics'));
const LazyAuditLogs = lazy(() => import('../../pages/AuditLogs'));
const LazySecurityCenter = lazy(() => import('../../pages/SecurityCenter'));
const LazyTransactions = lazy(() => import('../../pages/Transactions'));
const LazyCashFlowForecast = lazy(() => import('../../pages/CashFlowForecast'));
const LazyAdvancedReports = lazy(() => import('../../pages/AdvancedReports'));
const LazyDocumentManagement = lazy(() => import('../../pages/DocumentManagement'));

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={
        <LazyPageWrapper>
          <LazyDashboard />
        </LazyPageWrapper>
      } />
      
      <Route path="/clients" element={
        <LazyPageWrapper>
          <LazyClients />
        </LazyPageWrapper>
      } />
      
      <Route path="/tickets" element={
        <LazyPageWrapper>
          <LazyTickets />
        </LazyPageWrapper>
      } />
      
      <Route path="/legalprocesses" element={
        <LazyPageWrapper>
          <LazyLegalProcesses />
        </LazyPageWrapper>
      } />
      
      {/* Financial Routes */}
      <Route path="/invoicing" element={
        <LazyPageWrapper>
          <LazyInvoicing />
        </LazyPageWrapper>
      } />
      
      <Route path="/payments" element={
        <LazyPageWrapper>
          <LazyPayments />
        </LazyPageWrapper>
      } />
      
      <Route path="/quotes" element={
        <LazyPageWrapper>
          <LazyQuotes />
        </LazyPageWrapper>
      } />
      
      <Route path="/sales" element={
        <LazyPageWrapper>
          <LazySales />
        </LazyPageWrapper>
      } />
      
      <Route path="/cashflow" element={
        <LazyPageWrapper>
          <LazyCashFlow />
        </LazyPageWrapper>
      } />
      
      {/* Services */}
      <Route path="/services" element={
        <LazyPageWrapper>
          <LazyServices />
        </LazyPageWrapper>
      } />
      
      {/* Accounting Routes */}
      <Route path="/entries" element={
        <LazyPageWrapper>
          <LazyEntries />
        </LazyPageWrapper>
      } />
      
      <Route path="/importcsv" element={
        <LazyPageWrapper>
          <LazyImportCSV />
        </LazyPageWrapper>
      } />
      
      <Route path="/bankreconciliation" element={
        <LazyPageWrapper>
          <LazyBankReconciliation />
        </LazyPageWrapper>
      } />
      
      <Route path="/manualposting" element={
        <LazyPageWrapper>
          <LazyManualPosting />
        </LazyPageWrapper>
      } />
      
      <Route path="/chartofaccounts" element={
        <LazyPageWrapper>
          <LazyChartOfAccounts />
        </LazyPageWrapper>
      } />
      
      {/* Other Routes */}
      <Route path="/taxinvoices" element={
        <LazyPageWrapper>
          <LazyTaxInvoices />
        </LazyPageWrapper>
      } />
      
      <Route path="/accountingcalendar" element={
        <LazyPageWrapper>
          <LazyAccountingCalendar />
        </LazyPageWrapper>
      } />
      
      <Route path="/automations" element={
        <LazyPageWrapper>
          <LazyAutomations />
        </LazyPageWrapper>
      } />
      
      <Route path="/reports" element={
        <LazyPageWrapper>
          <LazyReports />
        </LazyPageWrapper>
      } />
      
      <Route path="/analytics" element={
        <LazyPageWrapper>
          <LazyAnalytics />
        </LazyPageWrapper>
      } />
      
      <Route path="/communication" element={
        <LazyPageWrapper>
          <LazyCommunication />
        </LazyPageWrapper>
      } />
      
      <Route path="/clientportal" element={
        <LazyPageWrapper>
          <LazyClientPortal />
        </LazyPageWrapper>
      } />
      
      <Route path="/settings" element={
        <LazyPageWrapper>
          <LazySettings />
        </LazyPageWrapper>
      } />
      
      <Route path="/blogmanager" element={
        <LazyPageWrapper>
          <LazyBlogManager />
        </LazyPageWrapper>
      } />
      
      <Route path="/auditlogs" element={
        <LazyPageWrapper>
          <LazyAuditLogs />
        </LazyPageWrapper>
      } />
      
      <Route path="/securitycenter" element={
        <LazyPageWrapper>
          <LazySecurityCenter />
        </LazyPageWrapper>
      } />
      
      <Route path="/transactions" element={
        <LazyPageWrapper>
          <LazyTransactions />
        </LazyPageWrapper>
      } />
      
      <Route path="/cashflowforecast" element={
        <LazyPageWrapper>
          <LazyCashFlowForecast />
        </LazyPageWrapper>
      } />
      
      <Route path="/advancedreports" element={
        <LazyPageWrapper>
          <LazyAdvancedReports />
        </LazyPageWrapper>
      } />
      
      <Route path="/documentmanagement" element={
        <LazyPageWrapper>
          <LazyDocumentManagement />
        </LazyPageWrapper>
      } />
      
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}