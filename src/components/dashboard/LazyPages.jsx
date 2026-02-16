import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load de páginas pesadas
export const LazyBlogEditor = lazy(() => import('./blog/BlogEditor'));
export const LazyReportForm = lazy(() => import('./ReportForm'));
export const LazyDocumentTemplateForm = lazy(() => import('./DocumentTemplateForm'));
export const LazyAIAssistant = lazy(() => import('./blog/AIAssistant'));

// Lazy load de componentes pesados
export const LazyAnalyticsDashboard = lazy(() => import('./AnalyticsDashboard'));
export const LazyReportsCharts = lazy(() => import('./ReportsCharts'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[300px]">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
      <p className="text-slate-600 text-sm">Carregando módulo...</p>
    </div>
  </div>
);

export function LazyComponentWrapper({ children }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  );
}