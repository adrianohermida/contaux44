import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactDeleteButton({ contactId, onSuccess }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await base44.entities.Client.delete(contactId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      onSuccess?.();
    },
  });

  if (showConfirm) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
        <p className="text-red-800 dark:text-red-200 mb-3 font-semibold">
          Deseja deletar este contato? Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deletando...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Confirmar Deleção
              </>
            )}
          </Button>
          <Button
            onClick={() => setShowConfirm(false)}
            variant="outline"
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={() => setShowConfirm(true)}
      variant="outline"
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="w-4 h-4 mr-2" />
      Deletar Contato
    </Button>
  );
}