import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SocialMediaIntegration() {
  const [platforms] = useState([
    { name: 'Twitter', followers: '2,450', posts: 156, engagement: '4.2%', status: 'connected' },
    { name: 'LinkedIn', followers: '5,680', posts: 89, engagement: '6.1%', status: 'connected' },
    { name: 'Facebook', followers: '8,934', posts: 67, engagement: '2.8%', status: 'connected' },
    { name: 'Instagram', followers: '3,450', posts: 34, engagement: '8.5%', status: 'connected' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Social Media Integration</h1>
        <p className="text-slate-600">Integração com redes sociais</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Plataformas Conectadas</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {platforms.map(p => (
            <div key={p.name} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{p.name}</p>
                <Badge className="bg-green-100 text-green-800">✓ {p.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                <div>Seguidores: {p.followers}</div>
                <div>Posts: {p.posts}</div>
                <div>Engagement: {p.engagement}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Followers</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">20.5k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Posts</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">346</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Avg Engagement</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">5.4%</div></CardContent>
        </Card>
      </div>
    </div>
  );
}