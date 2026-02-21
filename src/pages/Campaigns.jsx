import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Play, Pause } from 'lucide-react';

const STATUS_COLORS = {
  draft: 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300',
  active: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  paused: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
  completed: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
};

export default function CampaignsPage() {
  const { workspaceId, loading } = useMultitenantAuthOptimized('internal');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['campaigns', workspaceId],
    queryFn: async () => {
      const response = await base44.asServiceRole.entities.Campaign.filter({
        workspace_id: workspaceId
      });
      return response || [];
    },
    enabled: !!workspaceId,
    staleTime: 1000 * 60 * 5
  });

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Carregando campanhas...</p>
        </div>
      </div>
    );
  }

  const filteredCampaigns = filterStatus === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Campanhas</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gerencie suas campanhas de email</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Campanha
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'draft', 'active', 'paused', 'completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1 rounded text-sm ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="grid gap-4">
        {filteredCampaigns.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-slate-500 dark:text-slate-400">
              Nenhuma campanha encontrada
            </CardContent>
          </Card>
        ) : (
          filteredCampaigns.map(campaign => {
            const openRate = campaign.sent_count > 0 
              ? ((campaign.open_count / campaign.sent_count) * 100).toFixed(1) 
              : 0;
            const clickRate = campaign.sent_count > 0 
              ? ((campaign.click_count / campaign.sent_count) * 100).toFixed(1) 
              : 0;

            return (
              <Card key={campaign.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          {campaign.name}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded ${STATUS_COLORS[campaign.status]}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {campaign.description || 'Sem descrição'}
                      </p>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Enviados</p>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {campaign.sent_count || 0}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Abertos</p>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {openRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Cliques</p>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {clickRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Conversões</p>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {campaign.conversion_count || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                        {campaign.status === 'active' ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}