import React, { useState, useCallback, memo } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarShortcuts from './SidebarShortcuts';
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
  PenTool,
  MessageCircle
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'Dashboard' },
  { icon: MessageCircle, label: 'Balcão Virtual', page: 'VirtualCounter', badge: 'unread' },
  { icon: Users, label: 'CRM - Clientes', page: 'Clients' },
  { icon: Ticket, label: 'Helpdesk - Tickets', page: 'Tickets' },
  { icon: FileText, label: 'Processos Judiciais', page: 'LegalProcesses' },
  {
    icon: DollarSign,
    label: 'Vendas & Financeiro',
    submenu: [
      { label: 'Faturamento', page: 'Invoicing' },
      { label: 'Orçamentos', page: 'Quotes' },
      { label: 'Vendas', page: 'Sales' },
      { label: 'Pagamentos', page: 'Payments' },
      { label: 'Fluxo de Caixa', page: 'CashFlow' },
      { label: 'Previsão de Caixa', page: 'CashFlowForecast' },
      { label: 'Transações Bancárias', page: 'Transactions' },
      { label: 'Prestação de Serviços', page: 'Services' }
    ]
  },
  {
    icon: FileSpreadsheet,
    label: 'Contabilidade',
    submenu: [
      { label: 'Lançamentos', page: 'Entries' },
      { label: 'Plano de Contas', page: 'ChartOfAccounts' },
      { label: 'Conciliação Bancária', page: 'BankReconciliation' },
      { label: 'Baixa Manual', page: 'ManualPosting' },
      { label: 'Notas Fiscais', page: 'TaxInvoices' },
      { label: 'Calendário Contábil', page: 'AccountingCalendar' },
      { label: 'Importação CSV', page: 'ImportCSV' }
    ]
  },
  { icon: Zap, label: 'Automações', page: 'Automations' },
  { icon: BarChart3, label: 'Relatórios & Análises', page: 'Reports' },
  {
   icon: FileText,
   label: 'Gerenciamento',
   submenu: [
     { label: 'Documentos', page: 'DocumentManagement' },
     { label: 'Blogs', page: 'BlogManager' },
     { label: 'Comunicação', page: 'Communication' }
   ]
  },
  { icon: UserCircle, label: 'Meu Painel', page: 'ClientPortal' },
  {
   icon: Settings,
   label: 'Administração',
   submenu: [
     { label: 'Configurações', page: 'SettingsPage' },
     { label: 'Logs de Auditoria', page: 'AuditLogs' },
     { label: 'Centro de Segurança', page: 'SecurityCenter' }
   ]
  }
];



const Sidebar = memo(function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const [unreadCount, setUnreadCount] = useState(0);

  // Memorizar estado do sidebar em localStorage
  React.useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  // Carregar unread messages
  React.useEffect(() => {
    const loadUnread = async () => {
      try {
        const { base44 } = await import('@/api/base44Client');
        const user = await base44.auth.me();
        if (!user) return;
        
        // Extract workspace_id from user data
        const convs = await base44.entities.VirtualCounterConversation.filter({ status: 'active' });
        const total = convs.reduce((sum, c) => sum + (c.unread_count || 0), 0);
        setUnreadCount(total);
      } catch (error) {
        console.error('Erro ao carregar unread:', error);
      }
    };

    loadUnread();
    const interval = setInterval(loadUnread, 30000); // Atualizar a cada 30s
    return () => clearInterval(interval);
  }, []);

  const toggleSubmenu = useCallback((label) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  }, []);

  const isActive = useCallback((page) => {
    const currentPath = location.pathname;
    return currentPath === `/${page.toLowerCase()}`;
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
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
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
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-left text-sm">{item.label}</span>
                        {item.badge === 'unread' && unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                            {unreadCount}
                          </span>
                        )}
                      </div>
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
                         href={`/${sub.page.toLowerCase()}`}
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
                   href={`/${item.page.toLowerCase()}`}
                   className={`block px-4 py-3 flex items-center gap-3 hover:bg-slate-800 transition-colors ${
                     isActive(item.page) ? 'bg-slate-800 border-l-4 border-blue-500' : ''
                   }`}
                   title={collapsed ? item.label : ''}
                 >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-sm">{item.label}</span>
                      {item.badge === 'unread' && unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold ml-auto">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  )}
                </a>
             )}
          </div>
        ))}
      </nav>

      {/* Shortcuts */}
      {!collapsed && <SidebarShortcuts />}

      {/* Footer - Info & Version */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          <p>Contaux v1.0.0</p>
        </div>
      )}
    </aside>
  );
});

export default Sidebar;