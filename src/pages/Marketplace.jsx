import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

export default function Marketplace() {
  const [vendors] = useState([
    { name: 'Tech Vendor A', products: 24, sales: 'R$ 125k', rating: 4.8 },
    { name: 'Software House B', products: 18, sales: 'R$ 89k', rating: 4.6 },
    { name: 'Integration Plus', products: 12, sales: 'R$ 56k', rating: 4.9 }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Multi-tenant Marketplace</h1>
        <p className="text-slate-600">Plataforma de vendedores e produtos</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Vendedores Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Produtos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">456</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Vendas Mês</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">R$ 1.2M</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> Top Vendors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {vendors.map(v => (
            <div key={v.name} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{v.name}</span>
                <Badge variant="outline">⭐ {v.rating}</Badge>
              </div>
              <div className="text-xs text-slate-600 flex justify-between">
                <span>{v.products} produtos</span>
                <span>{v.sales}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}