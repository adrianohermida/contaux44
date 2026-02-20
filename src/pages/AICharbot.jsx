import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

export default function AICharbot() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Chatbot with NLP</h1>
        <p className="text-slate-600">Chatbot inteligente com processamento natural</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Conversas/dia</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4.2k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Resolução</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">87%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Satisfação</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">4.6/5</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Tempo Resposta</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">0.8s</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><MessageCircle className="h-5 w-5" /> Capacidades</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Compreensão de intenção</span>
            <Badge className="bg-green-100 text-green-800">✓ 94% acurácia</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Contexto multi-turno</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Escalação automática</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Aprendizado contínuo</span>
            <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}