import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export default function DDoSProtection() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">DDoS Protection</h1>
        <p className="text-slate-600">Proteção contra ataques DDoS</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Ataques Bloqueados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">2,847</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Bloqueio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">99.97%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Uptime Mantido</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">100%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Estratégias</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">5</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Proteções Ativas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Rate Limiting</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>IP Reputation</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Bot Detection</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}