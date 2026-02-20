import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function IPWhitelisting() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">IP Whitelisting</h1>
        <p className="text-slate-600">Whitelist de endereços IP</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">IPs Whitelistados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">45</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Requisições Bloqueadas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">342</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Bloqueio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">3.2%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Status</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">Ativo</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Whitelist Ativa</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>10.0.0.0/8</span>
            <Badge variant="outline">Permitido</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>192.168.1.0/24</span>
            <Badge variant="outline">Permitido</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>203.0.113.0/24</span>
            <Badge variant="outline">Permitido</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}