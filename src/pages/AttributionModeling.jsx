import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AttributionModeling() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Attribution Modeling</h1>
        <p className="text-slate-600">Modelagem de atribuição</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Modelos Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">6</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Conversões Rastreadas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">482k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Acurácia</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">85%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">ROI Otimizado</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">+26%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Modelos Disponíveis</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {['First-Click', 'Last-Click', 'Linear', 'Time-Decay', 'Position-Based', 'Data-Driven'].map((m, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <span>{m}</span>
              <Badge variant="outline">Disponível</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}