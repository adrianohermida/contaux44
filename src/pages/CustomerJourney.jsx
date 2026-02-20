import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CustomerJourney() {
  const stages = [
    { name: 'Awareness', users: 5000, conversion: '15%', avgValue: 'R$ 0' },
    { name: 'Consideration', users: 750, conversion: '35%', avgValue: 'R$ 150' },
    { name: 'Decision', users: 262, conversion: '80%', avgValue: 'R$ 485' },
    { name: 'Retention', users: 210, conversion: '90%', avgValue: 'R$ 1200' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Journey Mapping</h1>
        <p className="text-slate-600">Mapeamento completo da jornada</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Usuários</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">6,222</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Estágios</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Conversão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4.2%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Valor Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">R$ 458</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Funil de Conversão</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {stages.map((s, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{s.name}</span>
                <Badge variant="outline">{s.conversion}</Badge>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-8 relative overflow-hidden">
                <div 
                  className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ width: `${(s.users / 5000) * 100}%` }}
                >
                  {s.users}
                </div>
              </div>
              <div className="text-xs text-slate-600">Valor médio: {s.avgValue}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}