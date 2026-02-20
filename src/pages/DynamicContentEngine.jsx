import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DynamicContentEngine() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Dynamic Content Engine</h1>
        <p className="text-slate-600">Engine de conteúdo dinâmico</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Segmentos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">32</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Variações de Conteúdo</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">256</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Relevância</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">87%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Impacto Engajamento</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">+42%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Tipos de Conteúdo</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {['Headlines', 'Product Recommendations', 'Email Copy', 'Landing Pages'].map((t, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <span>{t}</span>
              <Badge className="bg-green-100 text-green-800">✓ Dinâmico</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}