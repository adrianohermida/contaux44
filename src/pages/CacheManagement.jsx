import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CacheManagement() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Cache Management</h1>
        <p className="text-slate-600">Gerenciamento avançado de cache</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Hit</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">87.3%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Memória Usada</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24.5 GB</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tempo Resposta</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8ms</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Estratégias de Cache</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>LRU Cache</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Distributed Cache</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Query Result Cache</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}