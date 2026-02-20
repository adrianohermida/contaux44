import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Upload } from 'lucide-react';

export default function DataExportImport() {
  const [exports] = useState([
    { id: 1, name: 'Blogs Export', format: 'CSV', size: '2.4 MB', date: '2026-02-20 14:32' },
    { id: 2, name: 'Invoices Export', format: 'Excel', size: '5.8 MB', date: '2026-02-20 10:15' },
    { id: 3, name: 'Clients Export', format: 'JSON', size: '1.2 MB', date: '2026-02-19 15:45' }
  ]);

  const formats = ['CSV', 'Excel', 'JSON', 'XML', 'PDF'];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Data Export & Import</h1>
        <p className="text-slate-600">Exporte e importe dados em múltiplos formatos</p>
      </div>

      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exportar Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Selecione o que exportar</label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked /> Blogs
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked /> Invoices
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Clients
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Formato</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg">
              <option>CSV</option>
              <option>Excel</option>
              <option>JSON</option>
            </select>
          </div>

          <Button className="w-full gap-2"><Download className="h-4 w-4" /> Exportar Dados</Button>
        </CardContent>
      </Card>

      {/* Import Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importar Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer">
            <p className="text-sm text-slate-600">Arraste arquivo aqui ou clique para selecionar</p>
            <p className="text-xs text-slate-500 mt-1">CSV, Excel, JSON suportados</p>
          </div>

          <div>
            <label className="text-sm font-medium">Mapeamento de Campos</label>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex gap-2">
                <select className="flex-1 px-2 py-1 border rounded">
                  <option>Nome</option>
                </select>
                <span>=</span>
                <select className="flex-1 px-2 py-1 border rounded">
                  <option>blog_title</option>
                </select>
              </div>
            </div>
          </div>

          <Button className="w-full gap-2"><Upload className="h-4 w-4" /> Importar Dados</Button>
        </CardContent>
      </Card>

      {/* Recent Exports */}
      <Card>
        <CardHeader>
          <CardTitle>Exportações Recentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {exports.map(exp => (
            <div key={exp.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm">{exp.name}</p>
                <p className="text-xs text-slate-600">{exp.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{exp.format}</Badge>
                <span className="text-xs text-slate-500">{exp.size}</span>
                <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Supported Formats */}
      <Card>
        <CardHeader>
          <CardTitle>Formatos Suportados</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-2">
          {formats.map(fmt => (
            <Badge key={fmt} variant="outline" className="justify-center py-2">{fmt}</Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}