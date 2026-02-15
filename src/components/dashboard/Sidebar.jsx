import React, { useState, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Ticket,
  FileText,
  DollarSign,
  Calculator,
  FileSpreadsheet,
  Calendar,
  Zap,
  BarChart3,
  Phone,
  UserCircle,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'CRM - Clientes', path: '/clients' },
  { icon: Ticket, label: 'Helpdesk - Tickets', path: '/tickets' },
  { icon: FileText, label: 'Processos Judiciais', path: '/legalprocesses' },
  {
    icon: DollarSign,
    label: 'Financeiro',
    submenu: [
      { label: 'Faturamento', path: '/invoicing' },
      { label: 'Pagamentos', path: '/payments' },
      { label: 'Orçamentos', path: '/quotes' },
      { label: 'Vendas', path: '/sales' },
      { label: 'Fluxo de Caixa', path: '/cashflow' }
    ]
  },
  { icon: Calculator, label: 'Prestação de Serviços', path: '/services' },
  {
    icon: FileSpreadsheet,
    label: 'Contabilidade',
    submenu: [
      { label: 'Lançamentos', path: '/entries' },
      { label: 'Importação CSV', path: '/importcsv' },
      { label: 'Conciliação Bancária', path: '/bankreconciliation' },
      { label: 'Baixa Manual', path: '/manualposting' },
      { label: 'Plano de Contas', path: '/chartofaccounts' }
    ]
  },
  { icon: FileText, label: 'Notas Fiscais', path: '/taxinvoices' },
  { icon: Calendar, label: 'Calendário Contábil', path: '/accountingcalendar' },
  { icon: Zap, label: 'Automações', path: '/automations' },
  { icon: BarChart3, label: 'Relatórios', path: '/reports' },
  { icon: Phone, label: 'Comunicação', path: '/communication' },
  { icon: UserCircle, label: 'Meu Painel', path: '/clientportal' },
  { icon: Settings, label: 'Configurações', path: '/settings' }
];

const Sidebar = memo(function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleSubmenu = useCallback((label) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  }, []);

  const isActive = useCallback((path) => {
    return location.pathname === path;
  }, [location.pathname]);

  return (
    <aside className={`bg-slate-900 text-white min-h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!collapsed && <h2 className="text-xl font-bold">Contaux</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.submenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-800 transition-colors"
                  title={collapsed ? item.label : ''}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left text-sm">{item.label}</span>
                      {openMenus[item.label] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </>
                  )}
                </button>
                {!collapsed && openMenus[item.label] && (
                  <div className="bg-slate-950">
                    {item.submenu.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        to={sub.path}
                        className={`block px-12 py-2 text-sm hover:bg-slate-800 transition-colors ${
                          isActive(sub.path) ? 'bg-slate-800 text-blue-400' : ''
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`block px-4 py-3 flex items-center gap-3 hover:bg-slate-800 transition-colors ${
                  isActive(item.path) ? 'bg-slate-800 border-l-4 border-blue-500' : ''
                }`}
                title={collapsed ? item.label : ''}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
});

export default Sidebar;