import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, Download } from 'lucide-react';

export default function DocumentVersioning() {
  const [versions] = useState([
    { id: 1, version: 'v3.2', date: '2026-02-20 14:32', author: 'João Silva', changes: 'SEO updates' },
    { id: 2, version: 'v3.1', date: '2026-02-19 10:15', author: 'Maria Santos', changes: 'Content review' },
    { id: 3, version: 'v3.0', date: '2026-02-18 15:45', author: 'João Silva', changes: 'Major revision' },
    { id: 4, version: 'v2.5', date: '2026-02-15 09:20', author: 'Admin', changes: 'Bug fixes' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Versionamento de Documentos</h1>
        <p className="text-slate-600">Rastreie todas as mudanças e reverta facilmente</p>
      </div>

      {/* Current Version */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">Versão Atual</Badge>
            v3.2
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Última atualização: 2026-02-20 14:32 por João Silva</p>
        </CardContent>
      </Card>

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Versões
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {versions.map((v, i) => (
            <div key={v.id} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium">{v.version}</p>
                <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
              </div>
              <p className="text-xs text-slate-600">{v.date} por {v.author}</p>
              <p className="text-xs text-slate-500 mt-1">{v.changes}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Comparar Versões</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm font-medium">De:</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg">
              <option>v3.1</option>
              <option>v3.0</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Para:</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg">
              <option>v3.2 (Atual)</option>
            </select>
          </div>
          <Button className="w-full">Comparar</Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Versões</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Última Mudança</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2h</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Autores</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">5</div></CardContent>
        </Card>
      </div>
    </div>
  );
}