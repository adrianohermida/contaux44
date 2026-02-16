import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import { useUserAndTenant } from '../components/hooks/useUserAndTenant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Plus, Edit2, Trash2, Copy } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DocumentTemplateForm from '../components/dashboard/DocumentTemplateForm';

export default function DocumentManagement() {
  const { tenantId, user } = useUserAndTenant();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const loadTemplates = useCallback(async () => {
    if (!tenantId) return;
    
    try {
      const data = await base44.entities.DocumentTemplate.filter(
        { tenant_id: tenantId },
        'template_name',
        100
      );
      setTemplates(data);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const filteredTemplates = templates.filter(template => {
    return filterType === 'all' || template.template_type === filterType;
  });

  const handleDeleteTemplate = async (templateId) => {
    if (window.confirm('Tem certeza que deseja excluir este modelo?')) {
      try {
        await base44.entities.DocumentTemplate.delete(templateId);
        loadTemplates();
      } catch (error) {
        console.error('Erro ao deletar modelo:', error);
      }
    }
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setShowForm(true);
  };

  const handleCopyTemplate = async (template) => {
    try {
      const copiedTemplate = {
        ...template,
        template_name: `${template.template_name} (Cópia)`,
        is_default: false,
        id: undefined
      };
      delete copiedTemplate.id;
      delete copiedTemplate.created_date;
      delete copiedTemplate.updated_date;
      
      await base44.entities.DocumentTemplate.create(copiedTemplate);
      loadTemplates();
      alert('Modelo duplicado com sucesso!');
    } catch (error) {
      console.error('Erro ao duplicar modelo:', error);
      alert('Erro ao duplicar modelo. Tente novamente.');
    }
  };

  return (
    <ProtectedInternalRoute>
      {showForm && (
        <DocumentTemplateForm
          tenantId={tenantId}
          userId={user?.email}
          editingTemplate={editingTemplate}
          onSuccess={() => {
            setShowForm(false);
            setEditingTemplate(null);
            loadTemplates();
          }}
          onClose={() => {
            setShowForm(false);
            setEditingTemplate(null);
          }}
        />
      )}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Gerenciamento de Documentos</h1>
              <p className="text-slate-600 mt-1">Crie e gerencie modelos de documentos</p>
            </div>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Modelo
            </Button>
          </div>

          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Tipo de Documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="invoice">Fatura</SelectItem>
                  <SelectItem value="quote">Orçamento</SelectItem>
                  <SelectItem value="statement">Extrato</SelectItem>
                  <SelectItem value="contract">Contrato</SelectItem>
                  <SelectItem value="report">Relatório</SelectItem>
                  <SelectItem value="letter">Carta</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Lista de Modelos */}
          <Card>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-8">Carregando modelos...</div>
              ) : filteredTemplates.length === 0 ? (
                <div className="text-center py-8 text-slate-600">Nenhum modelo encontrado</div>
              ) : (
                <div className="space-y-4">
                  {filteredTemplates.map((template) => (
                    <div key={template.id} className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <FileText className="w-5 h-5 text-blue-500 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-slate-900">{template.template_name}</h3>
                              {template.is_default && (
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded font-medium">
                                  Padrão
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{template.description}</p>
                            <div className="flex gap-2 mt-2">
                              <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded font-medium">
                                {template.template_type}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded font-medium ${
                                template.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                              }`}>
                                {template.status === 'active' ? 'Ativo' : 'Inativo'}
                              </span>
                            </div>
                            {template.created_by && (
                              <p className="text-xs text-slate-500 mt-2">
                                Criado por {template.created_by}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => handleEditTemplate(template)}
                             title="Editar"
                           >
                             <Edit2 className="w-4 h-4" />
                           </Button>
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => handleCopyTemplate(template)}
                             title="Duplicar"
                           >
                             <Copy className="w-4 h-4" />
                           </Button>
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => handleDeleteTemplate(template.id)}
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
          </ProtectedInternalRoute>
          );
          }