import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

export default function RiskAssessment() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Risk Assessment Dashboard</h1>
        <p className="text-slate-600">Dashboard de avaliação de riscos</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Riscos Identificados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">18</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Críticos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-600">2</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Moderados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-yellow-600">8</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Mitigação</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">78%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Riscos Críticos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border rounded-lg border-red-200 bg-red-50">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-red-900">Risco de Conformidade</span>
              <Badge className="bg-red-100 text-red-800">CRÍTICO</Badge>
            </div>
            <p className="text-xs text-red-800">Potencial exposição: R$ 500k - Ação: Revisão legal em progresso</p>
          </div>
          <div className="p-3 border rounded-lg border-orange-200 bg-orange-50">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-orange-900">Risco Operacional</span>
              <Badge className="bg-orange-100 text-orange-800">MODERADO</Badge>
            </div>
            <p className="text-xs text-orange-800">Potencial exposição: R$ 150k - Ação: Monitoramento ativo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}