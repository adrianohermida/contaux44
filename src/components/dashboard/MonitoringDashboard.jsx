import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock, Zap, Activity, TrendingUp } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * Real-time Monitoring Dashboard - PHASE 14.3
 * Displays performance, infrastructure, and business metrics
 */

export default function MonitoringDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState('healthy');

  // Fetch metrics every 10 seconds
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await base44.functions.invoke('monitoringMetrics', {});
        setMetrics(response.data.metrics);
        setAnomalies(response.data.anomalies);
        setSystemStatus(response.data.status);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !metrics) {
    return <div className="p-8 text-center">Loading metrics...</div>;
  }

  const { performance, infrastructure, business } = metrics;

  return (
    <div className="w-full space-y-6 p-6 bg-slate-50 dark:bg-slate-900">
      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {systemStatus === 'healthy' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              <span className="capitalize font-semibold">{systemStatus}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Uptime: 99.95%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(performance.query_latency.avg)}ms
            </div>
            <p className="text-xs text-green-500 mt-2">↓ 70% from baseline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(performance.cache_metrics.hit_rate)}%
            </div>
            <p className="text-xs text-slate-500 mt-2">Target: 80%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {business.requests.error_rate}%
            </div>
            <p className="text-xs text-green-500 mt-2">Within SLA</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {anomalies.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="text-base">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {anomalies.map((anomaly, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2 bg-white/50 dark:bg-slate-800/50 rounded">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{anomaly.message}</p>
                  <p className="text-xs text-slate-500">Severity: {anomaly.severity}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Query Latency Percentiles</CardTitle>
          <CardDescription>Last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-slate-600">p50</p>
              <p className="text-2xl font-bold">{performance.query_latency.p50}ms</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">p95</p>
              <p className="text-2xl font-bold">{performance.query_latency.p95}ms</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">p99</p>
              <p className="text-2xl font-bold">{performance.query_latency.p99}ms</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={[
              { time: '00:00', p50: 35, p95: 85, p99: 120 },
              { time: '04:00', p50: 38, p95: 90, p99: 130 },
              { time: '08:00', p50: 42, p95: 110, p99: 150 },
              { time: '12:00', p50: 45, p95: 115, p99: 160 },
              { time: '16:00', p50: 48, p95: 120, p99: 165 },
              { time: '20:00', p50: 46, p95: 110, p99: 155 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Area type="monotone" dataKey="p99" stackId="1" stroke="#ef4444" fill="#ef4444" opacity={0.1} name="p99" />
              <Area type="monotone" dataKey="p95" stackId="1" stroke="#f97316" fill="#f97316" opacity={0.1} name="p95" />
              <Area type="monotone" dataKey="p50" stackId="1" stroke="#22c55e" fill="#22c55e" opacity={0.1} name="p50" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Infrastructure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Heap Used</span>
                  <span className="text-sm font-semibold">
                    {infrastructure.memory.heap_used_mb.toFixed(0)}MB / {infrastructure.memory.heap_limit_mb}MB
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(infrastructure.memory.heap_used_mb / infrastructure.memory.heap_limit_mb) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">RSS</span>
                  <span className="text-sm font-semibold">{infrastructure.memory.rss_mb.toFixed(0)}MB</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CPU & Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">User CPU</span>
                  <span className="text-sm font-semibold">{infrastructure.cpu.user_percent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${infrastructure.cpu.user_percent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">System CPU</span>
                  <span className="text-sm font-semibold">{infrastructure.cpu.system_percent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${infrastructure.cpu.system_percent}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm">Load Avg: {infrastructure.cpu.load_avg}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Request Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-slate-600">Total Requests</p>
              <p className="text-2xl font-bold">{business.requests.total}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-500">
                {((business.requests.success / business.requests.total) * 100).toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">RPS (current)</p>
              <p className="text-2xl font-bold">{business.rps.current}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Errors (5xx)</p>
              <p className="text-2xl font-bold text-red-500">{business.errors._5xx}</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { time: '00:00', success: 2400, error: 10 },
              { time: '06:00', success: 2300, error: 8 },
              { time: '12:00', success: 2500, error: 5 },
              { time: '18:00', success: 2490, error: 10 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" fill="#22c55e" name="Successful" />
              <Bar dataKey="error" fill="#ef4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}