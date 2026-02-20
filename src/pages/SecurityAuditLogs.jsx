import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export default function SecurityAuditLogs() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Security Audit Logs</h1>
        <p className="text-slate-600">Logs de auditoria de segurança</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Logs Totais</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2.4M</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tentativas Falhas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-orange-600">342</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Retenção</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1 ano</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Conformidade</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">100%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Eventos Rastreados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Login/Logout</span>
            <Badge className="bg-green-100 text-green-800">✓ Rastreado</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Alterações de Permissões</span>
            <Badge className="bg-green-100 text-green-800">✓ Rastreado</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Acesso a Dados Sensíveis</span>
            <Badge className="bg-green-100 text-green-800">✓ Rastreado</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}