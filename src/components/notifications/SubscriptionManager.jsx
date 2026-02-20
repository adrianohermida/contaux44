import React, { useState, useEffect } from 'react';
import { Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Subscription Manager - Gerencia preferências de inscrição
 */
export default function SubscriptionManager() {
  const [preferences, setPreferences] = useState({
    updates: true,
    messages: true,
    reminders: true,
    promotions: false,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('notificationPreferences');
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, []);

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const preferenceOptions = [
    {
      key: 'updates',
      label: 'Atualizações do Sistema',
      desc: 'Informações sobre melhorias e atualizações',
    },
    {
      key: 'messages',
      label: 'Mensagens',
      desc: 'Novos mensagens de contatos',
    },
    {
      key: 'reminders',
      label: 'Lembretes',
      desc: 'Lembretes de tarefas e eventos',
    },
    {
      key: 'promotions',
      label: 'Promoções',
      desc: 'Ofertas e promoções exclusivas',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Preferências de Notificação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {preferenceOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between p-3 border rounded">
            <div>
              <p className="font-medium text-sm">{option.label}</p>
              <p className="text-xs text-gray-600">{option.desc}</p>
            </div>
            <input
              type="checkbox"
              checked={preferences[option.key]}
              onChange={() => handleToggle(option.key)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        ))}

        <div className="pt-4 border-t">
          <Button onClick={handleSave} className="w-full">
            Salvar Preferências
          </Button>
          {saved && (
            <div className="mt-2 flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle className="w-4 h-4" />
              Preferências salvas
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}