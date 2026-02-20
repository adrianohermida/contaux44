import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DatabaseSharding() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Database Sharding</h1>
        <p className="text-slate-600">Fragmentação distribuída de dados</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Shards Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Registros Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2.4B</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Capacidade Usada</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">67%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Distribuição de Shards</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <span>Shard {i}</span>
              <Badge variant="outline">{300 + i * 10}M registros</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}