import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Download, Smartphone } from 'lucide-react';

export default function PWASetupPage() {
  const [pwaStatus] = useState({
    manifest: true,
    serviceWorker: true,
    https: true,
    icon: true,
    installable: true
  });

  const [installPrompt, setInstallPrompt] = useState(false);

  const checkmarks = Object.values(pwaStatus).filter(v => v).length;
  const total = Object.keys(pwaStatus).length;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Aplicativo Web Progressivo (PWA)</h1>
        <p className="text-slate-600 dark:text-slate-400">Instale como aplicativo nativo em seu dispositivo</p>
      </div>

      {/* Installation */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Instalar Aplicativo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-600">
            Instale esta aplicação em seu dispositivo para melhor experiência de uso
          </p>
          <Button className="w-full gap-2">
            <Download className="h-4 w-4" />
            Instalar Agora
          </Button>
          <p className="text-xs text-slate-600">
            📱 iOS: Abra em Safari e use "Adicionar à Tela Inicial"<br/>
            🤖 Android: Use o menu do navegador → "Instalar aplicativo"
          </p>
        </CardContent>
      </Card>

      {/* PWA Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Checklist PWA</CardTitle>
          <CardDescription>{checkmarks} de {total} requisitos atendidos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${(checkmarks / total) * 100}%` }}
            />
          </div>

          <div className="space-y-2">
            {Object.entries(pwaStatus).map(([key, status]) => (
              <div key={key} className="flex items-center gap-3 p-3 border rounded-lg">
                {status ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                )}
                <span className="font-medium capitalize flex-1">{key.replace(/([A-Z])/g, ' $1')}</span>
                <Badge className={status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {status ? '✓' : '○'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos PWA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border rounded-lg">
            <p className="font-medium mb-1">Offline</p>
            <p className="text-sm text-slate-600">Use a aplicação sem internet com dados em cache</p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="font-medium mb-1">Instalação</p>
            <p className="text-sm text-slate-600">Instale como um aplicativo nativo</p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="font-medium mb-1">Notificações Push</p>
            <p className="text-sm text-slate-600">Receba notificações mesmo com app fechado</p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="font-medium mb-1">Sincronização em Background</p>
            <p className="text-sm text-slate-600">Sincronize dados quando conexão voltar</p>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuração</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome da Aplicação</label>
            <input
              type="text"
              value="Contaux"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Descrição Curta</label>
            <input
              type="text"
              value="Sistema de Gestão Jurídica"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Cor de Tema</label>
            <input type="color" defaultValue="#3b82f6" className="w-full mt-1 h-10 rounded-lg" />
          </div>

          <div>
            <label className="text-sm font-medium">Cor de Fundo</label>
            <input type="color" defaultValue="#ffffff" className="w-full mt-1 h-10 rounded-lg" />
          </div>

          <Button className="w-full">Salvar Configurações</Button>
        </CardContent>
      </Card>

      {/* Manifest */}
      <Card>
        <CardHeader>
          <CardTitle>Manifest.json</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded text-xs overflow-x-auto">
{`{
  "name": "Contaux",
  "short_name": "Contaux",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3b82f6",
  "background_color": "#ffffff",
  "icons": [...]
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}