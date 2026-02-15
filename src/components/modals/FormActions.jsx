import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

/**
 * FormActions - Botões padrão para salvar/cancelar
 * Garante consistência visual e behavior
 */
export default function FormActions({
  onCancel,
  onSubmit,
  loading = false,
  submitLabel = 'Salvar',
  cancelLabel = 'Cancelar',
  isDirty = true,
  submitVariant = 'default'
}) {
  return (
    <div className="flex justify-end gap-3 pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={loading}
      >
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={loading || !isDirty}
        className={submitVariant === 'default' ? 'bg-blue-600 hover:bg-blue-700' : ''}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {submitLabel}...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
}