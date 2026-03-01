import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import QuoteForm from '../components/dashboard/QuoteForm';
import QuoteList from '../components/dashboard/QuoteList';
import { Button } from '@/components/ui/button';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';

export default function Quotes() {
  const { workspaceId, loading } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-500">Carregando...</div>
      </div>
    );
  }

  const handleSave = () => {
    setShowForm(false);
    setEditingQuote(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (quote) => {
    setEditingQuote(quote);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Orçamentos</h1>
              <p className="text-slate-600 mt-1">Gerenciar orçamentos e propostas</p>
            </div>
            <Button 
              onClick={() => { setEditingQuote(null); setShowForm(true); }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Orçamento
            </Button>
          </div>

          {showForm && (
            <QuoteForm
              quote={editingQuote}
              tenantId={workspaceId}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingQuote(null); }}
            />
          )}

          <QuoteList
            tenantId={workspaceId}
            onEdit={handleEdit}
            onRefresh={refreshKey}
          />
          </div>
          );
          }