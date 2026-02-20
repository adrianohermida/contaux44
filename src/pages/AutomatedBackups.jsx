import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AutomatedBackups() {
  const [backups] = useState([
    { id: 1, date: '2026-02-20 02:00', size: '12.4 GB', status: 'success', retention: '30 dias' },
    { id: 2, date: '2026-02-19 02:00', size: '12.1 GB', status: 'success', retention: '29 dias' },
    { id: 3, date: '2026-02-18 02:00', size: '11.8 GB', status: 'success', retention: '28 dias' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Automated Backups</h1>
        <p className="text-slate-600">Backups automáticos com retenção</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Backups Recentes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {backups.map(b => (
            <div key={b.id} className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium">{b.date}</p>
                <p className="text-xs text-slate-600">{b.size} • {b.retention}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">✓ {b.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Backups</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">92</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Sucesso Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">100%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Storage</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">368 GB</div></CardContent>
        </Card>
      </div>
    </div>
  );
}