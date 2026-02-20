import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertCircle, CheckCircle, Database, Zap, TrendingUp } from 'lucide-react';

export default function InfrastructureMonitoring() {
  const dbPerformanceData = [
    { time: '00:00', queries: 145, avgTime: 12, errors: 1 },
    { time: '04:00', queries: 89, avgTime: 10, errors: 0 },
    { time: '08:00', queries: 312, avgTime: 28, errors: 3 },
    { time: '12:00', queries: 521, avgTime: 45, errors: 2 },
    { time: '16:00', queries: 498, avgTime: 42, errors: 4 },
    { time: '20:00', queries: 267, avgTime: 24, errors: 1 }
  ];

  const queryBreakdown = [
    { query: 'SELECT', count: 2145, avgTime: 15 },
    { query: 'UPDATE', count: 312, avgTime: 25 },
    { query: 'INSERT', count: 198, avgTime: 18 },
    { query: 'JOIN', count: 456, avgTime: 35 }
  ];

  const infrastructure = useMemo(() => {
    return {
      dbHealth: 98,
      apiHealth: 99,
      cacheHits: 82,
      avgLatency: 125,
      errorRate: 0.3
    };
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Monitoramento de Infraestrutura</h1>
        <p className="text-slate-600 dark:text-slate-400">Dashboard de saúde de banco de dados e APIs</p>
      </div>

      {/* Health Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saúde BD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{infrastructure.dbHealth}%</div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saúde API</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{infrastructure.apiHealth}%</div>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cache Hits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{infrastructure.cacheHits}%</div>
              <Zap className="h-5 w-5 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Latência Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{infrastructure.avgLatency}ms</div>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{infrastructure.errorRate}%</div>
              <AlertCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance do Banco de Dados</CardTitle>
          <CardDescription>Últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dbPerformanceData}>
              <defs>
                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="queries" stroke="#3b82f6" fillOpacity={1} fill="url(#colorQueries)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Query Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={queryBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="query" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Quantidade" />
              <Bar yAxisId="right" dataKey="avgTime" fill="#10b981" name="Tempo Médio (ms)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Slow Queries */}
      <Card>
        <CardHeader>
          <CardTitle>Queries Lentas</CardTitle>
          <CardDescription>Operações acima de 100ms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { query: 'SELECT * FROM blogs WITH JOINS', time: 245, count: 12 },
            { query: 'UPDATE analytics BULK OPERATION', time: 189, count: 4 },
            { query: 'DELETE old_sessions WHERE created < DATE', time: 156, count: 2 }
          ].map((item, i) => (
            <div key={i} className="p-3 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="font-mono text-sm">{item.query}</p>
                <Badge className="bg-yellow-100 text-yellow-800">{item.time}ms</Badge>
              </div>
              <p className="text-xs text-slate-600">Executado {item.count}x</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}