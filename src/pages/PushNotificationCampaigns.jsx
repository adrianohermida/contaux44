import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PushNotificationCampaigns() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Push Notification Campaigns</h1>
        <p className="text-slate-600">Campanhas de notificações push</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Notificações Enviadas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">5.4M</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Clique</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">18.5%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Unsubscribes</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2.1%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Campanhas Ativas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">6</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Plataformas Suportadas</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {['Web Push', 'iOS Push', 'Android Push', 'Huawei Push'].map((p, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <span>{p}</span>
              <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}