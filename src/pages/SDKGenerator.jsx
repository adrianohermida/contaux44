import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';

export default function SDKGenerator() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">SDK Generator</h1>
        <p className="text-slate-600">Gerador automático de SDK</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">SDKs Gerados</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Linguagens</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">8</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Downloads</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">45k</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Versão Latest</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">3.4.2</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Code className="h-5 w-5" /> Linguagens Suportadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Python</span>
            <Badge variant="outline">v3.4.2 - 8.2k downloads</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>JavaScript/TypeScript</span>
            <Badge variant="outline">v3.4.2 - 12.1k downloads</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Java</span>
            <Badge variant="outline">v3.4.2 - 6.3k downloads</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span>Go</span>
            <Badge variant="outline">v3.4.2 - 5.4k downloads</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}