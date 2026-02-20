import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, CheckCircle, AlertCircle } from 'lucide-react';

export default function BulkImportExport() {
  const [imports] = useState([
    { id: 1, file: 'clients_202602.csv', status: 'completed', records: 245, date: '2026-02-19', errors: 0 },
    { id: 2, file: 'invoices_202602.xlsx', status: 'completed', records: 1203, date: '2026-02-18', errors: 2 },
    { id: 3, file: 'contacts_new.csv', status: 'processing', records: 156, date: '2026-02-20', errors: null }
  ]);

  const [exports] = useState([
    { id: 1, entity: 'Invoices', status: 'completed', records: 5234, date: '2026-02-20', size: '2.1 MB' },
    { id: 2, entity: 'Clients', status: 'completed', records: 234, date: '2026-02-19', size: '0.5 MB' },
    { id: 3, entity: 'BlogPosts', status: 'scheduled', records: 127, date: '2026-02-21', size: null }
  ]);

  const getStatusBadge = (status) => {
    if (status === 'completed') return <Badge className="bg-green-100 text-green-800">✓ Completo</Badge>;
    if (status === 'processing') return <Badge className="bg-yellow-100 text-yellow-800">⏳ Processando</Badge>;
    return <Badge className="bg-blue-100 text-blue-800">◎ Agendado</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Importação/Exportação em Lote</h1>
        <p className="text-slate-600 dark:text-slate-400">Importe e exporte dados em CSV, Excel e JSON</p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Importar Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-600">Carregue arquivos CSV, Excel ou JSON</p>
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:bg-white/50 transition">
              <p className="text-sm text-slate-600">Solte arquivos aqui ou clique para selecionar</p>
            </div>
            <div className="text-xs text-slate-600">
              ✓ Até 100MB • ✓ CSV, XLSX, JSON
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Exportar Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>Selecione entidade</option>
              <option>Invoices</option>
              <option>Clients</option>
              <option>BlogPosts</option>
            </select>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>CSV</option>
              <option>Excel</option>
              <option>JSON</option>
            </select>
            <Button className="w-full">Exportar Agora</Button>
          </CardContent>
        </Card>
      </div>

      {/* Import History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Importações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {imports.map(imp => (
            <div key={imp.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{imp.file}</p>
                  <p className="text-sm text-slate-600">{imp.date}</p>
                </div>
                {getStatusBadge(imp.status)}
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Registros: {imp.records}</span>
                {imp.errors !== null && (
                  <span className={imp.errors > 0 ? 'text-red-600' : 'text-green-600'}>
                    {imp.errors === 0 ? '✓ Sem erros' : `⚠ ${imp.errors} erros`}
                  </span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Export History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Exportações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {exports.map(exp => (
            <div key={exp.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{exp.entity}</p>
                  <p className="text-sm text-slate-600">{exp.date}</p>
                </div>
                {getStatusBadge(exp.status)}
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Registros: {exp.records}</span>
                {exp.size && <span>Tamanho: {exp.size}</span>}
              </div>
              {exp.status === 'completed' && (
                <Button size="sm" className="w-full mt-2 gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Format Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Guia de Formatos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="font-medium mb-2">CSV</p>
            <p className="text-slate-600">Separado por vírgula, primeira linha é cabeçalho</p>
          </div>
          <div>
            <p className="font-medium mb-2">Excel</p>
            <p className="text-slate-600">Suportados .xls e .xlsx, primeira aba será processada</p>
          </div>
          <div>
            <p className="font-medium mb-2">JSON</p>
            <p className="text-slate-600">Array de objetos com estrutura consistente</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}