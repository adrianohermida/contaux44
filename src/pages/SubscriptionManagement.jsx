import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SubscriptionManagement() {
  const [subscriptions] = useState([
    { plan: 'Basic', subscribers: 245, mrr: 'R$ 7.1k', churn: '2.3%', status: 'active' },
    { plan: 'Professional', subscribers: 128, mrr: 'R$ 12.8k', churn: '1.2%', status: 'active' },
    { plan: 'Enterprise', subscribers: 34, mrr: 'R$ 34k', churn: '0.5%', status: 'active' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <p className="text-slate-600">Gerenciamento de assinaturas</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Assinantes</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">407</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">MRR Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">R$ 54.9k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Churn Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1.3%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Planos de Assinatura</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {subscriptions.map(s => (
            <div key={s.plan} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{s.plan}</span>
                <Badge className="bg-green-100 text-green-800">✓ {s.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                <div>{s.subscribers} assinantes</div>
                <div>{s.mrr}</div>
                <div>Churn: {s.churn}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}