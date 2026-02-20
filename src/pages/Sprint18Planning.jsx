import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Layers, Lock, Users, FileText } from 'lucide-react';

export default function Sprint18Planning() {
  return (
    <div className="space-y-6 p-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold">Sprint 18 - CRM Enhancement: Fase 1 → Fase 2</h1>
        <p className="text-slate-600 mt-2">Transição da integração ViaCEP para estrutura de dados fiscal avançada</p>
      </div>

      {/* STATUS FASE 1 */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Fase 1: Fundação - CONCLUÍDA (85%)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-green-200 rounded">
              <p className="text-sm font-semibold text-green-700">✓ useViaCEP Hook</p>
              <p className="text-xs text-slate-600">Fetch, validação, formatação completos</p>
            </div>
            <div className="p-3 bg-white border border-green-200 rounded">
              <p className="text-sm font-semibold text-green-700">✓ ClientForm Integrada</p>
              <p className="text-xs text-slate-600">CEP → 5 campos auto-preenchidos</p>
            </div>
            <div className="p-3 bg-white border border-green-200 rounded">
              <p className="text-sm font-semibold text-green-700">✓ Entidade Client</p>
              <p className="text-xs text-slate-600">8 novos campos de endereço</p>
            </div>
            <div className="p-3 bg-white border border-yellow-200 rounded">
              <p className="text-sm font-semibold text-yellow-700">~ Validação E2E</p>
              <p className="text-xs text-slate-600">Modal → ViaCEP → Criar cliente</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PENDÊNCIAS CRÍTICAS */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            3 Pendências Críticas (Fase 1) - AÇÃO REQUERIDA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-white border border-yellow-300 rounded-lg">
            <p className="font-semibold text-sm mb-2">1. Feedback Visual na Criação de Cliente</p>
            <p className="text-xs text-slate-600 mb-3">O formulário atualmente cria clientes silenciosamente. Precisa de:</p>
            <ul className="text-xs space-y-1 ml-4 list-disc text-slate-700">
              <li>Toast de sucesso (já implementado em useFormSubmit)</li>
              <li>Spinner visual durante processamento</li>
              <li>Fechar modal automaticamente após sucesso</li>
            </ul>
          </div>

          <div className="p-4 bg-white border border-yellow-300 rounded-lg">
            <p className="font-semibold text-sm mb-2">2. Validação Completa do Form</p>
            <p className="text-xs text-slate-600 mb-3">Implementar validação visual para:</p>
            <ul className="text-xs space-y-1 ml-4 list-disc text-slate-700">
              <li>CEP obrigatório quando endereço é preenchido</li>
              <li>Endereço lido-apenas após ViaCEP (não editar)</li>
              <li>Mensagens de erro inline para cada campo</li>
            </ul>
          </div>

          <div className="p-4 bg-white border border-yellow-300 rounded-lg">
            <p className="font-semibold text-sm mb-2">3. Teste End-to-End</p>
            <p className="text-xs text-slate-600 mb-3">Fluxo completo não foi testado:</p>
            <ul className="text-xs space-y-1 ml-4 list-disc text-slate-700">
              <li>Abrir modal novo cliente</li>
              <li>Preencher CEP válido (ex: 01310-100 → São Paulo)</li>
              <li>Confirmar endereço auto-preenchido</li>
              <li>Submeter form e validar criação</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* FASE 2 - ROADMAP */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-700" />
            <Badge className="bg-purple-600">FASE 2</Badge>
            Estrutura de Dados Fiscal (2-3 semanas)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-700 font-semibold">6 Novas Entidades Base44 necessárias:</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-purple-600" />
                <p className="font-semibold text-sm">CompanyAddress</p>
              </div>
              <p className="text-xs text-slate-600">Múltiplos endereços: tipo (matriz/filial), IE local, datas abertura/fechamento</p>
            </div>

            <div className="p-3 bg-white border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-purple-600" />
                <p className="font-semibold text-sm">CompanyContact</p>
              </div>
              <p className="text-xs text-slate-600">Contatos: nome, email, telefone, cargo, departamento, permissões</p>
            </div>

            <div className="p-3 bg-white border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-purple-600" />
                <p className="font-semibold text-sm">ShareholderInfo</p>
              </div>
              <p className="text-xs text-slate-600">Sócios: CPF, nome, % participação, data admissão, cargo</p>
            </div>

            <div className="p-3 bg-white border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-purple-600" />
                <p className="font-semibold text-sm">FiscalData</p>
              </div>
              <p className="text-xs text-slate-600">IE, IM, regime tributário, CND, natureza jurídica, CST COFINS/PIS</p>
            </div>

            <div className="p-3 bg-white border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="h-4 w-4 text-purple-600" />
                <p className="font-semibold text-sm">DigitalCertificate</p>
              </div>
              <p className="text-xs text-slate-600">A1 PF/PJ: CN extraction, validade, tipo, titular</p>
            </div>

            <div className="p-3 bg-white border rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="h-4 w-4 text-purple-600" />
                <p className="font-semibold text-sm">AccessCredential</p>
              </div>
              <p className="text-xs text-slate-600">Senhas cifradas: CNPJroot, banco, E-CAC, softwares contábeis</p>
            </div>
          </div>

          <div className="p-3 bg-white border-l-4 border-purple-600 rounded">
            <p className="text-sm font-semibold text-slate-900 mb-1">Ampliação da Entidade Client</p>
            <p className="text-xs text-slate-600">Novos campos: IE, IM, regime, natureza jurídica, CNAE, grupo econômico</p>
            <p className="text-xs text-slate-600 mt-2">Relacionamentos: CompanyAddress[], CompanyContact[], ShareholderInfo[], FiscalData, DigitalCertificate[], AccessCredential[]</p>
          </div>
        </CardContent>
      </Card>

      {/* FASE 3 - PREVIEW */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-green-600">FASE 3</Badge>
            Multi-step Wizard: Modal de Novo Cliente (2-3 semanas)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-700 font-semibold">5 Steps estruturados:</p>
          
          <div className="space-y-2">
            <div className="p-2 bg-white border border-green-200 rounded text-sm">
              <span className="font-semibold text-green-700">Step 1:</span> Dados Básicos (Razão social, CNPJ, CPF, CNAE, grupo)
            </div>
            <div className="p-2 bg-white border border-green-200 rounded text-sm">
              <span className="font-semibold text-green-700">Step 2:</span> Endereço Matriz (ViaCEP integrado + complementos)
            </div>
            <div className="p-2 bg-white border border-green-200 rounded text-sm">
              <span className="font-semibold text-green-700">Step 3:</span> Dados Fiscais (IE, IM, CND, regime, natureza)
            </div>
            <div className="p-2 bg-white border border-green-200 rounded text-sm">
              <span className="font-semibold text-green-700">Step 4:</span> Sócios (tabela dinâmica: CPF, %, cargo, data)
            </div>
            <div className="p-2 bg-white border border-green-200 rounded text-sm">
              <span className="font-semibold text-green-700">Step 5:</span> Contato Principal (nome, email, telefone, cargo, permissão)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RESUMO */}
      <Card className="border-slate-300 bg-slate-50">
        <CardHeader>
          <CardTitle>Resumo Executivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
            <strong>Status Atual:</strong> Fase 1 MVP Concluída (85%) - ViaCEP funcional
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full"></span>
            <strong>Bloqueadores:</strong> 3 testes críticos pendentes antes de Fase 2
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-purple-600 rounded-full"></span>
            <strong>Próximo:</strong> Implementar 6 entidades fiscais + validações
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
            <strong>Timeline:</strong> 6-8 semanas para MVP completo (Fase 1-3)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}