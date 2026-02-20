import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

export default function InventoryManagement() {
  const [items] = useState([
    { sku: 'SKU-001', name: 'Produto A', quantity: 245, minLevel: 50, status: 'ok' },
    { sku: 'SKU-002', name: 'Produto B', quantity: 12, minLevel: 50, status: 'warning' },
    { sku: 'SKU-003', name: 'Produto C', quantity: 0, minLevel: 30, status: 'critical' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-slate-600">Gestão de inventário em tempo real</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Itens</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">257</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">SKUs</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">47</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Valor Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">R$ 125k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Alertas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-orange-600">2</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5" /> Produtos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-slate-600">{item.sku}</p>
                </div>
                <Badge className={item.status === 'ok' ? 'bg-green-100 text-green-800' : item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                  {item.quantity} un
                </Badge>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={item.status === 'ok' ? 'bg-green-600' : item.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'}
                  style={{ width: `${Math.min((item.quantity / 250) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}