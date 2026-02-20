import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Tablet, Monitor, CheckCircle } from 'lucide-react';

export default function MobileFirstDesign() {
  const [breakpoints] = useState([
    { name: 'Mobile', width: '320px - 640px', icon: '📱', status: 'optimized' },
    { name: 'Tablet', width: '641px - 1024px', icon: '📊', status: 'optimized' },
    { name: 'Desktop', width: '1025px+', icon: '🖥️', status: 'optimized' }
  ]);

  const [components] = useState([
    { name: 'Navigation Bar', mobile: '✓', tablet: '✓', desktop: '✓', status: 'complete' },
    { name: 'Cards & Lists', mobile: '✓', tablet: '✓', desktop: '✓', status: 'complete' },
    { name: 'Forms', mobile: '✓', tablet: '✓', desktop: '✓', status: 'complete' },
    { name: 'Tables', mobile: 'scroll', tablet: '✓', desktop: '✓', status: 'complete' },
    { name: 'Modals', mobile: '✓', tablet: '✓', desktop: '✓', status: 'complete' },
    { name: 'Sidebars', mobile: 'drawer', tablet: '✓', desktop: '✓', status: 'complete' }
  ]);

  const [metrics] = useState([
    { metric: 'Mobile Score', value: 94, target: 90 },
    { metric: 'Tablet Score', value: 96, target: 90 },
    { metric: 'Desktop Score', value: 98, target: 90 },
    { metric: 'Lighthouse Score', value: 92, target: 90 }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Design Mobile-First</h1>
        <p className="text-slate-600 dark:text-slate-400">Interface otimizada para todos os dispositivos</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(m => (
          <Card key={m.metric}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{m.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{m.value}</div>
              <p className="text-xs text-slate-600">Meta: {m.target}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Breakpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Breakpoints Responsivos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {breakpoints.map(bp => (
              <div key={bp.name} className="p-4 border rounded-lg text-center">
                <div className="text-3xl mb-2">{bp.icon}</div>
                <p className="font-medium">{bp.name}</p>
                <p className="text-xs text-slate-600 mt-1">{bp.width}</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Otimizado</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Component Compatibility */}
      <Card>
        <CardHeader>
          <CardTitle>Compatibilidade de Componentes</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Componente</th>
                <th className="text-center p-2 font-medium">Mobile</th>
                <th className="text-center p-2 font-medium">Tablet</th>
                <th className="text-center p-2 font-medium">Desktop</th>
              </tr>
            </thead>
            <tbody>
              {components.map(comp => (
                <tr key={comp.name} className="border-b hover:bg-slate-50 dark:hover:bg-slate-900">
                  <td className="p-2">{comp.name}</td>
                  <td className="text-center p-2">{comp.mobile}</td>
                  <td className="text-center p-2">{comp.tablet}</td>
                  <td className="text-center p-2">{comp.desktop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Mobile Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-900 rounded aspect-video flex items-center justify-center">
              <Smartphone className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Tablet Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-900 rounded aspect-video flex items-center justify-center">
              <Tablet className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Desktop Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-900 rounded aspect-video flex items-center justify-center">
              <Monitor className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Boas Práticas Implementadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Touch-friendly buttons (min 44x44px)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Responsive images com srcset</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Mobile viewport meta tag</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Cascading style sheets para breakpoints</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Flexible layouts com CSS Grid/Flexbox</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}