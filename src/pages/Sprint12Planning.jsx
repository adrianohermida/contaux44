import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

export default function Sprint12Planning() {
  const sprint12Features = [
    { id: 1, name: 'Advanced Machine Learning Models', category: 'AI/ML', effort: 'high', complexity: 'critical' },
    { id: 2, name: 'Real-time Analytics Engine', category: 'Analytics', effort: 'high', complexity: 'critical' },
    { id: 3, name: 'Advanced Reporting & Dashboards', category: 'Reporting', effort: 'high', complexity: 'high' },
    { id: 4, name: 'Mobile App Integration API', category: 'Mobile', effort: 'high', complexity: 'high' },
    { id: 5, name: 'IoT Device Support', category: 'IoT', effort: 'high', complexity: 'critical' },
    { id: 6, name: 'Blockchain Integration', category: 'Blockchain', effort: 'high', complexity: 'critical' },
    { id: 7, name: 'AR/VR Features', category: 'Extended Reality', effort: 'high', complexity: 'critical' },
    { id: 8, name: 'Voice Commands & NLP', category: 'AI/ML', effort: 'medium', complexity: 'high' },
    { id: 9, name: 'Predictive Maintenance', category: 'Maintenance', effort: 'high', complexity: 'high' },
    { id: 10, name: 'Zero Trust Security', category: 'Security', effort: 'high', complexity: 'critical' },
    { id: 11, name: 'Quantum Computing Ready', category: 'Performance', effort: 'high', complexity: 'critical' },
    { id: 12, name: 'Global Distribution Network', category: 'Infrastructure', effort: 'high', complexity: 'high' }
  ];

  const categories = [...new Set(sprint12Features.map(f => f.category))];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sprint 12 - Planejamento Estratégico</h1>
        <p className="text-slate-600">Próxima Geração de Tecnologias (12 features)</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Features</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">High Priority</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">10</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Critical</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-red-600">6</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Duração Est.</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">5-6 sem</div></CardContent>
        </Card>
      </div>

      {/* By Category */}
      <div className="space-y-4">
        {categories.map(cat => {
          const catFeatures = sprint12Features.filter(f => f.category === cat);
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
                    <div className="flex gap-2">
                      <Badge className={
                        f.complexity === 'critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                      }>
                        {f.complexity}
                      </Badge>
                      <Badge className={
                        f.effort === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }>
                        {f.effort}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Technical Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Requisitos Técnicos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-medium">AI/ML Infrastructure:</h4>
            <ul className="text-sm text-slate-600 ml-4 space-y-1">
              <li>• TensorFlow/PyTorch Integration</li>
              <li>• GPU Acceleration Support</li>
              <li>• Model Training Pipeline</li>
              <li>• NLP Engine</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">IoT & Real-time:</h4>
            <ul className="text-sm text-slate-600 ml-4 space-y-1">
              <li>• MQTT Protocol Support</li>
              <li>• WebSocket Real-time</li>
              <li>• Edge Computing Ready</li>
              <li>• Time Series Database</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Advanced Security:</h4>
            <ul className="text-sm text-slate-600 ml-4 space-y-1">
              <li>• Zero Trust Architecture</li>
              <li>• Quantum-Ready Encryption</li>
              <li>• Blockchain Validation</li>
              <li>• Biometric Authentication</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Cronograma Estimado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="w-28 font-medium">Semana 1-2</div>
            <div className="flex-1">AI/ML Models & Real-time Analytics (4 features)</div>
            <Badge className="bg-red-100 text-red-800">Critical</Badge>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="w-28 font-medium">Semana 2-3</div>
            <div className="flex-1">IoT & Blockchain Integration (3 features)</div>
            <Badge className="bg-red-100 text-red-800">Critical</Badge>
          </div>
          <div className="flex items-center gap-3 p-3">
            <div className="w-28 font-medium">Semana 3-4</div>
            <div className="flex-1">AR/VR & Voice Commands (2 features)</div>
            <Badge className="bg-orange-100 text-orange-800">High</Badge>
          </div>
          <div className="flex items-center gap-3 p-3">
            <div className="w-28 font-medium">Semana 4-5</div>
            <div className="flex-1">Security & Infrastructure (3 features)</div>
            <Badge className="bg-red-100 text-red-800">Critical</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Avaliação de Riscos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="p-3 border-l-4 border-red-600 bg-red-50 dark:bg-red-950/20">
            <p className="font-medium text-red-800">Alto Risco</p>
            <p className="text-red-700">Quantum Computing & Blockchain: Tecnologias emergentes com ecossistema em desenvolvimento</p>
          </div>
          <div className="p-3 border-l-4 border-orange-600 bg-orange-50 dark:bg-orange-950/20">
            <p className="font-medium text-orange-800">Risco Médio</p>
            <p className="text-orange-700">AR/VR & IoT: Integração complexa, requer expertise especializada</p>
          </div>
          <div className="p-3 border-l-4 border-green-600 bg-green-50 dark:bg-green-950/20">
            <p className="font-medium text-green-800">Baixo Risco</p>
            <p className="text-green-700">AI/ML: Tecnologias consolidadas, bibliotecas maduras disponíveis</p>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="text-blue-800">Sprint 12 Status: Planejado ✓</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-1">
          <p>✓ 12 features definidas e priorizadas</p>
          <p>✓ Requisitos técnicos mapeados</p>
          <p>✓ Cronograma estabelecido</p>
          <p>✓ Riscos identificados e planejados</p>
          <p>✓ Pronto para iniciar desenvolvimento</p>
        </CardContent>
      </Card>
    </div>
  );
}