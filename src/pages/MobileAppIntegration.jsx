import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone } from 'lucide-react';

export default function MobileAppIntegration() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Mobile App Integration</h1>
        <p className="text-slate-600">Integração completa com aplicativos móveis</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Downloads</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">125k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Rating</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">4.7/5</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">48k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Versão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">3.2.0</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Smartphone className="h-5 w-5" /> Plataformas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>iOS</span>
            <Badge variant="outline">v3.2.0 - 62k downloads</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Android</span>
            <Badge variant="outline">v3.2.0 - 78k downloads</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Sincronização Cloud</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}