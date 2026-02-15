import React, { useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useFormState } from '@/components/modals/useFormState';
import { useFormValidation } from '@/components/hooks/useFormValidation';
import { useFormSubmit } from '@/components/modals/useFormSubmit';
import ModalWrapper from '@/components/modals/ModalWrapper';
import FormField from '@/components/modals/FormField';
import FormActions from '@/components/modals/FormActions';

export default function UserPreferences({ user, tenantId, isOpen = true, onClose, onSave }) {
  const initialData = useMemo(() => ({
    notify_invoice_overdue: user?.notify_invoice_overdue ?? true,
    notify_invoice_due_soon: user?.notify_invoice_due_soon ?? true,
    notify_payment_received: user?.notify_payment_received ?? true,
    notify_ticket_update: user?.notify_ticket_update ?? true,
    notify_legal_update: user?.notify_legal_update ?? true,
    notification_method_email: user?.notification_method_email ?? true,
    notification_method_in_app: user?.notification_method_in_app ?? true
  }), [user]);

  const { formData, setFieldValue, isDirty, reset } = useFormState(initialData);
  const { submit } = useFormSubmit();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await submit(
      async () => {
        await base44.auth.updateMe(formData);
      },
      {
        onSuccess: () => { reset(); onSave?.(); },
        successMessage: 'Preferências salvas com sucesso!',
        errorMessage: 'Erro ao salvar preferências.',
        tenantId,
        action: 'update'
      }
    );
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Preferências de Notificações" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3 border-b pb-4">
          <h3 className="font-semibold text-slate-900">Tipos de Notificação</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notify_invoice_overdue}
              onChange={(e) => setFieldValue('notify_invoice_overdue', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">Faturas vencidas</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notify_invoice_due_soon}
              onChange={(e) => setFieldValue('notify_invoice_due_soon', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">Faturas próximas do vencimento</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notify_payment_received}
              onChange={(e) => setFieldValue('notify_payment_received', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">Pagamentos recebidos</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notify_ticket_update}
              onChange={(e) => setFieldValue('notify_ticket_update', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">Atualizações de tickets</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notify_legal_update}
              onChange={(e) => setFieldValue('notify_legal_update', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">Atualizações de processos legais</span>
          </label>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-slate-900">Método de Notificação</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notification_method_email}
              onChange={(e) => setFieldValue('notification_method_email', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">Receber por email</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notification_method_in_app}
              onChange={(e) => setFieldValue('notification_method_in_app', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">Notificações no app</span>
          </label>
        </div>

        <FormActions onCancel={onClose} onSubmit={handleSubmit} submitLabel="Salvar Preferências" isDirty={isDirty} />
      </form>
    </ModalWrapper>
  );
}