import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function DataVisualization() {
  const chartData = [
    { name: 'Revenue', value: 45, color: '#3b82f6' },
    { name: 'Costs', value: 25, color: '#ef4444' },
    { name: 'Profit', value: 30, color: '#10b981' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Advanced Data Visualization</h1>
        <p className="text-slate-600">Visualizações de dados avançadas</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Distribuição Financeira</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Widgets Disponíveis</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Gráficos Suportados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">15</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Temas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8</div></CardContent>
        </Card>
      </div>
    </div>
  );
}