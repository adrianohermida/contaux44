import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PredictiveAnalytics() {
  const forecastData = [
    { month: 'Jan', actual: 45000, predicted: 44000, confidence: 95 },
    { month: 'Fev', actual: 52000, predicted: 50500, confidence: 92 },
    { month: 'Mar', actual: 48000, predicted: 49500, confidence: 89 },
    { month: 'Abr', actual: null, predicted: 56000, confidence: 85 }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Predictive Analytics</h1>
        <p className="text-slate-600">Previsões baseadas em ML</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Acurácia</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">92.5%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Modelos Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">7</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Horizonte</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">90 dias</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Previsão vs Realizado</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#10b981" name="Realizado" />
              <Line type="monotone" dataKey="predicted" stroke="#3b82f6" name="Previsto" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Modelos</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between p-2 border rounded">
            <span>Revenue Forecast</span><span className="font-bold text-green-600">94%</span>
          </div>
          <div className="flex justify-between p-2 border rounded">
            <span>Churn Prediction</span><span className="font-bold text-green-600">89%</span>
          </div>
          <div className="flex justify-between p-2 border rounded">
            <span>Demand Planning</span><span className="font-bold text-green-600">91%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}