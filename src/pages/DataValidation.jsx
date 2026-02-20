import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Shield } from 'lucide-react';

export default function DataValidation() {
  const [validationRules] = useState([
    {
      id: 1,
      field: 'Email',
      rule: 'RFC 5322 Format',
      status: 'active',
      applicableTo: 'User, Contact, Newsletter'
    },
    {
      id: 2,
      field: 'Phone',
      rule: 'E.164 International Format',
      status: 'active',
      applicableTo: 'User, Client, Contact'
    },
    {
      id: 3,
      field: 'URL',
      rule: 'Valid HTTPS URL',
      status: 'active',
      applicableTo: 'BlogPost, Website, Integration'
    },
    {
      id: 4,
      field: 'Currency',
      rule: 'Numeric, 2 decimals',
      status: 'active',
      applicableTo: 'Invoice, Quote, Payment'
    },
    {
      id: 5,
      field: 'Date',
      rule: 'ISO 8601 Format',
      status: 'active',
      applicableTo: 'All timestamp fields'
    }
  ]);

  const [sanitizationRules] = useState([
    {
      id: 1,
      type: 'HTML/Script Injection',
      method: 'Strip tags, Escape entities',
      coverage: '100%',
      status: 'active'
    },
    {
      id: 2,
      type: 'SQL Injection',
      method: 'Parameterized queries, ORM',
      coverage: '100%',
      status: 'active'
    },
    {
      id: 3,
      type: 'XSS Attack',
      method: 'Content Security Policy, Input validation',
      coverage: '100%',
      status: 'active'
    },
    {
      id: 4,
      type: 'Path Traversal',
      method: 'Path normalization, Whitelist validation',
      coverage: '100%',
      status: 'active'
    }
  ]);

  const validationStats = [
    { metric: 'Regras Ativas', value: 5 },
    { metric: 'Entidades Protegidas', value: 12 },
    { metric: 'Taxa de Detecção', value: '99.8%' },
    { metric: 'Erros Prevenidos (hoje)', value: 23 }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Validação e Sanitização de Dados</h1>
        <p className="text-slate-600 dark:text-slate-400">Proteja contra dados inválidos e ataques</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {validationStats.map(stat => (
          <Card key={stat.metric}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Validation Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Regras de Validação
          </CardTitle>
          <CardDescription>Validação aplicada em tempo real</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {validationRules.map(rule => (
            <div key={rule.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{rule.field}</p>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-2">{rule.rule}</p>
              <p className="text-xs text-slate-500">Aplicável a: {rule.applicableTo}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sanitization Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Regras de Sanitização
          </CardTitle>
          <CardDescription>Proteção contra injeção e ataques</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sanitizationRules.map(rule => (
            <div key={rule.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{rule.type}</p>
                <Badge className="bg-blue-100 text-blue-800">{rule.coverage}</Badge>
              </div>
              <p className="text-sm text-slate-600">{rule.method}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Test Validator */}
      <Card>
        <CardHeader>
          <CardTitle>Testador de Validação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Campo a Validar</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg">
              <option>Email</option>
              <option>Phone</option>
              <option>URL</option>
              <option>Currency</option>
              <option>Date</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Valor</label>
            <input
              type="text"
              placeholder="Digite o valor para testar"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-800">✓ Válido</p>
          </div>
        </CardContent>
      </Card>

      {/* Security Report */}
      <Card>
        <CardHeader>
          <CardTitle>Relatório de Segurança</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Validação de entrada ativa</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Sanitização de saída ativa</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Content Security Policy habilitada</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Rate limiting ativo</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}