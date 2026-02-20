import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle } from 'lucide-react';

export default function Sprint10Tracker() {
  const features = [
    { id: 1, name: 'AI Content Recommendations', category: 'AI/ML', status: 'pending', effort: 'high' },
    { id: 2, name: 'Predictive Analytics', category: 'AI/ML', status: 'pending', effort: 'high' },
    { id: 3, name: 'ML-based Forecasting', category: 'AI/ML', status: 'pending', effort: 'high' },
    { id: 4, name: 'Anomaly Detection', category: 'AI/ML', status: 'pending', effort: 'medium' },
    { id: 5, name: 'Smart Automation Rules', category: 'AI/ML', status: 'pending', effort: 'high' },
    
    { id: 6, name: 'Enterprise SSO (SAML/OAuth)', category: 'Enterprise', status: 'pending', effort: 'high' },
    { id: 7, name: 'Advanced RBAC', category: 'Enterprise', status: 'pending', effort: 'medium' },
    { id: 8, name: 'Custom Workflows Builder', category: 'Enterprise', status: 'pending', effort: 'high' },
    { id: 9, name: 'White Label Support', category: 'Enterprise', status: 'pending', effort: 'high' },
    { id: 10, name: 'Advanced Compliance Reports', category: 'Enterprise', status: 'pending', effort: 'medium' },
    
    { id: 11, name: 'Multi-language Support', category: 'Localization', status: 'pending', effort: 'medium' },
    { id: 12, name: 'Regional Customization', category: 'Localization', status: 'pending', effort: 'medium' },
    
    { id: 13, name: 'Real-time Collaboration', category: 'Collaboration', status: 'pending', effort: 'high' },
    { id: 14, name: 'Document Versioning', category: 'Collaboration', status: 'pending', effort: 'medium' },
    { id: 15, name: 'Comment Threading', category: 'Collaboration', status: 'pending', effort: 'low' },
    
    { id: 16, name: 'Advanced Search', category: 'Search', status: 'pending', effort: 'high' },
    { id: 17, name: 'Full-Text Search', category: 'Search', status: 'pending', effort: 'medium' },
    { id: 18, name: 'Search Analytics', category: 'Search', status: 'pending', effort: 'low' },
    
    { id: 19, name: 'Advanced Notifications', category: 'Notifications', status: 'pending', effort: 'medium' },
    { id: 20, name: 'Smart Notification Rules', category: 'Notifications', status: 'pending', effort: 'medium' }
  ];

  const categories = ['AI/ML', 'Enterprise', 'Localization', 'Collaboration', 'Search', 'Notifications'];
  const stats = {
    total: features.length,
    completed: 0,
    pending: 20,
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
        <h1 className="text-3xl font-bold">Sprint 10 - Planejamento</h1>
        <p className="text-slate-600 dark:text-slate-400">AI, ML & Enterprise Features (20 features)</p>
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
            <div className="flex-1">AI/ML Core Features (5 features)</div>
            <Badge>High Priority</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 font-medium">Semana 2-3</div>
            <div className="flex-1">Enterprise Features (5 features)</div>
            <Badge>High Priority</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 font-medium">Semana 3-4</div>
            <div className="flex-1">Localization & Collaboration (7 features)</div>
            <Badge variant="outline">Medium</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 font-medium">Semana 4</div>
            <div className="flex-1">Search & Notifications (3 features)</div>
            <Badge variant="outline">Medium</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas Sprint 10</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-sm">
          <div className="p-3 border rounded-lg">
            <p className="font-medium">Capacidade Total</p>
            <p className="text-2xl font-bold mt-1">20</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-medium">Features High Priority</p>
            <p className="text-2xl font-bold mt-1">10</p>
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