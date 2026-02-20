import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, LayoutDashboard } from 'lucide-react';
import { createPageUrl } from '@/utils';

const breadcrumbMap = {
  '/dashboard': { label: 'Dashboard', icon: LayoutDashboard },
  '/virtualcounter': { label: 'Balcão Virtual' },
  '/clients': { label: 'CRM - Clientes' },
  '/tickets': { label: 'Helpdesk - Tickets' },
  '/legalprocesses': { label: 'Processos Judiciais' },
  '/invoicing': { label: 'Faturamento' },
  '/quotes': { label: 'Orçamentos' },
  '/sales': { label: 'Vendas' },
  '/payments': { label: 'Pagamentos' },
  '/cashflow': { label: 'Fluxo de Caixa' },
  '/cashflowforecast': { label: 'Previsão de Caixa' },
  '/transactions': { label: 'Transações Bancárias' },
  '/services': { label: 'Prestação de Serviços' },
  '/entries': { label: 'Lançamentos' },
  '/chartofaccounts': { label: 'Plano de Contas' },
  '/bankreconciliation': { label: 'Conciliação Bancária' },
  '/manualposting': { label: 'Baixa Manual' },
  '/taxinvoices': { label: 'Notas Fiscais' },
  '/accountingcalendar': { label: 'Calendário Contábil' },
  '/importcsv': { label: 'Importação CSV' },
  '/automations': { label: 'Automações' },
  '/reports': { label: 'Relatórios & Análises' },
  '/documentmanagement': { label: 'Documentos' },
  '/blogmanager': { label: 'Blogs' },
  '/communication': { label: 'Comunicação' },
  '/clientportal': { label: 'Meu Painel' },
  '/settings': { label: 'Configurações' },
  '/auditlogs': { label: 'Logs de Auditoria' },
  '/securitycenter': { label: 'Centro de Segurança' },
  '/rlsdebugger': { label: 'RLS Debugger' }
};

export default function Breadcrumbs() {
  const location = useLocation();
  
  const breadcrumbs = useMemo(() => {
    const path = location.pathname;
    
    if (!breadcrumbMap[path]) return [];
    
    const crumbs = [
      { label: 'Dashboard', path: '/dashboard' }
    ];
    
    if (path !== '/dashboard') {
      crumbs.push({
        label: breadcrumbMap[path].label,
        path: path
      });
    }
    
    return crumbs;
  }, [location.pathname]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 px-6 py-2 bg-slate-50 border-b border-slate-200">
      {breadcrumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.path}>
          {idx > 0 && <ChevronRight className="w-4 h-4" />}
          <a
            href={crumb.path}
            className="hover:text-slate-900 transition-colors"
          >
            {crumb.label}
          </a>
        </React.Fragment>
      ))}
    </div>
  );
}