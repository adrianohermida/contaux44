/**
 * UNIFIED HEADER COMPONENT
 * Shared header for Contact and Clients pages
 * Flexible button actions and title
 */

import React from 'react';
import { Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UnifiedHeader({
  title,
  filteredCount,
  totalCount,
  itemName = 'item',
  onNewItem,
  onImportClick,
  actionButtons = [] // Array of {label, icon: Component, onClick}
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 break-words">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
          {filteredCount} de {totalCount} {itemName}{totalCount !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="flex gap-2 flex-wrap sm:flex-nowrap sm:justify-end">
        {/* Custom Action Buttons */}
        {actionButtons.map((btn, idx) => {
          const Icon = btn.icon;
          return (
            <Button
              key={idx}
              onClick={btn.onClick}
              variant="outline"
              size="sm"
              className="gap-2 min-h-[44px]"
              aria-label={btn.label}
            >
              <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">{btn.label}</span>
            </Button>
          );
        })}
        
        {/* Import Button */}
        <Button 
          onClick={onImportClick} 
          variant="outline" 
          size="sm" 
          className="gap-2 min-h-[44px]"
          aria-label="Importar itens"
        >
          <Upload className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Importar</span>
        </Button>
        
        {/* New Item Button */}
        <Button 
          onClick={onNewItem} 
          size="sm" 
          className="gap-2 min-h-[44px]"
          aria-label={`Criar novo ${itemName}`}
        >
          <Plus className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Novo</span>
        </Button>
      </div>
    </div>
  );
}