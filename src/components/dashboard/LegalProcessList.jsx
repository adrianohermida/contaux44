import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

export default function LegalProcessList({ tenantId, onEdit, onRefresh }) {
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProcesses();
  }, [tenantId, onRefresh]);

  const loadProcesses = async () => {
    try {
      const data = await base44.entities.LegalProcess.filter({ tenant_id: tenantId });
      setProcesses(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza?')) {
      await base44.entities.LegalProcess.delete(id);
      loadProcesses();
    }
  };

  const getPriorityColor = (priority) => {
    const colors = { low: 'bg-blue-100 text-blue-800', medium: 'bg-yellow-100 text-yellow-800', high: 'bg-orange-100 text-orange-800', urgent: 'bg-red-100 text-red-800' };
    return colors[priority] || 'bg-slate-100';
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Nº Processo</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Título</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Prioridade</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {processes.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 text-sm font-medium">{p.process_number}</td>
              <td className="px-6 py-4 text-sm">{p.title}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(p.priority)}`}>
                  {p.priority}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">{p.status}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(p)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {processes.length === 0 && <div className="text-center py-8 text-slate-500">Nenhum processo cadastrado</div>}
    </div>
  );
}