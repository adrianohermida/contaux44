import React, { Suspense } from 'react';
import { useMultitenantAuthOptimized } from '../auth/useMultitenantAuthOptimized';
import { Loader2 } from 'lucide-react';

/**
 * Wrapper para páginas lazy-loaded
 * Valida autenticação e tipo de usuário
 */
export default function LazyPageWrapper({ children }) {
  const { loading, error } = useMultitenantAuthOptimized('internal');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white rounded-lg shadow p-6 max-w-md text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      {children}
    </Suspense>
  );
}