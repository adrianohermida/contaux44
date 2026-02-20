import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

export default function RegionalCustomization() {
  const [regions] = useState([
    {
      name: 'Brasil',
      code: 'BR',
      currency: 'BRL',
      dateFormat: 'DD/MM/YYYY',
      status: 'active'
    },
    {
      name: 'Estados Unidos',
      code: 'US',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      status: 'active'
    },
    {
      name: 'España',
      code: 'ES',
      currency: 'EUR',
      dateFormat: 'DD/MM/YYYY',
      status: 'active'
    },
    {
      name: 'México',
      code: 'MX',
      currency: 'MXN',
      dateFormat: 'DD/MM/YYYY',
      status: 'active'
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Customização Regional</h1>
        <p className="text-slate-600 dark:text-slate-400">Adapte a plataforma por região</p>
      </div>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Regiões Configuradas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {regions.map(region => (
            <div key={region.code} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium">{region.name}</p>
                  <p className="text-xs text-slate-600">{region.code}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div>
                  <p className="font-medium">Moeda</p>
                  <p>{region.currency}</p>
                </div>
                <div>
                  <p className="font-medium">Formato Data</p>
                  <p>{region.dateFormat}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Customization Options */}
      <Card>
        <CardHeader>
          <CardTitle>Opções de Customização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span>Formato de moeda regional</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span>Formato de data regional</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span>Número de telefone regional</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            <span>Fuso horário regional</span>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Regiões</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{regions.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários Totais</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1,234</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Cobertura</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4 países</div></CardContent>
        </Card>
      </div>
    </div>
  );
}