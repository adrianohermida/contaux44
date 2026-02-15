import React from 'react';
import { useMultitenantAuth } from './useMultitenantAuth';
import { Loader2, AlertCircle } from 'lucide-react';

/**
 * Proteção para rotas de cliente (MeuPainel)
 * Apenas usuários com user_type='client' têm acesso
 */
export default function ProtectedClientRoute({ children }) {
  const { user, loading, error, hasAccess } = useMultitenantAuth('client');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !hasAccess('client')) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-amber-900 mb-2">Acesso Restrito</h1>
          <p className="text-amber-800 mb-4">
            {error || 'Esta área é destinada apenas para clientes.'}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return children;
}