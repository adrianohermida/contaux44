import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdvancedMetricsDashboard() {
  const data = [
    { date: 'Jan', revenue: 4000, users: 2400, conversion: 24 },
    { date: 'Feb', revenue: 4500, users: 2700, conversion: 28 },
    { date: 'Mar', revenue: 5200, users: 3100, conversion: 32 },
    { date: 'Apr', revenue: 4800, users: 2900, conversion: 30 }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Advanced Metrics Dashboard</h1>
        <p className="text-slate-600">Dashboard com métricas avançadas</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Revenue Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$18.5k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">11.1k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Conversão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">28.5%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">ROI Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">3.2x</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Tendências de Receita & Usuários</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
              <Line type="monotone" dataKey="users" stroke="#10b981" name="Users" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}