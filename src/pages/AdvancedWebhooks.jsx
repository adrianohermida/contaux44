import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdvancedWebhooks() {
  const [webhooks] = useState([
    { event: 'order.created', endpoints: 5, delivered: '99.8%', latency: '245ms' },
    { event: 'invoice.updated', endpoints: 3, delivered: '99.9%', latency: '178ms' },
    { event: 'user.registered', endpoints: 8, delivered: '99.7%', latency: '312ms' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Advanced Webhook System</h1>
        <p className="text-slate-600">Sistema avançado de webhooks com retry</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Endpoints</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">42</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Eventos/hora</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">125k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Sucesso Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">99.8%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Webhooks Ativos</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {webhooks.map(w => (
            <div key={w.event} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{w.event}</span>
                <Badge className="bg-green-100 text-green-800">{w.delivered}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>{w.endpoints} endpoints</div>
                <div>Latência: {w.latency}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}