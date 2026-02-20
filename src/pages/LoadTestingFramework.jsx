import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LoadTestingFramework() {
  const [tests] = useState([
    { name: 'API Endpoints Test', status: 'completed', users: 5000, duration: '30m', result: 'PASSED' },
    { name: 'Database Load Test', status: 'completed', users: 10000, duration: '45m', result: 'PASSED' },
    { name: 'UI Performance Test', status: 'running', users: 2000, duration: '15m', result: 'In Progress' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Load Testing Framework</h1>
        <p className="text-slate-600">Testes de carga e performance</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Testes Recentes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {tests.map((t, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{t.name}</p>
                <Badge className={t.result === 'PASSED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                  {t.result}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                <div>Usuários: {t.users.toLocaleString()}</div>
                <div>Duração: {t.duration}</div>
                <div>{t.status}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Tests</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Pass Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">96%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Avg Response</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">120ms</div></CardContent>
        </Card>
      </div>
    </div>
  );
}