import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Ticket, Activity } from 'lucide-react';

/**
 * KPI Widget - Exibe métrica principal com variação
 * Suporta múltiplos tipos (revenue, payment, client, ticket)
 */
export default function KPIWidget({ title, value, metric = 'revenue', trend = 5, period = 'this_month' }) {
  const { icon: Icon, color, format } = useMemo(() => {
    const configs = {
      revenue: {
        icon: DollarSign,
        color: 'blue',
        format: (v) => `R$ ${v.toLocaleString('pt-BR')}`
      },
      payment: {
        icon: Activity,
        color: 'green',
        format: (v) => `R$ ${v.toLocaleString('pt-BR')}`
      },
      client: {
        icon: Users,
        color: 'purple',
        format: (v) => v.toString()
      },
      ticket: {
        icon: Ticket,
        color: 'yellow',
        format: (v) => v.toString()
      }
    };
    return configs[metric] || configs.revenue;
  }, [metric]);

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600'
  };

  const isPositive = trend >= 0;

  return (
    <div className={`border rounded-lg p-6 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-3xl font-bold mt-2">{format(value)}</p>
          <div className="flex items-center gap-1 mt-3 text-sm">
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium">{Math.abs(trend)}%</span>
            <span className="opacity-75">vs. período anterior</span>
          </div>
        </div>
        <Icon className="w-12 h-12 opacity-20" />
      </div>
    </div>
  );
}