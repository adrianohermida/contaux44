import React, { useState } from 'react';
import { Trash2, CheckCircle, XCircle, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function ContactBulkActions({ selectedIds, onClearSelection, onEditTags, userRole }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [targetStatus, setTargetStatus] = useState(null);
  const queryClient = useQueryClient();

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids) => {
      await Promise.all(ids.map(id => base44.entities.Client.delete(id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      onClearSelection();
    },
  });

  const bulkStatusMutation = useMutation({
    mutationFn: async ({ ids, status }) => {
      await Promise.all(ids.map(id => 
        base44.entities.Client.update(id, { status })
      ));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      onClearSelection();
    },
  });

  const handleBulkDelete = () => {
    if (userRole !== 'admin') {
      alert('Apenas administradores podem deletar contatos em massa');
      return;
    }
    setShowDeleteDialog(true);
  };

  const confirmBulkDelete = () => {
    bulkDeleteMutation.mutate(selectedIds);
    setShowDeleteDialog(false);
  };

  const handleBulkStatus = (status) => {
    setTargetStatus(status);
    setShowStatusDialog(true);
  };

  const confirmBulkStatus = () => {
    bulkStatusMutation.mutate({ ids: selectedIds, status: targetStatus });
    setShowStatusDialog(false);
  };

  if (selectedIds.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center gap-4">
        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {selectedIds.length} selecionado{selectedIds.length > 1 ? 's' : ''}
        </span>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onEditTags}
            className="gap-2"
          >
            <Tag className="w-4 h-4" />
            Tags
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleBulkStatus('active')}
            className="gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Ativar
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleBulkStatus('inactive')}
            className="gap-2"
          >
            <XCircle className="w-4 h-4" />
            Desativar
          </Button>
          
          {userRole === 'admin' && (
            <Button
              size="sm"
              variant="destructive"
              onClick={handleBulkDelete}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Deletar
            </Button>
          )}
        </div>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={onClearSelection}
        >
          Cancelar
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão em Massa</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar {selectedIds.length} contato{selectedIds.length > 1 ? 's' : ''}? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBulkDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Deletar Tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Change Confirmation Dialog */}
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alterar Status em Massa</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja alterar o status de {selectedIds.length} contato{selectedIds.length > 1 ? 's' : ''} para {targetStatus === 'active' ? 'Ativo' : 'Inativo'}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkStatus}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}