/**
 * MonitoringDashboard Component
 * Application health and performance monitoring
 */

import React, { useState } from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';
import { useErrorTracking } from '../hooks/useErrorTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

export default function MonitoringDashboard() {
  const { getHealthStatus, getHealthHistory } = useHealthCheck();
  const { errorStats, getErrorFrequency } = useErrorTracking();
  const [selectedTab, setSelectedTab] = useState('health');

  const health = getHealthStatus();
  const history = getHealthHistory();
  const errorFrequency = getErrorFrequency();

  // Prepare chart data
  const healthData = history.map((h) => ({
    time: new Date(h.timestamp).toLocaleTimeString(),
    status: h.status === 'healthy' ? 1 : 0.5,
    api: h.checks?.api?.responseTime || 0,
  }));

  const errorData = errorFrequency.map((e) => ({
    type: e.type,
    count: e.count,
  }));

  const statusColor = health.status === 'healthy' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const statusBg = health.status === 'healthy' ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30';

  return (
    <div className="space-y-6 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-slate-100">Monitoring Dashboard</h2>
        <Badge className={`${health.status === 'healthy' ? 'bg-green-100 text-green-800 dark:bg-green-900' : 'bg-red-100 text-red-800 dark:bg-red-900'}`}>
          {health.status === 'healthy' ? 'Healthy' : 'Degraded'}
        </Badge>
      </div>

      {/* Status Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className={`${statusBg} dark:border-slate-700`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">System Status</p>
                <p className={`text-2xl font-bold ${statusColor}`}>
                  {health.status === 'healthy' ? 'Healthy' : 'Degraded'}
                </p>
              </div>
              {health.status === 'healthy' ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Uptime</p>
                <p className="text-2xl font-bold dark:text-slate-100">{health.uptime.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Response Time</p>
                <p className="text-2xl font-bold dark:text-slate-100">{health.responseTime.toFixed(0)}ms</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Errors</p>
                <p className="text-2xl font-bold dark:text-slate-100">{errorStats.total}</p>
              </div>
              {errorStats.total === 0 ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedTab('health')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedTab === 'health'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          Health Check
        </button>
        <button
          onClick={() => setSelectedTab('errors')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedTab === 'errors'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          Errors
        </button>
      </div>

      {/* Health Chart */}
      {selectedTab === 'health' && (
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-base dark:text-slate-100">Health History</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthData}>
                <XAxis dataKey="time" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="status"
                  stroke="#10b981"
                  name="Status"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="api"
                  stroke="#3b82f6"
                  name="API Response (ms)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Error Chart */}
      {selectedTab === 'errors' && (
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-base dark:text-slate-100">Error Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            {errorData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={errorData}>
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#ef4444" name="Error Count" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
                <p className="text-slate-600 dark:text-slate-400">No errors detected</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dependencies Status */}
      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-base dark:text-slate-100">Dependencies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {health.checks?.dependencies ? (
              Object.entries(health.checks.dependencies).map(([dep, status]) => (
                <div key={dep} className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <span className="capitalize text-slate-700 dark:text-slate-100">{dep}</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {status?.status || 'healthy'}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-slate-600 dark:text-slate-400">Loading dependencies...</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error Statistics */}
      {selectedTab === 'errors' && (
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-base dark:text-slate-100">Error Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">Total Errors</p>
                <p className="text-2xl font-bold dark:text-slate-100">{errorStats.total}</p>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">Error Types</p>
                <p className="text-2xl font-bold dark:text-slate-100">{Object.keys(errorStats.byType).length}</p>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">Levels</p>
                <p className="text-2xl font-bold dark:text-slate-100">{Object.keys(errorStats.byLevel).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}