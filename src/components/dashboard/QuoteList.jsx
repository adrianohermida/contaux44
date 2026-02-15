import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

const QuoteRow = React.memo(({ quote, onEdit, onDelete, getStatusColor }) => (
  <tr className="hover:bg-slate-50">
    <td className="px-6 py-4 text-sm font-medium">{quote.quote_number}</td>
    <td className="px-6 py-4 text-sm">{new Date(quote.issue_date).toLocaleDateString('pt-BR')}</td>
    <td className="px-6 py-4 text-sm">{quote.total_amount.toLocaleString('pt-BR', {style: 'currency', currency: quote.currency})}</td>
    <td className="px-6 py-4 text-sm">{new Date(quote.expiry_date).toLocaleDateString('pt-BR')}</td>
    <td className="px-6 py-4 text-sm">
      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(quote.status)}`}>
        {quote.status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit(quote)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(quote.id)}>
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </td>
  </tr>
));

QuoteRow.displayName = 'QuoteRow';

export default function QuoteList({ tenantId, onEdit, onRefresh }) {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadQuotes = useCallback(async () => {
    try {
      const data = await base44.entities.Quote.filter({ tenant_id: tenantId });
      setQuotes(data);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes, onRefresh]);

  const handleDelete = useCallback(async (id) => {
    if (confirm('Tem certeza?')) {
      await base44.entities.Quote.delete(id);
      loadQuotes();
    }
  }, [loadQuotes]);

  const getStatusColor = useCallback((status) => {
    const colors = { draft: 'bg-slate-100 text-slate-800', sent: 'bg-blue-100 text-blue-800', accepted: 'bg-green-100 text-green-800', rejected: 'bg-red-100 text-red-800', converted: 'bg-purple-100 text-purple-800' };
    return colors[status] || 'bg-slate-100';
  }, []);

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Nº Orçamento</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Data</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Valor</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Validade</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {quotes.map((quote) => (
            <QuoteRow 
              key={quote.id} 
              quote={quote} 
              onEdit={onEdit} 
              onDelete={handleDelete} 
              getStatusColor={getStatusColor} 
            />
          ))}
        </tbody>
      </table>
      {quotes.length === 0 && <div className="text-center py-8 text-slate-500">Nenhum orçamento cadastrado</div>}
    </div>
  );
}