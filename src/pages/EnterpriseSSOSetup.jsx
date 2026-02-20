import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function EnterpriseSSOSetup() {
  const [providers] = useState([
    { name: 'SAML 2.0', status: 'configured', endpoints: 5 },
    { name: 'OAuth 2.0', status: 'configured', endpoints: 4 },
    { name: 'OpenID Connect', status: 'configured', endpoints: 6 },
    { name: 'LDAP/Active Directory', status: 'pending', endpoints: 0 }
  ]);

  const [configurations] = useState([
    {
      id: 1,
      provider: 'Google Workspace',
      status: 'active',
      users: 234,
      lastSync: '2026-02-20 14:32'
    },
    {
      id: 2,
      provider: 'Microsoft Entra ID',
      status: 'active',
      users: 156,
      lastSync: '2026-02-20 14:31'
    },
    {
      id: 3,
      provider: 'Okta',
      status: 'configured',
      users: 0,
      lastSync: 'Nunca'
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Enterprise SSO Setup</h1>
        <p className="text-slate-600 dark:text-slate-400">Configure integração com provedores de identidade</p>
      </div>

      {/* Provider Support */}
      <Card>
        <CardHeader>
          <CardTitle>Suporte a Provedores de Identidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {providers.map(prov => (
            <div key={prov.name} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium">{prov.name}</p>
                {prov.status === 'configured' ? (
                  <Badge className="bg-green-100 text-green-800">✓ Configurado</Badge>
                ) : (
                  <Badge className="bg-slate-100 text-slate-800">○ Pendente</Badge>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-1">{prov.endpoints} endpoints disponíveis</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Configurations */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Ativas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {configurations.map(config => (
            <div key={config.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium">{config.provider}</p>
                  {config.status === 'active' ? (
                    <Badge className="mt-1 bg-green-100 text-green-800">✓ Ativo</Badge>
                  ) : (
                    <Badge className="mt-1 bg-blue-100 text-blue-800">⚙ Configurado</Badge>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div>
                  <p className="font-medium">Usuários</p>
                  <p>{config.users}</p>
                </div>
                <div>
                  <p className="font-medium">Último Sync</p>
                  <p>{config.lastSync}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Setup Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Passos de Configuração</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium">1. Habilitar SSO</p>
              <p className="text-sm text-slate-600">Ativar no painel de segurança</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium">2. Configurar Provedor</p>
              <p className="text-sm text-slate-600">Adicionar credenciais do IdP</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium">3. Mapear Atributos</p>
              <p className="text-sm text-slate-600">Definir correspondência de campos</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium">4. Testar Conexão</p>
              <p className="text-sm text-slate-600">Validar fluxo de login</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Segurança</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Criptografia HTTPS obrigatória</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Verificação de assinatura SAML</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Timeout de sessão configurável</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Audit logging habilitado</span>
          </div>
        </CardContent>
      </Card>

      {/* Add New Provider Button */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="pt-6">
          <Button className="w-full">+ Configurar Novo Provedor SSO</Button>
        </CardContent>
      </Card>
    </div>
  );
}