import React from 'react';
import { ThemeProvider } from './components/hooks/useTheme';
import { AuthProvider } from './components/auth/AuthContext';
import { CacheProvider } from './components/context/CacheContext';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedInternalRoute from './components/auth/ProtectedInternalRoute';

export default function Layout({ children, currentPageName }) {
    React.useEffect(() => {
      const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
      link.rel = 'icon';
      link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/d48cce015_favicon.png';
      if (!document.querySelector("link[rel~='icon']")) {
        document.head.appendChild(link);
      }
    }, []);

    // Dashboard pages - SEMPRE usam DashboardLayout com sidebar + header consistentes
      // Lista completa de páginas do módulo admin/dashboard
      const dashboardPages = [
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