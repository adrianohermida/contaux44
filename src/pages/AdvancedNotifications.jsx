import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

export default function AdvancedNotifications() {
  const [rules] = useState([
    { id: 1, name: 'Blog Published Alert', channels: 'Email, SMS', status: 'active' },
    { id: 2, name: 'Invoice Overdue', channels: 'Email, Slack', status: 'active' },
    { id: 3, name: 'New Comment', channels: 'In-app', status: 'active' }
  ]);

  const channels = ['Email', 'SMS', 'Slack', 'In-app', 'Push Notification'];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notificações Avançadas</h1>
          <p className="text-slate-600">Configure multi-canal notifications</p>
        </div>
        <Button className="gap-2"><Bell className="h-4 w-4" /> Nova Regra</Button>
      </div>

      {/* Active Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Regras de Notificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rules.map(r => (
            <div key={r.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{r.name}</p>
                <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
              </div>
              <p className="text-xs text-slate-600">Canais: {r.channels}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Available Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Canais Disponíveis</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {channels.map(ch => (
            <div key={ch} className="p-2 border rounded hover:bg-blue-50 cursor-pointer text-sm">
              {ch}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Regras Ativas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">15</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Notificações Hoje</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">342</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Entrega</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">99.2%</div></CardContent>
        </Card>
      </div>
    </div>
  );
}