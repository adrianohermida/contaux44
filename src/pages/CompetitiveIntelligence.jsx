import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radar } from 'lucide-react';

export default function CompetitiveIntelligence() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Competitive Intelligence</h1>
        <p className="text-slate-600">Inteligência competitiva avançada</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Competidores Rastreados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Alertas Semana</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">28</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Posição Mercado</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">#2</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Vantagem</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">+15%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Radar className="h-5 w-5" /> Competidores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Competidor Alpha</span>
            <Badge variant="outline">Preço -8%</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Competidor Beta</span>
            <Badge variant="outline">Novo Recurso</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Competidor Gamma</span>
            <Badge variant="outline">Expansão +3 países</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}