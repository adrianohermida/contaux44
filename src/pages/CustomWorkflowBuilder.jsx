import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Zap } from 'lucide-react';

export default function CustomWorkflowBuilder() {
  const [workflows] = useState([
    { id: 1, name: 'Auto-publish on Schedule', status: 'active', triggers: 2, actions: 3 },
    { id: 2, name: 'Send Invoice Reminder', status: 'active', triggers: 1, actions: 2 },
    { id: 3, name: 'Update Blog SEO', status: 'draft', triggers: 1, actions: 4 }
  ]);

  const triggers = ['Blog Published', 'Invoice Created', 'User Registered', 'Comment Submitted', 'Time-based'];
  const actions = ['Send Email', 'Update Field', 'Create Task', 'Post to Social', 'Generate Report'];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Criador de Workflows Customizados</h1>
          <p className="text-slate-600">Automação de processos sem código</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Novo Workflow</Button>
      </div>

      {/* Workflows List */}
      <Card>
        <CardHeader>
          <CardTitle>Workflows Ativos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {workflows.map(wf => (
            <div key={wf.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{wf.name}</p>
                <Badge className={wf.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100'}>
                  {wf.status === 'active' ? '✓ Ativo' : '○ Rascunho'}
                </Badge>
              </div>
              <p className="text-xs text-slate-600">{wf.triggers} gatilhos • {wf.actions} ações</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Available Triggers & Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Gatilhos Disponíveis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {triggers.map(t => (
              <div key={t} className="p-2 border rounded hover:bg-blue-50 cursor-pointer">{t}</div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ações Disponíveis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {actions.map(a => (
              <div key={a} className="p-2 border rounded hover:bg-blue-50 cursor-pointer">{a}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Workflows</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">3</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Execuções Hoje</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">247</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Sucesso</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">99.8%</div></CardContent>
        </Card>
      </div>
    </div>
  );
}