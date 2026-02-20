import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RequestResponseCaching() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Request/Response Caching</h1>
        <p className="text-slate-600">Cache inteligente de requisições e respostas</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Hit</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">89.2%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Itens Cacheados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24.5k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Latência Reduzida</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">-73%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Armazenamento</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8.4 GB</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Estratégias de Cache</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>HTTP Cache Headers</span>
            <Badge className="bg-green-100 text-green-800">✓ Configurado</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>ETags & Last-Modified</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Cache Invalidation</span>
            <Badge className="bg-green-100 text-green-800">✓ Automático</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}