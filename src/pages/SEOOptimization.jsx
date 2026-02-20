import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SEOOptimization() {
  const [seoMetrics] = useState([
    { metric: 'Domain Authority', value: '42', target: '50' },
    { metric: 'Backlinks', value: '234', target: '500' },
    { metric: 'Indexed Pages', value: '1,247', target: '5,000' },
    { metric: 'Organic Traffic', value: '8,450', target: '50,000' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">SEO Optimization</h1>
        <p className="text-slate-600">Otimização para motores de busca</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {seoMetrics.map(m => (
          <Card key={m.metric}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{m.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{m.value}</div>
              <p className="text-xs text-slate-600 mt-1">Meta: {m.target}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>SEO Checklist</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Meta tags configuradas</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Sitemap.xml presente</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Mobile friendly</label>
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Core Web Vitals OK</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Schema markup</label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Top Keywords</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {['contaux', 'sistema gestão jurídica', 'software financeiro', 'blog automation'].map((kw, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded text-sm">
              <span>{kw}</span>
              <Badge variant="outline">Posição {i + 3}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}