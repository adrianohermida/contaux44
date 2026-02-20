import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

export default function Sprint12Tracker() {
  const features = [
    { name: 'Advanced Machine Learning', category: 'AI', effort: 'high' },
    { name: 'Real-time Analytics Engine', category: 'Analytics', effort: 'high' },
    { name: 'Advanced Reporting', category: 'Reporting', effort: 'high' },
    { name: 'Mobile App Integration', category: 'Mobile', effort: 'high' },
    { name: 'IoT Device Support', category: 'IoT', effort: 'high' },
    { name: 'Blockchain Integration', category: 'Blockchain', effort: 'high' },
    { name: 'AR/VR Features', category: 'Extended Reality', effort: 'high' },
    { name: 'Voice Commands', category: 'AI', effort: 'medium' },
    { name: 'Predictive Maintenance', category: 'Maintenance', effort: 'high' },
    { name: 'Advanced Security', category: 'Security', effort: 'high' },
    { name: 'Quantum Computing Ready', category: 'Performance', effort: 'high' },
    { name: 'Global Distribution', category: 'Infrastructure', effort: 'high' }
  ];

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sprint 12 - Próxima Geração</h1>
        <p className="text-slate-600">Advanced Features & Future Technologies (12 features)</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Features</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Completadas</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-blue-600">0</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Pendentes</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Status</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">0%</div></CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {categories.map(category => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {features.filter(f => f.category === category).map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                    <div className="flex items-center gap-3 flex-1">
                      <Circle className="h-5 w-5 text-slate-400" />
                      <span className="font-medium">{f.name}</span>
                    </div>
                    <Badge className={f.effort === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                      {f.effort}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="text-blue-800">Sprint 12 Pronto para Iniciar 🚀</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p className="font-medium">Foco: Próxima Geração de Tecnologias</p>
          <p>✓ Arquitetura moderna e escalável</p>
          <p>✓ Integração com tecnologias emergentes</p>
          <p>✓ Performance em nível enterprise</p>
        </CardContent>
      </Card>
    </div>
  );
}