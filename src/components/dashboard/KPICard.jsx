import React, { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KPICard = memo(function KPICard({ icon: Icon, label, value, trend, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
    purple: 'bg-purple-50 border-purple-200'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600'
  };

  const iconColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    purple: 'text-purple-600'
  };

  return (
    <div className={`${colors[color]} border rounded-lg p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 ${trendColors[trend.direction]}`}>
              {trend.direction === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-medium">{trend.percentage}% vs mês anterior</span>
            </div>
          )}
        </div>
        <Icon className={`w-8 h-8 ${iconColors[color]}`} />
      </div>
    </div>
  );
});

export default KPICard;