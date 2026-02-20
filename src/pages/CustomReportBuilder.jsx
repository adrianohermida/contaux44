import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CustomReportBuilder() {
  const reports = [
    { name: 'Revenue Quarterly', type: 'Financial', lastRun: '2026-02-20', schedule: 'Monthly' },
    { name: 'User Engagement', type: 'Analytics', lastRun: '2026-02-19', schedule: 'Weekly' },
    { name: 'Sales Pipeline', type: 'Sales', lastRun: '2026-02-20', schedule: 'Daily' }
  ];

  const data = [
    { month: 'Jan', revenue: 45000, target: 40000 },
    { month: 'Fev', revenue: 52000, target: 50000 },
    { month: 'Mar', revenue: 48000, target: 45000 }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Custom Report Builder</h1>
        <p className="text-slate-600">Construtor de relatórios personalizados</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Relatórios</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Templates</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">18</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Agendados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">45</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Relatórios Recentes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {reports.map((r, i) => (
            <div key={i} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{r.name}</span>
                <Badge variant="outline">{r.type}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>Última execução: {r.lastRun}</div>
                <div>Agendado: {r.schedule}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Exemplo de Relatório</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" name="Receita Realizada" />
              <Bar dataKey="target" fill="#10b981" name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}