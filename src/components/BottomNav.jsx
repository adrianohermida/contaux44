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
         style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0px)', paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)' }}>
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ icon: Icon, label, page }) => (
          <Link
            key={page}
            to={createPageUrl(page)}
            className="flex flex-col items-center justify-center w-full h-full text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs truncate">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}