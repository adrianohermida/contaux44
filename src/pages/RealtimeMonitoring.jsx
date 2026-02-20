import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

export default function RealtimeMonitoring() {
  const realtimeData = [
    { time: '14:00', cpu: 32, memory: 58, requests: 234 },
    { time: '14:05', cpu: 38, memory: 62, requests: 267 },
    { time: '14:10', cpu: 42, memory: 68, requests: 312 },
    { time: '14:15', cpu: 35, memory: 61, requests: 289 },
    { time: '14:20', cpu: 28, memory: 54, requests: 198 },
    { time: '14:25', cpu: 45, memory: 71, requests: 356 }
  ];

  const services = [
    { name: 'API Server', status: 'healthy', uptime: '99.98%', latency: '45ms' },
    { name: 'Database', status: 'healthy', uptime: '99.99%', latency: '12ms' },
    { name: 'Cache Server', status: 'healthy', uptime: '98.5%', latency: '2ms' },
    { name: 'CDN', status: 'warning', uptime: '97.2%', latency: '180ms' }
  ];

  const alerts = [
    { id: 1, message: 'High CPU usage detected', severity: 'warning', time: '2 min ago' },
    { id: 2, message: 'Memory approaching limit', severity: 'warning', time: '5 min ago' }
  ];

  const getStatusIcon = (status) => {
    if (status === 'healthy') return <CheckCircle className="h-5 w-5 text-green-600" />;
    return <AlertCircle className="h-5 w-5 text-yellow-600" />;
  };

  const getStatusBadge = (status) => {
    if (status === 'healthy') return <Badge className="bg-green-100 text-green-800">✓ Saudável</Badge>;
    return <Badge className="bg-yellow-100 text-yellow-800">⚠ Aviso</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Monitoramento em Tempo Real</h1>
        <p className="text-slate-600 dark:text-slate-400">Dashboard de saúde do sistema</p>
      </div>

      {/* Live Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600 animate-pulse" />
            <CardTitle>Sistema Online</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-green-600 font-medium">✓ Todos os serviços operacionais</div>
        </CardContent>
      </Card>

      {/* Real-time Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas em Tempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={realtimeData}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="cpu" stroke="#ef4444" fill="url(#colorCpu)" name="CPU %" />
              <Area type="monotone" dataKey="memory" stroke="#f59e0b" name="Memory %" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status dos Serviços</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {services.map(service => (
            <div key={service.name} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <p className="font-medium">{service.name}</p>
                </div>
                {getStatusBadge(service.status)}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div>
                  <p className="font-medium">Uptime</p>
                  <p>{service.uptime}</p>
                </div>
                <div>
                  <p className="font-medium">Latência</p>
                  <p>{service.latency}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Ativos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {alerts.length === 0 ? (
            <p className="text-sm text-slate-600">Nenhum alerta ativo</p>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className="p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{alert.message}</p>
                    <p className="text-xs text-slate-600">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45%</div>
            <p className="text-xs text-slate-600 mt-1">Pico: 67% • Limite: 100%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Memory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">71%</div>
            <p className="text-xs text-slate-600 mt-1">Usado: 34GB • Limite: 48GB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Disk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">62%</div>
            <p className="text-xs text-slate-600 mt-1">Usado: 186GB • Limite: 300GB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}