/**
 * Reports Page
 * Dashboard for viewing and creating reports
 */

import React, { useState } from 'react';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';
import UnifiedHeader from '../components/shared/UnifiedHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp } from 'lucide-react';
import ReportsDashboard from '../components/reports/ReportsDashboard';
import ReportAnalytics from '../components/reports/ReportAnalytics';

export default function Reports() {
  const { workspaceId } = useGlobalAuth('internal');
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="space-y-6 pb-20 min-h-screen bg-white dark:bg-slate-900 transition-colors" role="main" aria-label="Página de Relatórios">
      <UnifiedHeader
        title="Relatórios"
        filteredCount={0}
        totalCount={0}
        itemName="relatório"
        hideImportExport
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 min-h-[44px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <TabsTrigger value="analytics" className="gap-2 dark:text-slate-300 dark:data-[state=active]:text-slate-100" aria-label="Aba de Análise">
            <TrendingUp className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Análise</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2 dark:text-slate-300 dark:data-[state=active]:text-slate-100" aria-label="Aba de Relatórios">
            <BarChart3 className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Relatórios</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <ReportAnalytics workspaceId={workspaceId} />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportsDashboard workspaceId={workspaceId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}