import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function DatabaseOptimization() {
  const [indexes] = useState([
    { name: 'blog_post_slug', table: 'BlogPost', status: 'active', size: '2.3MB' },
    { name: 'user_email', table: 'User', status: 'active', size: '1.8MB' },
    { name: 'invoice_date', table: 'Invoice', status: 'active', size: '3.5MB' },
    { name: 'client_status', table: 'Client', status: 'active', size: '0.9MB' }
  ]);

  const queryPerformance = [
    { query: 'SELECT * FROM blogs', avgTime: 12, executed: 1245 },
    { query: 'SELECT * FROM invoices WHERE date > ?', avgTime: 28, executed: 892 },
    { query: 'JOIN users ON clients.user_id', avgTime: 45, executed: 456 },
    { query: 'SELECT DISTINCT category FROM blogs', avgTime: 8, executed: 2034 }
  ];

  const optimizations = [
    { name: 'Indexing Strategy', status: 'completed', impact: 'high' },
    { name: 'Query Caching', status: 'completed', impact: 'high' },
    { name: 'Connection Pooling', status: 'completed', impact: 'medium' },
    { name: 'Table Partitioning', status: 'pending', impact: 'high' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Otimização de Banco de Dados</h1>
        <p className="text-slate-600 dark:text-slate-400">Gerencie índices e performance de queries</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tempo Médio Query</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23ms</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Índices Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{indexes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cache Hit Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">DB Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4GB</div>
          </CardContent>
        </Card>
      </div>

      {/* Indexes */}
      <Card>
        <CardHeader>
          <CardTitle>Índices de Tabelas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {indexes.map(idx => (
            <div key={idx.name} className="p-3 border rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium font-mono text-sm">{idx.name}</p>
                <p className="text-xs text-slate-600">Tabela: {idx.table}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{idx.size}</Badge>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Query Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance de Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={queryPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="query" angle={-45} textAnchor="end" height={100} fontSize={10} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgTime" fill="#3b82f6" name="Tempo Médio (ms)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Optimization Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status de Otimizações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {optimizations.map(opt => (
            <div key={opt.name} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{opt.name}</p>
                {opt.status === 'completed' ? (
                  <Badge className="bg-green-100 text-green-800">✓ Completo</Badge>
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-800">⏳ Pendente</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">Impacto:</span>
                <Badge variant="outline">{opt.impact}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle>Manutenção do Banco de Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Último VACUUM: 2026-02-20 02:00</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Último ANALYZE: 2026-02-20 02:15</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Replicação sincronizada</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}