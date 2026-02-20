import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

export default function PrivacyDashboard() {
  const [showPII, setShowPII] = useState(false);

  const dataCategories = [
    { category: 'Informações Pessoais', items: 12456, encrypted: true, retained: '3 anos' },
    { category: 'Dados de Transação', items: 24510, encrypted: true, retained: '7 anos' },
    { category: 'Logs de Atividade', items: 156789, encrypted: false, retained: '90 dias' },
    { category: 'Preferências de Usuário', items: 9234, encrypted: true, retained: '1 ano' }
  ];

  const dataSharing = [
    { provider: 'Google Analytics', purpose: 'Analytics', encrypted: true, dataTypes: ['IP', 'User Agent', 'Session'] },
    { provider: 'Stripe', purpose: 'Pagamentos', encrypted: true, dataTypes: ['Card Tokens'] },
    { provider: 'SendGrid', purpose: 'Email', encrypted: true, dataTypes: ['Email Address', 'Name'] }
  ];

  const userRights = [
    { right: 'Acesso aos Dados', status: 'available', description: 'Solicitar cópia de todos os dados' },
    { right: 'Portabilidade', status: 'available', description: 'Transferir dados em formato padrão' },
    { right: 'Esquecimento', status: 'available', description: 'Solicitar exclusão completa' },
    { right: 'Retificação', status: 'available', description: 'Corrigir dados imprecisos' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Painel de Privacidade</h1>
        <p className="text-slate-600 dark:text-slate-400">Gerencie privacidade e segurança de dados</p>
      </div>

      {/* Privacy Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Pontuação de Privacidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-green-600">92/100</div>
            <div className="flex-grow">
              <div className="bg-slate-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '92%' }} />
              </div>
              <p className="text-sm text-slate-600 mt-2">Excelente proteção de dados</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categorias de Dados Armazenados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dataCategories.map(cat => (
            <div key={cat.category} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{cat.category}</p>
                <div className="flex items-center gap-2">
                  {cat.encrypted && (
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Criptografado
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>{cat.items.toLocaleString('pt-BR')} registros</span>
                <span>Retenção: {cat.retained}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Sharing */}
      <Card>
        <CardHeader>
          <CardTitle>Compartilhamento de Dados</CardTitle>
          <CardDescription>Provedores externos autorizados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {dataSharing.map(share => (
            <div key={share.provider} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{share.provider}</p>
                <Badge variant="outline">{share.purpose}</Badge>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-slate-600">Dados: {share.dataTypes.join(', ')}</p>
                <p className="text-xs text-slate-600 flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Criptografado em trânsito
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* User Rights */}
      <Card>
        <CardHeader>
          <CardTitle>Direitos de Privacidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {userRights.map(right => (
            <div key={right.right} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{right.right}</p>
                <Badge className="bg-green-100 text-green-800">✓ Disponível</Badge>
              </div>
              <p className="text-sm text-slate-600">{right.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Encryption */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Criptografia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
            <p className="font-medium mb-1">✓ Em Repouso</p>
            <p className="text-slate-600">AES-256 para dados armazenados</p>
          </div>
          <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
            <p className="font-medium mb-1">✓ Em Trânsito</p>
            <p className="text-slate-600">TLS 1.3 para todas as conexões</p>
          </div>
          <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
            <p className="font-medium mb-1">✓ Chaves</p>
            <p className="text-slate-600">Rotação automática a cada 90 dias</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}