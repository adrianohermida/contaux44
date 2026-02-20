import React, { useState } from 'react';
import { useMultitenantAuthOptimized } from '@/components/auth/useMultitenantAuthOptimized';
import DashboardCustomizer from '@/components/analytics/DashboardCustomizer';
import KPIWidget from '@/components/analytics/KPIWidget';
import PredictiveReport from '@/components/analytics/PredictiveReport';
import ExportEngine from '@/components/analytics/ExportEngine';
import { BarChart3, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnalyticsAdvanced() {
  const { workspaceId } = useMultitenantAuthOptimized('internal');
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardConfig, setDashboardConfig] = useState(null);

  const sampleKPIs = [
    { title: 'Receita Mensal', value: 45000, metric: 'revenue', trend: 12 },
    { title: 'Pagamentos', value: 38000, metric: 'payment', trend: 8 },
    { title: 'Clientes Ativos', value: 125, metric: 'client', trend: 5 },
    { title: 'Tickets Abertos', value: 42, metric: 'ticket', trend: -3 }
  ];

  const exportData = {
    metrics: sampleKPIs,
    timestamp: new Date().toISOString(),
    workspaceId
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h1 className="text-3xl font-bold">Analytics Avançado</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="predictive">Previsões</TabsTrigger>
          <TabsTrigger value="customizer">Personalizar</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleKPIs.map((kpi, idx) => (
              <KPIWidget key={idx} {...kpi} />
            ))}
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Exportar Dados</h3>
            <ExportEngine data={exportData} fileName="analytics-report" />
          </Card>
        </TabsContent>

        {/* Predictive Tab */}
        <TabsContent value="predictive" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Previsão de Receita</h3>
              {workspaceId && <PredictiveReport workspaceId={workspaceId} reportType="revenue" />}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Previsão de Pagamentos</h3>
              {workspaceId && <PredictiveReport workspaceId={workspaceId} reportType="payment" />}
            </Card>
          </div>
        </TabsContent>

        {/* Customizer Tab */}
        <TabsContent value="customizer" className="mt-6">
          <Card className="p-6">
            <DashboardCustomizer onConfigChange={setDashboardConfig} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}