import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';

export default function ClientDetail() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { workspaceId } = useMultitenantAuthOptimized('internal');
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClient();
  }, [clientId, workspaceId]);

  const loadClient = async () => {
    try {
      setLoading(true);
      const data = await base44.entities.Client.filter({ 
        id: clientId,
        tenant_id: workspaceId 
      });
      
      if (data.length > 0) {
        setClient(data[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-12 gap-1">
          <TabsTrigger value="addresses" className="text-xs sm:text-sm">Endereços</TabsTrigger>
          <TabsTrigger value="contacts" className="text-xs sm:text-sm">Contatos</TabsTrigger>
          <TabsTrigger value="shareholders" className="text-xs sm:text-sm">Sócios</TabsTrigger>
          <TabsTrigger value="fiscal" className="text-xs sm:text-sm">Fiscal</TabsTrigger>
          <TabsTrigger value="certificates" className="text-xs sm:text-sm">Certs</TabsTrigger>
          <TabsTrigger value="credentials" className="text-xs sm:text-sm">Acesso</TabsTrigger>
          <TabsTrigger value="invoices" className="text-xs sm:text-sm">Faturas</TabsTrigger>
          <TabsTrigger value="payments" className="text-xs sm:text-sm">Pagtos</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs sm:text-sm">Relat.</TabsTrigger>
          <TabsTrigger value="reconciliation" className="text-xs sm:text-sm">Banco</TabsTrigger>
          <TabsTrigger value="taxes" className="text-xs sm:text-sm">Impostos</TabsTrigger>
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
      </Tabs>
    </div>
  );
}