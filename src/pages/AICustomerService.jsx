import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Zap } from 'lucide-react';

export default function AICustomerService() {
  const [conversations] = useState([
    { id: 1, customer: 'João Silva', topic: 'Billing Question', status: 'resolved', duration: '2m 15s' },
    { id: 2, customer: 'Maria Santos', topic: 'Technical Support', status: 'in_progress', duration: '5m 30s' },
    { id: 3, customer: 'Carlos Oliveira', topic: 'Feature Request', status: 'escalated', duration: '10m' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">AI Customer Service</h1>
        <p className="text-slate-600">Atendimento com IA conversacional</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Conversas Hoje</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">247</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Resolução</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">94%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tempo Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">3m 42s</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Conversas Ativas</CardTitle>
          <Badge>3</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {conversations.map(c => (
            <div key={c.id} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{c.customer}</span>
                <Badge className={c.status === 'resolved' ? 'bg-green-100 text-green-800' : c.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}>
                  {c.status}
                </Badge>
              </div>
              <div className="text-xs text-slate-600 flex justify-between">
                <span>{c.topic}</span>
                <span>{c.duration}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle><Zap className="h-5 w-5" /> Recursos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Processamento de linguagem natural</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Escalação automática</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Análise sentimento</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Respostas contextualizadas</label>
        </CardContent>
      </Card>
    </div>
  );
}