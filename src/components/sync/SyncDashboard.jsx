import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Sync Dashboard - Dashboard de sincronização em tempo real
 */
export default function SyncDashboard() {
  const [syncData, setSyncData] = useState([
    { time: '00:00', synced: 0, failed: 0, latency: 50 },
    { time: '04:00', synced: 150, failed: 2, latency: 65 },
    { time: '08:00', synced: 420, failed: 8, latency: 78 },
    { time: '12:00', synced: 890, failed: 12, latency: 95 },
    { time: '16:00', synced: 1200, failed: 15, latency: 110 },
    { time: '20:00', synced: 1680, failed: 20, latency: 125 },
    { time: '24:00', synced: 2100, failed: 28, latency: 145 },
  ]);

  const lastSync = syncData[syncData.length - 1];
  const successRate = Math.round(
    ((lastSync.synced / (lastSync.synced + lastSync.failed)) * 100) || 0
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Card className="p-3 bg-blue-50">
          <p className="text-xs text-gray-600">Sincronizados</p>
          <p className="text-2xl font-bold text-blue-900">{lastSync.synced}</p>
        </Card>
        <Card className="p-3 bg-red-50">
          <p className="text-xs text-gray-600">Falhas</p>
          <p className="text-2xl font-bold text-red-900">{lastSync.failed}</p>
        </Card>
        <Card className="p-3 bg-green-50">
          <p className="text-xs text-gray-600">Taxa Sucesso</p>
          <p className="text-2xl font-bold text-green-900">{successRate}%</p>
        </Card>
        <Card className="p-3 bg-purple-50">
          <p className="text-xs text-gray-600">Latência</p>
          <p className="text-2xl font-bold text-purple-900">{lastSync.latency}ms</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold">Performance ao Longo do Tempo</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={syncData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="synced"
              stroke="#3b82f6"
              name="Sincronizados"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              name="Falhas"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#8b5cf6"
              name="Latência (ms)"
              strokeWidth={2}
              yAxisId="right"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}