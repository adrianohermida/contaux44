import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

export default function AdvancedSearch() {
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 'all'
  });

  const results = [
    { id: 1, title: 'Blog: SEO Best Practices', type: 'Blog', date: '2026-02-20' },
    { id: 2, title: 'Invoice #2026-001', type: 'Invoice', date: '2026-02-19' },
    { id: 3, title: 'Client: Tech Corp', type: 'Client', date: '2026-02-18' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Busca Avançada</h1>
        <p className="text-slate-600">Pesquise com filtros poderosos</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar blocos, faturas, clientes..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Buscar</button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Tipo</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg">
              <option>Todos</option>
              <option>Blog</option>
              <option>Invoice</option>
              <option>Client</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg">
              <option>Todos</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Data</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg">
              <option>Qualquer data</option>
              <option>Última semana</option>
              <option>Último mês</option>
              <option>Último ano</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados (3)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {results.map(r => (
            <div key={r.id} className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <p className="font-medium">{r.title}</p>
                <Badge variant="outline">{r.type}</Badge>
              </div>
              <p className="text-xs text-slate-600 mt-1">{r.date}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Search Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Índices</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12.4k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tempo Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">45ms</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Relevância</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">94%</div></CardContent>
        </Card>
      </div>
    </div>
  );
}