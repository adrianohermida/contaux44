import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Plus, Eye, Share2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ReportForm from '../components/dashboard/ReportForm';

export default function AdvancedReports() {
  const { tenantId, user } = useUserAndTenant();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const loadReports = useCallback(async () => {
    if (!tenantId) return;
    
    try {
      const data = await base44.entities.Report.filter(
        { tenant_id: tenantId },
        '-generated_at',
        100
      );
      setReports(data);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'all' || report.report_type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const handleGenerateReport = () => {
    setShowForm(true);
  };

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Tem certeza que deseja excluir este relatório?')) {
      try {
        await base44.entities.Report.delete(reportId);
        loadReports();
      } catch (error) {
        console.error('Erro ao deletar relatório:', error);
      }
    }
  };

  const handleDownloadReport = async (report) => {
    if (!report.file_url) {
      alert('Relatório ainda não foi gerado');
      return;
    }
    window.open(report.file_url, '_blank');
  };

  const handleShareReport = async (report) => {
    const shareUrl = `${window.location.origin}/reports/${report.id}`;
    const emailList = report.shared_with?.join(', ') || 'Ninguém';
    alert(`Relatório compartilhado com:\n${emailList}\n\nURL: ${shareUrl}`);
  };

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    generated: 'bg-blue-100 text-blue-800',
    reviewed: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-slate-100 text-slate-800'
  };

  return (
    <ProtectedInternalRoute>
      {showForm && (
        <ReportForm
          tenantId={tenantId}
          userId={user?.email}
          onSuccess={() => {
            setShowForm(false);
            loadReports();
          }}
          onClose={() => setShowForm(false)}
        />
      )}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Relatórios Avançados</h1>
              <p className="text-slate-600 mt-1">Geração e gerenciamento de relatórios completos</p>
            </div>
            <Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Relatório
            </Button>
          </div>

          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Tipo de Relatório" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    <SelectItem value="financial">Financeiro</SelectItem>
                    <SelectItem value="operational">Operacional</SelectItem>
                    <SelectItem value="compliance">Conformidade</SelectItem>
                    <SelectItem value="custom">Customizado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="generated">Gerado</SelectItem>
                    <SelectItem value="reviewed">Revisado</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Relatórios */}
          <Card>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-8">Carregando relatórios...</div>
              ) : filteredReports.length === 0 ? (
                <div className="text-center py-8 text-slate-600">Nenhum relatório encontrado</div>
              ) : (
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <div key={report.id} className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-blue-500 mt-1" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{report.report_name}</h3>
                            <p className="text-sm text-slate-600 mt-1">
                              Período: {format(new Date(report.period_start), 'dd/MM/yyyy', { locale: ptBR })} até {format(new Date(report.period_end), 'dd/MM/yyyy', { locale: ptBR })}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className={`text-xs px-2 py-1 rounded font-medium ${statusColors[report.status]}`}>
                                {report.status.toUpperCase()}
                              </span>
                              <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded font-medium">
                                {report.report_type}
                              </span>
                            </div>
                            {report.generated_at && (
                              <p className="text-xs text-slate-500 mt-2">
                                Gerado em {format(new Date(report.generated_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })} por {report.generated_by}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                           {report.file_url && (
                             <Button 
                               variant="outline" 
                               size="sm"
                               onClick={() => handleDownloadReport(report)}
                               title="Download"
                             >
                               <Download className="w-4 h-4" />
                             </Button>
                           )}
                           <Button 
                             variant="outline" 
                             size="sm"
                             title="Visualizar"
                           >
                             <Eye className="w-4 h-4" />
                           </Button>
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => handleShareReport(report)}
                             title="Compartilhar"
                           >
                             <Share2 className="w-4 h-4" />
                           </Button>
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => handleDeleteReport(report.id)}
                             className="text-red-600 hover:text-red-700"
                             title="Excluir"
                           >
                             <Trash2 className="w-4 h-4" />
                           </Button>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
  );
}