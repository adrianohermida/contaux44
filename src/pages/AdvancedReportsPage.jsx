import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import ReportBuilder from '../components/dashboard/reports/ReportBuilder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BarChart3 } from 'lucide-react';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';

export default function AdvancedReportsPage() {
  const { user, tenantId } = useUserAndTenant();
  const [activeTab, setActiveTab] = useState('builder');

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Relatórios Avançados</h1>
            <p className="text-slate-600 mt-1">Crie e visualize relatórios personalizados</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="builder" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Construtor
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Relatórios Salvos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="mt-6">
              {tenantId && <ReportBuilder tenantId={tenantId} />}
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-slate-600">Nenhum relatório salvo ainda</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}