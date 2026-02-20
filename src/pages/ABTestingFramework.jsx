import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ABTestingFramework() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">A/B Testing Framework</h1>
        <p className="text-slate-600">Framework completo de testes A/B</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Testes Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários no Teste</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">125k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Significância Estatística</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">95%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Melhorias Implementadas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">12</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Testes em Progresso</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Call-to-Action Button Color</span>
            <Badge className="bg-yellow-100 text-yellow-800">Em execução</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Landing Page Layout</span>
            <Badge className="bg-yellow-100 text-yellow-800">Em execução</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Checkout Flow</span>
            <Badge className="bg-green-100 text-green-800">Winner (12% ↑)</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}