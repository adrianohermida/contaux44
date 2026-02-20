import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket } from 'lucide-react';

export default function Sprint17Planning() {
  const features = [
    { name: 'Advanced Metrics Dashboard', category: 'Analytics', priority: 'High' },
    { name: 'Custom User Segments', category: 'Targeting', priority: 'High' },
    { name: 'Multi-Channel Campaigns', category: 'Marketing', priority: 'High' },
    { name: 'Behavioral Analytics', category: 'Analytics', priority: 'Medium' },
    { name: 'A/B Testing Framework', category: 'Optimization', priority: 'High' },
    { name: 'Email Marketing Automation', category: 'Marketing', priority: 'Medium' },
    { name: 'SMS Marketing Integration', category: 'Marketing', priority: 'Medium' },
    { name: 'Push Notification Campaigns', category: 'Marketing', priority: 'Medium' },
    { name: 'Customer Journey Mapping', category: 'Analytics', priority: 'High' },
    { name: 'Conversion Rate Optimizer', category: 'Optimization', priority: 'High' },
    { name: 'Dynamic Content Engine', category: 'Content', priority: 'Medium' },
    { name: 'Personalization Rules Engine', category: 'Personalization', priority: 'High' },
    { name: 'Attribution Modeling', category: 'Analytics', priority: 'Medium' },
    { name: 'Cohort Analysis Tool', category: 'Analytics', priority: 'Medium' },
    { name: 'Lifetime Value Predictor', category: 'Analytics', priority: 'High' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Rocket className="h-8 w-8" /> Sprint 17 - Planejamento
        </h1>
        <p className="text-slate-600">Advanced Analytics, Marketing & Personalization (15 features)</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Features</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-blue-600">15</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Projeto Total</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">356</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Sprint Número</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">17</div></CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Status</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-blue-600">Ativo</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>15 Features Planejadas</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {features.map((f, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded hover:bg-blue-50">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{i+1}. {f.name}</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{f.category}</Badge>
                <Badge className={f.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                  {f.priority}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Sprint 17 - Pronto para Início</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-blue-900 text-sm">
          <p>✓ Sprint 16 completamente validado e sem ressalvas</p>
          <p>✓ 15 novas features de Analytics & Marketing planejadas</p>
          <p>✓ 341 → 356 features (15 novas)</p>
          <p>✓ Prioridades definidas (8 High, 7 Medium)</p>
          <p>✓ Arquitetura preparada para implementação</p>
        </CardContent>
      </Card>
    </div>
  );
}