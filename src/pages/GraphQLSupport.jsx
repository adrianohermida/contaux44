import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';

export default function GraphQLSupport() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">GraphQL Support</h1>
        <p className="text-slate-600">API GraphQL para queries eficientes</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Queries/hora</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">45.2k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Latência Média</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">142ms</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Uptime</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">99.95%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Code className="h-5 w-5" /> Recursos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2 p-2 border rounded bg-blue-50 dark:bg-blue-950/20">
            <span>✓</span>
            <span>Schema introspection</span>
          </div>
          <div className="flex items-center gap-2 p-2 border rounded bg-blue-50 dark:bg-blue-950/20">
            <span>✓</span>
            <span>Subscriptions em tempo real</span>
          </div>
          <div className="flex items-center gap-2 p-2 border rounded bg-blue-50 dark:bg-blue-950/20">
            <span>✓</span>
            <span>Query batching</span>
          </div>
          <div className="flex items-center gap-2 p-2 border rounded bg-blue-50 dark:bg-blue-950/20">
            <span>✓</span>
            <span>Persisted queries</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}