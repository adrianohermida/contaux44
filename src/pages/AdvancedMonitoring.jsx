import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

export default function AdvancedMonitoring() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Advanced Monitoring</h1>
        <p className="text-slate-600">Monitoramento avançado de sistema</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Uptime</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">99.99%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Alertas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Métricas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1,247</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-orange-600" /> Alertas Ativos</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="p-2 border rounded border-orange-200 bg-orange-50">
            <p className="font-medium text-orange-800">CPU alto em Shard-3</p>
            <p className="text-xs text-orange-700">Uso: 82% - Ação recomendada</p>
          </div>
          <div className="p-2 border rounded border-yellow-200 bg-yellow-50">
            <p className="font-medium text-yellow-800">Latência de DB aumentada</p>
            <p className="text-xs text-yellow-700">Média: 245ms - Monitorando</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Checklist de Health</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><Badge className="bg-green-100 text-green-800">✓</Badge><span>API Responsivo</span></div>
          <div className="flex items-center gap-2"><Badge className="bg-green-100 text-green-800">✓</Badge><span>Database OK</span></div>
          <div className="flex items-center gap-2"><Badge className="bg-green-100 text-green-800">✓</Badge><span>Cache Distribuído</span></div>
          <div className="flex items-center gap-2"><Badge className="bg-green-100 text-green-800">✓</Badge><span>Backup Sincronizado</span></div>
        </CardContent>
      </Card>
    </div>
  );
}