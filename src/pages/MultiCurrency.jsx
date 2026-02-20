import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';

export default function MultiCurrency() {
  const rates = [
    { currency: 'BRL', name: 'Real Brasileiro', rate: 1.0, volume: 'R$ 850k' },
    { currency: 'USD', name: 'Dólar Americano', rate: 0.20, volume: 'US$ 45k' },
    { currency: 'EUR', name: 'Euro', rate: 0.18, volume: '€ 32k' },
    { currency: 'GBP', name: 'Libra Esterlina', rate: 0.16, volume: '£ 28k' }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Multi-Currency Support</h1>
        <p className="text-slate-600">Suporte a múltiplas moedas</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Moedas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Conversão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">Real-time</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Volume Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">R$ 1.2M</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Pares</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" /> Moedas Suportadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rates.map((r, i) => (
            <div key={i} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{r.currency} - {r.name}</span>
                <Badge variant="outline">{r.volume}</Badge>
              </div>
              <p className="text-xs text-slate-600">Taxa: 1 BRL = {r.rate}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}