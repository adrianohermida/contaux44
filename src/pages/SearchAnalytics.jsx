import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SearchAnalytics() {
  const searchData = [
    { day: 'Seg', searches: 234, clicks: 156, ctr: 66.7 },
    { day: 'Ter', searches: 289, clicks: 201, ctr: 69.6 },
    { day: 'Qua', searches: 312, clicks: 234, ctr: 75.0 },
    { day: 'Qui', searches: 267, clicks: 189, ctr: 70.8 },
    { day: 'Sex', searches: 345, clicks: 267, ctr: 77.4 }
  ];

  const topQueries = [
    { query: 'Como criar blog', count: 234 },
    { query: 'Fatura', count: 189 },
    { query: 'Cliente novo', count: 156 },
    { query: 'Relatório', count: 134 }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics de Busca</h1>
        <p className="text-slate-600">Análise de padrões de pesquisa</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Buscas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1,447</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Clicks</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1,047</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">CTR Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">72.3%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tempo Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">42ms</div></CardContent>
        </Card>
      </div>

      {/* Search Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Tendências de Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={searchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="searches" stroke="#3b82f6" name="Buscas" />
              <Line type="monotone" dataKey="clicks" stroke="#10b981" name="Clicks" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Queries */}
      <Card>
        <CardHeader>
          <CardTitle>Buscas Mais Comuns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {topQueries.map((q, i) => (
            <div key={i} className="p-3 border rounded-lg flex items-center justify-between">
              <p>{q.query}</p>
              <span className="text-sm font-medium">{q.count} buscas</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}