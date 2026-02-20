import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

export default function CustomBusinessRules() {
  const [rules] = useState([
    {
      id: 1,
      name: 'Auto-approve invoices < R$ 1000',
      condition: 'Invoice amount < 1000',
      action: 'Auto-approve',
      status: 'active'
    },
    {
      id: 2,
      name: 'Send alert on high value orders',
      condition: 'Order > R$ 50000',
      action: 'Send notification',
      status: 'active'
    },
    {
      id: 3,
      name: 'Archive old records',
      condition: 'Created date > 2 years',
      action: 'Move to archive',
      status: 'active'
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Custom Business Rules</h1>
          <p className="text-slate-600">Configure regras automáticas de negócio</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Nova Regra</Button>
      </div>

      {/* Active Rules */}
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
              <div className="text-xs text-slate-600 space-y-1">
                <p>Se: {rule.condition}</p>
                <p>Então: {rule.action}</p>
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
            <input type="text" placeholder="Descreva a regra" className="w-full mt-1 px-3 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="text-sm font-medium">Se (Condição)</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <select className="px-3 py-2 border rounded-lg">
                <option>Campo...</option>
                <option>Invoice amount</option>
                <option>Order total</option>
              </select>
              <select className="px-3 py-2 border rounded-lg">
                <option>Operador...</option>
                <option>&gt;</option>
                <option>&lt;</option>
                <option>=</option>
              </select>
              <input type="text" placeholder="Valor" className="px-3 py-2 border rounded-lg" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Então (Ação)</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg">
              <option>Selecionar ação...</option>
              <option>Auto-approve</option>
              <option>Send notification</option>
              <option>Update field</option>
              <option>Archive record</option>
            </select>
          </div>

          <Button className="w-full">Criar Regra</Button>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Regras Totais</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{rules.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Execuções Hoje</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">342</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Sucesso</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">99.9%</div></CardContent>
        </Card>
      </div>
    </div>
  );
}