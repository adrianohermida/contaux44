import React, { useState, useCallback, memo, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { usePreloadOnHover } from '../hooks/usePreloadOnHover';
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
  AlertCircle,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Landmark,
  PenTool
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'Dashboard' },
  { icon: Users, label: 'CRM - Clientes', page: 'Clients' },
  { icon: Ticket, label: 'Helpdesk - Tickets', page: 'Tickets' },
  { icon: FileText, label: 'Processos Judiciais', page: 'LegalProcesses' },
  {
    icon: DollarSign,
    label: 'Financeiro',
    submenu: [
      { label: 'Faturamento', page: 'Invoicing' },
      { label: 'Pagamentos', page: 'Payments' },
      { label: 'Orçamentos', page: 'Quotes' },
      { label: 'Vendas', page: 'Sales' },
      { label: 'Fluxo de Caixa', page: 'CashFlow' },
      { label: 'Transações Bancárias', page: 'Transactions' },
      { label: 'Previsão de Caixa', page: 'CashFlowForecast' }
    ]
  },
  { icon: Calculator, label: 'Prestação de Serviços', page: 'Services' },
  {
    icon: FileSpreadsheet,
    label: 'Contabilidade',
    submenu: [
      { label: 'Lançamentos', page: 'Entries' },
      { label: 'Importação CSV', page: 'ImportCSV' },
      { label: 'Conciliação Bancária', page: 'BankReconciliation' },
      { label: 'Baixa Manual', page: 'ManualPosting' },
      { label: 'Plano de Contas', page: 'ChartOfAccounts' }
    ]
  },
  { icon: FileText, label: 'Notas Fiscais', page: 'TaxInvoices' },
  { icon: Calendar, label: 'Calendário Contábil', page: 'AccountingCalendar' },
  { icon: Zap, label: 'Automações', page: 'Automations' },
  { icon: BarChart3, label: 'Relatórios', page: 'Reports' },
  { icon: BarChart3, label: 'Análises', page: 'Analytics' },
  { icon: FileText, label: 'Relatórios Avançados', page: 'AdvancedReports' },
  { icon: FileText, label: 'Gerenciamento de Docs', page: 'DocumentManagement' },
  { icon: PenTool, label: 'Gerenciador de Blogs', page: 'BlogManager' },
  { icon: Phone, label: 'Comunicação', page: 'Communication' },
  { icon: UserCircle, label: 'Meu Painel', page: 'ClientPortal' },
  { icon: Settings, label: 'Configurações', page: 'Settings' },
  { icon: FileText, label: 'Logs de Auditoria', page: 'AuditLogs' },
  { icon: AlertCircle, label: 'Centro de Segurança', page: 'SecurityCenter' }
];

// Lazy load pages on-demand para evitar carregar todas na inicialização
const pageToLazyMap = {
  'Dashboard': () => import('../../pages/Dashboard').then(m => ({ default: lazy(() => Promise.resolve({ default: m.default })) })),
  'Clients': () => import('../../pages/Clients').then(m => ({ default: lazy(() => Promise.resolve({ default: m.default })) })),
  'Tickets': () => import('../../pages/Tickets').then(m => ({ default: lazy(() => Promise.resolve({ default: m.default })) })),
};

const Sidebar = memo(function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const preloadOnHover = usePreloadOnHover();

  const toggleSubmenu = useCallback((label) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  }, []);

  const isActive = useCallback((page) => {
    const currentPage = new URLSearchParams(location.search).get('page');
    return currentPage === page;
  }, [location.search]);

  const handleMenuItemHover = useCallback((page) => {
    // Apenas precarrega quando hover, sem forçar load
  }, []);

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
                      <a
                        key={subIndex}
                        href={createPageUrl(sub.page)}
                        onMouseEnter={() => handleMenuItemHover(sub.page)}
                        className={`block px-12 py-2 text-sm hover:bg-slate-800 transition-colors ${
                          isActive(sub.page) ? 'bg-slate-800 text-blue-400' : ''
                        }`}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
               <a
                 href={createPageUrl(item.page)}
                 onMouseEnter={() => handleMenuItemHover(item.page)}
                 className={`block px-4 py-3 flex items-center gap-3 hover:bg-slate-800 transition-colors ${
                   isActive(item.page) ? 'bg-slate-800 border-l-4 border-blue-500' : ''
                 }`}
                 title={collapsed ? item.label : ''}
               >
                 <item.icon className="w-5 h-5 flex-shrink-0" />
                 {!collapsed && <span className="text-sm">{item.label}</span>}
               </a>
             )}
          </div>
        ))}
      </nav>
    </aside>
  );
});

export default Sidebar;