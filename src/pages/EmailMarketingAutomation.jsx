import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function EmailMarketingAutomation() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Email Marketing Automation</h1>
        <p className="text-slate-600">Automação de email marketing</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Fluxos Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Emails Enviados/dia</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">84k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Abertura</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">34.2%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Click</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">8.7%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Fluxos de Automação</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {['Welcome Series', 'Abandoned Cart', 'Re-engagement', 'Birthday Offers'].map((f, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <span>{f}</span>
              <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}