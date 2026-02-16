import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useUserAndTenant } from '@/components/hooks/useUserAndTenant';
import ProtectedInternalRoute from '@/components/auth/ProtectedInternalRoute';
import ExportReportButton from '@/components/dashboard/ExportReportButton';
import { FileText, Download, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Reports() {
  const { tenantId } = useUserAndTenant();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      if (!tenantId) return;
      try {
        const data = await base44.entities.Report.filter({ tenant_id: tenantId });
        setReports(data || []);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, [tenantId]);

  const handleDelete = async (id) => {
    if (confirm('Deletar este relatório?')) {
      await base44.entities.Report.delete(id);
      setReports(reports.filter(r => r.id !== id));
    }
  };

  return (
    <ProtectedInternalRoute>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-900">Relatórios</h1>
            <ExportReportButton tenantId={tenantId} />
          </div>

          {loading ? (
            <div className="text-center py-8">Carregando...</div>
          ) : reports.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">Nenhum relatório disponível</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Tipo</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Período</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium">{report.report_name}</td>
                      <td className="px-6 py-4 text-sm capitalize">{report.report_type}</td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(report.period_start).toLocaleDateString('pt-BR')} - {new Date(report.period_end).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          report.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {report.file_url && (
                          <Button variant="ghost" size="sm" onClick={() => window.open(report.file_url)}>
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(report.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          </div>
          </ProtectedInternalRoute>
}