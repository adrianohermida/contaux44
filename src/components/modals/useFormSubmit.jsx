import { useState, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Hook para gerenciar submissão de formulários
 * Padroniza loading, erros e sucesso
 */
export function useFormSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (
    onSubmit,
    { 
      onSuccess,
      onError,
      successMessage = 'Operação realizada com sucesso!',
      errorMessage = 'Erro ao processar. Tente novamente.'
    } = {}
  ) => {
    setLoading(true);
    setError(null);

    try {
      await onSubmit();
      toast.success(successMessage);
      onSuccess?.();
    } catch (err) {
      const message = err.message || errorMessage;
      setError(message);
      toast.error(message);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, submit, clearError };
}