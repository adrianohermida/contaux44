import React from 'react';
import { ThemeProvider } from './components/hooks/useTheme';
import { AuthProvider } from './components/auth/AuthContext';
import { CacheProvider } from './components/context/CacheContext';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedInternalRoute from './components/auth/ProtectedInternalRoute';
import BottomNav from './components/BottomNav';
import RouteTransition from './components/RouteTransition';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

export default function Layout({ children, currentPageName }) {
  const setupTheme = () => {
    try {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = saved ? saved === 'dark' : prefersDark;
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (e) {
      // Ignore errors
    }
  };

  const setupMobileEnhancements = () => {
    const style = document.createElement('style');
    style.textContent = `
      /* Safe area support */
      html { 
        overscroll-behavior: none;
        -webkit-user-select: none;
      }
      body { 
        -webkit-user-select: none;
        -webkit-touch-callout: none;
      }
      input, textarea, select {
        -webkit-user-select: text;
        user-select: text;
      }
      button, [role="button"], a, [tabindex] {
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      * { box-sizing: border-box; }
      @supports (padding: env(safe-area-inset-top)) {
        body { padding-top: env(safe-area-inset-top); }
      }
      @supports (padding: env(safe-area-inset-bottom)) {
        main { padding-bottom: env(safe-area-inset-bottom); }
      }
    `;
    document.head.appendChild(style);
  };

  React.useEffect(() => {
    setupTheme();
    setupMobileEnhancements();
    
    // Listen for system theme changes
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      if (!localStorage.getItem('theme')) {
        setupTheme();
      }
    };
    darkModeQuery.addEventListener('change', handleThemeChange);
    
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/d48cce015_favicon.png';
    if (!document.querySelector("link[rel~='icon']")) {
      document.head.appendChild(link);
    }

    // Remove old style - it's now in setupMobileEnhancements

    return () => {
      darkModeQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  if (DASHBOARD_PAGES.includes(currentPageName)) {
    return (
      <AuthProvider>
        <CacheProvider>
          <ThemeProvider>
            <DashboardLayout>
              <ProtectedInternalRoute>
                <RouteTransition>
                  {children}
                </RouteTransition>
              </ProtectedInternalRoute>
            </DashboardLayout>
            <BottomNav />
            <ReactQueryDevtools initialIsOpen={false} />
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
              <RouteTransition>
                {children}
              </RouteTransition>
            </main>
            <Footer />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  );
}