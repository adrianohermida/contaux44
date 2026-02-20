import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LifetimeValuePredictor() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Lifetime Value Predictor</h1>
        <p className="text-slate-600">Preditor de valor do ciclo de vida</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">LTV Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$342</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Acurácia Modelo</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">88%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Segmentos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">LTV Total Previsão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$18.4M</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Segmentação por LTV</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>High-Value (LTV &gt; $1k)</span>
            <Badge variant="outline">2,124 usuários | $2.8M</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Medium-Value ($300-$1k)</span>
            <Badge variant="outline">8,432 usuários | $6.2M</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Low-Value (&lt;$300)</span>
            <Badge variant="outline">12,891 usuários | $2.4M</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}