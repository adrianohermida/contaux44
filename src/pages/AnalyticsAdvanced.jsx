import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Target, Zap, Calendar } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AnalyticsAdvanced() {
  const [dateRange, setDateRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('views');

  const { data: blogPosts = [] } = useQuery({
    queryKey: ['blog-posts-analytics'],
    queryFn: () => base44.entities.BlogPost.filter({ status: 'published' }, '-publish_date', 100),
    staleTime: 5 * 60 * 1000,
  });

  const { data: analytics = [] } = useQuery({
    queryKey: ['analytics-data', dateRange],
    queryFn: async () => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - parseInt(dateRange));
      
      const data = await base44.entities.BlogAnalytics.filter({}, '-date', 500);
      return data.filter(a => new Date(a.date) >= cutoffDate);
    },
    staleTime: 10 * 60 * 1000,
  });

  // Análise por período
  const chartData = useMemo(() => {
    const grouped = {};
    analytics.forEach(a => {
      const date = new Date(a.date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
      if (!grouped[date]) {
        grouped[date] = { date, views: 0, unique: 0, bounce: 0, engagement: 0, count: 0 };
      }
      grouped[date].views += a.views || 0;
      grouped[date].unique += a.unique_visitors || 0;
      grouped[date].bounce += a.bounce_rate || 0;
      grouped[date].engagement += (a.scroll_depth || 0);
      grouped[date].count++;
    });

    return Object.values(grouped).map(d => ({
      date: d.date,
      views: d.views,
      unique: d.unique,
      bounce: Math.round(d.bounce / d.count),
      engagement: Math.round(d.engagement / d.count),
    }));
  }, [analytics]);

  // Top performing posts
  const topPosts = useMemo(() => {
    return blogPosts
      .map(post => ({
        id: post.id,
        title: post.data?.title || post.title,
        views: post.data?.views || 0,
        engagement: (post.data?.seo_score || 0) + (post.data?.readability_score || 0),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }, [blogPosts]);

  // Performance por fonte
  const performanceBySource = useMemo(() => {
    const sources = {};
    analytics.forEach(a => {
      const source = a.source || 'direct';
      if (!sources[source]) {
        sources[source] = { views: 0, unique: 0, bounce: 0 };
      }
      sources[source].views += a.views || 0;
      sources[source].unique += a.unique_visitors || 0;
      sources[source].bounce += a.bounce_rate || 0;
    });

    return Object.entries(sources).map(([name, data]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: data.views,
      unique: data.unique,
    }));
  }, [analytics]);

  const metrics = useMemo(() => {
    const totalViews = analytics.reduce((sum, a) => sum + (a.views || 0), 0);
    const totalUnique = analytics.reduce((sum, a) => sum + (a.unique_visitors || 0), 0);
    const avgBounce = Math.round(analytics.reduce((sum, a) => sum + (a.bounce_rate || 0), 0) / (analytics.length || 1));
    const avgEngagement = Math.round(analytics.reduce((sum, a) => sum + (a.scroll_depth || 0), 0) / (analytics.length || 1));

    return {
      totalViews,
      totalUnique,
      avgBounce,
      avgEngagement,
      conversionRate: ((totalUnique / (totalViews || 1)) * 100).toFixed(2),
    };
  }, [analytics]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Advanced Analytics</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">Performance detalhada e insights do seu blog</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
        >
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total de Views</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.totalViews.toLocaleString('pt-BR')}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Visitantes Únicos</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.totalUnique.toLocaleString('pt-BR')}</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.conversionRate}%</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Engagement Médio</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{metrics.avgEngagement}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Views</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#3b82f6" />
                <Line type="monotone" dataKey="unique" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Source Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Fonte</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceBySource}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bounce Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Rejeição</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bounce" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPosts.map((post, idx) => (
                <div key={post.id} className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{idx + 1}. {post.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{post.views.toLocaleString('pt-BR')} views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-blue-600">{post.engagement} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => window.print()}>
          📄 Imprimir Relatório
        </Button>
        <Button className="gap-2">
          📊 Exportar PDF
        </Button>
      </div>
    </div>
  );
}