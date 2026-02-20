import React from 'react';
import { TrendingUp, Zap, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * Caching Dashboard - Overview de estratégias de cache
 */
export default function CachingDashboard() {
  const strategies = [
    {
      name: 'LRU (Least Recently Used)',
      description: 'Remove itens menos usados quando limite atingido',
      status: 'ativo',
      icon: '🕐',
    },
    {
      name: 'TTL (Time To Live)',
      description: 'Expira automaticamente após período definido',
      status: 'ativo',
      icon: '⏱️',
    },
    {
      name: 'GZIP Compression',
      description: 'Comprime dados para reduzir uso de memória',
      status: 'ativo',
      icon: '📦',
    },
  ];

  const recommendations = [
    'Aumentar TTL para dados estáticos de 1h para 2h',
    'Implementar cache de imagens com strategy adaptativo',
    'Habilitar compression para payloads > 1KB',
    'Monitorar hit rate - alvo > 85%',
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-700">Hit Rate Target</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">> 85%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-700">Max Cache Size</p>
              <p className="text-3xl font-bold text-green-900 mt-1">50 items</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-400" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-700">Avg Latency</p>
              <p className="text-3xl font-bold text-purple-900 mt-1">8ms</p>
            </div>
            <Zap className="w-8 h-8 text-purple-400" />
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Estratégias Ativas</h3>
        <div className="space-y-3">
          {strategies.map((strategy, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
              <span className="text-xl">{strategy.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-sm">{strategy.name}</p>
                <p className="text-xs text-gray-600">{strategy.description}</p>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                {strategy.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Recomendações</h3>
        <ul className="space-y-2">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <span className="text-blue-600 mt-1">→</span>
              <span className="text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}