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
    <div className="flex min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Mobile Menu - sempre no topo em mobile */}
      <MobileMenu />

      {/* Sidebar - hidden on mobile, visible on desktop, FIXED position */}
      <aside className={`hidden md:block md:fixed md:left-0 md:top-0 md:h-screen md:z-30 transition-all duration-300 ${sidebarCollapsed ? 'md:w-16' : 'md:w-64'}`}>
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={handleSetCollapsed} />
      </aside>
      
      {/* Main Content - com margem para compensar sidebar fixo */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        {/* Mobile padding para menu */}
        <div className="h-16 md:h-0" />
        
        {/* Header - sempre visível e consistente */}
        <DashboardHeader />
        
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-950 pb-24 md:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Performance Monitor - only in dev/staging */}
      {process.env.NODE_ENV !== 'production' && <PerformanceMonitor />}
    </div>
  );
});

export default DashboardLayout;