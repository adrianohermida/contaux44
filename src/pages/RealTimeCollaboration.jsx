import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export default function RealTimeCollaboration() {
  const [activeSessions] = useState([
    { id: 1, document: 'Blog: SEO Guide', users: 3, status: 'editing' },
    { id: 2, document: 'Invoice #2026-001', users: 1, status: 'viewing' },
    { id: 3, document: 'Client Profile', users: 2, status: 'reviewing' }
  ]);

  const features = [
    'Live Cursor Tracking',
    'Real-time Text Sync',
    'Conflict Resolution',
    'Comment Thread',
    'Change History',
    'Presence Indicators'
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Colaboração em Tempo Real</h1>
        <p className="text-slate-600">Edite documentos com sua equipe simultaneamente</p>
      </div>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Sessões Ativas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeSessions.map(session => (
            <div key={session.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{session.document}</p>
                <Badge className="bg-green-100 text-green-800">
                  {session.users} usuário{session.users > 1 ? 's' : ''}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 capitalize">{session.status}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          {features.map(f => (
            <div key={f} className="p-2 border rounded text-sm">✓ {f}</div>
          ))}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários Online</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">6</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Documentos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">3</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Latência</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">23ms</div></CardContent>
        </Card>
      </div>
    </div>
  );
}