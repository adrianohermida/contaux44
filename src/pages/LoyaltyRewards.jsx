import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift } from 'lucide-react';

export default function LoyaltyRewards() {
  const [tiers] = useState([
    { name: 'Bronze', members: 245, points: '0-5k', benefits: '5% desconto' },
    { name: 'Silver', members: 128, points: '5k-15k', benefits: '10% desconto + free shipping' },
    { name: 'Gold', members: 34, points: '15k+', benefits: '20% desconto + early access' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Loyalty Rewards System</h1>
        <p className="text-slate-600">Sistema de pontos e níveis</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Membros Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">407</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Pontos Distribuídos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">892k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Resgate Taxa</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">42%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Retenção</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">87%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Gift className="h-5 w-5" /> Níveis de Associação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tiers.map((t, i) => (
            <div key={i} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{t.name}</span>
                <Badge variant="outline">{t.members} membros</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>Pontos: {t.points}</div>
                <div>Benefícios: {t.benefits}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}