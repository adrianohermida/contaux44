import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

export default function GamificationEngine() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Gamification Engine</h1>
        <p className="text-slate-600">Mecânicas de jogo integradas</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários Engajados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">523</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Conquistas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">42</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Desafios Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Participação</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">64%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" /> Elementos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Badges & Conquistas</span>
            <Badge className="bg-blue-100 text-blue-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Leaderboards</span>
            <Badge className="bg-blue-100 text-blue-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Desafios Diários</span>
            <Badge className="bg-blue-100 text-blue-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Missões Progressivas</span>
            <Badge className="bg-blue-100 text-blue-800">✓ Ativo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}