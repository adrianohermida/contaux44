import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

export default function SmartNotificationRules() {
  const [rules] = useState([
    {
      id: 1,
      name: 'High Priority Invoice',
      trigger: 'Invoice > R$ 10.000',
      actions: 'Email, SMS',
      status: 'active'
    },
    {
      id: 2,
      name: 'New Client Alert',
      trigger: 'Client registered',
      actions: 'Email, Slack',
      status: 'active'
    },
    {
      id: 3,
      name: 'Overdue Payment',
      trigger: 'Invoice due in 3 days',
      actions: 'Email, SMS, Slack',
      status: 'active'
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Regras de Notificação Inteligente</h1>
          <p className="text-slate-600">Automação de notificações baseada em condições</p>
        </div>
        <Button className="gap-2"><Zap className="h-4 w-4" /> Nova Regra</Button>
      </div>

      {/* Smart Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Regras Ativas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rules.map(rule => (
            <div key={rule.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{rule.name}</p>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="space-y-1 text-xs text-slate-600">
                <p>Gatilho: {rule.trigger}</p>
                <p>Ações: {rule.actions}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rule Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Criar Nova Regra</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome da Regra</label>
            <input
              type="text"
              placeholder="Ex: Invoice Alert"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Quando</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg">
              <option>Selecionar gatilho...</option>
              <option>Invoice criada</option>
              <option>Cliente registrado</option>
              <option>Comentário adicionado</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Notificar via</label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Email
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> SMS
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Slack
              </label>
            </div>
          </div>
          <Button className="w-full">Criar Regra</Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Regras Ativas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{rules.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Execuções Hoje</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">542</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Sucesso</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">99.7%</div></CardContent>
        </Card>
      </div>
    </div>
  );
}