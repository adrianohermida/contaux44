import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

export default function PerformanceBenchmark() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Performance Benchmarking</h1>
        <p className="text-slate-600">Comparação com indústria</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Métricas Rastreadas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Acima da Média</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">18</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Percentil</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">87º</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Score</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">9.2/10</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Comparação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Crescimento Receita</span>
            <Badge className="bg-green-100 text-green-800">+18% vs +12% média</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Retenção Clientes</span>
            <Badge className="bg-green-100 text-green-800">94% vs 87% média</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Margem Operacional</span>
            <Badge className="bg-yellow-100 text-yellow-800">32% vs 35% média</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Satisfação Cliente</span>
            <Badge className="bg-green-100 text-green-800">92% vs 88% média</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}