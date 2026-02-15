import React, { useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export default function ReportForm({ tenantId, userId, onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    report_name: '',
    report_type: 'financial',
    period_start: '',
    period_end: '',
    data_source: 'all',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const reportData = {
        ...formData,
        tenant_id: tenantId,
        status: 'draft',
        generated_by: userId
      };
      
      await base44.entities.Report.create(reportData);
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar relatório:', error);
      alert('Erro ao criar relatório. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [formData, tenantId, userId, onSuccess]);

  return (
    <Card className="fixed inset-0 z-50 w-full max-w-2xl m-auto bg-white shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Novo Relatório</CardTitle>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Relatório</label>
            <Input
              required
              value={formData.report_name}
              onChange={(e) => setFormData({...formData, report_name: e.target.value})}
              placeholder="Ex: Relatório Financeiro Janeiro 2025"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
              <Select value={formData.report_type} onValueChange={(value) => setFormData({...formData, report_type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financeiro</SelectItem>
                  <SelectItem value="operational">Operacional</SelectItem>
                  <SelectItem value="compliance">Conformidade</SelectItem>
                  <SelectItem value="custom">Customizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fonte de Dados</label>
              <Select value={formData.data_source} onValueChange={(value) => setFormData({...formData, data_source: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="invoice">Faturas</SelectItem>
                  <SelectItem value="payment">Pagamentos</SelectItem>
                  <SelectItem value="account">Contas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data Inicial</label>
              <Input
                type="date"
                required
                value={formData.period_start}
                onChange={(e) => setFormData({...formData, period_start: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data Final</label>
              <Input
                type="date"
                required
                value={formData.period_end}
                onChange={(e) => setFormData({...formData, period_end: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notas (opcional)</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Observações adicionais sobre o relatório..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? 'Criando...' : 'Criar Relatório'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}