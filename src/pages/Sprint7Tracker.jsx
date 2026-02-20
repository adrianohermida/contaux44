import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

export default function Sprint7Tracker() {
  const features = [
    {
      category: 'Analytics & Testing',
      items: [
        { name: 'Advanced Analytics Dashboard', status: 'done', completion: 100 },
        { name: 'A/B Testing Framework', status: 'done', completion: 100 },
        { name: 'Real-time Notifications Center', status: 'done', completion: 100 },
        { name: 'Conversion Tracking System', status: 'in_progress', completion: 65 },
        { name: 'Custom Reports Builder', status: 'pending', completion: 0 }
      ]
    },
    {
      category: 'Performance & Optimization',
      items: [
        { name: 'Lazy Loading Implementation', status: 'pending', completion: 0 },
        { name: 'Code Splitting & Bundling', status: 'pending', completion: 0 },
        { name: 'Cache Strategy Optimization', status: 'pending', completion: 0 },
        { name: 'Image Optimization', status: 'pending', completion: 0 }
      ]
    },
    {
      category: 'Infrastructure',
      items: [
        { name: 'CDN Integration', status: 'pending', completion: 0 },
        { name: 'Database Query Optimization', status: 'pending', completion: 0 },
        { name: 'Error Tracking & Monitoring', status: 'pending', completion: 0 }
      ]
    }
  ];

  const stats = useMemo(() => {
    const allItems = features.flatMap(f => f.items);
    const done = allItems.filter(i => i.status === 'done').length;
    const inProgress = allItems.filter(i => i.status === 'in_progress').length;
    const pending = allItems.filter(i => i.status === 'pending').length;
    const avgCompletion = Math.round(allItems.reduce((sum, i) => sum + i.completion, 0) / allItems.length);

    return { done, inProgress, pending, avgCompletion, total: allItems.length };
  }, []);

  const getStatusIcon = (status) => {
    if (status === 'done') return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (status === 'in_progress') return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <Circle className="h-5 w-5 text-slate-400" />;
  };

  const getStatusBadge = (status) => {
    if (status === 'done') return <Badge className="bg-green-100 text-green-800">Concluído</Badge>;
    if (status === 'in_progress') return <Badge className="bg-yellow-100 text-yellow-800">Em andamento</Badge>;
    return <Badge className="bg-slate-100 text-slate-800">Pendente</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sprint 7 - Rastreador de Progresso</h1>
        <p className="text-slate-600 dark:text-slate-400">Analytics, A/B Testing, Performance Optimization</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Features</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.done}</div>
            <p className="text-xs text-slate-600">de {stats.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Progresso</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
            <Circle className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgCompletion}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Features by Category */}
      <div className="space-y-6">
        {features.map(category => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.items.map(item => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        item.status === 'done' ? 'bg-green-600' :
                        item.status === 'in_progress' ? 'bg-yellow-600' :
                        'bg-slate-400'
                      }`}
                      style={{ width: `${item.completion}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {item.completion}% concluído
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Prioridades</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✅ Finalizar sistema de notificações em tempo real</li>
            <li>🔄 Implementar Conversion Tracking com pixel tracking</li>
            <li>⏳ Otimizar performance com lazy loading</li>
            <li>⏳ Implementar estratégia de cache avançada</li>
            <li>⏳ Configurar monitoramento de erros (Sentry/equivalent)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}