import React from 'react';
import { Smartphone, Download, Wifi } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PWAInstallPrompt from '@/components/pwa/PWAInstallPrompt';
import OfflineIndicator from '@/components/pwa/OfflineIndicator';
import SyncManager from '@/components/pwa/SyncManager';

export default function PWASetup() {
  const features = [
    { icon: Download, title: 'Instalável', desc: 'Instale como app nativo' },
    { icon: Wifi, title: 'Offline', desc: 'Funciona sem internet' },
    { icon: Smartphone, title: 'Responsivo', desc: 'Funciona em qualquer dispositivo' },
  ];

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <OfflineIndicator />
      <PWAInstallPrompt />

      <div>
        <h1 className="text-3xl font-bold mb-2">Progressive Web App</h1>
        <p className="text-gray-600">Recursos avançados para melhor experiência</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card key={idx} className="text-center">
              <CardContent className="pt-6">
                <Icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <SyncManager />

      <Card>
        <CardHeader>
          <CardTitle>Instalação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><strong>Desktop (Chrome):</strong> Clique no ícone de download na barra de endereço</p>
          <p><strong>Mobile (Chrome):</strong> Menu → Instalar app</p>
          <p><strong>iOS (Safari):</strong> Compartilhar → Adicionar à tela inicial</p>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900">
            ℹ️ O app funciona offline e sincroniza dados automaticamente quando conectado à internet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}