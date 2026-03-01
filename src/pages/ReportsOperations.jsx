import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGlobalAuth } from '@/components/auth/useGlobalAuth';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MFASetup from '@/components/dashboard/security/MFASetup';
import DataEncryption from '@/components/dashboard/security/DataEncryption';
import ComplianceReporting from '@/components/dashboard/security/ComplianceReporting';
import RoleBasedAccess from '@/components/dashboard/security/RoleBasedAccess';
import AlertingManager from '@/components/dashboard/devops/AlertingManager';
import CIPipelineManager from '@/components/dashboard/devops/CIPipelineManager';
import AdvancedMonitoringDashboard from '@/components/dashboard/monitoring/AdvancedMonitoringDashboard';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * REPORTS - OPERATIONS MODULE
 * Security, monitoring, infrastructure & DevOps
 */
export default function ReportsOperations() {
  const { workspaceId, loading: authLoading } = useGlobalAuth('internal');
  const [activeTab, setActiveTab] = useState('monitoring');

  const { isLoading: opsLoading, error: opsError, refetch } = useQuery({
    queryKey: ['reports-operations', workspaceId],
    queryFn: async () => {
      // Pre-load monitoring data if needed
      return { ready: true };
    },
    enabled: !!workspaceId && !authLoading,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000
  });

  if (authLoading || opsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  if (opsError) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Relatórios - Operações</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-600 mb-4">Erro ao carregar operações</p>
          <Button onClick={() => refetch()} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Relatórios - Operações</h1>
        <p className="text-slate-600 mt-1">Segurança, monitoramento e infraestrutura</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 overflow-x-auto">
          <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="mfa">MFA</TabsTrigger>
          <TabsTrigger value="devops">DevOps</TabsTrigger>
          <TabsTrigger value="rbac">RBAC</TabsTrigger>
        </TabsList>

        {/* Monitoring */}
        <TabsContent value="monitoring" className="mt-6">
          {workspaceId && <AdvancedMonitoringDashboard workspaceId={workspaceId} />}
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6">
          {workspaceId && <DataEncryption workspaceId={workspaceId} />}
        </TabsContent>

        {/* Compliance */}
        <TabsContent value="compliance" className="mt-6">
          {workspaceId && <ComplianceReporting workspaceId={workspaceId} />}
        </TabsContent>

        {/* MFA Setup */}
        <TabsContent value="mfa" className="mt-6">
          <MFASetup />
        </TabsContent>

        {/* DevOps */}
        <TabsContent value="devops" className="mt-6">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {workspaceId && (
                <>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Alertas</h3>
                    <AlertingManager workspaceId={workspaceId} />
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">CI/CD Pipeline</h3>
                    <CIPipelineManager workspaceId={workspaceId} />
                  </div>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        {/* RBAC */}
        <TabsContent value="rbac" className="mt-6">
          {workspaceId && <RoleBasedAccess workspaceId={workspaceId} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}