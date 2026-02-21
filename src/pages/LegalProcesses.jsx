import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import LegalProcessForm from '../components/dashboard/LegalProcessForm';
import LegalProcessList from '../components/dashboard/LegalProcessList';
import { Button } from '@/components/ui/button';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';

export default function LegalProcesses() {
  const { workspaceId, loading } = useMultitenantAuthOptimized('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingProcess, setEditingProcess] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  const handleSave = useCallback(() => {
    setShowForm(false);
    setEditingProcess(null);
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleEdit = useCallback((process) => {
    setEditingProcess(process);
    setShowForm(true);
  }, []);

  const handleNewProcess = useCallback(() => {
    setEditingProcess(null);
    setShowForm(true);
  }, []);

  const handleCancel = useCallback(() => {
    setShowForm(false);
    setEditingProcess(null);
  }, []);

  return (
    <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Processos Judiciais</h1>
              <p className="text-slate-600 mt-1">Gerenciar processos e casos legais</p>
            </div>
            <Button 
              onClick={handleNewProcess}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Processo
            </Button>
          </div>

          {showForm && (
            <LegalProcessForm
              process={editingProcess}
              tenantId={workspaceId}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}

          <LegalProcessList
            tenantId={workspaceId}
            onEdit={handleEdit}
            onRefresh={refreshKey}
          />
          </div>
          );
          }