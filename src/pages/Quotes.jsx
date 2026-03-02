/**
 * Quotes Page
 * Main interface for managing quotes
 */

import React, { useState } from 'react';
import { useGlobalAuth } from '@/components/auth/useGlobalAuth';
import QuoteForm from '@/components/dashboard/QuoteForm';
import QuoteList from '@/components/dashboard/QuoteList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function QuotesPage() {
  const { user, loading } = useGlobalAuth('internal');
  const [showForm, setShowForm] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-600 dark:text-slate-400">
        Carregando...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center text-red-600 dark:text-red-400">
        Acesso restrito a usuários internos
      </div>
    );
  }

  const handleSave = () => {
    setShowForm(false);
    setEditingQuote(null);
    setRefreshKey(k => k + 1);
  };

  const handleEdit = (quote) => {
    setEditingQuote(quote);
    setShowForm(true);
  };

  return (
    <div className="space-y-6 dark:bg-slate-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Cotações</h1>
          <p className="text-slate-600 dark:text-slate-400">Gerenciar e converter cotações em faturas</p>
        </div>
        <Button
          onClick={() => {
            setEditingQuote(null);
            setShowForm(true);
          }}
          className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <Plus className="w-5 h-5" />
          Nova Cotação
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <QuoteForm
          quote={editingQuote}
          tenantId={user.workspace_id}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingQuote(null);
          }}
          isOpen={showForm}
        />
      )}

      {/* List */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <QuoteList
          key={refreshKey}
          tenantId={user.workspace_id}
          onEdit={handleEdit}
          onRefresh={() => setRefreshKey(k => k + 1)}
        />
      </div>
    </div>
  );
}