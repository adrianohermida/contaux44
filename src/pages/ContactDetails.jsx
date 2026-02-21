import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import { useToast } from '../components/hooks/useToast';
import { ToastContainer } from '../components/ui/toast-notification';
import { useDebounce } from '../components/hooks/useDebounce';
import { sanitizeInput } from '../components/security/InputValidator';
import { useCSRFToken } from '../components/security/CSRFProtection';
import { validateContactForm, validateEmailUniqueness } from '../components/dashboard/ContactFormValidation';
import ContactRouteValidator from '../components/dashboard/ContactRouteValidator';
import ContactDetailsHeader from '../components/dashboard/contactdetails/ContactDetailsHeader';
import ContactDetailsTabs from '../components/dashboard/contactdetails/ContactDetailsTabs';
import ContactEditForm from '../components/dashboard/contactdetails/ContactEditForm';
import { useContactForm } from '../components/dashboard/contactdetails/useContactForm';

export default function ContactDetails() {
   const { contactId } = useParams();
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const { workspaceId, loading: authLoading } = useMultitenantAuthOptimized('internal');
   const { toasts, removeToast, success, error, info } = useToast();
   const { token } = useCSRFToken();

   const [isEditing, setIsEditing] = useState(contactId === 'new');

   // Fetch contact if not new
   const { data: contact, isLoading, error: queryError } = useQuery({
     queryKey: ['contact-detail', contactId, workspaceId],
     queryFn: async () => {
       if (!contactId || contactId === 'new' || !workspaceId) return null;
       const data = await base44.entities.Client.get(contactId);
       if (data?.tenant_id !== workspaceId) throw new Error('Acesso negado');
       return data;
     },
     enabled: !authLoading && contactId !== 'new' && !!workspaceId,
     staleTime: 5 * 60 * 1000,
   });

   // Initialize form with defaults
   const getInitialFormData = () => {
     if (contact) return contact;
     if (contactId === 'new') {
       return {
         company_name: '', email: '', phone: '', client_type: 'pj', status: 'active',
         cnpj: '', cpf: '', endereco: '', numero: '', complemento: '', bairro: '',
         cidade: '', uf: '', cep: '', tenant_id: workspaceId,
       };
     }
     return null;
   };

   const { formData, setFormData, errors, hasChanges, handleInputChange, validateForm, reset } = useContactForm(
     getInitialFormData(),
     contactId,
     workspaceId,
     base44,
     (msg) => info(msg),
     (msg) => error(msg)
   );

   // Handle unsaved changes warning
   useEffect(() => {
     const handleBeforeUnload = (e) => {
       if (hasChanges) {
         e.preventDefault();
         e.returnValue = '';
       }
     };
     window.addEventListener('beforeunload', handleBeforeUnload);
     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
   }, [hasChanges]);

  // Save mutation
   const saveMutation = useMutation({
     mutationFn: async (data) => {
       if (!token) throw new Error('CSRF token missing');
       if (!workspaceId) throw new Error('Workspace ID required');

       const sanitizedData = {
         ...data,
         company_name: sanitizeInput(data.company_name, 'text'),
         email: sanitizeInput(data.email, 'email'),
         phone: sanitizeInput(data.phone, 'phone'),
       };
       let result;
       if (contactId === 'new') {
         result = await base44.entities.Client.create(sanitizedData);

        await base44.entities.ContactActivity.create({
          workspace_id: workspaceId,
          contact_id: result.id,
          activity_type: 'created',
          description: 'Contato criado',
          metadata: { initial_status: data.status, client_type: data.client_type },
        });
      } else {
        const statusChanged = contact.status !== data.status;

        await base44.entities.Client.update(contactId, sanitizedData);
        result = { id: contactId, ...data };

        await base44.entities.ContactActivity.create({
          workspace_id: workspaceId,
          contact_id: contactId,
          activity_type: 'edit',
          description: 'Informações do contato editadas',
          metadata: { 
            fields_updated: Object.keys(sanitizedData).filter(key => contact[key] !== sanitizedData[key])
          },
        });

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
      queryClient.invalidateQueries({ queryKey: ['contact-detail', contactId, workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['contacts', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['contact-activities', contactId, workspaceId] });
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
        info('Não foi possível validar email, continuando...');
      } else {
        throw validationErr;
      }
    }

    setErrors({});
    // Prevent double-submit
    if (saveMutation.isPending) return;

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

    if (hasSecurityRisk(value)) {
      console.warn(`Security risk detected in field: ${name}`);
      setErrors(prev => ({ ...prev, [name]: 'Entrada contém caracteres suspeitos' }));
      return;
    }

    const fieldType = name === 'email' ? 'email' : name === 'phone' ? 'phone' : 'text';
    let newValue = sanitizeInput(value, fieldType);

    // Validação de negócio: PF com CPF, PJ com CNPJ
    if (name === 'client_type' && formData.client_type !== newValue) {
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
    } else if (name === 'cpf' && formData.client_type === 'pj') {
      setErrors(prev => ({ ...prev, [name]: 'CPF não é permitido para Pessoa Jurídica' }));
      return;
    } else if (name === 'cnpj' && formData.client_type === 'pf') {
      setErrors(prev => ({ ...prev, [name]: 'CNPJ não é permitido para Pessoa Física' }));
      return;
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

  // Route validation - check for error/not found
  const routeErrorElement = ContactRouteValidator({ 
    contactId,
    isLoading,
    error: queryError,
    contact,
    onNavigateBack: () => navigate('/contact')
  });

  if (routeErrorElement) {
    return (
      <ProtectedInternalRoute>
        {routeErrorElement}
      </ProtectedInternalRoute>
    );
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
           <Tabs value={activeTab} onValueChange={(value) => {
             setActiveTab(value);
             setLoadedTabs(prev => new Set([...prev, value]));
           }} className="space-y-6">
             <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-none">
               <TabsTrigger value="info">Info</TabsTrigger>
               <TabsTrigger value="notes">Notas</TabsTrigger>
               <TabsTrigger value="activity">Atividades</TabsTrigger>
               <TabsTrigger value="tags">Tags</TabsTrigger>
               <TabsTrigger value="relationships">Relações</TabsTrigger>
               <TabsTrigger value="files">Arquivos</TabsTrigger>
               <TabsTrigger value="duplicates">Duplicatas</TabsTrigger>
             </TabsList>

             <LazyTabContent value="info" activeTab={activeTab}>
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
             </LazyTabContent>

             <LazyTabContent value="notes" activeTab={activeTab} loading={!loadedTabs.has('notes')}>
               {loadedTabs.has('notes') && <ContactNotesList contactId={contactId} workspaceId={workspaceId} />}
             </LazyTabContent>

             <LazyTabContent value="activity" activeTab={activeTab} loading={!loadedTabs.has('activity')}>
               {loadedTabs.has('activity') && <ContactActivityTimeline contactId={contactId} workspaceId={workspaceId} />}
             </LazyTabContent>

             <LazyTabContent value="tags" activeTab={activeTab} loading={!loadedTabs.has('tags')}>
               {loadedTabs.has('tags') && (
                 <Card className="bg-white dark:bg-slate-800">
                   <CardHeader>
                     <CardTitle>Tags do Contato</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <ContactTagSelector contactId={contactId} workspaceId={workspaceId} />
                   </CardContent>
                 </Card>
               )}
             </LazyTabContent>

             <LazyTabContent value="relationships" activeTab={activeTab} loading={!loadedTabs.has('relationships')}>
               {loadedTabs.has('relationships') && (
                 <Card className="bg-white dark:bg-slate-800">
                   <CardHeader>
                     <CardTitle>Relacionamentos</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <ContactRelationshipManager contactId={contactId} workspaceId={workspaceId} />
                   </CardContent>
                 </Card>
               )}
             </LazyTabContent>

             <LazyTabContent value="files" activeTab={activeTab} loading={!loadedTabs.has('files')}>
               {loadedTabs.has('files') && (
                 <Card className="bg-white dark:bg-slate-800">
                   <CardHeader>
                     <CardTitle>Arquivos Anexados</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <ContactAttachments contactId={contactId} workspaceId={workspaceId} />
                   </CardContent>
                 </Card>
               )}
             </LazyTabContent>

             <LazyTabContent value="duplicates" activeTab={activeTab} loading={!loadedTabs.has('duplicates')}>
               {loadedTabs.has('duplicates') && <DuplicateDetector workspaceId={workspaceId} contactId={contactId} />}
             </LazyTabContent>
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