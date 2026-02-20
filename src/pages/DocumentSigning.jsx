import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PenTool } from 'lucide-react';

export default function DocumentSigning() {
  const [documents] = useState([
    { name: 'Proposta A', signers: 2, signed: 2, status: 'completed' },
    { name: 'Contrato B', signers: 3, signed: 2, status: 'pending' },
    { name: 'NDA C', signers: 1, signed: 0, status: 'pending' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Document E-Signature</h1>
        <p className="text-slate-600">Assinatura eletrônica de documentos</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Documentos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">156</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Assinados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">142</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tempo Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2.3 dias</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Conclusão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">91%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><PenTool className="h-5 w-5" /> Documentos Pendentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {documents.map((d, i) => (
            <div key={i} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{d.name}</span>
                <Badge className={d.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {d.signed}/{d.signers} assinadas
                </Badge>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(d.signed / d.signers) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}