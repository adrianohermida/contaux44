import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';

export default function VideoContentManagement() {
  const [videos] = useState([
    { title: 'Product Demo', duration: '5:45', views: '12.5k', published: '2026-02-18' },
    { title: 'Customer Story', duration: '3:20', views: '8.2k', published: '2026-02-16' },
    { title: 'Tutorial Series', duration: '12:30', views: '24.1k', published: '2026-02-14' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Video Content Management</h1>
        <p className="text-slate-600">Gestão centralizada de conteúdo em vídeo</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Vídeos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">42</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Visualizações Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">124k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Duração Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">18h 42m</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Conclusão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">76%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Play className="h-5 w-5" /> Vídeos Recentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {videos.map((v, i) => (
            <div key={i} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{v.title}</span>
                <Badge variant="outline">{v.duration}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>Visualizações: {v.views}</div>
                <div>Publicado: {v.published}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}