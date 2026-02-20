import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, TestTube } from 'lucide-react';

export default function WebhookManagement() {
  const [webhooks] = useState([
    {
      id: 1,
      event: 'blog.published',
      url: 'https://example.com/webhook/blog',
      status: 'active',
      lastTriggered: '2026-02-20 14:32',
      deliveries: 243,
      failures: 2
    },
    {
      id: 2,
      event: 'invoice.created',
      url: 'https://example.com/webhook/invoice',
      status: 'active',
      lastTriggered: '2026-02-20 13:45',
      deliveries: 156,
      failures: 0
    },
    {
      id: 3,
      event: 'user.registered',
      url: 'https://example.com/webhook/user',
      status: 'inactive',
      lastTriggered: '2026-02-15 10:20',
      deliveries: 45,
      failures: 3
    }
  ]);

  const events = [
    'blog.published',
    'blog.updated',
    'blog.deleted',
    'invoice.created',
    'invoice.paid',
    'user.registered',
    'user.updated',
    'comment.submitted'
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Webhooks</h1>
          <p className="text-slate-600 dark:text-slate-400">Configure notificações em tempo real</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Novo Webhook
        </Button>
      </div>

      {/* Active Webhooks */}
      <Card>
        <CardHeader>
          <CardTitle>Webhooks Ativos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {webhooks.map(webhook => (
            <div key={webhook.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{webhook.event}</p>
                    <Badge className={webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}>
                      {webhook.status === 'active' ? '✓ Ativo' : '○ Inativo'}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 font-mono">{webhook.url}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <TestTube className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs text-slate-600">
                <div>
                  <p className="font-medium">Última entrega</p>
                  <p>{webhook.lastTriggered}</p>
                </div>
                <div>
                  <p className="font-medium">Entregas: {webhook.deliveries}</p>
                  <p className="text-green-600">✓ Sucesso</p>
                </div>
                <div>
                  <p className="font-medium">Falhas: {webhook.failures}</p>
                  {webhook.failures > 0 && <p className="text-red-600">⚠ {webhook.failures} erro(s)</p>}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Available Events */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {events.map(event => (
              <div key={event} className="p-3 border rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition">
                {event}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Webhook Format */}
      <Card>
        <CardHeader>
          <CardTitle>Formato de Payload</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded text-xs overflow-x-auto">
{`{
  "id": "evt_1234567890",
  "event": "blog.published",
  "timestamp": "2026-02-20T14:32:15Z",
  "data": {
    "blog_id": "69927c671f4022dbc14d7272",
    "title": "New Blog Post",
    "status": "published"
  }
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span>✓</span>
            <span>Todos os webhooks são enviados via HTTPS</span>
          </div>
          <div className="flex items-start gap-2">
            <span>✓</span>
            <span>Assinatura HMAC-SHA256 incluída no header X-Signature</span>
          </div>
          <div className="flex items-start gap-2">
            <span>✓</span>
            <span>Retry automático em caso de falha (até 3 tentativas)</span>
          </div>
          <div className="flex items-start gap-2">
            <span>✓</span>
            <span>Timeout de 30 segundos por requisição</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}