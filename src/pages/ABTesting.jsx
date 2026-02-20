import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Target, TrendingUp } from 'lucide-react';

export default function ABTesting() {
  const [tests] = useState([
    {
      id: 1,
      name: 'CTA Button Color',
      description: 'Teste de cor do botão CTA',
      status: 'running',
      variantA: { name: 'Blue', conversion: 4.2 },
      variantB: { name: 'Green', conversion: 6.1 },
      startDate: '2026-02-15',
      traffic: 2450,
      winner: null
    },
    {
      id: 2,
      name: 'Email Subject Line',
      description: 'Teste de linha de assunto',
      status: 'completed',
      variantA: { name: 'Urgency', conversion: 3.8 },
      variantB: { name: 'Curiosity', conversion: 5.2 },
      startDate: '2026-02-01',
      traffic: 5120,
      winner: 'variantB'
    }
  ]);

  const performanceData = [
    { day: 'Day 1', variantA: 2.1, variantB: 2.5 },
    { day: 'Day 2', variantA: 3.2, variantB: 3.8 },
    { day: 'Day 3', variantA: 3.5, variantB: 4.9 },
    { day: 'Day 4', variantA: 3.8, variantB: 5.5 },
    { day: 'Day 5', variantA: 4.0, variantB: 5.8 },
    { day: 'Day 6', variantA: 4.2, variantB: 6.1 },
  ];

  const getStatusColor = (status) => {
    if (status === 'running') return 'bg-blue-100 text-blue-800';
    if (status === 'completed') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const calculateLift = (variantA, variantB) => {
    return (((variantB - variantA) / variantA) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">A/B Testing Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Gerencie e analise seus testes de conversão</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Novo Teste
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testes Ativos</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.filter(t => t.status === 'running').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testes Completados</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.filter(t => t.status === 'completed').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tráfego Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.reduce((sum, t) => sum + t.traffic, 0).toLocaleString('pt-BR')}</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Tendência de Conversão</CardTitle>
          <CardDescription>Comparação de variantes ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="variantA" stroke="#3b82f6" name="Variante A" />
              <Line type="monotone" dataKey="variantB" stroke="#10b981" name="Variante B" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tests List */}
      <div className="space-y-4">
        {tests.map(test => (
          <Card key={test.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle>{test.name}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(test.status)}>
                  {test.status === 'running' ? 'Em andamento' : 'Concluído'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Variant A */}
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">{test.variantA.name}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Taxa de Conversão:</span>
                        <span className="font-bold">{test.variantA.conversion.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${test.variantA.conversion * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Variant B */}
                  <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <h4 className="font-semibold mb-2">{test.variantB.name} {test.winner === 'variantB' && '✓'}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Taxa de Conversão:</span>
                        <span className="font-bold">{test.variantB.conversion.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${test.variantB.conversion * 10}%` }}
                        />
                      </div>
                      <div className="text-sm font-semibold text-green-700 dark:text-green-400">
                        +{calculateLift(test.variantA.conversion, test.variantB.conversion)}% de melhoria
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tráfego: {test.traffic.toLocaleString('pt-BR')} visitantes</span>
                  <span>Iniciado em: {test.startDate}</span>
                </div>

                {test.status === 'running' && (
                  <Button variant="outline" className="w-full">Visualizar Detalhes</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}