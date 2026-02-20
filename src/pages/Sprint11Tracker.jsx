import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

export default function Sprint11Tracker() {
  const features = [
    { id: 1, name: 'Advanced Analytics Dashboard', category: 'Analytics', status: 'pending', effort: 'high' },
    { id: 2, name: 'Custom Business Rules Engine', category: 'Enterprise', status: 'pending', effort: 'high' },
    { id: 3, name: 'Data Export (CSV/Excel/JSON)', category: 'Data', status: 'pending', effort: 'medium' },
    { id: 4, name: 'Data Import & Mapping', category: 'Data', status: 'pending', effort: 'medium' },
    { id: 5, name: 'API Rate Limiting Dashboard', category: 'API', status: 'pending', effort: 'low' },
    { id: 6, name: 'Performance Scaling Metrics', category: 'Performance', status: 'pending', effort: 'medium' },
    { id: 7, name: 'Load Testing Framework', category: 'Testing', status: 'pending', effort: 'medium' },
    { id: 8, name: 'Automated Backups', category: 'Data', status: 'pending', effort: 'medium' },
    { id: 9, name: 'Disaster Recovery Plan', category: 'Data', status: 'pending', effort: 'high' },
    { id: 10, name: 'User Activity Timeline', category: 'Analytics', status: 'pending', effort: 'low' },
    { id: 11, name: 'Batch Processing', category: 'Performance', status: 'pending', effort: 'high' },
    { id: 12, name: 'Queue Management', category: 'Performance', status: 'pending', effort: 'high' },
    { id: 13, name: 'Advanced Caching', category: 'Performance', status: 'pending', effort: 'high' },
    { id: 14, name: 'CDN Optimization', category: 'Performance', status: 'pending', effort: 'medium' },
    { id: 15, name: 'Image Optimization', category: 'Performance', status: 'pending', effort: 'low' },
    { id: 16, name: 'Code Splitting', category: 'Performance', status: 'pending', effort: 'medium' },
    { id: 17, name: 'Bundle Analysis', category: 'Performance', status: 'pending', effort: 'low' },
    { id: 18, name: 'SEO Optimization', category: 'Marketing', status: 'pending', effort: 'medium' },
    { id: 19, name: 'Social Media Integration', category: 'Marketing', status: 'pending', effort: 'medium' },
    { id: 20, name: 'Email Marketing', category: 'Marketing', status: 'pending', effort: 'high' },
    { id: 21, name: 'Analytics Integrations', category: 'Integrations', status: 'pending', effort: 'medium' },
    { id: 22, name: 'Payment Gateway Integration', category: 'Integrations', status: 'pending', effort: 'high' },
    { id: 23, name: 'CRM Integration', category: 'Integrations', status: 'pending', effort: 'high' },
    { id: 24, name: 'Team Collaboration Tools', category: 'Collaboration', status: 'pending', effort: 'medium' },
    { id: 25, name: 'Advanced Audit Logs', category: 'Security', status: 'pending', effort: 'medium' }
  ];

  const categories = [...new Set(features.map(f => f.category))];
  const stats = {
    total: features.length,
    completed: 0,
    pending: 25,
    completionRate: '0%'
  };

  const getEffortColor = (effort) => {
    if (effort === 'high') return 'bg-red-100 text-red-800';
    if (effort === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sprint 11 - Planejamento</h1>
        <p className="text-slate-600">Advanced Features & Scaling (25 features)</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Conclusão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.completionRate}</div>
          </CardContent>
        </Card>
      </div>

      {/* Features by Category */}
      <div className="space-y-4">
        {categories.map(category => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {features.filter(f => f.category === category).map(feature => (
                  <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
                    <div className="flex items-center gap-3 flex-1">
                      <Circle className="h-5 w-5 text-slate-400" />
                      <span className="font-medium">{feature.name}</span>
                    </div>
                    <Badge className={getEffortColor(feature.effort)}>
                      {feature.effort === 'high' ? '🔴' : feature.effort === 'medium' ? '🟡' : '🟢'} {feature.effort}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline Estimado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-32 font-medium">Semana 1-2</div>
            <div className="flex-1">Analytics & Data Management (8 features)</div>
            <Badge>High Priority</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 font-medium">Semana 2-3</div>
            <div className="flex-1">Performance & Scaling (7 features)</div>
            <Badge>High Priority</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 font-medium">Semana 3-4</div>
            <div className="flex-1">Marketing & Integrations (7 features)</div>
            <Badge variant="outline">Medium</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 font-medium">Semana 4</div>
            <div className="flex-1">Collaboration & Security (3 features)</div>
            <Badge variant="outline">Medium</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas Sprint 11</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-sm">
          <div className="p-3 border rounded-lg">
            <p className="font-medium">Capacidade Total</p>
            <p className="text-2xl font-bold mt-1">25</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-medium">Features High Priority</p>
            <p className="text-2xl font-bold mt-1">15</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-medium">Duração Estimada</p>
            <p className="text-2xl font-bold mt-1">4 sem</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}