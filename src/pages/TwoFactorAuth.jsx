import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';

export default function TwoFactorAuth() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Two-Factor Authentication</h1>
        <p className="text-slate-600">Autenticação de dois fatores</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários com 2FA</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">234</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Adoção</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">62%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tentativas Falhadas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Métodos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">3</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5" /> Métodos Suportados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>TOTP (Authenticator Apps)</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>SMS</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Email</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}