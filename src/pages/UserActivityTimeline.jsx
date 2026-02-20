import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function UserActivityTimeline() {
  const [activities] = useState([
    { time: '14:32', user: 'João Silva', action: 'Created blog post', resource: 'SEO Guide' },
    { time: '14:15', user: 'Maria Santos', action: 'Updated invoice', resource: '#2026-001' },
    { time: '13:45', user: 'Admin', action: 'Added new user', resource: 'carlos@example.com' },
    { time: '13:20', user: 'João Silva', action: 'Viewed client', resource: 'Tech Corp' },
    { time: '12:50', user: 'Maria Santos', action: 'Downloaded report', resource: 'Monthly Report' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">User Activity Timeline</h1>
        <p className="text-slate-600">Linha do tempo de atividades dos usuários</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Atividades Recentes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {activities.map((a, i) => (
            <div key={i} className="flex gap-4 pb-3 border-b last:border-b-0">
              <div className="text-sm font-medium text-slate-500 w-12">{a.time}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{a.user}</span>
                  <Badge variant="outline" className="text-xs">{a.action}</Badge>
                </div>
                <p className="text-sm text-slate-600">{a.resource}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Users</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">47</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Active Today</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">28</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Activities</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2,456</div></CardContent>
        </Card>
      </div>
    </div>
  );
}