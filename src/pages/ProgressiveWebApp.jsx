import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

export default function ProgressiveWebApp() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Progressive Web App</h1>
        <p className="text-slate-600">Aplicativo web progressivo</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Instalações</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8.2k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Score Lighthouse</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">98</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Offline Ready</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">100%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tamanho App</CardTitle></CardContent>
          <CardContent><div className="text-2xl font-bold">3.2 MB</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> Recursos PWA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Service Workers</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Web Manifest</span>
            <Badge className="bg-green-100 text-green-800">✓ Configurado</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Installable</span>
            <Badge className="bg-green-100 text-green-800">✓ Sim</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Offline Functionality</span>
            <Badge className="bg-green-100 text-green-800">✓ Completo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}