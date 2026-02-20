import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function QueueManagement() {
  const [queues] = useState([
    { name: 'Email Queue', pending: 234, processed: 8950, avgTime: '2.3s' },
    { name: 'Report Queue', pending: 12, processed: 567, avgTime: '15.2s' },
    { name: 'Analytics Queue', pending: 0, processed: 23450, avgTime: '0.8s' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Queue Management</h1>
        <p className="text-slate-600">Gerencie filas de processamento</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Filas Ativas</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {queues.map(q => (
            <div key={q.name} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{q.name}</p>
                <Badge variant="outline">{q.pending} pendentes</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
                <div>Processadas: {q.processed}</div>
                <div>Tempo médio: {q.avgTime}</div>
                <div>Taxa: {Math.round(q.processed / 24)} msg/h</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Mensagens Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">32,967</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Processamento</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1,374/h</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Health</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">✓ 100%</div></CardContent>
        </Card>
      </div>
    </div>
  );
}