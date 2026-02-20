import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DynamicPricingEngine() {
  const priceData = [
    { product: 'Premium', basePrice: 99, dynamicPrice: 112, factor: 1.13 },
    { product: 'Standard', basePrice: 49, dynamicPrice: 54, factor: 1.10 },
    { product: 'Basic', basePrice: 29, dynamicPrice: 29, factor: 1.00 }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Dynamic Pricing Engine</h1>
        <p className="text-slate-600">Preços inteligentes baseado em demanda</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Aumento Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">7.8%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Receita Extra</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">R$ 48.5k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Conversão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">85%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Comparação de Preços</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="basePrice" fill="#94a3b8" name="Preço Base" />
              <Bar dataKey="dynamicPrice" fill="#3b82f6" name="Preço Dinâmico" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Fatores de Preço</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between p-2 border rounded bg-blue-50 dark:bg-blue-950/20">
            <span>Demanda</span><span className="font-bold">+15%</span>
          </div>
          <div className="flex justify-between p-2 border rounded bg-blue-50 dark:bg-blue-950/20">
            <span>Sazonalidade</span><span className="font-bold">+8%</span>
          </div>
          <div className="flex justify-between p-2 border rounded bg-blue-50 dark:bg-blue-950/20">
            <span>Competição</span><span className="font-bold">-5%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}