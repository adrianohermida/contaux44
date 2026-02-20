import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export default function APIDocumentation() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">API Documentation Generator</h1>
        <p className="text-slate-600">Gerador automático de documentação</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Endpoints Documentados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">124</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Cobertura</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">100%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Formatos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">3</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Atualizações</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">Auto</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Formatos Suportados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>OpenAPI 3.0</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Swagger UI</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Postman Collection</span>
            <Badge className="bg-green-100 text-green-800">✓ Exportável</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}