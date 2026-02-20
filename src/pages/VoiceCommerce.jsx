import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic } from 'lucide-react';

export default function VoiceCommerce() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Voice Commerce</h1>
        <p className="text-slate-600">Compras por comando de voz</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Transações Ativadas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">234</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Valor Total</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">R$ 12.4k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Acurácia Reconhecimento</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">96.2%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Taxa Conclusão</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">89%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Mic className="h-5 w-5" /> Plataformas Suportadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Amazon Alexa</span>
            <Badge className="bg-blue-100 text-blue-800">✓ Integrado</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Google Assistant</span>
            <Badge className="bg-blue-100 text-blue-800">✓ Integrado</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Apple Siri</span>
            <Badge className="bg-blue-100 text-blue-800">✓ Integrado</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}