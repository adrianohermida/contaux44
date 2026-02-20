import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddressManagementTab from '../components/dashboard/AddressManagementTab';
import ContactManagementTab from '../components/dashboard/ContactManagementTab';
import ShareholderManagementTab from '../components/dashboard/ShareholderManagementTab';
import FiscalDataPanel from '../components/dashboard/FiscalDataPanel';
import DigitalCertificateTab from '../components/dashboard/DigitalCertificateTab';
import AccessCredentialTab from '../components/dashboard/AccessCredentialTab';
import PaymentManagementTab from '../components/dashboard/PaymentManagementTab';
import InvoiceDetailPanel from '../components/dashboard/InvoiceDetailPanel';
import ReportGenerationPanel from '../components/dashboard/ReportGenerationPanel';
import FinancialAnalyticsPanel from '../components/dashboard/FinancialAnalyticsPanel';
import BankReconciliationPanel from '../components/dashboard/BankReconciliationPanel';
import TaxCalculationPanel from '../components/dashboard/TaxCalculationPanel';
import NFeIntegrationPanel from '../components/dashboard/NFeIntegrationPanel';
import ComplianceDashboardPanel from '../components/dashboard/ComplianceDashboardPanel';
import AutomatedWorkflowPanel from '../components/dashboard/AutomatedWorkflowPanel';
import NotificationCenterPanel from '../components/dashboard/NotificationCenterPanel';
import AdvancedAnalyticsDashboard from '../components/dashboard/AdvancedAnalyticsDashboard';
import CustomReportBuilder from '../components/dashboard/CustomReportBuilder';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';

export default function ClientDetail() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { workspaceId } = useMultitenantAuthOptimized('internal');

  const { data: client, isLoading: loading, error } = useQuery({
    queryKey: ['client-detail', clientId, workspaceId],
    queryFn: async () => {
      if (!clientId || !workspaceId) return null;
      try {
        const data = await base44.entities.Client.get(clientId);
        if (!data) return null;
        
        // Validar multitenant
        if (data.tenant_id !== workspaceId) {
          console.error('Cliente não pertence ao workspace', { 
            clientTenant: data.tenant_id, 
            currentWorkspace: workspaceId 
          });
          return null;
        }
        return data;
      } catch (err) {
        console.error('Erro ao carregar cliente:', err);
        throw err;
      }
    },
    enabled: !!clientId && !!workspaceId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Carregando cliente...</span>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 mb-4">Cliente não encontrado</p>
        <Button onClick={() => navigate('/Clients')}>Voltar para Clientes</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/Clients')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{client.company_name}</h1>
            <p className="text-slate-600 mt-1">
              {client.client_type === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'} • {client.status === 'active' ? '🟢 Ativo' : '🔴 Inativo'}
            </p>
          </div>
        </div>
      </div>

      {/* Client Basic Info */}
      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-slate-600 mb-1">Email</p>
          <p className="font-medium">{client.email}</p>
        </div>
        {client.phone && (
          <div>
            <p className="text-sm text-slate-600 mb-1">Telefone</p>
            <p className="font-medium">{client.phone}</p>
          </div>
        )}
        {client.cnpj && (
          <div>
            <p className="text-sm text-slate-600 mb-1">CNPJ</p>
            <p className="font-medium">{client.cnpj}</p>
          </div>
        )}
        {client.cpf && (
          <div>
            <p className="text-sm text-slate-600 mb-1">CPF</p>
            <p className="font-medium">{client.cpf}</p>
          </div>
        )}
        {client.cep && (
          <div className="col-span-2">
            <p className="text-sm text-slate-600 mb-1">Endereço</p>
            <p className="font-medium">
              {client.endereco}, {client.numero}{client.complemento ? ` - ${client.complemento}` : ''}, {client.bairro}, {client.cidade}, {client.uf}
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="addresses" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-20 gap-1 overflow-x-auto">
          <TabsTrigger value="addresses" className="text-xs sm:text-sm">End.</TabsTrigger>
          <TabsTrigger value="contacts" className="text-xs sm:text-sm">Cont.</TabsTrigger>
          <TabsTrigger value="shareholders" className="text-xs sm:text-sm">Sóc.</TabsTrigger>
          <TabsTrigger value="fiscal" className="text-xs sm:text-sm">Fisc.</TabsTrigger>
          <TabsTrigger value="certificates" className="text-xs sm:text-sm">Certs</TabsTrigger>
          <TabsTrigger value="credentials" className="text-xs sm:text-sm">Acess.</TabsTrigger>
          <TabsTrigger value="invoices" className="text-xs sm:text-sm">Notas</TabsTrigger>
          <TabsTrigger value="payments" className="text-xs sm:text-sm">Pags</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs sm:text-sm">Gráf.</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs sm:text-sm">Rel.</TabsTrigger>
          <TabsTrigger value="advanced-analytics" className="text-xs sm:text-sm">Adv.</TabsTrigger>
          <TabsTrigger value="custom-reports" className="text-xs sm:text-sm">Custom</TabsTrigger>
          <TabsTrigger value="reconciliation" className="text-xs sm:text-sm">Banco</TabsTrigger>
          <TabsTrigger value="taxes" className="text-xs sm:text-sm">Imp.</TabsTrigger>
          <TabsTrigger value="nfe" className="text-xs sm:text-sm">NF-e</TabsTrigger>
          <TabsTrigger value="compliance" className="text-xs sm:text-sm">Conf.</TabsTrigger>
          <TabsTrigger value="workflows" className="text-xs sm:text-sm">Work.</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">Not.</TabsTrigger>
        </TabsList>

        <TabsContent value="addresses" className="bg-white rounded-lg shadow p-6">
          <AddressManagementTab clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="contacts" className="bg-white rounded-lg shadow p-6">
          <ContactManagementTab clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="shareholders" className="bg-white rounded-lg shadow p-6">
          <ShareholderManagementTab clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="fiscal" className="bg-white rounded-lg shadow p-6">
          <FiscalDataPanel clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="certificates" className="bg-white rounded-lg shadow p-6">
          <DigitalCertificateTab clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="credentials" className="bg-white rounded-lg shadow p-6">
          <AccessCredentialTab clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="invoices" className="bg-white rounded-lg shadow p-6">
          <InvoiceDetailPanel clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="payments" className="bg-white rounded-lg shadow p-6">
          <PaymentManagementTab clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="analytics" className="bg-white rounded-lg shadow p-6">
          <FinancialAnalyticsPanel clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="reports" className="bg-white rounded-lg shadow p-6">
          <ReportGenerationPanel clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="reconciliation" className="bg-white rounded-lg shadow p-6">
          <BankReconciliationPanel clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="taxes" className="bg-white rounded-lg shadow p-6">
          <TaxCalculationPanel clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="nfe" className="bg-white rounded-lg shadow p-6">
          <NFeIntegrationPanel clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="compliance" className="bg-white rounded-lg shadow p-6">
          <ComplianceDashboardPanel clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="workflows" className="bg-white rounded-lg shadow p-6">
          <AutomatedWorkflowPanel clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="notifications" className="bg-white rounded-lg shadow p-6">
          <NotificationCenterPanel clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="advanced-analytics" className="bg-white rounded-lg shadow p-6">
          <AdvancedAnalyticsDashboard clientId={client.id} tenantId={workspaceId} />
        </TabsContent>

        <TabsContent value="custom-reports" className="bg-white rounded-lg shadow p-6">
          <CustomReportBuilder clientId={client.id} tenantId={workspaceId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}