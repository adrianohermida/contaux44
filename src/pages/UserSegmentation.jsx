import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp } from 'lucide-react';

export default function UserSegmentation() {
  const [segments] = useState([
    { name: 'Premium Users', size: 245, value: 'R$ 125k', engagement: '94%', status: 'active' },
    { name: 'Churn Risk', size: 58, value: 'R$ 18k', engagement: '32%', status: 'warning' },
    { name: 'New Customers', size: 127, value: 'R$ 42k', engagement: '78%', status: 'active' },
    { name: 'VIP Accounts', size: 23, value: 'R$ 156k', engagement: '99%', status: 'active' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Advanced User Segmentation</h1>
        <p className="text-slate-600">Segmentação inteligente de usuários</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Usuários</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">453</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Segmentos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Valor Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">R$ 341k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Engajamento</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">76%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Segmentos Ativos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {segments.map((s, i) => (
            <div key={i} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{s.name}</span>
                <Badge className={s.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {s.engagement}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                <div>{s.size} usuários</div>
                <div>{s.value}</div>
                <div>Engajamento: {s.engagement}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}