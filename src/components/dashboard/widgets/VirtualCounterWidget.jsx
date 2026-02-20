import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { MessageCircle, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMultitenantAuthOptimized } from '@/components/auth/useMultitenantAuthOptimized';
import { createPageUrl } from '@/utils';

export default function VirtualCounterWidget() {
  const { workspaceId } = useMultitenantAuthOptimized('internal');
  const [stats, setStats] = useState({ active: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workspaceId) return;

    const loadStats = async () => {
      try {
        const conversations = await base44.entities.VirtualCounterConversation.filter({
          workspace_id: workspaceId
        });
        
        const active = conversations.filter(c => c.status === 'active').length;
        const unread = conversations.reduce((sum, c) => sum + (c.unread_count || 0), 0);
        
        setStats({ active, unread });
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar stats:', error);
        setLoading(false);
      }
    };

    loadStats();

    // Subscribe para atualizações
    const unsubscribe = base44.entities.VirtualCounterConversation.subscribe(() => {
      loadStats();
    });

    return unsubscribe;
  }, [workspaceId]);

  const handleNewConversation = async () => {
    try {
      await base44.entities.VirtualCounterConversation.create({
        workspace_id: workspaceId,
        status: 'active',
        started_at: new Date().toISOString()
      });
      window.location.href = createPageUrl('VirtualCounter');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow p-6 border border-purple-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-3 rounded-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Balcão Virtual</h3>
            <p className="text-sm text-slate-600">Atendimento com IA</p>
          </div>
        </div>
        {stats.unread > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            {stats.unread}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-white rounded p-3">
          <p className="text-xs text-slate-600">Conversas Ativas</p>
          <p className="text-xl font-bold text-purple-600 mt-1">{stats.active}</p>
        </div>
        <div className="bg-white rounded p-3">
          <p className="text-xs text-slate-600">Mensagens</p>
          <p className="text-xl font-bold text-blue-600 mt-1">{stats.unread}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleNewConversation}
          size="sm"
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Nova
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <a href={createPageUrl('VirtualCounter')}>
            Ir para
            <ArrowRight className="w-3 h-3 ml-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}