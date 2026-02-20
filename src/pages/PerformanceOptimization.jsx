import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, TrendingDown, Zap } from 'lucide-react';

export default function PerformanceOptimization() {
  const [metrics] = useState({
    pageLoad: 2.1,
    firstContentfulPaint: 0.8,
    largestContentfulPaint: 1.5,
    cumulativeLayoutShift: 0.05,
    timeToInteractive: 3.2
  });

  const performanceData = [
    { week: 'Semana 1', loadTime: 3.2, fcp: 1.1, lcp: 2.1 },
    { week: 'Semana 2', loadTime: 3.0, fcp: 1.0, lcp: 2.0 },
    { week: 'Semana 3', loadTime: 2.6, fcp: 0.9, lcp: 1.8 },
    { week: 'Semana 4', loadTime: 2.3, fcp: 0.8, lcp: 1.6 },
    { week: 'Semana 5', loadTime: 2.1, fcp: 0.8, lcp: 1.5 }
  ];

  const recommendations = [
    { title: 'Implementar Lazy Loading', status: 'pending', impact: 'high', savings: '~15% de tempo' },
    { title: 'Ativar Compressão Gzip', status: 'done', impact: 'high', savings: '~20% de banda' },
    { title: 'Code Splitting', status: 'in_progress', impact: 'medium', savings: '~10% de JS' },
    { title: 'Cache de Browser', status: 'done', impact: 'medium', savings: '~30% requisições' },
    { title: 'CDN Integration', status: 'pending', impact: 'high', savings: '~25% latência' },
    { title: 'Image Optimization', status: 'pending', impact: 'medium', savings: '~40% imagens' }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImpactBadge = (impact) => {
    if (impact === 'high') return 'bg-red-100 text-red-800';
    if (impact === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getStatusIcon = (status) => {
    if (status === 'done') return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (status === 'in_progress') return <Zap className="h-5 w-5 text-yellow-600" />;
    return <AlertCircle className="h-5 w-5 text-slate-400" />;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Otimização de Performance</h1>
        <p className="text-slate-600 dark:text-slate-400">Monitore e melhore a velocidade do site</p>
      </div>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo de Carregamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(85)}`}>{metrics.pageLoad}s</div>
            <p className="text-xs text-slate-600 mt-1">↓ 0.9s (bom)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">First Contentful Paint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(90)}`}>{metrics.firstContentfulPaint}s</div>
            <p className="text-xs text-slate-600 mt-1">✓ Excelente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Largest Contentful Paint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${getScoreColor(80)}`}>{metrics.largestContentfulPaint}s</div>
            <p className="text-xs text-slate-600 mt-1">↓ 0.6s (bom)</p>
          </CardContent>
        </Card>
      </div>

      {/* Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Tendência de Performance</CardTitle>
          <CardDescription>Últimas 5 semanas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="loadTime" stroke="#ef4444" name="Load Time (s)" />
              <Line type="monotone" dataKey="fcp" stroke="#f59e0b" name="FCP (s)" />
              <Line type="monotone" dataKey="lcp" stroke="#3b82f6" name="LCP (s)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Optimization Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendações de Otimização</CardTitle>
          <CardDescription>Priorizadas por impacto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.map(rec => (
            <div key={rec.title} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-start gap-3 flex-grow">
                {getStatusIcon(rec.status)}
                <div>
                  <p className="font-medium">{rec.title}</p>
                  <p className="text-sm text-slate-600">{rec.savings}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getImpactBadge(rec.impact)}>
                  {rec.impact === 'high' ? 'Alto' : rec.impact === 'medium' ? 'Médio' : 'Baixo'}
                </Badge>
                <Badge variant={rec.status === 'done' ? 'default' : rec.status === 'in_progress' ? 'secondary' : 'outline'}>
                  {rec.status === 'done' ? '✓' : rec.status === 'in_progress' ? '⏳' : '○'}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bundle Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">JavaScript</span>
                <span className="text-sm font-bold">245KB</span>
              </div>
              <div className="w-full bg-slate-200 rounded h-2">
                <div className="bg-blue-500 h-2 rounded" style={{ width: '60%' }} />
              </div>
              <p className="text-xs text-slate-600">Sem minificação: 312KB</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cache Hit Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Cache Hits</span>
                <span className="text-sm font-bold">78%</span>
              </div>
              <div className="w-full bg-slate-200 rounded h-2">
                <div className="bg-green-500 h-2 rounded" style={{ width: '78%' }} />
              </div>
              <p className="text-xs text-slate-600">Reduz requisições ao servidor</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}