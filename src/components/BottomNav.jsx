import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { LayoutDashboard, Users, FileText, Ticket } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', page: 'Dashboard' },
    { icon: Users, label: 'Clientes', page: 'Contact' },
    { icon: FileText, label: 'Faturas', page: 'Invoicing' },
    { icon: Ticket, label: 'Tickets', page: 'Tickets' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 z-40 select-none"
         style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0px)', paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)' }}
         aria-label="Navegação principal mobile">
       <div className="flex justify-around items-center h-16">
        {navItems.map(({ icon: Icon, label, page }) => (
          <Link
            key={page}
            to={createPageUrl(page)}
            className="flex flex-col items-center justify-center w-full h-full text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label={label}
            title={label}
          >
            <Icon className="w-6 h-6 mb-1" aria-hidden="true" />
            <span className="text-xs truncate">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}