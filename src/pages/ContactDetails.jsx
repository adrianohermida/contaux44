import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Loader2, Save, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import ContactFormField from '../components/dashboard/ContactFormField';
import ContactDeleteButton from '../components/dashboard/ContactDeleteButton';
import ContactMetadata from '../components/dashboard/ContactMetadata';
import {
  validateContactForm,
  formatCPF,
  formatCNPJ,
  formatPhone,
  formatCEP,
} from '../components/dashboard/ContactFormValidation';

export default function ContactDetails() {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { workspaceId, loading: authLoading } = useMultitenantAuthOptimized('internal');

   const [formData, setFormData] = useState(null);
   const [isEditing, setIsEditing] = useState(contactId === 'new');
   const [errors, setErrors] = useState({});
   const [saveMessage, setSaveMessage] = useState(null);

   // Fetch contact if not new
   const { data: contact, isLoading, error } = useQuery({
     queryKey: ['contact-detail', contactId, workspaceId],
     queryFn: async () => {
       if (!contactId || contactId === 'new' || !workspaceId) return null;
       const data = await base44.entities.Client.get(contactId);
       if (data?.tenant_id !== workspaceId) {
         throw new Error('Acesso negado');
       }
       return data;
     },
     enabled: !authLoading && contactId !== 'new' && !!workspaceId,
     staleTime: 5 * 60 * 1000,
   });

  // Initialize form data
  React.useEffect(() => {
    if (contact) {
      setFormData(contact);
    } else if (contactId === 'new' && !formData) {
      setFormData({
        company_name: '',
        email: '',
        phone: '',
        client_type: 'pj',
        status: 'active',
        cnpj: '',
        cpf: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        tenant_id: workspaceId,
      });
    }
  }, [contact, contactId, workspaceId]);

  // Warn before leaving with unsaved changes
  React.useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isEditing, formData]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (contactId === 'new') {
        return await base44.entities.Client.create(data);
      } else {
        await base44.entities.Client.update(contactId, data);
        return { id: contactId, ...data };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['contact-detail'] });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setIsEditing(false);
      setSaveMessage({ type: 'success', text: 'Contato salvo com sucesso!' });
      setTimeout(() => setSaveMessage(null), 3000);
      if (contactId === 'new') {
        navigate(`/contact/${result.id}`);
      }
    },
    onError: (error) => {
      setSaveMessage({ type: 'error', text: error.message || 'Erro ao salvar contato' });
    },
  });

  const handleSave = async () => {
    const formErrors = validateContactForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSaveMessage({ type: 'error', text: 'Corrija os erros no formulário' });
      return;
    }
    setErrors({});
    try {
      await saveMutation.mutateAsync(formData);
    } catch (err) {
      console.error('Erro ao salvar:', err);
    }
  };

  const handleCancel = () => {
    if (contactId === 'new') {
      navigate('/contact');
    } else {
      setFormData(contact);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar erros do campo e campos relacionados
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev, [name]: null };
        // Limpar erros de CPF/CNPJ ao mudar tipo
        if (name === 'client_type') {
          newErrors.cpf = null;
          newErrors.cnpj = null;
        }
        return newErrors;
      });
    }
  };

  const handleBeforeUnload = (e) => {
    if (isEditing && formData) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  if (isLoading) {
    return (
      <ProtectedInternalRoute>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Carregando contato...</span>
        </div>
      </ProtectedInternalRoute>
    );
  }

  if (error && contactId !== 'new') {
    return (
      <ProtectedInternalRoute>
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Erro ao carregar contato</p>
          <Button onClick={() => navigate('/contact')}>Voltar para Contatos</Button>
        </div>
      </ProtectedInternalRoute>
    );
  }

  if (!formData) return null;

  return (
    <ProtectedInternalRoute>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/contact')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {isEditing ? (contactId === 'new' ? 'Novo Contato' : 'Editar Contato') : formData.company_name}
            </h1>
          </div>
        </div>

        {/* Messages */}
        {saveMessage && (
          <div className={`p-3 rounded-lg flex items-center gap-2 ${saveMessage.type === 'success' ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
            {saveMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <p className="text-sm">{saveMessage.text}</p>
          </div>
        )}

        {/* Form Card */}
        <Card className="bg-white dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Informações do Contato</CardTitle>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                Editar
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ContactFormField
                  label="Nome da Empresa"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  error={errors.company_name}
                />
                <ContactFormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  error={errors.email}
                />
                <ContactFormField
                  label="Telefone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  error={errors.phone}
                  formatFn={formatPhone}
                />
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Tipo</label>
                  <select
                    name="client_type"
                    value={formData.client_type}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 disabled:opacity-60"
                  >
                    <option value="pf">Pessoa Física</option>
                    <option value="pj">Pessoa Jurídica</option>
                  </select>
                </div>
              </div>

              {/* Document Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.client_type === 'pf' ? (
                  <ContactFormField
                    label="CPF"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={errors.cpf}
                    formatFn={formatCPF}
                  />
                ) : (
                  <ContactFormField
                    label="CNPJ"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={errors.cnpj}
                    formatFn={formatCNPJ}
                  />
                )}
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 disabled:opacity-60"
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
              </div>

              {/* Address Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ContactFormField
                    label="CEP"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={errors.cep}
                    formatFn={formatCEP}
                  />
                  <ContactFormField
                    label="Rua"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <ContactFormField
                    label="Número"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <ContactFormField
                    label="Complemento"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <ContactFormField
                    label="Bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <ContactFormField
                    label="Cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <ContactFormField
                    label="UF"
                    name="uf"
                    value={formData.uf}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    maxLength="2"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t space-y-3">
                {isEditing && (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSave}
                      disabled={saveMutation.isPending}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saveMutation.isPending ? 'Salvando...' : 'Salvar'}
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                )}
                {!isEditing && contactId !== 'new' && (
                  <ContactDeleteButton 
                    contactId={contactId} 
                    onSuccess={() => navigate('/contact')}
                  />
                )}
              </div>

              {/* Metadata */}
              {!isEditing && contactId !== 'new' && (
                <ContactMetadata contact={contact} />
              )}
              </div>
              </CardContent>
              </Card>
              </div>
              </ProtectedInternalRoute>
              );
              }