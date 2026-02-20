import React, { useState, useEffect } from 'react';
import { BarChart3, AlertCircle, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MemoryProfiler() {
  const [memoryData, setMemoryData] = useState([
    { time: '00:00', used: 45, total: 128 },
    { time: '04:00', used: 52, total: 128 },
    { time: '08:00', used: 68, total: 128 },
    { time: '12:00', used: 85, total: 128 },
    { time: '16:00', used: 95, total: 128 },
    { time: '20:00', used: 102, total: 128 },
    { time: '24:00', used: 115, total: 128 },
  ]);

  const lastMemory = memoryData[memoryData.length - 1];
  const memoryUsagePercent = Math.round((lastMemory.used / lastMemory.total) * 100);
  const leakRate = lastMemory.used - memoryData[0].used;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3 bg-blue-50">
          <p className="text-xs text-gray-600">Usado</p>
          <p className="text-2xl font-bold text-blue-900">{lastMemory.used}MB</p>
        </Card>
        <Card className="p-3 bg-purple-50">
          <p className="text-xs text-gray-600">Total</p>
          <p className="text-2xl font-bold text-purple-900">{lastMemory.total}MB</p>
        </Card>
        <Card className="p-3 bg-green-50">
          <p className="text-xs text-gray-600">Livre</p>
          <p className="text-2xl font-bold text-green-900">{lastMemory.total - lastMemory.used}MB</p>
        </Card>
        <Card className={`p-3 ${memoryUsagePercent > 80 ? 'bg-red-50' : 'bg-yellow-50'}`}>
          <p className="text-xs text-gray-600">Uso</p>
          <p className={`text-2xl font-bold ${memoryUsagePercent > 80 ? 'text-red-900' : 'text-yellow-900'}`}>
            {memoryUsagePercent}%
          </p>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Uso ao Longo do Tempo</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={memoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 128]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="used" stroke="#3b82f6" name="Usado (MB)" strokeWidth={2} />
            <Line type="monotone" dataKey="total" stroke="#9ca3af" name="Total (MB)" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {leakRate > 50 && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-red-900">Possível Memory Leak</p>
              <p className="text-xs text-red-800">Crescimento: +{leakRate}MB desde o início</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}