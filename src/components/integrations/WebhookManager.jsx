import React, { useState, useEffect, useCallback } from 'react';
import { Webhook, Plus, Trash2, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

/**
 * Webhook Manager - Gerencia webhooks customizados
 * CRUD, teste, logs
 */
export default function WebhookManager({ workspaceId }) {
  const [webhooks, setWebhooks] = useState([]);
  const [newUrl, setNewUrl] = useState('');
  const [events, setEvents] = useState(['invoice.created', 'payment.received']);
  const [testing, setTesting] = useState(null);
  const [copied, setCopied] = useState(null);

  const addWebhook = useCallback(() => {
    if (!newUrl) return;

    const webhook = {
      id: `webhook-${Date.now()}`,
      url: newUrl,
      events,
      createdAt: new Date().toISOString(),
      active: true,
      lastTriggered: null
    };

    setWebhooks([...webhooks, webhook]);
    setNewUrl('');
  }, [newUrl, events]);

  const removeWebhook = useCallback((id) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
  }, [webhooks]);

  const testWebhook = useCallback(async (id) => {
    setTesting(id);
    try {
      // Simular teste
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTesting(null);
    } catch (err) {
      setTesting(null);
    }
  }, []);

  const copyUrl = useCallback((id, url) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Webhook className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Gerenciar Webhooks</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">URL do Webhook</label>
            <div className="flex gap-2">
              <Input
                placeholder="https://..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
              <Button onClick={addWebhook} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Eventos</label>
            <div className="space-y-2">
              {['invoice.created', 'invoice.paid', 'payment.received', 'client.created'].map(event => (
                <label key={event} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={events.includes(event)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEvents([...events, event]);
                      } else {
                        setEvents(events.filter(ev => ev !== event));
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{event}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {webhooks.map(webhook => (
          <Card key={webhook.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-mono text-sm text-gray-600">{webhook.url}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyUrl(webhook.id, webhook.url)}
                  >
                    {copied === webhook.id ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Eventos: {webhook.events.join(', ')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => testWebhook(webhook.id)}
                  disabled={testing === webhook.id}
                >
                  {testing === webhook.id ? 'Testando...' : 'Testar'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWebhook(webhook.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}