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
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - hidden on mobile, visible on desktop */}
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={handleSetCollapsed} />
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
      
      <div className="flex-1 flex flex-col">
        {/* Header - sempre visível e consistente */}
        <DashboardHeader />
        
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Performance Monitor - only in dev/staging */}
      {process.env.NODE_ENV !== 'production' && <PerformanceMonitor />}
    </div>
  );
});

export default DashboardLayout;