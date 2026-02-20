import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MultiChannelCampaigns() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Multi-Channel Campaigns</h1>
        <p className="text-slate-600">Campanhas em múltiplos canais</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Campanhas Ativas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">15</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Canais</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">6</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Engajamento</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">31.2%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">ROI Combinado</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">4.1x</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Canais Suportados</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {['Email', 'SMS', 'Push Notifications', 'Social Media', 'In-App', 'Web'].map((c, i) => (
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