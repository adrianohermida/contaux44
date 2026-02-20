import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function WhiteLabel() {
  const [instances] = useState([
    { client: 'TechCorp', domain: 'techcorp.platform.local', status: 'active', users: 245 },
    { client: 'Innovation Ltd', domain: 'innovation.platform.local', status: 'active', users: 128 },
    { client: 'Global Services', domain: 'global.platform.local', status: 'active', users: 456 }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">White Label Platform</h1>
        <p className="text-slate-600">Instâncias personalizadas para parceiros</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Instâncias</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">3</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">829</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Uptime</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">99.99%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Instâncias White Label</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {instances.map(i => (
            <div key={i.domain} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{i.client}</span>
                <Badge className="bg-green-100 text-green-800">✓ {i.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>Domain: {i.domain}</div>
                <div>{i.users} usuários</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}