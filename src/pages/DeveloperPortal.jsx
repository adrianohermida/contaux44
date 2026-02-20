import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export default function DeveloperPortal() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Developer Portal</h1>
        <p className="text-slate-600">Portal para desenvolvedores</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Desenvolvedores Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">342</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Aplicações</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">284</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">API Keys Ativas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">567</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Satisfação</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">4.8/5</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Recursos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>API Documentation</span>
            <Badge className="bg-green-100 text-green-800">✓ Completo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Interactive Sandbox</span>
            <Badge className="bg-green-100 text-green-800">✓ Disponível</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Code Examples</span>
            <Badge className="bg-green-100 text-green-800">✓ 40+ exemplos</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Support Chat</span>
            <Badge className="bg-green-100 text-green-800">✓ 24/7</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}