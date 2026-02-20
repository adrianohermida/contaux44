import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain } from 'lucide-react';

export default function RecommendationEngine() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Recommendation Engine</h1>
        <p className="text-slate-600">Recomendações personalizadas com ML</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Recomendações/dia</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24.5k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Click-through</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">18.4%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Conversão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">6.8%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Modelos Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">5</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5" /> Algoritmos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Collaborative Filtering</span>
            <Badge variant="outline">Acurácia: 87%</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Content-Based</span>
            <Badge variant="outline">Acurácia: 82%</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Hybrid Model</span>
            <Badge variant="outline">Acurácia: 91%</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}