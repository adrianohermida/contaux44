import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck } from 'lucide-react';

export default function SupplyChain() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Supply Chain Optimization</h1>
        <p className="text-slate-600">Otimização de cadeia de suprimentos</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Fornecedores</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Pedidos Abertos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">18</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tempo Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">7.2 dias</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Eficiência</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">92%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5" /> Transportes Ativos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Saída São Paulo</span>
            <Badge className="bg-blue-100 text-blue-800">Em trânsito</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Chegada Rio de Janeiro</span>
            <Badge className="bg-green-100 text-green-800">Entregue</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Saída Belo Horizonte</span>
            <Badge className="bg-yellow-100 text-yellow-800">Saída: 2h</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}