import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BehavioralAnalytics() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Behavioral Analytics</h1>
        <p className="text-slate-600">Análise comportamental de usuários</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Eventos Rastreados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8.2M</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Sessões</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">342k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Duração Média</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">6m 32s</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Retorno</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">42%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Padrões de Comportamento</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Página mais visitada</span>
            <Badge variant="outline">Dashboard (34.2%)</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Ação mais comum</span>
            <Badge variant="outline">Visualizar relatório (28%)</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Fluxo principal</span>
            <Badge variant="outline">Home → Produtos → Checkout</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}