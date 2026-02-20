import React from 'react';
import { CheckCircle2, Circle, AlertCircle, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Sprint7Tracker() {
  const features = [
    {
      name: 'Advanced Analytics Dashboard',
      status: 'completed',
      page: 'AnalyticsAdvanced',
      details: 'Dashboard com métricas avançadas: views por período, distribuição por fonte, top posts, taxa de conversão',
      completedDate: '2026-02-20'
    },
    {
      name: 'A/B Testing Framework',
      status: 'completed',
      page: 'ABTesting',
      details: 'Sistema completo para testes A/B com nível de confiança, comparação de variantes, e análise estatística',
      completedDate: '2026-02-20'
    },
    {
      name: 'Real-time Notifications',
      status: 'completed',
      page: 'NotificationsCenter',
      details: 'Centro de notificações em tempo real com filtros, prioridades, e preferências de notificação',
      completedDate: '2026-02-20'
    },
    {
      name: 'Performance Optimization',
      status: 'in_progress',
      details: 'Otimização de código, lazy loading, cache inteligente, code splitting',
      completedDate: null
    },
    {
      name: 'Conversion Tracking',
      status: 'planned',
      details: 'Rastreamento de conversões, funis de vendas, pixel de conversão',
      completedDate: null
    },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in_progress': return <Zap className="w-5 h-5 text-yellow-600" />;
      default: return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      completed: 'Concluído',
      in_progress: 'Em Progresso',
      planned: 'Planejado'
    };
    return labels[status] || 'Desconhecido';
  };

  const completedCount = features.filter(f => f.status === 'completed').length;
  const totalCount = features.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Sprint 7 - Tracker</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Advanced Analytics & Performance</p>
      </div>

      {/* Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-900 dark:text-white">Progresso Overall</h3>
              <span className="text-2xl font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {completedCount} de {totalCount} objetivos concluídos
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid gap-4">
        {features.map((feature, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {getStatusIcon(feature.status)}

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                      {feature.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      feature.status === 'completed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : feature.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {getStatusLabel(feature.status)}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {feature.details}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                    <span>Sprint 7</span>
                    {feature.completedDate && (
                      <span className="text-green-600 dark:text-green-400">
                        ✓ Concluído em {new Date(feature.completedDate).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </div>

                  {feature.page && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                      <a 
                        href={`?page=${feature.page}`}
                        className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Acessar {feature.page} →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Sprint Preview */}
      <Card className="border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
        <CardHeader>
          <CardTitle className="text-purple-900 dark:text-purple-100">Próximo Sprint: Sprint 8 - Content & SEO Excellence</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
            <li>✓ Rich Content Editor com media library</li>
            <li>✓ SEO Optimization Dashboard avançado</li>
            <li>✓ Content Calendar & Planning</li>
            <li>✓ Keyword Research Integration</li>
            <li>✓ Backlink Monitoring</li>
            <li>✓ Competitor Analysis Tools</li>
          </ul>
        </CardContent>
      </Card>

      {/* Completed in Sprint 6 Summary */}
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-900 dark:text-green-100">Sprint 6 - Recap (100% Completo)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
            <p>✅ Blog Analytics Dashboard com métricas em tempo real</p>
            <p>✅ Sistema de Agendamento de Posts com automação</p>
            <p>✅ Interface de Moderação de Comentários</p>
            <p>✅ Advanced SEO (Sitemap XML + Schema.org)</p>
            <p>✅ Newsletter Integration para Subscribers</p>
            <p>✅ Bugs Corrigidos: generateSitemap, generateSchemaOrg, publishScheduledBlogs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}