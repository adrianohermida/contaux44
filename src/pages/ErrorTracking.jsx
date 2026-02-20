import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

export default function ErrorTracking() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Error Tracking & Reporting</h1>
        <p className="text-slate-600">Rastreamento e relatório de erros</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Erros Detectados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">284</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Resolução</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">94%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tempo Médio Fix</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4.2h</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Críticos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-orange-600">2</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Top Erros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Database Connection Timeout</span>
            <Badge variant="outline">42 ocorrências</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Memory Leak Warning</span>
            <Badge variant="outline">28 ocorrências</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>API Rate Limit Exceeded</span>
            <Badge variant="outline">156 ocorrências</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}