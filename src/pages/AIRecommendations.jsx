import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp, CheckCircle } from 'lucide-react';

export default function AIRecommendations() {
  const [recommendations] = useState([
    {
      id: 1,
      type: 'Content',
      title: 'Otimizar SEO do Blog',
      description: 'Adicionar mais keywords e melhorar meta descriptions',
      confidence: 94,
      impact: 'Alto'
    },
    {
      id: 2,
      type: 'Business',
      title: 'Aumentar Frequência de Publicação',
      description: 'Publicar 3x por semana aumentará engagement em 23%',
      confidence: 87,
      impact: 'Alto'
    },
    {
      id: 3,
      type: 'User Behavior',
      title: 'Segmentar Audiência por Interesse',
      description: 'Criar campanhas específicas para cada segmento',
      confidence: 91,
      impact: 'Médio'
    },
    {
      id: 4,
      type: 'Performance',
      title: 'Otimizar Imagens de Blog',
      description: 'Reduzir tamanho em 45% sem perder qualidade',
      confidence: 88,
      impact: 'Médio'
    }
  ]);

  const [insights] = useState([
    { metric: 'Conteúdo Popular', value: 'Blog técnico', growth: '+34%' },
    { metric: 'Melhor Horário', value: 'Terça 14h', growth: '+18%' },
    { metric: 'Taxa Engajamento', value: '4.2%', growth: '+12%' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Recomendações Impulsionadas por IA</h1>
        <p className="text-slate-600 dark:text-slate-400">Insights automáticos para otimizar seu negócio</p>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{insight.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insight.value}</div>
              <p className="text-xs text-green-600 mt-1">↑ {insight.growth}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Recomendações Priorizadas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.map(rec => (
            <div key={rec.id} className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{rec.type}</Badge>
                    <p className="font-medium">{rec.title}</p>
                  </div>
                  <p className="text-sm text-slate-600">{rec.description}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t text-xs text-slate-600">
                <div>Confiança: <span className="font-medium">{rec.confidence}%</span></div>
                <div>Impacto: <span className="font-medium">{rec.impact}</span></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Predictive Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Desempenho do Modelo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Acurácia</span>
              <span className="text-sm">94.2%</span>
            </div>
            <div className="w-full bg-slate-200 rounded h-2">
              <div className="bg-green-600 h-2 rounded" style={{ width: '94.2%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Precision</span>
              <span className="text-sm">91.8%</span>
            </div>
            <div className="w-full bg-slate-200 rounded h-2">
              <div className="bg-blue-600 h-2 rounded" style={{ width: '91.8%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Recall</span>
              <span className="text-sm">89.5%</span>
            </div>
            <div className="w-full bg-slate-200 rounded h-2">
              <div className="bg-purple-600 h-2 rounded" style={{ width: '89.5%' }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="text-blue-800">Próximas Ações Recomendadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-900">
          <p>✓ Implementar recomendação #1 esta semana</p>
          <p>✓ A/B testar recomendação #2 no próximo mês</p>
          <p>✓ Monitorar impacto das mudanças</p>
          <p>✓ Refinar modelo baseado em novos dados</p>
        </CardContent>
      </Card>
    </div>
  );
}