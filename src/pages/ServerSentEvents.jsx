import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radio } from 'lucide-react';

export default function ServerSentEvents() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Server-Sent Events</h1>
        <p className="text-slate-600">Atualizações em tempo real push</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Conexões Ativas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2,847</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Eventos/segundo</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1.2k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Latência</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">45ms</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Radio className="h-5 w-5" /> Tipos de Eventos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Atualizações de dados</span>
            <Badge variant="outline">342/h</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Notificações</span>
            <Badge variant="outline">1,245/h</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Status updates</span>
            <Badge variant="outline">8,567/h</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}