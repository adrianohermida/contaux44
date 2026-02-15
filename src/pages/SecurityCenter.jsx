import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function SecurityCenter() {
  const { tenantId, user } = useUserAndTenant();
  const [securityLogs, setSecurityLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSecurityLogs = useCallback(async () => {
    if (!tenantId) return;
    
    try {
      const data = await base44.entities.SecurityLog.filter(
        { tenant_id: tenantId },
        '-timestamp',
        50
      );
      setSecurityLogs(data);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadSecurityLogs();
  }, [loadSecurityLogs]);

  const handleResolveIssue = useCallback(async (logId) => {
    if (!user) return;
    
    try {
      await base44.entities.SecurityLog.update(logId, {
        resolved: true,
        resolved_by: user.email,
        resolved_at: new Date().toISOString()
      });
      loadSecurityLogs();
    } catch (error) {
      console.error('Erro ao resolver problema de segurança:', error);
    }
  }, [user, loadSecurityLogs]);

  const getSeverityIcon = (severity) => {
    const icons = {
      low: <AlertCircle className="w-4 h-4 text-blue-500" />,
      medium: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
      high: <AlertTriangle className="w-4 h-4 text-orange-500" />,
      critical: <AlertCircle className="w-4 h-4 text-red-500" />
    };
    return icons[severity] || icons.medium;
  };

  const unresolvedIssues = securityLogs.filter(log => !log.resolved);
  const criticalCount = unresolvedIssues.filter(log => log.severity === 'critical').length;

  if (!tenantId) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="text-center py-8">Carregando...</div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Centro de Segurança</h1>
            <p className="text-slate-600 mt-1">Monitoramento de eventos de segurança e auditoria</p>
          </div>

          {/* Resumo de Segurança */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Problemas Críticos</p>
                    <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Problemas Não Resolvidos</p>
                    <p className="text-2xl font-bold text-yellow-600">{unresolvedIssues.length}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Eventos Resolvidos</p>
                    <p className="text-2xl font-bold text-green-600">{securityLogs.filter(log => log.resolved).length}</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Eventos de Segurança */}
          <Card>
            <CardHeader>
              <CardTitle>Eventos Recentes de Segurança</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Carregando eventos...</div>
              ) : securityLogs.length === 0 ? (
                <div className="text-center py-8 text-slate-600">Nenhum evento de segurança registrado</div>
              ) : (
                <div className="space-y-4">
                  {securityLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-4 rounded-lg border ${
                        log.resolved ? 'bg-slate-50 border-slate-200' : 'bg-slate-50 border-yellow-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-1">{getSeverityIcon(log.severity)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-slate-900">{log.event_type}</h3>
                              <span className={`text-xs px-2 py-1 rounded font-medium ${
                                log.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                log.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                                log.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {log.severity.toUpperCase()}
                              </span>
                              {log.resolved && (
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded font-medium">
                                  Resolvido
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{log.description}</p>
                            <div className="text-xs text-slate-500 mt-2 space-y-1">
                              <p>Usuário: {log.user_email}</p>
                              <p>IP: {log.ip_address}</p>
                              <p>Data: {format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })}</p>
                              {log.resolved && (
                                <p>Resolvido por: {log.resolved_by} em {format(new Date(log.resolved_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        {!log.resolved && (
                          <Button
                            onClick={() => handleResolveIssue(log.id)}
                            variant="outline"
                            size="sm"
                            className="ml-4"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Resolver
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}