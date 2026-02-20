import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Upload, Calendar, HardDrive, AlertCircle, CheckCircle } from 'lucide-react';

export default function DataBackup() {
  const [backups] = useState([
    {
      id: 1,
      date: '2026-02-20',
      time: '14:30',
      size: '2.3 GB',
      type: 'Automático',
      status: 'success',
      entities: 1245,
      files: 3456
    },
    {
      id: 2,
      date: '2026-02-19',
      time: '14:30',
      size: '2.2 GB',
      type: 'Automático',
      status: 'success',
      entities: 1203,
      files: 3412
    },
    {
      id: 3,
      date: '2026-02-18',
      time: '14:30',
      size: '2.1 GB',
      type: 'Automático',
      status: 'success',
      entities: 1189,
      files: 3398
    },
    {
      id: 4,
      date: '2026-02-17',
      time: '10:15',
      size: '2.0 GB',
      type: 'Manual',
      status: 'success',
      entities: 1156,
      files: 3367
    }
  ]);

  const [autoBackup, setAutoBackup] = useState(true);
  const [showRestore, setShowRestore] = useState(false);

  const getStatusBadge = (status) => {
    if (status === 'success') return <Badge className="bg-green-100 text-green-800">✓ Completo</Badge>;
    return <Badge className="bg-yellow-100 text-yellow-800">⏳ Em progresso</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Backup e Recuperação</h1>
        <p className="text-slate-600 dark:text-slate-400">Proteja seus dados com backups automáticos e manuais</p>
      </div>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Backup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Backup Automático Diário</p>
              <p className="text-sm text-slate-600">Executado às 14:30 UTC todos os dias</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoBackup}
                onChange={(e) => setAutoBackup(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">{autoBackup ? 'Ativado' : 'Desativado'}</span>
            </label>
          </div>

          <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <p className="text-sm flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              Retenção: 30 dias de backups automáticos. Upgrade para manter 90 dias.
            </p>
          </div>

          <Button className="w-full gap-2">
            <Upload className="h-4 w-4" />
            Criar Backup Manual Agora
          </Button>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Histórico de Backups
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {backups.map(backup => (
            <div key={backup.id} className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium">{backup.date} às {backup.time}</p>
                    <p className="text-sm text-slate-600">{backup.type} • {backup.size}</p>
                  </div>
                </div>
                {getStatusBadge(backup.status)}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                <div>
                  <p className="text-slate-600">Entidades</p>
                  <p className="font-medium">{backup.entities.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-slate-600">Arquivos</p>
                  <p className="font-medium">{backup.files.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-slate-600">Tamanho</p>
                  <p className="font-medium">{backup.size}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => setShowRestore(true)}>
                  Restaurar
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Restore Dialog */}
      {showRestore && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-900 dark:text-yellow-200">
              <AlertCircle className="h-5 w-5" />
              Restaurar Backup
            </CardTitle>
            <CardDescription>Selecione o backup para restaurar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-yellow-200 bg-white dark:bg-slate-900 rounded-lg">
              <p className="text-sm font-medium mb-2">⚠️ Aviso Importante</p>
              <p className="text-sm text-slate-600">
                Restaurar um backup substituirá todos os dados atuais pelo estado do backup selecionado. 
                Recomendamos criar um backup manual antes de prosseguir.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Selecionar Backup</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                {backups.map(b => (
                  <option key={b.id}>
                    {b.date} {b.time} - {b.size} ({b.entities} entidades)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowRestore(false)}>Cancelar</Button>
              <Button className="bg-yellow-600 hover:bg-yellow-700">Restaurar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disaster Recovery Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Plano de Recuperação de Desastres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium">Backups Geográficos</p>
                <p className="text-slate-600">Dados replicados em múltiplas regiões</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium">RTO de 1 hora</p>
                <p className="text-slate-600">Tempo de Recuperação Objetivo: até 1 hora</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium">RPO de 1 dia</p>
                <p className="text-slate-600">Ponto de Recuperação Objetivo: máximo 24 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}