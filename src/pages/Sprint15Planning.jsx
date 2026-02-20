import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

export default function Sprint15Planning() {
  const features = [
    { id: 1, name: 'Social Media Integration', category: 'Marketing', effort: 'high' },
    { id: 2, name: 'Influencer Collaboration Tool', category: 'Marketing', effort: 'high' },
    { id: 3, name: 'Video Content Management', category: 'Content', effort: 'medium' },
    { id: 4, name: 'Live Streaming Platform', category: 'Content', effort: 'high' },
    { id: 5, name: 'Referral Program Manager', category: 'Growth', effort: 'medium' },
    { id: 6, name: 'Loyalty Rewards System', category: 'Engagement', effort: 'medium' },
    { id: 7, name: 'Gamification Engine', category: 'Engagement', effort: 'high' },
    { id: 8, name: 'Advanced Search with AI', category: 'Search', effort: 'high' },
    { id: 9, name: 'Recommendation Engine', category: 'AI', effort: 'high' },
    { id: 10, name: 'Chatbot with NLP', category: 'AI', effort: 'high' },
    { id: 11, name: 'Voice Commerce', category: 'AI', effort: 'medium' },
    { id: 12, name: 'Mobile App Integration', category: 'Mobile', effort: 'high' },
    { id: 13, name: 'Progressive Web App', category: 'Mobile', effort: 'medium' },
    { id: 14, name: 'Offline Sync Manager', category: 'Sync', effort: 'medium' },
    { id: 15, name: 'Push Notifications Pro', category: 'Notifications', effort: 'medium' }
  ];

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sprint 15 - Próximas Funcionalidades</h1>
        <p className="text-slate-600">Marketing Digital & Engagement (15 features)</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Features</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">15</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">High Priority</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">8</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Completadas</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-blue-600">0</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Duração Est.</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">5-6 sem</div></CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {categories.map(cat => {
          const catFeatures = features.filter(f => f.category === cat);
          return (
            <Card key={cat}>
              <CardHeader>
                <CardTitle className="text-lg">{cat}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {catFeatures.map(f => (
                  <div key={f.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900">
                    <div className="flex items-center gap-3 flex-1">
                      <Circle className="h-5 w-5 text-slate-400" />
                      <span className="font-medium">{f.name}</span>
                    </div>
                    <Badge className={f.effort === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                      {f.effort}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="text-blue-800">Sprint 15 Pronto para Iniciar 🚀</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-1">
          <p>✓ 15 features estratégicas de marketing e engagement</p>
          <p>✓ Foco em Social Media, AI e Mobile</p>
          <p>✓ Cronograma de 5-6 semanas</p>
          <p>✓ Pronto para iniciar desenvolvimento</p>
        </CardContent>
      </Card>
    </div>
  );
}