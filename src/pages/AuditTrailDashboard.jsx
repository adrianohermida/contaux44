import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AuditTrailDashboard() {
  const data = [
    { date: 'Mon', creates: 24, updates: 13, deletes: 5 },
    { date: 'Tue', creates: 18, updates: 15, deletes: 3 },
    { date: 'Wed', creates: 32, updates: 20, deletes: 8 },
    { date: 'Thu', creates: 28, updates: 18, deletes: 6 }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Trail Dashboard</h1>
        <p className="text-slate-600">Dashboard de trilha de auditoria</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Eventos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12.4k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Hoje</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">342</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">42</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Retenção</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2 anos</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Atividades Semanais</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="creates" fill="#10b981" name="Criações" />
              <Bar dataKey="updates" fill="#3b82f6" name="Atualizações" />
              <Bar dataKey="deletes" fill="#ef4444" name="Deleções" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}