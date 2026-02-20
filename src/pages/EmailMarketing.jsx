import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function EmailMarketing() {
  const [campaigns] = useState([
    { name: 'Weekly Newsletter', status: 'active', subscribers: 3450, openRate: '34.2%', clickRate: '5.8%' },
    { name: 'Product Updates', status: 'active', subscribers: 5200, openRate: '41.3%', clickRate: '8.2%' },
    { name: 'Seasonal Promo', status: 'draft', subscribers: 0, openRate: '0%', clickRate: '0%' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Email Marketing</h1>
        <p className="text-slate-600">Campanhas de email marketing</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Campanhas</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {campaigns.map(c => (
            <div key={c.name} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{c.name}</p>
                <Badge className={c.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100'}>
                  {c.status}
                </Badge>
              </div>
              {c.status === 'active' && (
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                  <div>Inscritos: {c.subscribers}</div>
                  <div>Open Rate: {c.openRate}</div>
                  <div>Click Rate: {c.clickRate}</div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Subscribers</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8,650</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Avg Open Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">37.8%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Avg Click Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">7.0%</div></CardContent>
        </Card>
      </div>
    </div>
  );
}