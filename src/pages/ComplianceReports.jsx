import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, CheckCircle } from 'lucide-react';

export default function ComplianceReports() {
  const [reports] = useState([
    {
      id: 1,
      name: 'GDPR Compliance Report',
      period: '2026-Q1',
      status: 'completed',
      date: '2026-02-20',
      sections: 5,
      issues: 0
    },
    {
      id: 2,
      name: 'Data Protection Impact Assessment',
      period: '2026-02-20',
      status: 'completed',
      date: '2026-02-19',
      sections: 8,
      issues: 0
    },
    {
      id: 3,
      name: 'Security Audit Report',
      period: '2026-02',
      status: 'completed',
      date: '2026-02-18',
      sections: 6,
      issues: 1
    },
    {
      id: 4,
      name: 'Data Retention Policy Review',
      period: '2026-Q1',
      status: 'scheduled',
      date: '2026-03-15',
      sections: 4,
      issues: null
    }
  ]);

  const [selectedReport, setSelectedReport] = useState(null);

  const standards = [
    { name: 'GDPR', status: 'compliant', lastAudit: '2026-02-20' },
    { name: 'ISO 27001', status: 'compliant', lastAudit: '2025-12-15' },
    { name: 'CCPA', status: 'compliant', lastAudit: '2026-01-30' },
    { name: 'SOC 2', status: 'in_progress', lastAudit: '2025-11-20' }
  ];

  const getStatusBadge = (status) => {
    if (status === 'completed') return <Badge className="bg-green-100 text-green-800">✓ Completo</Badge>;
    if (status === 'scheduled') return <Badge className="bg-blue-100 text-blue-800">◎ Agendado</Badge>;
    return <Badge className="bg-yellow-100 text-yellow-800">⏳ Em Progresso</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Relatórios de Conformidade</h1>
        <p className="text-slate-600 dark:text-slate-400">Gerencie auditorias e relatórios de conformidade</p>
      </div>

      {/* Compliance Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {standards.map(std => (
          <Card key={std.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{std.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                {std.status === 'compliant' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <div className="h-5 w-5 bg-yellow-400 rounded-full"></div>
                )}
                <span className="text-xs text-slate-600">{std.lastAudit}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Gerados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map(report => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="p-4 border rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-grow">
                  <FileText className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-slate-600">Período: {report.period}</p>
                  </div>
                </div>
                {getStatusBadge(report.status)}
              </div>

              <div className="flex justify-between text-xs text-slate-600 mb-3">
                <span>{report.sections} seções</span>
                <span>{report.date}</span>
                {report.issues !== null && (
                  <span className={report.issues === 0 ? 'text-green-600' : 'text-red-600'}>
                    {report.issues === 0 ? '✓ Sem problemas' : `⚠ ${report.issues} problema(s)`}
                  </span>
                )}
              </div>

              {report.status === 'completed' && (
                <Button size="sm" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Report Details */}
      {selectedReport && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-lg">{selectedReport.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-600">Período</p>
                <p>{selectedReport.period}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Data</p>
                <p>{selectedReport.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Seções</p>
                <p>{selectedReport.sections}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="font-medium">Resumo Executivo</p>
              <p className="text-slate-600">
                Relatório completo de conformidade cobrindo todos os requisitos regulatórios aplicáveis.
                Nenhum achado crítico identificado. Documentação e processos em conformidade.
              </p>
            </div>

            <Button className="w-full gap-2">
              <Download className="h-4 w-4" />
              Baixar Relatório Completo
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Compliance Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Checklist de Conformidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Política de Privacidade atualizada</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Data Processing Agreement (DPA) assinado</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Consentimento dos usuários registrado</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Backup automático implementado</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Audit logs ativados</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>✓ Criptografia em repouso e em trânsito</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}