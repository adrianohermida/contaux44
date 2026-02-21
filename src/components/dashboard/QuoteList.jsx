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
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-600 mb-4">Erro ao carregar orçamentos</p>
        <button onClick={() => refetch()} className="text-red-500 hover:text-red-700 underline">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-8 text-slate-500">Carregando orçamentos...</div>;
  }

  const statusColors = {
    draft: 'bg-slate-100 text-slate-800',
    sent: 'bg-blue-100 text-blue-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  if (quotes.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-slate-600">Nenhum orçamento cadastrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-900">Orçamentos ({quotes.length})</h2>
      </div>
      <table className="w-full">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Número</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Data Validade</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Valor</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-900">Status</th>
            <th className="px-6 py-3 text-right text-sm font-medium text-slate-900">Ações</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id} className="border-b hover:bg-slate-50">
              <td className="px-6 py-4 text-sm font-medium text-slate-900">{quote.quote_number}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{new Date(quote.expiry_date).toLocaleDateString('pt-BR')}</td>
              <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quote.total_amount || 0)}
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[quote.status] || 'bg-gray-100'}`}>
                  {quote.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                <button onClick={() => onEdit(quote)} className="p-1 hover:bg-slate-200 rounded">
                  <Edit2 className="w-4 h-4 text-blue-600" />
                </button>
                <button onClick={() => handleDelete(quote.id)} className="p-1 hover:bg-slate-200 rounded">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}