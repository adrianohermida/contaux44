import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Trash2, Edit2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useMultitenantAuthOptimized } from '../auth/useMultitenantAuthOptimized';
import { useCacheStrategy } from '../hooks/useCacheStrategy';

export default function QuoteList({ onEdit, onRefresh }) {
  const { workspaceId } = useMultitenantAuthOptimized('internal');
  const { invalidateRelated } = useCacheStrategy();

  const { data: quotes = [], isLoading, refetch, error } = useQuery({
    queryKey: ['quotes', workspaceId, onRefresh],
    queryFn: async () => {
      if (!workspaceId) return [];
      return base44.entities.Quote.filter({ workspace_id: workspaceId });
    },
    enabled: !!workspaceId,
    staleTime: 3 * 60 * 1000,
    retry: 2,
    retryDelay: 1000
  });

  React.useEffect(() => {
    if (onRefresh) refetch();
  }, [onRefresh, refetch]);

  const handleDelete = useCallback(async (quoteId) => {
    if (!window.confirm('Tem certeza? Esta ação não pode ser desfeita. O orçamento será deletado permanentemente.')) return;
    
    try {
      await base44.entities.Quote.delete(quoteId);
      toast.success('Orçamento deletado com sucesso');
      invalidateRelated('Quote', quoteId);
      refetch();
    } catch (error) {
      console.error('Erro ao deletar orçamento:', error);
      toast.error('Erro ao deletar orçamento. Tente novamente.');
    }
  }, [invalidateRelated, refetch]);

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center transition-colors">
        <AlertCircle className="w-8 h-8 text-red-400 dark:text-red-500 mx-auto mb-2" aria-hidden="true" />
        <p className="text-red-600 dark:text-red-300 mb-4">Erro ao carregar orçamentos</p>
        <button onClick={() => refetch()} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 underline" aria-label="Tentar novamente">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-8 text-slate-500 dark:text-slate-400" role="status" aria-live="polite">Carregando orçamentos...</div>;
  }

  const statusColors = {
    draft: 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200',
    sent: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    accepted: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    rejected: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
  };

  if (quotes.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center transition-colors">
        <AlertCircle className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" aria-hidden="true" />
        <p className="text-slate-600 dark:text-slate-400">Nenhum orçamento cadastrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100">Orçamentos ({quotes.length})</h2>
      </div>
      <table className="w-full" role="table" aria-label="Lista de orçamentos">
        <thead className="bg-slate-50 dark:bg-slate-700/30 border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 dark:text-slate-100">Número</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 dark:text-slate-100">Data Validade</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 dark:text-slate-100">Valor</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900 dark:text-slate-100">Status</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-slate-900 dark:text-slate-100">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {quotes.map((quote) => (
            <tr key={quote.id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">{quote.quote_number}</td>
              <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{new Date(quote.expiry_date).toLocaleDateString('pt-BR')}</td>
              <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quote.total_amount || 0)}
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[quote.status] || 'bg-gray-100 dark:bg-gray-700'}`}>
                  {quote.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                <button onClick={() => onEdit(quote)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" aria-label={`Editar orçamento ${quote.quote_number}`}>
                  <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </button>
                <button onClick={() => handleDelete(quote.id)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" aria-label={`Deletar orçamento ${quote.quote_number}`}>
                  <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}