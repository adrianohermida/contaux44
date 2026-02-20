import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Download, FileText, Lock } from 'lucide-react';

export default function GDPRCompliance() {
  const [dataRequests] = useState([
    {
      id: 1,
      email: 'user@example.com',
      type: 'data_access',
      status: 'completed',
      date: '2026-02-15',
      expiresAt: '2026-03-15'
    },
    {
      id: 2,
      email: 'client@company.com',
      type: 'data_deletion',
      status: 'pending',
      date: '2026-02-18',
      deadline: '2026-03-20'
    },
    {
      id: 3,
      email: 'contact@firm.com',
      type: 'data_portability',
      status: 'processing',
      date: '2026-02-19',
      deadline: '2026-03-21'
    }
  ]);

  const [showNewRequest, setShowNewRequest] = useState(false);

  const getStatusBadge = (status) => {
    if (status === 'completed') return <Badge className="bg-green-100 text-green-800">✓ Concluído</Badge>;
    if (status === 'processing') return <Badge className="bg-yellow-100 text-yellow-800">⏳ Processando</Badge>;
    return <Badge className="bg-blue-100 text-blue-800">○ Pendente</Badge>;
  };

  const getTypeLabel = (type) => {
    const types = {
      data_access: 'Acesso aos Dados',
      data_deletion: 'Direito ao Esquecimento',
      data_portability: 'Portabilidade de Dados'
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Conformidade GDPR</h1>
        <p className="text-slate-600 dark:text-slate-400">Gerencie direitos de privacidade e conformidade regulatória</p>
      </div>

      {/* Compliance Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Política de Privacidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Atualizada</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">DPA (Data Processing)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Assinado</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Consentimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium">Revisar</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Subject Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Solicitações de Direitos</CardTitle>
            <Button size="sm" onClick={() => setShowNewRequest(!showNewRequest)}>
              + Nova Solicitação
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {showNewRequest && (
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20 space-y-3 mb-4">
              <input
                type="email"
                placeholder="Email do usuário"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Acesso aos Dados</option>
                <option>Direito ao Esquecimento</option>
                <option>Portabilidade de Dados</option>
                <option>Retificação</option>
                <option>Restrição do Processamento</option>
              </select>
              <div className="flex gap-2">
                <Button className="flex-1">Registrar</Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowNewRequest(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {dataRequests.map(request => (
            <div key={request.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{request.email}</p>
                  <p className="text-sm text-slate-600">{getTypeLabel(request.type)}</p>
                </div>
                {getStatusBadge(request.status)}
              </div>
              <div className="flex justify-between text-xs text-slate-600 mt-3">
                <span>Criada em: {request.date}</span>
                <span>{request.status === 'completed' ? 'Expira' : 'Prazo'}: {request.expiresAt || request.deadline}</span>
              </div>
              {request.status === 'completed' && (
                <Button size="sm" variant="outline" className="w-full mt-3 gap-2">
                  <Download className="h-4 w-4" />
                  Baixar Dados
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Processing */}
      <Card>
        <CardHeader>
          <CardTitle>Processamento de Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Dados Pessoais Armazenados</p>
                <span className="font-bold">12,456 usuários</span>
              </div>
              <p className="text-slate-600">Informações de contato, transações, preferências</p>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Retenção de Dados</p>
                <Badge>3 anos</Badge>
              </div>
              <p className="text-slate-600">Conforme política de privacidade</p>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Compartilhamento de Dados</p>
                <Badge>3 provedores</Badge>
              </div>
              <p className="text-slate-600">Google Analytics, Stripe, SendGrid</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Política de Privacidade
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Termos de Serviço
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Data Processing Agreement (DPA)
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Aviso de Cookies
          </Button>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle>Log de Auditoria GDPR</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p className="text-slate-600">
            ✓ 2026-02-20 - Backup automático completo<br/>
            ✓ 2026-02-19 - Solicitação de acesso processada<br/>
            ✓ 2026-02-18 - Consentimento renovado para 2,341 usuários<br/>
            ✓ 2026-02-17 - Política de privacidade atualizada<br/>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}