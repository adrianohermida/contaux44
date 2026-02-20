import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, Smartphone, Monitor } from 'lucide-react';

export default function SessionManagement() {
  const [sessions] = useState([
    {
      id: 1,
      device: 'Chrome no Windows',
      ip: '192.168.1.100',
      location: 'São Paulo, Brasil',
      lastActive: '2 minutos atrás',
      created: '2026-02-15',
      current: true,
      icon: '🖥️'
    },
    {
      id: 2,
      device: 'Safari no iPhone',
      ip: '192.168.1.105',
      location: 'São Paulo, Brasil',
      lastActive: '1 hora atrás',
      created: '2026-02-10',
      current: false,
      icon: '📱'
    },
    {
      id: 3,
      device: 'Firefox no MacBook',
      ip: '203.0.113.45',
      location: 'Rio de Janeiro, Brasil',
      lastActive: '3 dias atrás',
      created: '2026-02-08',
      current: false,
      icon: '💻'
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Gerenciamento de Sessões</h1>
        <p className="text-slate-600 dark:text-slate-400">Monitore e controle sessões ativas</p>
      </div>

      {/* Security Alert */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <p className="text-sm">
            ✓ Todas as sessões parecem legítimas. Nenhuma atividade suspeita detectada.
          </p>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Sessões Ativas ({sessions.length})</CardTitle>
          <CardDescription>Dispositivos conectados à sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.map(session => (
            <div key={session.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-grow">
                  <span className="text-2xl">{session.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{session.device}</p>
                      {session.current && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Sessão Atual</Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{session.location}</p>
                    <p className="text-xs text-slate-600 mt-1">Última atividade: {session.lastActive}</p>
                  </div>
                </div>
                {!session.current && (
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <LogOut className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex justify-between text-xs text-slate-600 pt-3 border-t">
                <span>IP: {session.ip}</span>
                <span>Conectado: {session.created}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Session Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Sessão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">Tempo de Expiração</p>
              <select className="px-2 py-1 border rounded text-sm">
                <option>15 minutos</option>
                <option>30 minutos</option>
                <option selected>1 hora</option>
                <option>24 horas</option>
              </select>
            </div>
            <p className="text-xs text-slate-600">Sessão expira se inativo</p>
          </div>

          <div className="p-4 border rounded-lg">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="font-medium">Logout em Múltiplos Logins</span>
            </label>
            <p className="text-xs text-slate-600 mt-1">Desconecta outras sessões ao fazer login novo</p>
          </div>

          <div className="p-4 border rounded-lg">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="font-medium">Verificação de Localização</span>
            </label>
            <p className="text-xs text-slate-600 mt-1">Alerta se login de local diferente</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 gap-2">
          <LogOut className="h-4 w-4" />
          Logout de Todas Sessões
        </Button>
        <Button variant="outline" className="flex-1">
          Visualizar Log de Acesso
        </Button>
      </div>
    </div>
  );
}