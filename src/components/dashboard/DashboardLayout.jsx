import React, { useState, useCallback, memo } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

/**
 * Layout padrão do dashboard - garante consistência do sidebar + header
 * Deve ser usado através do Layout.js para todas as páginas dashboard
 */
const DashboardLayout = memo(function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const handleSetCollapsed = useCallback((value) => {
    setSidebarCollapsed(value);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - sempre visível e consistente */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={handleSetCollapsed} />
      
      <div className="flex-1 flex flex-col">
        {/* Header - sempre visível e consistente */}
        <DashboardHeader />
        
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
});

export default DashboardLayout;