import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactDetailsHeader({ isEditing, contactId, formData, onBack }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="min-h-[44px]"
          aria-label="Voltar para lista de contatos"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Voltar</span>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 break-words line-clamp-2">
            {isEditing ? (contactId === 'new' ? 'Novo Contato' : 'Editar Contato') : formData?.company_name}
          </h1>
        </div>
      </div>
      {isEditing && (
        <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
          Modo edição
        </span>
      )}
    </div>
  );
}