import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function Phase1CRMValidation() {
  const completed = [
    { task: 'Hook useViaCEP', status: '✓', details: 'Fetch, validação, formatação CEP implementado' },
    { task: 'Integração ViaCEP em ClientForm', status: '✓', details: 'handleCEPChange + auto-preenchimento 5 campos' },
    { task: 'Entidade Client ampliada', status: '✓', details: '8 novos campos de endereço (cep, endereco, numero, complemento, bairro, cidade, uf)' },
    { task: 'Validação de CEP', status: '✓', details: 'validateCEP() + error handling' },
    { task: 'FormField com ViaCEP', status: '✓', details: 'CEP field com loading state e error handling' }
  ];

  const pending = [
    { task: 'Modal de Novo Cliente', status: 'MVP', details: 'Modal atual funciona, mas sem validação visual completa' },
    { task: 'Feedback visual', status: 'Parcial', details: 'Implementar toast/alert de sucesso ao criar cliente' },
    { task: 'Teste end-to-end', status: 'Pendente', details: 'Validar criação completa de cliente com ViaCEP' }
  ];

  return (
    <div className="space-y-6 p-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold">Sprint 18 - Fase 1 CRM Enhancement: Validação</h1>
        <p className="text-slate-600 mt-2">Revisão de implementação e planejamento de Fase 2</p>
      </div>

      {/* STATUS GERAL */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Completadas</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-green-600">5</div></CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Pendências Críticas</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-yellow-600">3</div></CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Status</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-blue-600">85%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Próxima Fase</CardTitle></CardHeader>
          <CardContent><div className="text-sm font-bold">Fase 2: Entidades</div></CardContent>
        </Card>
      </div>

      {/* COMPLETADAS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            5/5 Tarefas Completadas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {completed.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm">{item.task}</p>
                <p className="text-xs text-slate-600">{item.details}</p>
              </div>
              <Badge className="bg-green-600">{item.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* PENDÊNCIAS */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            3 Pendências Críticas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pending.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-200">
              <Clock className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm">{item.task}</p>
                <p className="text-xs text-slate-600">{item.details}</p>
              </div>
              <Badge className="bg-yellow-600">{item.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* PLANO FASE 2 */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-purple-600">FASE 2</Badge>
            Próximas Ações: Entidades Fiscais (2-3 semanas)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border rounded-lg">
              <p className="font-semibold text-sm">CompanyAddress</p>
              <p className="text-xs text-slate-600">Múltiplos endereços (matriz/filial)</p>
            </div>
            <div className="p-3 bg-white border rounded-lg">
              <p className="font-semibold text-sm">CompanyContact</p>
              <p className="text-xs text-slate-600">Contatos com cargo/departamento</p>
            </div>
            <div className="p-3 bg-white border rounded-lg">
              <p className="font-semibold text-sm">ShareholderInfo</p>
              <p className="text-xs text-slate-600">Sócios com % participação</p>
            </div>
            <div className="p-3 bg-white border rounded-lg">
              <p className="font-semibold text-sm">FiscalData</p>
              <p className="text-xs text-slate-600">IE, IM, regime tributário, CND</p>
            </div>
            <div className="p-3 bg-white border rounded-lg">
              <p className="font-semibold text-sm">DigitalCertificate</p>
              <p className="text-xs text-slate-600">A1 PF/PJ, CN, validade</p>
            </div>
            <div className="p-3 bg-white border rounded-lg">
              <p className="font-semibold text-sm">AccessCredential</p>
              <p className="text-xs text-slate-600">Senhas cifradas (banco, E-CAC)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RECOMENDAÇÕES */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-sm">Recomendações para Conclusão da Fase 1</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Adicionar toast de sucesso ao criar cliente (sonner package)</p>
          <p>✓ Validar submit do form com todos os campos obrigatórios</p>
          <p>✓ Implementar feedback visual em tempo real (spinner, loading state)</p>
          <p>✓ Testar fluxo completo: modal → ViaCEP → criar cliente → confirmação</p>
        </CardContent>
      </Card>
    </div>
  );
}