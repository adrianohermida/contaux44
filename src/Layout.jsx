import React from 'react';
import { ThemeProvider } from './components/hooks/useTheme';
import { AuthProvider } from './components/auth/AuthContext';
import { CacheProvider } from './components/context/CacheContext';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedInternalRoute from './components/auth/ProtectedInternalRoute';

// ✅ Constante FORA do componente - criada uma única vez
const DASHBOARD_PAGES = [
  'Dashboard', 'VirtualCounter', 'Clients', 'Tickets', 'LegalProcesses', 
  'Invoicing', 'Payments', 'Quotes', 'Sales', 'CashFlow', 
        'Services', 'Entries', 'ImportCSV', 'BankReconciliation', 
        'ManualPosting', 'ChartOfAccounts', 'TaxInvoices', 
        'AccountingCalendar', 'Automations', 'Reports', 'Communication', 
        'ClientPortal', 'SettingsPage', 'AuditLogs', 
        'DocumentManagement', 'SecurityCenter', 
        'CashFlowForecast', 'Transactions', 'BlogManager', 'RLSDebugger'
      ];
    
    if (dashboardPages.includes(currentPageName)) {
      return (
        <AuthProvider>
          <CacheProvider>
            <ThemeProvider>
              <DashboardLayout>
                <ProtectedInternalRoute>
                  {children}
                </ProtectedInternalRoute>
              </DashboardLayout>
            </ThemeProvider>
          </CacheProvider>
        </AuthProvider>
      );
    }

    return (
      <AuthProvider>
        <CacheProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </CacheProvider>
      </AuthProvider>
    );
}