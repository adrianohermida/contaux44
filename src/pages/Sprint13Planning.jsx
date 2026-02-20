import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

export default function Sprint13Planning() {
  const features = [
    { id: 1, name: 'AI-Powered Customer Service', category: 'Customer Experience', effort: 'high' },
    { id: 2, name: 'Dynamic Pricing Engine', category: 'Business Intelligence', effort: 'high' },
    { id: 3, name: 'Predictive Analytics', category: 'Analytics', effort: 'high' },
    { id: 4, name: 'Automated Compliance Reporting', category: 'Compliance', effort: 'medium' },
    { id: 5, name: 'Advanced Data Visualization', category: 'Analytics', effort: 'medium' },
    { id: 6, name: 'Multi-tenant Marketplace', category: 'Platform', effort: 'high' },
    { id: 7, name: 'Subscription Management', category: 'Billing', effort: 'medium' },
    { id: 8, name: 'White Label Platform', category: 'Enterprise', effort: 'high' },
    { id: 9, name: 'API Versioning Control', category: 'API', effort: 'low' },
    { id: 10, name: 'GraphQL Support', category: 'API', effort: 'medium' },
    { id: 11, name: 'Server-Sent Events', category: 'Real-time', effort: 'low' },
    { id: 12, name: 'Advanced Webhook System', category: 'Integration', effort: 'medium' },
    { id: 13, name: 'Database Sharding', category: 'Infrastructure', effort: 'high' },
    { id: 14, name: 'Cache Management', category: 'Performance', effort: 'medium' },
    { id: 15, name: 'Advanced Monitoring', category: 'Operations', effort: 'medium' }
  ];

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sprint 13 - Próximo Ciclo</h1>
        <p className="text-slate-600">Escalabilidade Empresarial & Experiência do Cliente (15 features)</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Features</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">15</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">High Priority</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">8</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Completadas</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-blue-600">0</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Status</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">0%</div></CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {categories.map(cat => {
          const catFeatures = features.filter(f => f.category === cat);
          return (
            <Card key={cat}>
              <CardHeader>
                <CardTitle className="text-lg">{cat}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {catFeatures.map(f => (
                  <div key={f.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
                    <div className="flex items-center gap-3 flex-1">
                      <Circle className="h-5 w-5 text-slate-400" />
                      <span className="font-medium">{f.name}</span>
                    </div>
                    <Badge className={f.effort === 'high' ? 'bg-red-100 text-red-800' : f.effort === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                      {f.effort}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader><CardTitle>Timeline Estimado</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="w-24 font-medium">Semana 1-2</div>
            <div className="flex-1">AI Services & Business Intelligence (5 features)</div>
          </div>
          <div className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="w-24 font-medium">Semana 2-3</div>
            <div className="flex-1">Platform Features & Marketplace (4 features)</div>
          </div>
          <div className="flex gap-3 p-3">
            <div className="w-24 font-medium">Semana 3-4</div>
            <div className="flex-1">APIs & Real-time Features (3 features)</div>
          </div>
          <div className="flex gap-3 p-3">
            <div className="w-24 font-medium">Semana 4-5</div>
            <div className="flex-1">Infrastructure & Monitoring (3 features)</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="text-blue-800">Sprint 13 Planejado ✓</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-1">
          <p>✓ 15 features estratégicas definidas</p>
          <p>✓ Foco em escalabilidade e experiência</p>
          <p>✓ Cronograma de 5 semanas</p>
          <p>✓ Pronto para iniciar</p>
        </CardContent>
      </Card>
    </div>
  );
}