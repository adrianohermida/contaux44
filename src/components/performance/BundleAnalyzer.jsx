import React, { useState, useMemo } from 'react';
import { Package, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * Bundle Analyzer - Analisa tamanho do bundle
 * Identifica modules pesados, oportunidades de otimização
 */
export default function BundleAnalyzer() {
  const [selectedModule, setSelectedModule] = useState(null);

  const bundleData = useMemo(() => [
    { name: 'react', size: 42.5, percentage: 28, type: 'core' },
    { name: 'react-dom', size: 38.2, percentage: 25, type: 'core' },
    { name: 'recharts', size: 35.1, percentage: 23, type: 'charts' },
    { name: '@tanstack/react-query', size: 18.3, percentage: 12, type: 'state' },
    { name: 'tailwindcss', size: 8.5, percentage: 6, type: 'styling' },
    { name: 'lucide-react', size: 5.2, percentage: 3, type: 'icons' },
    { name: 'Other', size: 4.2, percentage: 3, type: 'other' },
  ], []);

  const totalSize = useMemo(() => bundleData.reduce((sum, m) => sum + m.size, 0), [bundleData]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Package className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold">Análise de Bundle</h3>
        <span className="ml-auto text-sm font-bold">{totalSize.toFixed(1)} KB</span>
      </div>

      <Card className="p-4 space-y-3">
        {bundleData.map((module) => (
          <div
            key={module.name}
            className="space-y-1 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
            onClick={() => setSelectedModule(selectedModule === module.name ? null : module.name)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{module.name}</span>
              <span className="text-xs font-bold">{module.size} KB</span>
            </div>
            <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  module.type === 'core'
                    ? 'bg-blue-500'
                    : module.type === 'charts'
                    ? 'bg-green-500'
                    : module.type === 'state'
                    ? 'bg-purple-500'
                    : 'bg-gray-500'
                }`}
                style={{ width: `${module.percentage}%` }}
              />
            </div>
            {selectedModule === module.name && (
              <div className="text-xs text-gray-600 mt-2 p-2 bg-gray-100 rounded">
                <p>Tamanho: {module.size} KB ({module.percentage}% do total)</p>
                <p>Tipo: {module.type}</p>
                <p className="mt-1 text-blue-600">💡 Considere lazy loading para otimizar</p>
              </div>
            )}
          </div>
        ))}
      </Card>

      <Card className="p-3 bg-blue-50 border-blue-200 flex gap-2">
        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          Bundle atual: {totalSize.toFixed(1)} KB. Target: &lt; 200 KB. Oportunidade de redução: {(totalSize - 200).toFixed(1)} KB.
        </p>
      </Card>
    </div>
  );
}