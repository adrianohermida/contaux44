import React from 'react';
import { Package, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function BundleAnalyzer() {
  const bundleData = [
    { name: 'React', size: 45, percent: 15 },
    { name: 'Recharts', size: 32, percent: 11 },
    { name: 'Radix UI', size: 28, percent: 9 },
    { name: 'Tailwind', size: 22, percent: 7 },
    { name: 'App Code', size: 165, percent: 55 },
    { name: 'Outros', size: 8, percent: 3 },
  ];

  const totalSize = bundleData.reduce((sum, item) => sum + item.size, 0);
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6b7280'];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Card className="p-3 bg-blue-50">
          <p className="text-xs text-gray-600">Tamanho Total</p>
          <p className="text-2xl font-bold text-blue-900">{totalSize}KB</p>
        </Card>
        <Card className={`p-3 ${totalSize > 500 ? 'bg-red-50' : 'bg-green-50'}`}>
          <p className="text-xs text-gray-600">Status</p>
          <p className={`text-lg font-bold ${totalSize > 500 ? 'text-red-900' : 'text-green-900'}`}>
            {totalSize > 500 ? 'Acima do alvo' : '✓ Dentro do alvo'}
          </p>
        </Card>
        <Card className="p-3 bg-purple-50">
          <p className="text-xs text-gray-600">Target</p>
          <p className="text-2xl font-bold text-purple-900">500KB</p>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Distribuição de Dependências</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bundleData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="size" fill="#3b82f6">
              {bundleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Detalhamento</h3>
        <div className="space-y-2">
          {bundleData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: colors[idx] }} />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{item.size}KB</p>
                <p className="text-xs text-gray-500">{item.percent}%</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {totalSize > 500 && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-yellow-900">Bundle acima do alvo</p>
              <p className="text-xs text-yellow-800 mt-1">Recomendações:</p>
              <ul className="text-xs text-yellow-800 mt-1 list-disc list-inside">
                <li>Code splitting para lazy loading</li>
                <li>Tree-shaking de código não utilizado</li>
                <li>Minificação e compressão</li>
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}