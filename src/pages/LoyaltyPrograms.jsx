import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Users, Zap } from 'lucide-react';

export default function LoyaltyProgramsPage() {
  const { workspaceId, loading } = useMultitenantAuthOptimized('internal');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['loyalty-programs', workspaceId],
    queryFn: async () => {
      const response = await base44.asServiceRole.entities.LoyaltyProgram.filter({
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
          <p className="text-slate-600 dark:text-slate-400">Carregando programas...</p>
        </div>
      </div>
    );
  }

  const filteredPrograms = filterStatus === 'all'
    ? programs
    : programs.filter(p => p.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Programas de Fidelidade</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Gerencie seus programas de pontos e recompensas</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Programa
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'active', 'inactive', 'archived'].map(status => (
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

      {/* Programs List */}
      <div className="grid gap-4">
        {filteredPrograms.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-slate-500 dark:text-slate-400">
              Nenhum programa encontrado
            </CardContent>
          </Card>
        ) : (
          filteredPrograms.map(program => (
            <Card key={program.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        {program.name}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        program.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          : 'bg-slate-100 dark:bg-slate-900/20 text-slate-700 dark:text-slate-400'
                      }`}>
                        {program.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {program.description || 'Sem descrição'}
                    </p>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <Users className="w-3 h-3" /> Membros
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {program.member_count || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> Emitidos
                        </p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {program.total_points_issued || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Resgatados</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {program.total_points_redeemed || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Taxa</p>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {program.points_per_dollar}x
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}