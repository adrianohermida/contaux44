import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

export default function MultiLanguageSupport() {
  const [languages] = useState([
    { code: 'pt-BR', name: 'Português (Brasil)', status: 'active', coverage: '100%' },
    { code: 'en-US', name: 'English (US)', status: 'active', coverage: '100%' },
    { code: 'es-ES', name: 'Español', status: 'active', coverage: '95%' },
    { code: 'fr-FR', name: 'Français', status: 'active', coverage: '92%' },
    { code: 'de-DE', name: 'Deutsch', status: 'active', coverage: '88%' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Suporte Multilíngue</h1>
        <p className="text-slate-600 dark:text-slate-400">Interface em múltiplos idiomas</p>
      </div>

      {/* Language Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Idiomas</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{languages.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Cobertura Média</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">95%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Usuários Ativos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">42</div></CardContent>
        </Card>
      </div>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Idiomas Suportados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {languages.map(lang => (
            <div key={lang.code} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{lang.name}</p>
                  <p className="text-xs text-slate-600">{lang.code}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="w-full bg-slate-200 rounded h-2">
                <div className="bg-green-600 h-2 rounded" style={{ width: lang.coverage }} />
              </div>
              <p className="text-xs text-slate-600 mt-1">{lang.coverage} traduzido</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Translation Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status de Tradução</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Strings traduzidas</span>
            <span className="font-bold">3,847</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Pendentes tradução</span>
            <span className="font-bold">156</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Última atualização</span>
            <span className="font-bold">2026-02-20</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}