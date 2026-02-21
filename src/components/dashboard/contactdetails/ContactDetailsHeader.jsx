import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactDetailsHeader({ isEditing, contactId, formData, onBack }) {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          {isEditing ? (contactId === 'new' ? 'Novo Contato' : 'Editar Contato') : formData?.company_name}
        </h1>
      </div>
    </div>
  );
}