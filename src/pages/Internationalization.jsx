import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, CheckCircle } from 'lucide-react';

export default function Internationalization() {
  const [languages] = useState([
    { code: 'pt-BR', name: 'Português (Brasil)', native: 'Português', coverage: 100, status: 'active' },
    { code: 'en-US', name: 'English (United States)', native: 'English', coverage: 95, status: 'active' },
    { code: 'es-ES', name: 'Español (España)', native: 'Español', coverage: 78, status: 'active' },
    { code: 'fr-FR', name: 'Français (France)', native: 'Français', coverage: 65, status: 'pending' },
    { code: 'de-DE', name: 'Deutsch (Deutschland)', native: 'Deutsch', coverage: 42, status: 'in_progress' }
  ]);

  const [currentLang, setCurrentLang] = useState('pt-BR');

  const getStatusBadge = (status) => {
    if (status === 'active') return <Badge className="bg-green-100 text-green-800">✓ Ativo</Badge>;
    if (status === 'in_progress') return <Badge className="bg-yellow-100 text-yellow-800">⏳ Em Progresso</Badge>;
    return <Badge className="bg-slate-100 text-slate-800">○ Pendente</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Internacionalização (i18n)</h1>
        <p className="text-slate-600 dark:text-slate-400">Suporte a múltiplos idiomas e regiões</p>
      </div>

      {/* Language Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Idioma Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={currentLang}
            onChange={(e) => setCurrentLang(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-slate-600 mt-2">
            Altere o idioma para traduzir toda a interface do aplicativo
          </p>
        </CardContent>
      </Card>

      {/* Languages Status */}
      <Card>
        <CardHeader>
          <CardTitle>Idiomas Disponíveis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {languages.map(lang => (
            <div key={lang.code} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium">{lang.name}</p>
                  <p className="text-xs text-slate-600">{lang.native}</p>
                </div>
                {getStatusBadge(lang.status)}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Cobertura de Tradução</span>
                  <span className="font-medium">{lang.coverage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      lang.coverage === 100 ? 'bg-green-600' :
                      lang.coverage >= 80 ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${lang.coverage}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1">
                  Revisar
                </Button>
                {lang.status !== 'active' && (
                  <Button size="sm" className="flex-1">
                    Ativar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Translation Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciador de Traduções</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Buscar String</label>
            <input
              type="text"
              placeholder="Ex: welcome.title"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="space-y-2 text-sm">
            <div className="p-3 border rounded-lg">
              <p className="font-mono text-xs text-slate-600 mb-2">welcome.title</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium">Português:</p>
                  <p>Bem-vindo ao Contaux</p>
                </div>
                <div>
                  <p className="text-xs font-medium">English:</p>
                  <p>Welcome to Contaux</p>
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full">
            + Adicionar Nova String
          </Button>
        </CardContent>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Regionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border rounded-lg">
            <p className="text-sm font-medium mb-2">Formato de Data</p>
            <select className="w-full px-3 py-2 border rounded-lg text-sm">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-sm font-medium mb-2">Formato de Hora</p>
            <select className="w-full px-3 py-2 border rounded-lg text-sm">
              <option>24 horas</option>
              <option>12 horas (AM/PM)</option>
            </select>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-sm font-medium mb-2">Moeda Padrão</p>
            <select className="w-full px-3 py-2 border rounded-lg text-sm">
              <option>BRL - Real Brasileiro</option>
              <option>USD - Dólar Americano</option>
              <option>EUR - Euro</option>
            </select>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-sm font-medium mb-2">Direção do Texto</p>
            <select className="w-full px-3 py-2 border rounded-lg text-sm">
              <option>Esquerda para Direita (LTR)</option>
              <option>Direita para Esquerda (RTL)</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}