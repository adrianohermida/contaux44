import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share } from 'lucide-react';

export default function ReferralProgram() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Referral Program Manager</h1>
        <p className="text-slate-600">Programa de referência com gamificação</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Participantes</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">856</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Clientes Adquiridos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">342</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Receita Gerada</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">R$ 245k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Conversão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">40%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Share className="h-5 w-5" /> Estrutura de Recompensas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Referência bem-sucedida</span>
            <Badge variant="outline">+15% comissão</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Referência premium</span>
            <Badge variant="outline">+25% comissão</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Top referenciador</span>
            <Badge variant="outline">Bônus R$ 5k</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}