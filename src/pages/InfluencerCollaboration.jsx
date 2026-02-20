import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export default function InfluencerCollaboration() {
  const [influencers] = useState([
    { name: 'Influencer Alpha', followers: '250k', niche: 'Lifestyle', engagement: '8.5%', campaigns: 12 },
    { name: 'Influencer Beta', followers: '180k', niche: 'Tech', engagement: '12.3%', campaigns: 8 },
    { name: 'Influencer Gamma', followers: '320k', niche: 'Fashion', engagement: '9.7%', campaigns: 15 }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Influencer Collaboration Tool</h1>
        <p className="text-slate-600">Gerenciamento de colaborações com influenciadores</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Influenciadores</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">18</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Campanhas Ativas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">7</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">ROI Médio</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">+245%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Alcance Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">12.4M</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Top Influenciadores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {influencers.map((i, idx) => (
            <div key={idx} className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{i.name}</span>
                <Badge variant="outline">{i.followers}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                <div>Nicho: {i.niche}</div>
                <div>Engajamento: {i.engagement}</div>
                <div>Campanhas: {i.campaigns}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}