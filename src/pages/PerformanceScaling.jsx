import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PerformanceScaling() {
  const scalingData = [
    { time: '00:00', cpu: 15, memory: 40, latency: 45 },
    { time: '04:00', cpu: 22, memory: 52, latency: 52 },
    { time: '08:00', cpu: 45, memory: 68, latency: 78 },
    { time: '12:00', cpu: 65, memory: 82, latency: 120 },
    { time: '16:00', cpu: 55, memory: 75, latency: 95 },
    { time: '20:00', cpu: 35, memory: 58, latency: 68 }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Scaling Metrics</h1>
        <p className="text-slate-600">Monitore escalabilidade do sistema</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Max Throughput</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">50k req/s</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Avg Latency</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">78ms</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Uptime</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">99.99%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Scaling Performance</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scalingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpu" stroke="#ef4444" name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#f59e0b" name="Memory %" />
              <Line type="monotone" dataKey="latency" stroke="#3b82f6" name="Latency (ms)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}