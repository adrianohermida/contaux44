import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdvancedAnalyticsDashboard() {
  const analyticsData = [
    { date: '2026-02-15', revenue: 4000, users: 240, engagement: 24 },
    { date: '2026-02-16', revenue: 3000, users: 321, engagement: 22 },
    { date: '2026-02-17', revenue: 2000, users: 229, engagement: 20 },
    { date: '2026-02-18', revenue: 2780, users: 200, engagement: 25 },
    { date: '2026-02-19', revenue: 1890, users: 229, engagement: 23 },
    { date: '2026-02-20', revenue: 2390, users: 200, engagement: 27 }
  ];

  const kpis = [
    { name: 'Total Revenue', value: '$15,060', change: '+12.5%', color: 'green' },
    { name: 'Active Users', value: '1,419', change: '+8.2%', color: 'blue' },
    { name: 'Engagement', value: '141', change: '+5.3%', color: 'purple' },
    { name: 'Conversion', value: '3.2%', change: '+0.8%', color: 'orange' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Advanced Analytics Dashboard</h1>
        <p className="text-slate-600">Análise profunda de métricas e KPIs</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <Card key={kpi.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{kpi.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs mt-1 ${kpi.color === 'green' ? 'text-green-600' : kpi.color === 'blue' ? 'text-blue-600' : 'text-purple-600'}`}>
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Multi-metric Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" name="Users" />
              <Bar dataKey="engagement" fill="#10b981" name="Engagement" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4m 32s</div>
            <p className="text-xs text-green-600 mt-1">↑ +1m 15s vs. semana anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.4%</div>
            <p className="text-xs text-green-600 mt-1">↓ -8.2% vs. semana anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,456</div>
            <p className="text-xs text-green-600 mt-1">↑ +12.5% vs. semana anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Customization Options */}
      <Card>
        <CardHeader>
          <CardTitle>Personalizar Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked /> Revenue Metrics
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked /> User Analytics
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked /> Engagement Tracking
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Performance Metrics
          </label>
        </CardContent>
      </Card>
    </div>
  );
}