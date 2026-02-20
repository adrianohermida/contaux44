import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

export default function Sprint16Planning() {
  const features = [
    { id: 1, name: 'API Rate Limiting Advanced', category: 'API', effort: 'medium' },
    { id: 2, name: 'Request/Response Caching', category: 'Performance', effort: 'medium' },
    { id: 3, name: 'Distributed Tracing', category: 'Monitoring', effort: 'high' },
    { id: 4, name: 'Error Tracking & Reporting', category: 'Monitoring', effort: 'medium' },
    { id: 5, name: 'Security Audit Logs', category: 'Security', effort: 'high' },
    { id: 6, name: 'Two-Factor Authentication', category: 'Security', effort: 'medium' },
    { id: 7, name: 'DDoS Protection', category: 'Security', effort: 'high' },
    { id: 8, name: 'IP Whitelisting', category: 'Security', effort: 'low' },
    { id: 9, name: 'Data Anonymization', category: 'Privacy', effort: 'high' },
    { id: 10, name: 'GDPR Compliance Tools', category: 'Privacy', effort: 'medium' },
    { id: 11, name: 'Audit Trail Dashboard', category: 'Compliance', effort: 'medium' },
    { id: 12, name: 'Custom Webhooks', category: 'Integration', effort: 'medium' },
    { id: 13, name: 'API Documentation Generator', category: 'Documentation', effort: 'medium' },
    { id: 14, name: 'SDK Generator', category: 'Developer', effort: 'high' },
    { id: 15, name: 'Developer Portal', category: 'Developer', effort: 'high' }
  ];

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sprint 16 - Próximas Funcionalidades</h1>
        <p className="text-slate-600">Enterprise Security & Developer Experience (15 features)</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Features</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">15</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">High Priority</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">6</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Completadas</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-blue-600">0</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Duração Est.</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">5-6 sem</div></CardContent>
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

      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="text-blue-800">Sprint 16 Pronto para Iniciar 🚀</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-1">
          <p>✓ 15 features focadas em segurança e experiência do desenvolvedor</p>
          <p>✓ Compliance, Security e Developer Tools</p>
          <p>✓ Cronograma de 5-6 semanas</p>
          <p>✓ Pronto para iniciar desenvolvimento</p>
        </CardContent>
      </Card>
    </div>
  );
}