import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Activity, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * Audit Dashboard - Visualiza logs de auditoria
 * Atividades, acessos, mudanças de dados
 */
export default function AuditDashboard({ workspaceId }) {
  const { data: auditLogs, isLoading } = useQuery({
    queryKey: ['audit-logs', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      return base44.entities.AuditLog.filter({
        workspace_id: workspaceId
      });
    },
    enabled: !!workspaceId
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionLabel = (action) => {
    const labels = {
      create: 'Criado',
      update: 'Atualizado',
      delete: 'Deletado',
      view: 'Visualizado',
      export: 'Exportado',
      login: 'Login',
      logout: 'Logout'
    };
    return labels[action] || action;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span>Carregando logs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Logs de Auditoria</h3>
      </div>

      {!auditLogs || auditLogs.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          Nenhum log de auditoria
        </Card>
      ) : (
        <div className="space-y-3">
          {auditLogs.slice(0, 50).map(log => (
            <Card key={log.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(log.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">
                        {getActionLabel(log.action)} - {log.entity_type}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Por: {log.user_email}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                      log.status === 'success' ? 'bg-green-100 text-green-800' :
                      log.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p>IP: {log.ip_address}</p>
                    <p>{new Date(log.timestamp).toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}