import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CustomUserSegments() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Custom User Segments</h1>
        <p className="text-slate-600">Segmentação personalizada de usuários</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Segmentos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">28</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários Segmentados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">45.2k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Regras Ativas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">127</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Precisão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">94%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Segmentos Principais</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {['High-Value Customers', 'At-Risk Users', 'Inactive Users', 'New Signups', 'Premium Subscribers'].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <span>{s}</span>
              <Badge variant="outline">{Math.floor(Math.random() * 5000) + 1000} usuários</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}