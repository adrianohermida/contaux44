import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Sprint9Completion() {
  const features = [
    { id: 1, name: 'Database Query Optimization', status: 'completed', type: 'Performance' },
    { id: 2, name: 'CDN Integration', status: 'completed', type: 'Performance' },
    { id: 3, name: 'Caching Strategy', status: 'completed', type: 'Performance' },
    { id: 4, name: 'Load Balancing', status: 'completed', type: 'Performance' },
    { id: 5, name: 'REST API Documentation', status: 'completed', type: 'API' },
    { id: 6, name: 'GraphQL API Setup', status: 'completed', type: 'API' },
    { id: 7, name: 'Webhook Management', status: 'completed', type: 'API' },
    { id: 8, name: 'API Rate Limiting', status: 'completed', type: 'API' },
    { id: 9, name: 'Mobile Redesign', status: 'completed', type: 'UX' },
    { id: 10, name: 'Responsive Components', status: 'completed', type: 'UX' },
    { id: 11, name: 'Mobile Performance', status: 'completed', type: 'UX' },
    { id: 12, name: 'E2E Testing Setup', status: 'completed', type: 'Testing' },
    { id: 13, name: 'Unit Tests Framework', status: 'completed', type: 'Testing' },
    { id: 14, name: 'Integration Tests', status: 'completed', type: 'Testing' },
    { id: 15, name: 'Real-time Monitoring', status: 'completed', type: 'Monitoring' },
    { id: 16, name: 'Performance Metrics', status: 'completed', type: 'Monitoring' },
    { id: 17, name: 'Error Tracking Dashboard', status: 'completed', type: 'Monitoring' },
    { id: 18, name: 'User Analytics', status: 'completed', type: 'Analytics' },
    { id: 19, name: 'Custom Reporting', status: 'completed', type: 'Analytics' }
  ];

  const stats = {
    total: 19,
    completed: 19,
    pending: 0,
    completionRate: '100%'
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sprint 9 - Relatório Final</h1>
        <p className="text-slate-600 dark:text-slate-400">Performance, APIs, Mobile & Monitoring</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
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
            <div className="text-3xl font-bold text-green-600">{stats.completionRate}</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="w-full bg-slate-200 rounded-full h-4">
            <div className="bg-green-600 h-4 rounded-full" style={{ width: '100%' }} />
          </div>
        </CardContent>
      </Card>

      {/* Features by Category */}
      <div className="space-y-4">
        {['Performance', 'API', 'UX', 'Testing', 'Monitoring', 'Analytics'].map(category => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {features.filter(f => f.type === category).map(feature => (
                  <div key={feature.id} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>{feature.name}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">✓</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Validation Status */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Sprint 9 Validado ✓
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-green-800 text-sm">
          <p>✓ 19/19 features implementadas</p>
          <p>✓ Zero pendências identificadas</p>
          <p>✓ Todas funções testadas</p>
          <p>✓ Documentação completa</p>
        </CardContent>
      </Card>

      {/* Next Sprint Info */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="text-blue-800">Sprint 10 - Pronto para Iniciar 🚀</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800">
          <p className="font-medium mb-2">Foco: AI, ML & Enterprise Features (20+ features)</p>
          <ul className="space-y-1">
            <li>✓ AI-powered Recommendations</li>
            <li>✓ Machine Learning Models</li>
            <li>✓ Enterprise SSO</li>
            <li>✓ Advanced Compliance</li>
            <li>✓ Custom Workflows</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}