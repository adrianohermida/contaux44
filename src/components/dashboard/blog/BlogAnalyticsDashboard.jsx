import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Eye, TrendingUp, Clock, MousePointer, Share2 } from 'lucide-react';
import KeywordTracker from './KeywordTracker';

export default function BlogAnalyticsDashboard({ blogPostId }) {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    loadData();
  }, [blogPostId]);

  const loadData = async () => {
    try {
      const [analyticsData, postData] = await Promise.all([
        base44.entities.BlogAnalytics.filter({ blog_post_id: blogPostId }, '-date', 90),
        base44.entities.BlogPost.filter({ id: blogPostId })
      ]);
      setAnalytics(analyticsData);
      setBlogPost(postData[0]);
    } catch (error) {
      console.error('Erro ao carregar analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando analytics...</div>;
  }

  const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
  const totalClicks = analytics.reduce((sum, a) => sum + a.clicks, 0);
  const avgTimeOnPage = analytics.length > 0 ? 
    analytics.reduce((sum, a) => sum + a.average_time_on_page, 0) / analytics.length : 0;
  const avgBounceRate = analytics.length > 0 ? 
    analytics.reduce((sum, a) => sum + a.bounce_rate, 0) / analytics.length : 0;

  const chartData = analytics.slice(-30).map(a => ({
    date: new Date(a.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    views: a.views,
    clicks: a.clicks,
    uniqueVisitors: a.unique_visitors
  }));

  const sourceData = [
    { name: 'Orgânico', value: analytics.filter(a => a.source === 'organic').length },
    { name: 'Direto', value: analytics.filter(a => a.source === 'direct').length },
    { name: 'Referência', value: analytics.filter(a => a.source === 'referral').length },
    { name: 'Social', value: analytics.filter(a => a.source === 'social').length },
    { name: 'Email', value: analytics.filter(a => a.source === 'email').length }
  ].filter(d => d.value > 0);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics - {blogPost?.title}</h2>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Visualizações</p>
                <p className="text-2xl font-bold text-blue-600">{totalViews}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Visitantes Únicos</p>
                <p className="text-2xl font-bold text-green-600">
                  {analytics.reduce((sum, a) => sum + a.unique_visitors, 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Tempo Médio</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(avgTimeOnPage)}s</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Taxa de Rejeição</p>
                <p className="text-2xl font-bold text-orange-600">{avgBounceRate.toFixed(1)}%</p>
              </div>
              <MousePointer className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Compartilhamentos</p>
                <p className="text-2xl font-bold text-pink-600">
                  {analytics.reduce((sum, a) => sum + a.shares, 0)}
                </p>
              </div>
              <Share2 className="w-8 h-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visualizações nos Últimos 30 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#3b82f6" name="Visualizações" />
                <Line type="monotone" dataKey="uniqueVisitors" stroke="#10b981" name="Visitantes Únicos" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fontes de Tráfego</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Dispositivos */}
      <Card>
        <CardHeader>
          <CardTitle>Por Dispositivo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {['desktop', 'mobile', 'tablet'].map(device => {
              const deviceData = analytics.filter(a => a.device === device);
              const deviceViews = deviceData.reduce((sum, a) => sum + a.views, 0);
              const percentage = totalViews > 0 ? ((deviceViews / totalViews) * 100).toFixed(1) : 0;
              
              return (
                <div key={device} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                  <span className="font-medium capitalize">{device}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600">{deviceViews} views</span>
                    <span className="text-sm text-slate-500">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Keyword Tracker */}
      <KeywordTracker blogPostId={blogPostId} />
    </div>
  );
}