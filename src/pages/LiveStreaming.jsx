import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radio } from 'lucide-react';

export default function LiveStreaming() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Live Streaming Platform</h1>
        <p className="text-slate-600">Transmissões ao vivo integradas</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Transmissões</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Espectadores Máx</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8.5k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Horas Transmitidas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">142</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Ao Vivo</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">1</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Radio className="h-5 w-5 text-red-600" /> Transmissão Atual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 border rounded-lg border-red-200 bg-red-50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-red-900">Webinar: "Growth Hacking 2026"</span>
              <Badge className="bg-red-100 text-red-800">🔴 AO VIVO</Badge>
            </div>
            <p className="text-sm text-red-800">3,245 espectadores • 28 minutos de transmissão</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}