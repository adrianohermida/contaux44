import React, { useState, useCallback, memo } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import MobileMenu from './MobileMenu';
import PerformanceMonitor from './PerformanceMonitor';

/**
 * Layout padrão do dashboard - garante consistência do sidebar + header
 * Deve ser usado através do Layout.js para todas as páginas dashboard
 */
const DashboardLayout = memo(function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });
  
  const handleSetCollapsed = useCallback((value) => {
    setSidebarCollapsed(value);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors flex-col md:flex-row">
      {/* Mobile Menu - sempre no topo em mobile */}
      <div className="md:hidden">
        <MobileMenu />
      </div>

      {/* Sidebar - hidden on mobile, visible on desktop */}
      <div className="hidden md:flex md:flex-col">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={handleSetCollapsed} />
      </div>
      
      <div className="flex-1 flex flex-col min-h-screen md:min-h-auto">
        {/* Header - sempre visível e consistente */}
        <DashboardHeader />
        
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden dark:bg-slate-900 bg-white md:bg-slate-50">
          {children}
        </main>
      </div>

      {/* Performance Monitor - only in dev/staging */}
      {process.env.NODE_ENV !== 'production' && <PerformanceMonitor />}
    </div>
  );
});

export default DashboardLayout;