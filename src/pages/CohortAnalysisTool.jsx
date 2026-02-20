import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CohortAnalysisTool() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Cohort Analysis Tool</h1>
        <p className="text-slate-600">Ferramenta de análise de coortes</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Coortes Analisadas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">42</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Períodos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Retention Day 30</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">38%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Churn Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12.1%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Coortes Principais</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Janeiro 2024 Signups</span>
            <Badge variant="outline">3,242 usuários | 42% retenção</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Paid Subscribers</span>
            <Badge variant="outline">8,124 usuários | 68% retenção</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Marketing Campaign A</span>
            <Badge variant="outline">4,521 usuários | 34% retenção</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}