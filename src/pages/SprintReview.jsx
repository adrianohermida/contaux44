import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function SprintReview() {
  const completedItems = [
    {
      feature: 'Blog Analytics Dashboard',
      status: 'Completo',
      details: 'Dashboard com métricas em tempo real: views, visitantes únicos, tempo na página, bounce rate, scroll depth, shares'
    },
    {
      feature: 'Scheduled Posts',
      status: 'Completo',
      details: 'Sistema de agendamento com data e hora, automação de publicação a cada 5 minutos'
    },
    {
      feature: 'Comment Moderation',
      status: 'Completo',
      details: 'Interface para aprovação/rejeição/spam com status updates em tempo real'
    },
    {
      feature: 'Advanced SEO',
      status: 'Completo',
      details: 'Schema.org implementado, Sitemap XML dinâmico, Meta tags dinâmicas'
    },
    {
      feature: 'Newsletter Integration',
      status: 'Completo',
      details: 'Função para enviar posts a subscribers, integração na interface do editor'
    },
    {
      feature: 'Blog List com Schema.org',
      status: 'Completo',
      details: 'Page Blog com schema.org para listagem'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 p-6">
        <h1 className="text-3xl font-bold text-green-900 dark:text-green-100 mb-2">
          Sprint 6 - Review Final
        </h1>
        <p className="text-green-700 dark:text-green-200">
          ✅ Todos os objetivos concluídos com sucesso
        </p>
      </div>

      <div className="grid gap-6">
        {completedItems.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {item.feature}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {item.details}
                </p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Próximo Sprint: Sprint 7 - Performance & Analytics
        </h2>
        <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
          <li>📊 Advanced Analytics Dashboard</li>
          <li>⚡ Performance Optimization</li>
          <li>📈 Conversion Tracking</li>
          <li>🎯 A/B Testing Framework</li>
          <li>🔔 Real-time Notifications</li>
        </ul>
      </div>
    </div>
  );
}