import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

export default function APIRateLimiting() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">API Rate Limiting Advanced</h1>
        <p className="text-slate-600">Limitação de taxa avançada</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Requisições/min</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">10k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Clientes Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">485</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Bloqueio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2.3%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Estratégias</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">5</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" /> Estratégias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Token Bucket</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Sliding Window</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Leaky Bucket</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}