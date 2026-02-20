import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export default function DisasterRecovery() {
  const [plan] = useState({
    rto: '4 horas',
    rpo: '1 hora',
    lastTest: '2026-02-15',
    status: 'active'
  });

  const steps = [
    'Detectar falha do sistema',
    'Ativar backup em standby',
    'Verificar integridade dos dados',
    'Sincronizar com backup',
    'Restaurar serviço'
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Disaster Recovery Plan</h1>
        <p className="text-slate-600">Plano de recuperação de desastres</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">RTO</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{plan.rto}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">RPO</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{plan.rpo}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Status do Plano
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge className="bg-green-100 text-green-800">Ativo e Testado</Badge>
          <p className="text-sm text-slate-600 mt-2">Último teste: {plan.lastTest}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Procedimentos</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 p-2 border rounded">
              <span className="font-bold text-blue-600">{i + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Checklist</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Backups em múltiplos locais</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Replicação em tempo real</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Testes mensais</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Documentação atualizada</label>
        </CardContent>
      </Card>
    </div>
  );
}