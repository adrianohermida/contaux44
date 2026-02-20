import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PersonalizationRulesEngine() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Personalization Rules Engine</h1>
        <p className="text-slate-600">Engine de regras de personalização</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Regras Ativas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">84</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários Personalizados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">98.5%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Precisão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">91%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Aumento Receita</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">+$128k</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Critérios de Personalização</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {['Behavior', 'Preferences', 'Demographics', 'Purchase History', 'Device Type'].map((c, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <span>{c}</span>
              <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}