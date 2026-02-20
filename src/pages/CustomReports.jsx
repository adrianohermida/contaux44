import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Plus, Trash2, Edit2, Calendar } from 'lucide-react';

export default function CustomReports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: 'Blog Performance Monthly',
      type: 'performance',
      metrics: ['views', 'comments', 'conversions'],
      frequency: 'monthly',
      lastGenerated: '2026-02-20',
      recipients: ['admin@example.com']
    },
    {
      id: 2,
      name: 'Traffic Sources Analysis',
      type: 'traffic',
      metrics: ['organic', 'direct', 'referral', 'social'],
      frequency: 'weekly',
      lastGenerated: '2026-02-19',
      recipients: ['team@example.com']
    },
    {
      id: 3,
      name: 'SEO Overview',
      type: 'seo',
      metrics: ['keywords', 'rankings', 'backlinks'],
      frequency: 'weekly',
      lastGenerated: '2026-02-18',
      recipients: ['marketing@example.com']
    }
  ]);

  const [showBuilder, setShowBuilder] = useState(false);

  const getTypeColor = (type) => {
    const colors = {
      performance: 'bg-blue-100 text-blue-800',
      traffic: 'bg-green-100 text-green-800',
      seo: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const deleteReport = (id) => {
    setReports(reports.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios Customizados</h1>
          <p className="text-slate-600 dark:text-slate-400">Crie e gerencie relatórios personalizados</p>
        </div>
        <Button className="gap-2" onClick={() => setShowBuilder(!showBuilder)}>
          <Plus className="w-4 h-4" /> Novo Relatório
        </Button>
      </div>

      {/* Builder */}
      {showBuilder && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle>Construtor de Relatórios</CardTitle>
            <CardDescription>Configure seu relatório personalizado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome do Relatório</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Ex: Relatório de Conversão" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tipo</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Performance</option>
                  <option>Tráfego</option>
                  <option>SEO</option>
                  <option>Engagement</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Frequência</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Semanal</option>
                  <option>Mensal</option>
                  <option>Trimestral</option>
                  <option>Anual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Destinatários</label>
                <input type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="email@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Métricas</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Views', 'Conversões', 'Taxa Bounce', 'Tempo Página', 'CTR', 'Shares'].map(metric => (
                  <label key={metric} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{metric}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowBuilder(false)}>Cancelar</Button>
              <Button>Criar Relatório</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map(report => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{report.name}</h3>
                    <Badge className={getTypeColor(report.type)}>
                      {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                    </Badge>
                    <Badge variant="outline">{report.frequency}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Última Geração</p>
                      <p className="text-sm font-medium">{report.lastGenerated}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Destinatários</p>
                      <p className="text-sm font-medium">{report.recipients.length} email(s)</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Métricas</p>
                      <p className="text-sm font-medium">{report.metrics.length} selecionadas</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {report.metrics.map(metric => (
                      <Badge key={metric} variant="secondary" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <Button size="icon" variant="outline" title="Editar">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" title="Download">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteReport(report.id)} title="Deletar">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Modelos Predefinidos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Blog Performance', 'Conversion Funnel', 'Traffic Sources'].map(template => (
            <div key={template} className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition">
              <p className="font-medium mb-2">{template}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Relatório pré-configurado</p>
              <Button size="sm" variant="outline" className="w-full">Usar</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}