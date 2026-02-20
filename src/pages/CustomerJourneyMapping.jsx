import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CustomerJourneyMapping() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Journey Mapping</h1>
        <p className="text-slate-600">Mapeamento da jornada do cliente</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Jornadas Mapeadas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Touchpoints</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">128</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Conclusão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">64%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Abandono</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">36%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Jornadas Principais</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {['Awareness → Interest → Conversion', 'Free Trial → Paid Subscription', 'Purchase → Advocacy', 'Support → Retention'].map((j, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <span>{j}</span>
              <Badge variant="outline">Rastreando</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}