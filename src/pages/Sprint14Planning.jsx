import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

export default function Sprint14Planning() {
  const features = [
    { id: 1, name: 'Advanced User Segmentation', category: 'Analytics', effort: 'high' },
    { id: 2, name: 'A/B Testing Framework', category: 'Experiments', effort: 'high' },
    { id: 3, name: 'Custom Report Builder', category: 'Reporting', effort: 'medium' },
    { id: 4, name: 'Automated Email Campaigns', category: 'Marketing', effort: 'medium' },
    { id: 5, name: 'Customer Journey Mapping', category: 'Analytics', effort: 'high' },
    { id: 6, name: 'Inventory Management', category: 'Operations', effort: 'medium' },
    { id: 7, name: 'Supply Chain Optimization', category: 'Operations', effort: 'high' },
    { id: 8, name: 'Multi-Currency Support', category: 'Globalization', effort: 'medium' },
    { id: 9, name: 'Advanced Tax Calculation', category: 'Finance', effort: 'high' },
    { id: 10, name: 'Contract Management System', category: 'Legal', effort: 'high' },
    { id: 11, name: 'Document Signing (E-signature)', category: 'Legal', effort: 'medium' },
    { id: 12, name: 'Performance Benchmarking', category: 'Analytics', effort: 'medium' },
    { id: 13, name: 'Competitive Intelligence', category: 'Analytics', effort: 'high' },
    { id: 14, name: 'Risk Assessment Dashboard', category: 'Risk', effort: 'medium' },
    { id: 15, name: 'Sustainability Tracking', category: 'ESG', effort: 'medium' }
  ];

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sprint 14 - Próximas Funcionalidades</h1>
        <p className="text-slate-600">Analytics Avançada & Operações (15 features)</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Features</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">15</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">High Priority</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">7</div></CardContent>
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
                    <Badge className={f.effort === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
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
          <CardTitle className="text-blue-800">Sprint 14 Pronto para Iniciar 🚀</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-1">
          <p>✓ 15 features estratégicas planejadas</p>
          <p>✓ Foco em Analytics, Operações e Conformidade</p>
          <p>✓ Cronograma de 5-6 semanas</p>
          <p>✓ Pronto para iniciar desenvolvimento</p>
        </CardContent>
      </Card>
    </div>
  );
}