import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

export default function Sprint9Tracker() {
  const features = [
    {
      category: 'Performance & Scalability',
      items: [
        { name: 'Database Query Optimization', status: 'pending', completion: 0 },
        { name: 'CDN Integration', status: 'pending', completion: 0 },
        { name: 'Caching Strategy (Redis)', status: 'pending', completion: 0 },
        { name: 'Load Balancing', status: 'pending', completion: 0 }
      ]
    },
    {
      category: 'API & Integration',
      items: [
        { name: 'REST API Documentation', status: 'pending', completion: 0 },
        { name: 'GraphQL API', status: 'pending', completion: 0 },
        { name: 'Webhook Management', status: 'pending', completion: 0 }
      ]
    },
    {
      category: 'Mobile & Responsiveness',
      items: [
        { name: 'Mobile-First Redesign', status: 'pending', completion: 0 },
        { name: 'Responsive Images', status: 'pending', completion: 0 },
        { name: 'Touch Gestures', status: 'pending', completion: 0 },
        { name: 'Mobile Navigation Drawer', status: 'pending', completion: 0 }
      ]
    },
    {
      category: 'Testing & Quality',
      items: [
        { name: 'Unit Tests Coverage', status: 'pending', completion: 0 },
        { name: 'Integration Tests', status: 'pending', completion: 0 },
        { name: 'E2E Testing (Cypress)', status: 'pending', completion: 0 },
        { name: 'Performance Testing', status: 'pending', completion: 0 }
      ]
    },
    {
      category: 'Monitoring & Observability',
      items: [
        { name: 'Real-time Monitoring Dashboard', status: 'pending', completion: 0 },
        { name: 'Error Tracking (Sentry)', status: 'pending', completion: 0 },
        { name: 'Application Performance Monitoring', status: 'pending', completion: 0 }
      ]
    }
  ];

  const stats = useMemo(() => {
    const allItems = features.flatMap(f => f.items);
    const done = allItems.filter(i => i.status === 'done').length;
    const inProgress = allItems.filter(i => i.status === 'in_progress').length;
    const pending = allItems.filter(i => i.status === 'pending').length;

    return { done, inProgress, pending, total: allItems.length };
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
        <h1 className="text-3xl font-bold">Sprint 9 - Rastreador de Progresso</h1>
        <p className="text-slate-600 dark:text-slate-400">Performance, APIs, Mobile, Testing, Monitoring</p>
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
            <div className="text-2xl font-bold">0%</div>
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

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline Sprint 9</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-20">Semana 1</div>
              <div>Performance & Scalability (Query Optimization, CDN, Cache)</div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-20">Semana 2</div>
              <div>API & Integration (REST, GraphQL, Webhooks)</div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-20">Semana 3</div>
              <div>Mobile & Responsiveness (Redesign, Images, Gestures)</div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-20">Semana 4</div>
              <div>Testing & QA (Unit, Integration, E2E Tests)</div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-20">Semana 5</div>
              <div>Monitoring & Observability (Dashboards, Tracking)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}