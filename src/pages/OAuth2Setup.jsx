import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Copy } from 'lucide-react';

export default function OAuth2Setup() {
  const [providers] = useState([
    {
      name: 'Google',
      status: 'connected',
      scopes: ['profile', 'email', 'calendar'],
      lastAuth: '2026-02-20',
      icon: '🔵'
    },
    {
      name: 'GitHub',
      status: 'connected',
      scopes: ['read:user', 'repo'],
      lastAuth: '2026-02-19',
      icon: '⚫'
    },
    {
      name: 'Microsoft',
      status: 'pending',
      scopes: ['User.Read', 'Calendars.Read'],
      lastAuth: null,
      icon: '🔷'
    },
    {
      name: 'LinkedIn',
      status: 'disconnected',
      scopes: ['profile', 'email'],
      lastAuth: null,
      icon: '🔵'
    }
  ]);

  const [showDocs, setShowDocs] = useState(false);

  const getStatusBadge = (status) => {
    if (status === 'connected') return <Badge className="bg-green-100 text-green-800">✓ Conectado</Badge>;
    if (status === 'pending') return <Badge className="bg-yellow-100 text-yellow-800">⏳ Pendente</Badge>;
    return <Badge className="bg-slate-100 text-slate-800">○ Desconectado</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Integração OAuth 2.0</h1>
        <p className="text-slate-600 dark:text-slate-400">Conecte com provedores de identidade externa</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conectados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Disponível</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
      </div>

      {/* Providers */}
      <Card>
        <CardHeader>
          <CardTitle>Provedores de Identidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {providers.map(provider => (
            <div key={provider.name} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{provider.icon}</span>
                  <div>
                    <p className="font-medium">{provider.name}</p>
                    {provider.lastAuth && (
                      <p className="text-xs text-slate-600">Último acesso: {provider.lastAuth}</p>
                    )}
                  </div>
                </div>
                {getStatusBadge(provider.status)}
              </div>

              <div className="mb-3">
                <p className="text-xs font-medium text-slate-600 mb-1">Escopos</p>
                <div className="flex flex-wrap gap-1">
                  {provider.scopes.map(scope => (
                    <Badge key={scope} variant="secondary" className="text-xs">
                      {scope}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {provider.status === 'connected' ? (
                  <>
                    <Button size="sm" variant="outline" className="flex-1">
                      Revogar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Atualizar Escopos
                    </Button>
                  </>
                ) : provider.status === 'pending' ? (
                  <Button size="sm" className="flex-1">
                    Completar Configuração
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1">
                    Conectar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuração Técnica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Callback URL</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value="https://app.example.com/auth/callback"
                readOnly
                className="flex-1 px-3 py-2 border rounded-lg bg-slate-50"
              />
              <Button size="sm" variant="outline">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Client ID</label>
            <div className="flex gap-2 mt-1">
              <input
                type="password"
                value="•••••••••••••••••••"
                readOnly
                className="flex-1 px-3 py-2 border rounded-lg bg-slate-50"
              />
              <Button size="sm" variant="outline">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">JWKS Endpoint</label>
            <p className="text-sm text-slate-600 mt-1">
              https://app.example.com/.well-known/jwks.json
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Documentação</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setShowDocs(!showDocs)}
          >
            {showDocs ? '▼' : '▶'} OAuth 2.0 Implementation Guide
          </Button>

          {showDocs && (
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm space-y-3">
              <div>
                <p className="font-medium mb-1">Fluxo Autorização</p>
                <p className="text-slate-600">Implementado usando Authorization Code Flow com PKCE</p>
              </div>
              <div>
                <p className="font-medium mb-1">Segurança</p>
                <p className="text-slate-600">HTTPS obrigatório, tokens criptografados, refresh tokens rotacionados</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}