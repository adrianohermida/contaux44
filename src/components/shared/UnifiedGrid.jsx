/**
 * UNIFIED GRID COMPONENT
 * Shared grid for both Contact and Clients pages
 * Supports different item renderers and click behaviors
 */

import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';

export default function UnifiedGrid({
  items,
  isLoading,
  renderItem,
  emptyMessage,
  onNewItem,
  onImportClick,
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
  skeletonCount = 6,
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
}) {
  return (
    <div role="region" aria-label="Lista de itens" aria-live="polite">
      <div className={`grid ${columns} gap-3 sm:gap-4`}>
        {isLoading ? (
          Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-xl border p-6">
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
              </div>
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="col-span-full text-center py-12 px-4">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6">{emptyMessage}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button 
                onClick={onImportClick} 
                variant="outline" 
                className="gap-2 min-h-[44px]"
                aria-label="Importar itens"
              >
                <Upload className="w-4 h-4" aria-hidden="true" />
                Importar
              </Button>
              <Button 
                onClick={onNewItem} 
                variant="outline"
                className="min-h-[44px]"
                aria-label="Criar novo item"
              >
                Criar novo
              </Button>
            </div>
          </div>
        ) : (
          items.map(item => renderItem(item))
        )}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Paginação" className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        </nav>
      )}
    </div>
  );
}