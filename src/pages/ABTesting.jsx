import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ABTesting() {
  const testData = [
    { test: 'Button Color', variantA: 3.2, variantB: 4.1, winner: 'B' },
    { test: 'Headline Text', variantA: 2.8, variantB: 2.9, winner: 'Inconclusive' },
    { test: 'CTA Position', variantA: 4.5, variantB: 4.8, winner: 'B' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">A/B Testing Framework</h1>
        <p className="text-slate-600">Testes estatísticos avançados</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Testes Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Testes Completos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">34</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Vencedores</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">28</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Lift Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">+12.3%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Resultados Recentes</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={testData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="variantA" fill="#94a3b8" name="Variante A" />
              <Bar dataKey="variantB" fill="#3b82f6" name="Variante B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Testes em Progresso</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between p-2 border rounded">
            <span>Email Subject Line</span>
            <Badge variant="outline">65% completo</Badge>
          </div>
          <div className="flex justify-between p-2 border rounded">
            <span>Preço de Checkout</span>
            <Badge variant="outline">42% completo</Badge>
          </div>
          <div className="flex justify-between p-2 border rounded">
            <span>Imagem do Hero</span>
            <Badge variant="outline">89% completo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}