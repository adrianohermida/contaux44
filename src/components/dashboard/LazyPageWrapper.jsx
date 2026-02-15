import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export default function LazyPageWrapper({ children }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
            <p className="text-slate-600">Carregando página...</p>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}