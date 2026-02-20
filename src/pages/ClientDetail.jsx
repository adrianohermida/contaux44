import React, { useState } from 'react';
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
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';

export default function ClientDetail() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { workspaceId } = useMultitenantAuthOptimized('internal');
  const [activeTab, setActiveTab] = useState('addresses');

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

  const handleGoBack = () => {
    navigate('/Clients');
  };

  if (loading) {
    return (
      <ProtectedInternalRoute>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Carregando cliente...</span>
        </div>
      </ProtectedInternalRoute>
    );
  }

  if (error || !client) {
    return (
      <ProtectedInternalRoute>
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {error ? 'Erro ao carregar cliente' : 'Cliente não encontrado'}
          </p>
          <Button onClick={handleGoBack}>Voltar para Clientes</Button>
        </div>
      </ProtectedInternalRoute>
    );
  }

  return (
    <ProtectedInternalRoute>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGoBack}
              className="text-slate-600 dark:text-slate-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{client.company_name}</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {client.client_type === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'} • {client.status === 'active' ? '🟢 Ativo' : '🔴 Inativo'}
              </p>
            </div>
          </div>
        </div>

        {/* Client Basic Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">Email</p>
              <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100">{client.email}</p>
            </div>
            {client.phone && (
              <div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">Telefone</p>
                <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100">{client.phone}</p>
              </div>
            )}
            {client.cnpj && (
              <div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">CNPJ</p>
                <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100">{client.cnpj}</p>
              </div>
            )}
            {client.cpf && (
              <div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">CPF</p>
                <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100">{client.cpf}</p>
              </div>
            )}
            {client.cep && (
              <div className="col-span-1 sm:col-span-2">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">Endereço</p>
                <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100">
                  {client.endereco}, {client.numero}{client.complemento ? ` - ${client.complemento}` : ''}, {client.bairro}, {client.cidade}, {client.uf}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs - Responsive */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow">
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-1 p-2 h-auto w-full bg-white dark:bg-slate-800">
              <TabsTrigger value="addresses" className="text-xs py-2">End.</TabsTrigger>
              <TabsTrigger value="contacts" className="text-xs py-2">Cont.</TabsTrigger>
              <TabsTrigger value="shareholders" className="text-xs py-2">Sóc.</TabsTrigger>
              <TabsTrigger value="fiscal" className="text-xs py-2">Fisc.</TabsTrigger>
              <TabsTrigger value="certificates" className="text-xs py-2">Certs</TabsTrigger>
              <TabsTrigger value="credentials" className="text-xs py-2">Acess.</TabsTrigger>
              <TabsTrigger value="invoices" className="text-xs py-2">Notas</TabsTrigger>
              <TabsTrigger value="payments" className="text-xs py-2">Pags</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs py-2">Gráf.</TabsTrigger>
              <TabsTrigger value="reports" className="text-xs py-2">Rel.</TabsTrigger>
              <TabsTrigger value="reconciliation" className="text-xs py-2">Banco</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="addresses" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <AddressManagementTab clientId={client.id} tenantId={workspaceId} />
          </TabsContent>

          <TabsContent value="contacts" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <ContactManagementTab clientId={client.id} tenantId={workspaceId} />
          </TabsContent>

          <TabsContent value="shareholders" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <ShareholderManagementTab clientId={client.id} tenantId={workspaceId} />
          </TabsContent>

          <TabsContent value="fiscal" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <FiscalDataPanel clientId={client.id} tenantId={workspaceId} />
          </TabsContent>

          <TabsContent value="certificates" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <DigitalCertificateTab clientId={client.id} tenantId={workspaceId} />
          </TabsContent>

          <TabsContent value="credentials" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <AccessCredentialTab clientId={client.id} tenantId={workspaceId} />
          </TabsContent>

          <TabsContent value="invoices" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <InvoiceDetailPanel clientId={client.id} tenantId={workspaceId} />
          </TabsContent>

          <TabsContent value="payments" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <PaymentManagementTab clientId={client.id} tenantId={workspaceId} />
          </TabsContent>

          <TabsContent value="analytics" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <FinancialAnalyticsPanel clientId={client.id} tenantId={workspaceId} />
          </TabsContent>

          <TabsContent value="reports" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <ReportGenerationPanel clientId={client.id} tenantId={workspaceId} />
          </TabsContent>

          <TabsContent value="reconciliation" className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <BankReconciliationPanel clientId={client.id} tenantId={workspaceId} />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedInternalRoute>
  );
}