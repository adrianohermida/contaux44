import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Eye, MessageSquare, Share2, Clock } from 'lucide-react';

export default function AnalyticsAdvanced() {
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['blog-analytics-advanced'],
    queryFn: async () => {
      const [posts, analytics, comments] = await Promise.all([
        base44.entities.BlogPost.list(),
        base44.entities.BlogAnalytics.list(),
        base44.entities.BlogComment.list()
      ]);
      return { posts, analytics, comments };
    },
    staleTime: 5 * 60 * 1000
  });

  const stats = useMemo(() => {
    if (!analyticsData) return null;

    const totalViews = analyticsData.analytics.reduce((sum, a) => sum + (a.views || 0), 0);
    const totalComments = analyticsData.comments.length;
    const avgTimeOnPage = analyticsData.analytics.length > 0 
      ? Math.round(analyticsData.analytics.reduce((sum, a) => sum + (a.average_time_on_page || 0), 0) / analyticsData.analytics.length)
      : 0;

    const deviceData = {};
    analyticsData.analytics.forEach(a => {
      const device = a.device || 'unknown';
      deviceData[device] = (deviceData[device] || 0) + (a.views || 0);
    });

    const sourceData = {};
    analyticsData.analytics.forEach(a => {
      const source = a.source || 'direct';
      sourceData[source] = (sourceData[source] || 0) + (a.views || 0);
    });

    const postPerformance = analyticsData.posts.map(post => ({
      slug: post.slug || 'untitled',
      views: post.views || 0,
      comments: analyticsData.comments.filter(c => c.blog_post_id === post.id).length
    })).sort((a, b) => b.views - a.views).slice(0, 5);

    return {
      totalViews,
      totalComments,
      avgTimeOnPage,
      deviceData: Object.entries(deviceData).map(([device, views]) => ({ device, views })),
      sourceData: Object.entries(sourceData).map(([source, views]) => ({ source, views })),
      postPerformance
    };
  }, [analyticsData]);

  if (isLoading || !stats) {
    return <div className="p-6 text-center">Carregando analytics...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Avançado</h1>
        <p className="text-slate-600 dark:text-slate-400">Métricas detalhadas de desempenho do blog</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Views</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Visualizações totais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comentários</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Engajamento de comentários</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgTimeOnPage}s</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Tempo na página</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.posts.length}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Total publicados</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Views por Dispositivo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.deviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic por Fonte</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={stats.sourceData} dataKey="views" nameKey="source" cx="50%" cy="50%" outerRadius={80}>
                  {stats.sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Posts com Melhor Desempenho</CardTitle>
          <CardDescription>Top 5 mais visualizados</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.postPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="slug" width={150} />
              <Tooltip />
              <Bar dataKey="views" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}