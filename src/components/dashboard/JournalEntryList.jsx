import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const EntryRow = React.memo(({ entry, onEdit, onDelete }) => (
  <tr className="hover:bg-slate-50">
    <td className="px-6 py-4 text-sm">{new Date(entry.entry_date).toLocaleDateString('pt-BR')}</td>
    <td className="px-6 py-4 text-sm font-medium">{entry.reference_number || '-'}</td>
    <td className="px-6 py-4 text-sm">{entry.description}</td>
    <td className="px-6 py-4 text-sm text-center">{entry.line_items?.length || 0}</td>
    <td className="px-6 py-4 text-sm">
      <span className={`px-2 py-1 rounded text-xs font-medium ${entry.is_posted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {entry.is_posted ? 'Lançada' : 'Rascunho'}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit(entry)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(entry.id, entry.reference_number || entry.id)}>
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </td>
  </tr>
));

EntryRow.displayName = 'EntryRow';

export default function JournalEntryList({ tenantId, onEdit, onRefresh }) {
  const { data: entries = [], isLoading: loading, refetch, error } = useQuery({
    queryKey: ['JournalEntry-list', tenantId, onRefresh],
    queryFn: async () => {
      if (!tenantId) return [];
      return base44.entities.JournalEntry.filter({ tenant_id: tenantId });
    },
    enabled: !!tenantId,
    staleTime: 2 * 60 * 1000,
    retry: 2,
    retryDelay: 1000
  });

  const handleDelete = useCallback(async (id, reference) => {
    if (!confirm(`Tem certeza que deseja deletar o lançamento ${reference}? Esta ação não pode ser desfeita.`)) return;
    try {
      await base44.entities.JournalEntry.delete(id);
      toast.success('Lançamento deletado com sucesso');
      refetch();
    } catch (err) {
      console.error('Erro ao deletar:', err);
      toast.error('Erro ao deletar lançamento. Tente novamente.');
    }
  }, [refetch]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-600 mb-4">Erro ao carregar lançamentos</p>
        <button onClick={() => refetch()} className="text-red-500 hover:text-red-700 underline">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (loading) return <div className="text-center py-8 text-slate-500">Carregando lançamentos...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Data</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Referência</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Descrição</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Linhas</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {entries.map((entry) => (
            <EntryRow key={entry.id} entry={entry} onEdit={onEdit} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      {entries.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Nenhum lançamento cadastrado</p>
          <p className="text-slate-400 text-sm mt-1">Comece criando um novo lançamento contábil</p>
        </div>
      )}
    </div>
  );
}