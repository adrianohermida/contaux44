import React from 'react';
import { Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ContactFormField from '../ContactFormField';
import ContactDeleteButton from '../ContactDeleteButton';
import ContactMetadata from '../ContactMetadata';
import ContactCEPLookup from '../ContactCEPLookup';
import ContactCustomFields from '../ContactCustomFields';
import {
  formatCPF,
  formatCNPJ,
  formatPhone,
  formatCEP,
} from '../ContactFormValidation';

export default function ContactEditForm({
  formData,
  errors,
  isEditing,
  contactId,
  contact,
  workspaceId,
  isSaving,
  onInputChange,
  onSave,
  onCancel,
  onDelete
}) {
  if (!formData) return null;

  return (
    <Card className="bg-white dark:bg-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Informações do Contato</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ContactFormField
              label="Nome da Empresa"
              name="company_name"
              value={formData.company_name}
              onChange={onInputChange}
              disabled={!isEditing}
              error={errors.company_name}
            />
            <ContactFormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onInputChange}
              disabled={!isEditing}
              error={errors.email}
            />
            <ContactFormField
              label="Telefone"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              disabled={!isEditing}
              error={errors.phone}
              formatFn={formatPhone}
            />
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Tipo</label>
              <select
                name="client_type"
                value={formData.client_type}
                onChange={onInputChange}
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
                onChange={onInputChange}
                disabled={!isEditing}
                error={errors.cpf}
                formatFn={formatCPF}
              />
            ) : (
              <ContactFormField
                label="CNPJ"
                name="cnpj"
                value={formData.cnpj}
                onChange={onInputChange}
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
                onChange={onInputChange}
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
                  onChange={onInputChange}
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
                        Object.entries(address).forEach(([key, value]) => {
                          onInputChange({ target: { name: key, value } });
                        });
                      }}
                    />
                  </div>
                )}
              </div>
              <ContactFormField
                label="Rua"
                name="endereco"
                value={formData.endereco}
                onChange={onInputChange}
                disabled={!isEditing}
                placeholder="Preenchido automaticamente ao buscar CEP"
              />
              <ContactFormField
                label="Número"
                name="numero"
                value={formData.numero}
                onChange={onInputChange}
                disabled={!isEditing}
              />
              <ContactFormField
                label="Complemento"
                name="complemento"
                value={formData.complemento}
                onChange={onInputChange}
                disabled={!isEditing}
              />
              <ContactFormField
                label="Bairro"
                name="bairro"
                value={formData.bairro}
                onChange={onInputChange}
                disabled={!isEditing}
                placeholder="Preenchido automaticamente ao buscar CEP"
              />
              <ContactFormField
                label="Cidade"
                name="cidade"
                value={formData.cidade}
                onChange={onInputChange}
                disabled={!isEditing}
                placeholder="Preenchido automaticamente ao buscar CEP"
              />
              <ContactFormField
                label="UF"
                name="uf"
                value={formData.uf}
                onChange={onInputChange}
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
                  onClick={onSave}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </Button>
                <Button onClick={onCancel} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            )}
            {!isEditing && contactId !== 'new' && onDelete && (
              <ContactDeleteButton 
                contactId={contactId}
                contactCreatedBy={contact?.created_by}
                onSuccess={onDelete}
              />
            )}
          </div>

          {/* Metadata - only when not editing */}
          {!isEditing && contactId !== 'new' && (
            <ContactMetadata contact={contact} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}