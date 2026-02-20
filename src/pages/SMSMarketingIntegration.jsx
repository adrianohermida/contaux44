import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SMSMarketingIntegration() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">SMS Marketing Integration</h1>
        <p className="text-slate-600">Integração de SMS marketing</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">SMS Enviados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1.2M</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Entrega</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">98.9%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Resposta</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">22%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">ROI SMS</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">5.2x</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Integradores Suportados</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {['Twilio', 'AWS SNS', 'Nexmo', 'Custom Gateway'].map((p, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <span>{p}</span>
              <Badge className="bg-green-100 text-green-800">✓ Conectado</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}