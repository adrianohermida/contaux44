import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

export default function DataAnonymization() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Data Anonymization</h1>
        <p className="text-slate-600">Anonimização de dados sensíveis</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Registros Anonimizados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1.2M</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Cobertura</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">100%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Técnicas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Conformidade</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">GDPR</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" /> Técnicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Masking</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Hashing</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Aggregation</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}