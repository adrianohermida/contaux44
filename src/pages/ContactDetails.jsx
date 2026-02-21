import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Loader2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import ContactFormField from '../components/dashboard/ContactFormField';
import ContactDeleteButton from '../components/dashboard/ContactDeleteButton';
import ContactMetadata from '../components/dashboard/ContactMetadata';
import ContactCEPLookup from '../components/dashboard/ContactCEPLookup';
import ContactTagSelector from '../components/dashboard/ContactTagSelector';
import ContactNotesList from '../components/dashboard/ContactNotesList';
import ContactActivityTimeline from '../components/dashboard/ContactActivityTimeline';
import ContactRelationshipManager from '../components/dashboard/ContactRelationshipManager';
import DuplicateDetector from '../components/dashboard/DuplicateDetector';
import ContactAttachments from '../components/dashboard/ContactAttachments';
import ContactCustomFields from '../components/dashboard/ContactCustomFields';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '../components/hooks/useToast';
import { ToastContainer } from '../components/ui/toast-notification';
import { useDebounce } from '../components/hooks/useDebounce';
import { sanitizeInput, hasSecurityRisk } from '../components/security/InputValidator';
import { useCSRFToken } from '../components/security/CSRFProtection';
import {
  validateContactForm,
  validateEmailUniqueness,
  formatCPF,
  formatCNPJ,
  formatPhone,
  formatCEP,
} from '../components/dashboard/ContactFormValidation';
import LazyTabContent from '../components/dashboard/LazyTabContent';
import ContactRouteValidator from '../components/dashboard/ContactRouteValidator';

function ContactInfoDisplay({ formData, contact, workspaceId, contactId }) {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Nome da Empresa</label>
          <p className="text-slate-700 dark:text-slate-300">{formData.company_name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Email</label>
          <p className="text-slate-700 dark:text-slate-300">{formData.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Telefone</label>
          <p className="text-slate-700 dark:text-slate-300">{formData.phone || '—'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Tipo</label>
          <p className="text-slate-700 dark:text-slate-300">{formData.client_type === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}</p>
        </div>
      </div>

      {/* Document Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">
            {formData.client_type === 'pf' ? 'CPF' : 'CNPJ'}
          </label>
          <p className="text-slate-700 dark:text-slate-300">
            {formData.client_type === 'pf' ? (formData.cpf || '—') : (formData.cnpj || '—')}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Status</label>
          <p className="text-slate-700 dark:text-slate-300">
            {formData.status === 'active' ? 'Ativo' : 'Inativo'}
          </p>
        </div>
      </div>

      {/* Address */}
      {(formData.endereco || formData.cidade) && (
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Endereço</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.cep && (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">CEP</label>
                <p className="text-slate-700 dark:text-slate-300">{formData.cep}</p>
              </div>
            )}
            {formData.endereco && (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Rua</label>
                <p className="text-slate-700 dark:text-slate-300">{formData.endereco}</p>
              </div>
            )}
            {formData.numero && (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Número</label>
                <p className="text-slate-700 dark:text-slate-300">{formData.numero}</p>
              </div>
            )}
            {formData.complemento && (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Complemento</label>
                <p className="text-slate-700 dark:text-slate-300">{formData.complemento}</p>
              </div>
            )}
            {formData.bairro && (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Bairro</label>
                <p className="text-slate-700 dark:text-slate-300">{formData.bairro}</p>
              </div>
            )}
            {formData.cidade && (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Cidade</label>
                <p className="text-slate-700 dark:text-slate-300">{formData.cidade} - {formData.uf}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <ContactMetadata contact={contact} />
    </div>
  );
}

export default function ContactDetails() {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { workspaceId, loading: authLoading } = useMultitenantAuthOptimized('internal');
  const { toasts, removeToast, success, error, info } = useToast();

   const [formData, setFormData] = useState(null);
   const [isEditing, setIsEditing] = useState(contactId === 'new');
   const [errors, setErrors] = useState({});
   const [hasChanges, setHasChanges] = useState(false);

   // Real-time validation with debounce
   const debouncedFormData = useDebounce(formData, 500);

   // Fetch contact if not new
   const { data: contact, isLoading, error: queryError } = useQuery({
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
      setHasChanges(false);
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
      setHasChanges(false);
    }
  }, [contact, contactId, workspaceId]);

  // Real-time validation
  React.useEffect(() => {
    if (debouncedFormData && isEditing) {
      const validationErrors = validateContactForm(debouncedFormData);
      setErrors(validationErrors);
    }
  }, [debouncedFormData, isEditing]);



  // CSRF Token
  const { token } = useCSRFToken();

  // Save mutation
   const saveMutation = useMutation({
     mutationFn: async (data) => {
       // Security: Verify CSRF token before save
       if (!token) throw new Error('CSRF token missing');

       // Security: Final sanitization before save
       const sanitizedData = {
         ...data,
         company_name: sanitizeInput(data.company_name, 'text'),
         email: sanitizeInput(data.email, 'email'),
         phone: sanitizeInput(data.phone, 'phone'),
       };
       let result;
       if (contactId === 'new') {
         result = await base44.entities.Client.create(sanitizedData);
        
        // Create "created" activity for new contact
        await base44.entities.ContactActivity.create({
          workspace_id: workspaceId,
          contact_id: result.id,
          activity_type: 'created',
          description: 'Contato criado',
          metadata: { initial_status: data.status, client_type: data.client_type },
        });
      } else {
        // Check if status changed
        const statusChanged = contact.status !== data.status;

        await base44.entities.Client.update(contactId, sanitizedData);
        result = { id: contactId, ...data };
        
        // Create "edit" activity
        await base44.entities.ContactActivity.create({
          workspace_id: workspaceId,
          contact_id: contactId,
          activity_type: 'edit',
          description: 'Informações do contato editadas',
          metadata: { 
            fields_updated: Object.keys(sanitizedData).filter(key => contact[key] !== sanitizedData[key])
          },
        });
        
        // If status changed, create additional activity
        if (statusChanged) {
          await base44.entities.ContactActivity.create({
            workspace_id: workspaceId,
            contact_id: contactId,
            activity_type: 'status_change',
            description: `Status alterado de ${contact.status === 'active' ? 'Ativo' : 'Inativo'} para ${data.status === 'active' ? 'Ativo' : 'Inativo'}`,
            metadata: { 
              old_status: contact.status, 
              new_status: data.status 
            },
          });
        }
      }
      return result;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['contact-detail'] });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact-activities'] });
      setIsEditing(false);
      setHasChanges(false);
      success('Contato salvo com sucesso!');
      if (contactId === 'new') {
        navigate(`/contact/${result.id}`);
      }
    },
    onError: (err) => {
      error(err.message || 'Erro ao salvar contato');
    },
  });

  const handleSave = async () => {
    const formErrors = validateContactForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      error('Corrija os erros no formulário');
      return;
    }

    // Async email validation with timeout (5s max)
    info('Validando email...');
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 5000)
      );
      const validationPromise = validateEmailUniqueness(base44, formData.email, contactId, workspaceId);
      
      const isEmailUnique = await Promise.race([validationPromise, timeoutPromise]);
      if (!isEmailUnique) {
        setErrors({ email: 'Este email já está em uso por outro contato' });
        error('Email já existe no sistema');
        return;
      }
    } catch (validationErr) {
      if (validationErr.message === 'timeout') {
        // Timeout - continue anyway with warning
        info('Não foi possível validar email, continuando...');
      } else {
        throw validationErr;
      }
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
      setHasChanges(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Security: Check for XSS/SQL injection
    if (hasSecurityRisk(value)) {
      console.warn(`Security risk detected in field: ${name}`);
      setErrors(prev => ({ ...prev, [name]: 'Entrada contém caracteres suspeitos' }));
      return;
    }

    // Security: Sanitize input
    const fieldType = name === 'email' ? 'email' : name === 'phone' ? 'phone' : 'text';
    let newValue = sanitizeInput(value, fieldType);

    // Limpar CPF/CNPJ quando muda tipo
    if (name === 'client_type') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: newValue,
        cpf: '',
        cnpj: ''
      }));
      setErrors(prev => ({
        ...prev,
        [name]: null,
        cpf: null,
        cnpj: null
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: newValue }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    }
    setHasChanges(true);
  };

  const handleBeforeUnload = React.useCallback((e) => {
    if (hasChanges) {
      e.preventDefault();
      e.returnValue = '';
    }
  }, [hasChanges]);

  React.useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [handleBeforeUnload]);

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

  // Route validation and error handling
  const routeError = (
    <ProtectedInternalRoute>
      <ContactRouteValidator 
        contactId={contactId}
        isLoading={isLoading}
        error={queryError}
        contact={contact}
        onNavigateBack={() => navigate('/contact')}
      />
    </ProtectedInternalRoute>
  );

  if (routeError.props.children) {
    return routeError;
  }

  if (!formData) return null;

  return (
    <ProtectedInternalRoute>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
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

        {/* Tabs Navigation with Lazy Loading */}
        {contactId !== 'new' && !isEditing && contact && (
          <Tabs defaultValue="info" className="space-y-6" onValueChange={(value) => {/* Tab tracking */}}>
            <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-none">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="notes">Notas</TabsTrigger>
              <TabsTrigger value="activity">Atividades</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="relationships">Relações</TabsTrigger>
              <TabsTrigger value="files">Arquivos</TabsTrigger>
              <TabsTrigger value="duplicates">Duplicatas</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card className="bg-white dark:bg-slate-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Informações do Contato</CardTitle>
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    Editar
                  </Button>
                </CardHeader>
                <CardContent>
                  <ContactInfoDisplay 
                    formData={formData} 
                    contact={contact}
                    workspaceId={workspaceId}
                    contactId={contactId}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <ContactNotesList contactId={contactId} workspaceId={workspaceId} />
            </TabsContent>

            <TabsContent value="activity">
              <ContactActivityTimeline contactId={contactId} workspaceId={workspaceId} />
            </TabsContent>

            <TabsContent value="tags">
              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Tags do Contato</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactTagSelector contactId={contactId} workspaceId={workspaceId} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="relationships">
              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Relacionamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactRelationshipManager contactId={contactId} workspaceId={workspaceId} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files">
              <Card className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Arquivos Anexados</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactAttachments contactId={contactId} workspaceId={workspaceId} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="duplicates">
              <DuplicateDetector workspaceId={workspaceId} contactId={contactId} />
            </TabsContent>
          </Tabs>
        )}

        {/* Edit Form (shown when editing or creating new) */}
        {(isEditing || contactId === 'new') && (
          <Card className="bg-white dark:bg-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Informações do Contato</CardTitle>
              {!isEditing && contactId !== 'new' && (
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

              {/* Custom Fields */}
              <ContactCustomFields 
                contactId={contactId}
                workspaceId={workspaceId}
                disabled={!isEditing}
              />

              {/* Address Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ContactFormField
                      label="CEP"
                      name="cep"
                      value={formData.cep}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      error={errors.cep}
                      formatFn={formatCEP}
                    />
                    {isEditing && formData.cep && (
                      <div className="mt-2">
                        <ContactCEPLookup 
                          cep={formData.cep}
                          disabled={!isEditing}
                          onAddressFound={(address) => {
                            setFormData(prev => ({ ...prev, ...address }));
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <ContactFormField
                    label="Rua"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Preenchido automaticamente ao buscar CEP"
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
                    placeholder="Preenchido automaticamente ao buscar CEP"
                  />
                  <ContactFormField
                    label="Cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Preenchido automaticamente ao buscar CEP"
                  />
                  <ContactFormField
                    label="UF"
                    name="uf"
                    value={formData.uf}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    maxLength="2"
                    placeholder="Preenchido automaticamente ao buscar CEP"
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
                    contactCreatedBy={contact?.created_by}
                    onSuccess={() => navigate('/contact')}
                  />
                )}
              </div>

              {/* Metadata - only in edit mode */}
              {!isEditing && contactId !== 'new' && (
                <ContactMetadata contact={contact} />
              )}
            </div>
          </CardContent>
        </Card>
        )}
      </div>
    </ProtectedInternalRoute>
  );
}