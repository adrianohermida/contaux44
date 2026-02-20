import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Bug, TrendingDown, CheckCircle } from 'lucide-react';

export default function ErrorTracking() {
  const [errors] = useState([
    { id: 1, type: 'TypeError', message: 'Cannot read property of undefined', count: 145, severity: 'high', lastSeen: '2 mins', resolved: false },
    { id: 2, type: 'ReferenceError', message: 'blogPost is not defined', count: 89, severity: 'high', lastSeen: '15 mins', resolved: false },
    { id: 3, type: 'SyntaxError', message: 'Unexpected token in JSON', count: 34, severity: 'medium', lastSeen: '1 hour', resolved: false },
    { id: 4, type: 'NetworkError', message: 'Failed to fetch from API', count: 67, severity: 'critical', lastSeen: '10 mins', resolved: false },
    { id: 5, type: 'ValidationError', message: 'Invalid email format', count: 23, severity: 'low', lastSeen: '3 hours', resolved: true }
  ]);

  const errorTrend = [
    { day: 'Mon', errors: 34, resolved: 8 },
    { day: 'Tue', errors: 28, resolved: 12 },
    { day: 'Wed', errors: 45, resolved: 15 },
    { day: 'Thu', errors: 52, resolved: 10 },
    { day: 'Fri', errors: 38, resolved: 18 },
    { day: 'Sat', errors: 19, resolved: 12 },
    { day: 'Sun', errors: 24, resolved: 8 }
  ];

  const errorTypes = [
    { name: 'TypeError', value: 145 },
    { name: 'NetworkError', value: 67 },
    { name: 'ReferenceError', value: 89 },
    { name: 'Others', value: 57 }
  ];

  const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6'];

  const getSeverityColor = (severity) => {
    if (severity === 'critical') return 'bg-red-100 text-red-800';
    if (severity === 'high') return 'bg-orange-100 text-orange-800';
    if (severity === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getSeverityIcon = (severity) => {
    if (severity === 'critical') return <AlertTriangle className="h-5 w-5 text-red-600" />;
    return <Bug className="h-5 w-5 text-orange-600" />;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Rastreamento de Erros</h1>
        <p className="text-slate-600 dark:text-slate-400">Monitore e resolva erros em tempo real</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Erros Não Resolvidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errors.filter(e => !e.resolved).length}</div>
            <p className="text-xs text-slate-600 mt-1">Requerem ação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{errors.filter(e => e.severity === 'critical').length}</div>
            <p className="text-xs text-slate-600 mt-1">Ação imediata</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errors.reduce((sum, e) => sum + e.count, 0)}</div>
            <p className="text-xs text-slate-600 mt-1">↓ 12% vs ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-slate-600 mt-1">Erros fixados</p>
          </CardContent>
        </Card>
      </div>

      {/* Error Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Tendência de Erros - Última Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={errorTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="errors" stroke="#ef4444" name="Erros Novos" />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" name="Resolvidos" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Error Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={errorTypes} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {errorTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Erros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {errors.slice(0, 4).map(error => (
              <div key={error.id} className="flex items-center justify-between p-2 border-b pb-3">
                <div className="flex items-start gap-2 flex-grow">
                  {getSeverityIcon(error.severity)}
                  <div>
                    <p className="font-medium text-sm">{error.type}</p>
                    <p className="text-xs text-slate-600">{error.message.substring(0, 40)}...</p>
                  </div>
                </div>
                <Badge className={getSeverityColor(error.severity)}>{error.count}x</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Error Details */}
      <Card>
        <CardHeader>
          <CardTitle>Lista Completa de Erros</CardTitle>
          <CardDescription>Clique para investigar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {errors.map(error => (
            <div key={error.id} className={`p-4 border rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition ${error.resolved ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(error.severity)}
                  <div>
                    <h4 className="font-semibold">{error.type}</h4>
                    <p className="text-sm text-slate-600">{error.message}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getSeverityColor(error.severity)}>
                    {error.severity.toUpperCase()}
                  </Badge>
                  {error.resolved && <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-600 mt-2">
                <span>{error.count} occorrências</span>
                <span>Último visto: {error.lastSeen}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}