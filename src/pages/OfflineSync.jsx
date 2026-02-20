import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi } from 'lucide-react';

export default function OfflineSync() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Offline Sync Manager</h1>
        <p className="text-slate-600">Sincronização offline avançada</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Dados Sincronizados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">42.3M</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Sucesso Sync</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">99.8%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Sessões Offline</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12.4k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Conflitos Resolvidos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">100%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Wifi className="h-5 w-5" /> Estratégias de Sync</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Delta Sync</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Conflict Resolution</span>
            <Badge className="bg-green-100 text-green-800">✓ Automático</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Priority Queue</span>
            <Badge className="bg-green-100 text-green-800">✓ Configurado</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}