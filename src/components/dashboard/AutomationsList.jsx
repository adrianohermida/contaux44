import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Zap, Edit, Trash2, Loader2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AutomationsList({ tenantId, onEdit, onRefresh }) {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAutomations = async () => {
      try {
        // Listar automações do backend
        const allAutomations = await base44.listAutomations?.() || [];
        const filtered = allAutomations.filter(a => a.function_name?.includes(tenantId) || true);
        setAutomations(filtered.slice(0, 10));
      } catch {
        setAutomations([]);
      } finally {
        setLoading(false);
      }
    };
    loadAutomations();
  }, [tenantId, onRefresh]);

  const handleDelete = async (id) => {
    if (confirm('Deletar esta automação?')) {
      try {
        await base44.manageAutomation?.({ automation_id: id, action: 'delete' });
        setAutomations(automations.filter(a => a.id !== id));
      } catch (error) {
        console.error('Erro ao deletar:', error);
      }
    }
  };

  const handleToggle = async (automation) => {
    try {
      await base44.manageAutomation?.({
        automation_id: automation.id,
        action: 'toggle',
        automation_name: automation.name
      });
      setAutomations(automations.map(a => a.id === automation.id ? { ...a, is_active: !a.is_active } : a));
    } catch (error) {
      console.error('Erro ao alternar:', error);
    }
  };

  if (loading) return <div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="text-left py-3 px-4">Automação</th>
            <th className="text-left py-3 px-4">Tipo</th>
            <th className="text-left py-3 px-4">Função</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {automations.length === 0 ? (
            <tr><td colSpan="5" className="text-center py-8 text-slate-500">Nenhuma automação configurada</td></tr>
          ) : (
            automations.map(automation => (
              <tr key={automation.id} className="border-b hover:bg-slate-50">
                <td className="py-3 px-4 font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  {automation.name}
                </td>
                <td className="py-3 px-4">{automation.automation_type}</td>
                <td className="py-3 px-4 text-xs text-slate-600">{automation.function_name}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${automation.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {automation.is_active ? 'Ativa' : 'Inativa'}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleToggle(automation)}>
                    {automation.is_active ? <ToggleRight className="w-4 h-4 text-green-600" /> : <ToggleLeft className="w-4 h-4 text-gray-600" />}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => onEdit(automation)}><Edit className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(automation.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}