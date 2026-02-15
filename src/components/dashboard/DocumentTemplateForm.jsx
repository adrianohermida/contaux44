import React, { useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export default function DocumentTemplateForm({ tenantId, userId, onSuccess, onClose, editingTemplate }) {
  const [formData, setFormData] = useState({
    template_name: editingTemplate?.template_name || '',
    template_type: editingTemplate?.template_type || 'invoice',
    description: editingTemplate?.description || '',
    content: editingTemplate?.content || '',
    header: editingTemplate?.header || '',
    footer: editingTemplate?.footer || '',
    is_default: editingTemplate?.is_default || false,
    status: editingTemplate?.status || 'active'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const templateData = {
        ...formData,
        tenant_id: tenantId,
        created_by: userId,
        last_modified_by: userId
      };
      
      if (editingTemplate?.id) {
        await base44.entities.DocumentTemplate.update(editingTemplate.id, templateData);
      } else {
        await base44.entities.DocumentTemplate.create(templateData);
      }
      
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar modelo:', error);
      alert('Erro ao salvar modelo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [formData, tenantId, userId, editingTemplate, onSuccess]);

  return (
    <Card className="fixed inset-0 z-50 w-full max-w-4xl m-auto bg-white shadow-xl max-h-[90vh] overflow-y-auto">
      <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white">
        <CardTitle>{editingTemplate ? 'Editar Modelo' : 'Novo Modelo de Documento'}</CardTitle>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Modelo</label>
              <Input
                required
                value={formData.template_name}
                onChange={(e) => setFormData({...formData, template_name: e.target.value})}
                placeholder="Ex: Fatura Padrão"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Documento</label>
              <Select value={formData.template_type} onValueChange={(value) => setFormData({...formData, template_type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoice">Fatura</SelectItem>
                  <SelectItem value="quote">Orçamento</SelectItem>
                  <SelectItem value="statement">Extrato</SelectItem>
                  <SelectItem value="contract">Contrato</SelectItem>
                  <SelectItem value="report">Relatório</SelectItem>
                  <SelectItem value="letter">Carta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Descrição do modelo..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cabeçalho (Header)</label>
            <Textarea
              value={formData.header}
              onChange={(e) => setFormData({...formData, header: e.target.value})}
              placeholder="HTML/Markdown para o cabeçalho..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Conteúdo Principal</label>
            <Textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="HTML/Markdown do conteúdo. Use {{variável}} para placeholders..."
              rows={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rodapé (Footer)</label>
            <Textarea
              value={formData.footer}
              onChange={(e) => setFormData({...formData, footer: e.target.value})}
              placeholder="HTML/Markdown para o rodapé..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="archived">Arquivado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_default}
                  onChange={(e) => setFormData({...formData, is_default: e.target.checked})}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-slate-700">Definir como padrão</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? 'Salvando...' : editingTemplate ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}