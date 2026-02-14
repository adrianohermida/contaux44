import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

export default function JournalEntryList({ tenantId, onEdit, onRefresh }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, [tenantId, onRefresh]);

  const loadEntries = async () => {
    try {
      const data = await base44.entities.JournalEntry.filter({ tenant_id: tenantId });
      setEntries(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza?')) {
      await base44.entities.JournalEntry.delete(id);
      loadEntries();
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

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
            <tr key={entry.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm">{new Date(entry.entry_date).toLocaleDateString('pt-BR')}</td>
              <td className="px-6 py-4 text-sm font-medium">{entry.reference_number}</td>
              <td className="px-6 py-4 text-sm">{entry.description}</td>
              <td className="px-6 py-4 text-sm">{entry.line_items?.length || 0}</td>
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
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(entry.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {entries.length === 0 && <div className="text-center py-8 text-slate-500">Nenhum lançamento cadastrado</div>}
    </div>
  );
}