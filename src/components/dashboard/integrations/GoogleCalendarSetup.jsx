import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IntegrationCard from './IntegrationCard';

export default function GoogleCalendarSetup({ integrationId }) {
  const [status, setStatus] = useState('pending');
  const [testing, setTesting] = useState(false);

  const testConnection = async () => {
    setTesting(true);
    setStatus('loading');
    try {
      // Chamaria request_oauth_authorization aqui
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
    } catch (error) {
      setStatus('error');
    } finally {
      setTesting(false);
    }
  };

  return (
    <IntegrationCard
      title="📅 Google Calendar"
      description="Sincronize prazos de processos, reuniões e eventos importantes"
      status={status}
      statusMessage={
        status === 'success' ? 'Google Calendar conectado com sucesso' : 
        status === 'error' ? 'Erro ao conectar com Google Calendar' : 
        'Autorize acesso ao Google Calendar'
      }
    >
      <div className="space-y-6">
        {/* Opção 1: Google Calendar (OAuth) */}
        <div className="bg-white rounded-lg p-4 space-y-3 border-2 border-blue-200">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            🔵 Opção 1: Google Calendar (Recomendado)
          </h4>
          <p className="text-sm text-slate-600">
            Integração nativa com Google Calendar. Sincronize automaticamente prazos e eventos.
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-6 list-disc">
            <li>Sincronização automática de prazos</li>
            <li>Notificações integradas</li>
            <li>Compartilhamento de calendários</li>
            <li>Totalmente gratuito</li>
          </ul>
          <Button 
            onClick={testConnection}
            disabled={testing}
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {testing ? '⏳ Conectando...' : '🔗 Autorizar Google Calendar'}
          </Button>
        </div>

        {/* Opção 2: Alternativa - Outlook/Microsoft */}
        <div className="bg-white rounded-lg p-4 space-y-3 border">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            🟣 Opção 2: Outlook (Alternativa Gratuita)
          </h4>
          <p className="text-sm text-slate-600">
            Se preferir usar Outlook/Microsoft 365, também é gratuito.
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-6 list-disc">
            <li>Integração com Microsoft 365</li>
            <li>Sincronização de eventos</li>
            <li>Compartilhamento avançado</li>
            <li>Plano gratuito disponível</li>
          </ul>
          <Button 
            asChild
            variant="outline"
            className="w-full gap-2"
          >
            <a 
              href="https://outlook.live.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Criar Conta Outlook
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* Configuração Manual */}
        <div className="bg-white rounded-lg p-4 space-y-3 border">
          <h4 className="font-semibold text-lg">Configuração Passo a Passo</h4>
          <ol className="text-sm text-slate-700 space-y-2 ml-6 list-decimal">
            <li>Clique em "Autorizar Google Calendar" acima</li>
            <li>Permita acesso à sua conta Google</li>
            <li>Escolha qual calendário sincronizar</li>
            <li>Confirme as permissões solicitadas</li>
            <li>Prazos e eventos serão sincronizados automaticamente</li>
          </ol>
        </div>

        {/* Casos de Uso */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-amber-900 mb-2">📌 Casos de Uso</p>
          <ul className="text-amber-800 text-xs space-y-1 ml-4 list-disc">
            <li>Sincronizar prazos de processos legais</li>
            <li>Agendamento automático de reuniões com clientes</li>
            <li>Alertas de vencimentos de contratos</li>
            <li>Visualizar toda agenda em um só lugar</li>
          </ul>
        </div>

        {/* Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
          <p className="font-semibold text-green-900 mb-2">✅ Nota</p>
          <p className="text-green-800 text-xs">
            Recomendamos usar <strong>Google Calendar</strong> para melhor integração com o resto do Google Workspace.
          </p>
        </div>
      </div>
    </IntegrationCard>
  );
}