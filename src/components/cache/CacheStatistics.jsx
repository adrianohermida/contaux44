import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

/**
 * Cache Statistics - Estatísticas de cache
 */
export default function CacheStatistics() {
  const [timeSeriesData] = useState([
    { time: '00:00', hits: 100, misses: 20 },
    { time: '04:00', hits: 250, misses: 45 },
    { time: '08:00', hits: 580, misses: 85 },
    { time: '12:00', hits: 950, misses: 120 },
    { time: '16:00', hits: 1200, misses: 180 },
    { time: '20:00', hits: 1450, misses: 220 },
    { time: '24:00', hits: 1800, misses: 280 },
  ]);

  const [typeData] = useState([
    { name: 'Invoices', value: 35, color: '#3b82f6' },
    { name: 'Payments', value: 25, color: '#8b5cf6' },
    { name: 'Tickets', value: 20, color: '#ec4899' },
    { name: 'Clients', value: 20, color: '#f59e0b' },
  ]);

  const totalHits = timeSeriesData.reduce((sum, d) => sum + d.hits, 0);
  const totalMisses = timeSeriesData.reduce((sum, d) => sum + d.misses, 0);
  const hitRate = Math.round((totalHits / (totalHits + totalMisses)) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3 bg-blue-50">
          <p className="text-xs text-gray-600">Total Hits</p>
          <p className="text-2xl font-bold text-blue-900">{totalHits}</p>
        </Card>
        <Card className="p-3 bg-red-50">
          <p className="text-xs text-gray-600">Total Misses</p>
          <p className="text-2xl font-bold text-red-900">{totalMisses}</p>
        </Card>
        <Card className="p-3 bg-green-50">
          <p className="text-xs text-gray-600">Hit Rate</p>
          <p className="text-2xl font-bold text-green-900">{hitRate}%</p>
        </Card>
        <Card className="p-3 bg-purple-50">
          <p className="text-xs text-gray-600">Avg Latency</p>
          <p className="text-2xl font-bold text-purple-900">8ms</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold">Performance ao Longo do Tempo</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hits" fill="#3b82f6" name="Hits" />
            <Bar dataKey="misses" fill="#ef4444" name="Misses" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Distribuição por Tipo</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={typeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {typeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}