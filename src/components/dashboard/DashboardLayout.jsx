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
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors w-full">
      {/* Mobile Menu - sempre no topo em mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <MobileMenu />
      </div>

      {/* Sidebar - hidden on mobile, visible on desktop */}
      <div className={`hidden md:flex md:flex-col md:h-screen transition-all duration-300 ${sidebarCollapsed ? 'md:w-16' : 'md:w-64'}`}>
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={handleSetCollapsed} />
      </div>
      
      <div className="flex-1 flex flex-col min-h-screen md:min-h-screen overflow-x-hidden">
        {/* Mobile padding para menu */}
        <div className="h-16 md:h-0" />
        
        {/* Header - sempre visível e consistente */}
        <DashboardHeader />
        
        <main className="flex-1 p-3 sm:p-4 md:p-6 bg-white md:bg-slate-50 dark:bg-slate-900 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Performance Monitor - only in dev/staging */}
      {process.env.NODE_ENV !== 'production' && <PerformanceMonitor />}
    </div>
  );
});

export default DashboardLayout;