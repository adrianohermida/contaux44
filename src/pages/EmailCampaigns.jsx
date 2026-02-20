import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';

export default function EmailCampaigns() {
  const [campaigns] = useState([
    { name: 'Welcome Series', status: 'active', sent: 245, opens: 198, clicks: 89, rate: '81%' },
    { name: 'Black Friday Promo', status: 'completed', sent: 1200, opens: 924, clicks: 412, rate: '77%' },
    { name: 'Newsletter Feb', status: 'draft', sent: 0, opens: 0, clicks: 0, rate: '0%' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Automated Email Campaigns</h1>
        <p className="text-slate-600">Campanhas de email automatizadas</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Campanhas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">18</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Ativas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">5</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Abertura</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">79%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Clique</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">34%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Campanhas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {campaigns.map((c, i) => (
            <div key={i} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{c.name}</span>
                <Badge className={c.status === 'active' ? 'bg-green-100 text-green-800' : c.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}>
                  {c.status}
                </Badge>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs text-slate-600">
                <div>Enviadas: {c.sent}</div>
                <div>Aberturas: {c.opens}</div>
                <div>Cliques: {c.clicks}</div>
                <div>Taxa: {c.rate}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}