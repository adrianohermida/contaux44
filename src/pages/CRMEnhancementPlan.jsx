import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Layers } from 'lucide-react';

export default function CRMEnhancementPlan() {
  return (
    <div className="space-y-6 p-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold">Plano de Aprimoramento - Módulo CRM</h1>
        <p className="text-slate-600 mt-2">Solução completa para gestão de clientes contábeis com dados fiscais integrados</p>
      </div>

      {/* FASE 1 */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-blue-600">FASE 1</Badge>
            Fundação: Correções Críticas (1-2 semanas)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              Problema Crítico: Modal não cria registro
            </h3>
            <ul className="text-sm space-y-1 ml-6 list-disc">
              <li>Debugar form submission no ClientForm.jsx</li>
              <li>Validar validação de campos obrigatórios</li>
              <li>Corrigir chamada base44.entities.Client.create()</li>
              <li>Implementar error handling e feedback visual</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Integração ViaCEP</h3>
            <ul className="text-sm space-y-1 ml-6 list-disc">
              <li>Criar hook useViaCEP.jsx para busca de endereço</li>
              <li>Campos: CEP → Rua, Número, Bairro, Cidade, UF (auto-preenchimento)</li>
              <li>Validação de CEP format (xxxxx-xxx)</li>
              <li>Tratamento de erros (CEP inválido, não encontrado)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* FASE 2 */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-purple-600">FASE 2</Badge>
            Estrutura de Dados: Entidades Fiscais (2-3 semanas)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Novas Entidades Base44</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">CompanyAddress</p>
                <p className="text-xs text-slate-600">Múltiplos endereços por empresa + tipo (matriz/filial)</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">CompanyContact</p>
                <p className="text-xs text-slate-600">Contatos com cargo, departamento, permissões</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">ShareholderInfo</p>
                <p className="text-xs text-slate-600">Sócios: CPF, nome, % participação, naturalidade</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">FiscalData</p>
                <p className="text-xs text-slate-600">IE, IM, regime tributário, CND, natureza jurídica</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">DigitalCertificate</p>
                <p className="text-xs text-slate-600">A1 PF/PJ, CN, validade, arquivo (.p12/.pfx)</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">AccessCredential</p>
                <p className="text-xs text-slate-600">Senhas cifradas: CNPJroot, banco, E-CAC, softwares</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Ampliação da Entidade Client</h3>
            <ul className="text-sm space-y-1 ml-6 list-disc">
              <li>Campos fiscais: IE, IM, regime tributário, natureza jurídica</li>
              <li>Relacionamentos: múltiplos endereços, contatos, certificados, senhas</li>
              <li>Status avançado: ativo, inativo, suspenso, cancelado</li>
              <li>Setor econômico (CNAE principal)</li>
              <li>Grupo econômico (reference to another group entity)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* FASE 3 */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-green-600">FASE 3</Badge>
            Componentes UI: Modal de Novo Cliente (2-3 semanas)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Arquitetura Modal (Multi-step Wizard)</h3>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">Step 1: Dados Básicos</p>
                <p className="text-xs text-slate-600">Razão social, CNPJ, CPF, Setor CNAE, Grupo econômico</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">Step 2: Endereço Matriz</p>
                <p className="text-xs text-slate-600">ViaCEP integrado + complementos (apto, sala)</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">Step 3: Dados Fiscais</p>
                <p className="text-xs text-slate-600">IE, IM, CND, regime (Simples/Lucro Real/MEI), Natureza jurídica</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">Step 4: Sócios (Share Holder Info)</p>
                <p className="text-xs text-slate-600">Tabela dinâmica: CPF, Nome, %, Cargo, Naturalidade (+ remove row)</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">Step 5: Contato Principal</p>
                <p className="text-xs text-slate-600">Nome, Email, Telefone, Cargo, Departamento, Permissão</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FASE 4 */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-indigo-600">FASE 4</Badge>
            Gestão Avançada: Endereços, Contatos, Certificados (3-4 semanas)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Componentes Modulares para Detalhe do Cliente
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">AddressManagementTab</p>
                <p className="text-xs text-slate-600">Tabela de endereços: Tipo (matriz/filial), IE local, data abertura/fechamento, ações</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">ContactManagementTab</p>
                <p className="text-xs text-slate-600">Gestão de contatos: Nome, Email, Telefone, Cargo, Setor, permissões de acesso</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">ShareholderManagementTab</p>
                <p className="text-xs text-slate-600">Sócios: CRUD, % participação, data admissão, cargas societárias</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">FiscalDataPanel</p>
                <p className="text-xs text-slate-600">IE (estadual), IM (municipal), CND, regime, natureza, CST PIS/COFINS</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">DigitalCertificateManager</p>
                <p className="text-xs text-slate-600">Upload .p12/.pfx, CN extraction, validade, tipo (A1/A3), titular (PF/PJ)</p>
              </div>
              <div className="p-3 bg-white border rounded">
                <p className="font-medium">AccessCredentialVault</p>
                <p className="text-xs text-slate-600">Gestão cifrada: senhas CNPJroot, banco, E-CAC, sistemas conta gráficos, backup</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FASE 5 */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-orange-600">FASE 5</Badge>
            Recursos Avançados (4-6 semanas)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Funcionalidades Complementares</h3>
            <ul className="text-sm space-y-1 ml-6 list-disc">
              <li><strong>Integração ERP/NFe:</strong> Sincronização de certificados com softwares contábeis</li>
              <li><strong>Grupos Econômicos:</strong> Entity GrupoEconomico + relacionamento matrix/subsidiárias</li>
              <li><strong>Histórico Fiscal:</strong> Timeline de alterações IE, IM, regime, status CND</li>
              <li><strong>Verificação Real-time:</strong> API CNPJ (BrasilAPI), Receita Federal, SEFAZ</li>
              <li><strong>Documentos Obrigatórios:</strong> Checklist (contrato social, alterações, atas, procurações)</li>
              <li><strong>Permissões Granulares:</strong> Contador pode restringir acesso de contatos a certas senhas</li>
              <li><strong>Auditoria Completa:</strong> Log de quem acessou/modificou certificados e senhas</li>
              <li><strong>Backup Automático:</strong> Certificados versionados com restore point</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* ESTRUTURA COMPONENTES */}
      <Card>
        <CardHeader>
          <CardTitle>Estrutura de Componentes Recomendada</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-100 p-4 rounded text-xs overflow-x-auto font-mono">
{`components/
├── crm/
│   ├── NewClientWizard/
│   │   ├── Step1BasicData.jsx
│   │   ├── Step2Address.jsx
│   │   ├── Step3FiscalData.jsx
│   │   ├── Step4Shareholders.jsx
│   │   ├── Step5MainContact.jsx
│   │   └── NewClientWizard.jsx (container)
│   ├── ClientDetailTabs/
│   │   ├── AddressManagementTab.jsx
│   │   ├── ContactManagementTab.jsx
│   │   ├── ShareholderManagementTab.jsx
│   │   ├── FiscalDataPanel.jsx
│   │   ├── DigitalCertificateManager.jsx
│   │   └── AccessCredentialVault.jsx
│   └── Forms/
│       ├── AddressForm.jsx (com ViaCEP)
│       ├── ContactForm.jsx
│       ├── ShareholderForm.jsx
│       ├── CertificateUpload.jsx
│       └── CredentialForm.jsx (cifrada)
└── hooks/
    ├── useViaCEP.js
    ├── useCryptography.js (encrypt/decrypt senhas)
    ├── useCertificateParser.js (ler .p12)
    └── useClientForm.js
`}
          </pre>
        </CardContent>
      </Card>

      {/* ENTIDADES */}
      <Card>
        <CardHeader>
          <CardTitle>Entidades Base44 a Criar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-3 border rounded">
              <p className="font-medium">1. CompanyAddress</p>
              <ul className="text-xs text-slate-600 mt-1 space-y-0.5">
                <li>• tenant_id, client_id (ref)</li>
                <li>• type: 'matriz'|'filial'</li>
                <li>• cep, endereco, numero, complemento</li>
                <li>• bairro, cidade, uf</li>
                <li>• inscricao_estadual, inscricao_municipal</li>
                <li>• data_abertura, data_fechamento (opcional)</li>
                <li>• é_principal: boolean</li>
              </ul>
            </div>
            <div className="p-3 border rounded">
              <p className="font-medium">2. CompanyContact</p>
              <ul className="text-xs text-slate-600 mt-1 space-y-0.5">
                <li>• tenant_id, client_id (ref)</li>
                <li>• nome, email, telefone, celular</li>
                <li>• cargo, departamento</li>
                <li>• permissoes: array (ver_certificados, gerenciar_senhas, etc)</li>
                <li>• ativo: boolean</li>
                <li>• data_inicio, data_fim</li>
              </ul>
            </div>
            <div className="p-3 border rounded">
              <p className="font-medium">3. ShareholderInfo</p>
              <ul className="text-xs text-slate-600 mt-1 space-y-0.5">
                <li>• tenant_id, client_id (ref)</li>
                <li>• cpf, nome, data_nascimento</li>
                <li>• percentual_participacao</li>
                <li>• cargo_societario: string</li>
                <li>• naturalidade, nacionalidade</li>
                <li>• ativo: boolean</li>
              </ul>
            </div>
            <div className="p-3 border rounded">
              <p className="font-medium">4. FiscalData</p>
              <ul className="text-xs text-slate-600 mt-1 space-y-0.5">
                <li>• tenant_id, client_id (ref)</li>
                <li>• inscricao_estadual, inscricao_municipal</li>
                <li>• regime: 'simples'|'lucro_real'|'mei'|'presumido'</li>
                <li>• natureza_juridica: string (CNAE)</li>
                <li>• cst_pis, cst_cofins</li>
                <li>• cnd_status, cnd_data_consulta</li>
              </ul>
            </div>
            <div className="p-3 border rounded">
              <p className="font-medium">5. DigitalCertificate</p>
              <ul className="text-xs text-slate-600 mt-1 space-y-0.5">
                <li>• tenant_id, client_id (ref)</li>
                <li>• tipo: 'a1_pf'|'a1_pj'|'a3'</li>
                <li>• cn (CN do certificado)</li>
                <li>• arquivo_url (uploaded file)</li>
                <li>• data_validade, data_emissao</li>
                <li>• senha_cifrada (encrypted)</li>
                <li>• ativo: boolean</li>
              </ul>
            </div>
            <div className="p-3 border rounded">
              <p className="font-medium">6. AccessCredential</p>
              <ul className="text-xs text-slate-600 mt-1 space-y-0.5">
                <li>• tenant_id, client_id (ref)</li>
                <li>• tipo: 'cnpj_root'|'banco'|'e_cac'|'sofware'</li>
                <li>• nome_sistema</li>
                <li>• usuario_cifrado, senha_cifrada</li>
                <li>• url_acesso (opcional)</li>
                <li>• acesso_por: contact_id (ref)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PRIORIZAÇÃO */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle>Recomendação de Priorização (MVP)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h3 className="font-semibold mb-2">Para Iniciar (4-6 semanas):</h3>
            <ul className="text-sm space-y-1 ml-6 list-disc">
              <li className="font-medium">✓ Fase 1 + Fase 2 (completas) - Fundação</li>
              <li className="font-medium">✓ Fase 3 (Steps 1-3) - Modal básico funcional</li>
              <li className="font-medium">✓ Fase 4 (AddressManagement, ContactManagement, CertificateManager) - 3 tabs essenciais</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Phase 2 (4-6 semanas após):</h3>
            <ul className="text-sm space-y-1 ml-6 list-disc">
              <li>✓ Fase 3 (Steps 4-5) - Sócios e contatos</li>
              <li>✓ Fase 4 (Shareholders, FiscalData, Credentials) - Complemento</li>
              <li>✓ Integrações com BrasilAPI/CNPJ</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Phase 3 (Ongoing):</h3>
            <ul className="text-sm space-y-1 ml-6 list-disc">
              <li>✓ Fase 5 - Recursos avançados conforme necessário</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* SEGURANÇA */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900">Considerações de Segurança Críticas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>🔐 <strong>Cifra de Senhas:</strong> Implementar AES-256 no cliente ou usar backend function específica</p>
          <p>🔐 <strong>Certificados:</strong> Nunca armazenar em plain text, usar Private File Storage (base44)</p>
          <p>🔐 <strong>Auditoria:</strong> Logging completo de acesso a credenciais com timestamp + user</p>
          <p>🔐 <strong>Permissões:</strong> Contador define quem vê/modifica cada credencial por contato</p>
          <p>🔐 <strong>Rate Limiting:</strong> Limitar tentativas de download de certificado</p>
        </CardContent>
      </Card>

      <Card className="border-green-300 bg-green-50">
        <CardHeader className="bg-green-100">
          <CardTitle className="text-green-900 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Próximos Passos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm mt-4">
          <p>1. Criar/validar entidades no Base44 (CompanyAddress, CompanyContact, etc)</p>
          <p>2. Debugar e corrigir modal ClientForm para criação básica (Fase 1)</p>
          <p>3. Implementar ViaCEP hook (Fase 1)</p>
          <p>4. Começar NewClientWizard com Steps 1-3 (Fase 3)</p>
          <p>5. Implementar tabs básicas: AddressManagement + ContactManagement (Fase 4)</p>
        </CardContent>
      </Card>
    </div>
  );
}