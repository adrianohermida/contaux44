import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2 } from 'lucide-react';

export default function SocialMediaIntegration() {
  const [platforms] = useState([
    { name: 'Facebook', followers: '45.2k', engagement: '12.3%', posts: 234 },
    { name: 'Instagram', followers: '78.5k', engagement: '18.7%', posts: 567 },
    { name: 'Twitter', followers: '32.1k', engagement: '8.4%', posts: 189 },
    { name: 'LinkedIn', followers: '12.4k', engagement: '5.2%', posts: 87 }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Social Media Integration</h1>
        <p className="text-slate-600">Gerenciamento integrado de redes sociais</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Plataformas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Seguidores</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">168k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Posts Mês</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">245</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Engajamento Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">11.2%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Share2 className="h-5 w-5" /> Plataformas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {platforms.map((p, i) => (
            <div key={i} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{p.name}</span>
                <Badge variant="outline">{p.followers}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>Engajamento: {p.engagement}</div>
                <div>Posts: {p.posts}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}