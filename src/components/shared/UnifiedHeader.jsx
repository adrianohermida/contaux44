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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          {filteredCount} de {totalCount} {itemName}{totalCount !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {/* Custom Action Buttons */}
        {actionButtons.map((btn, idx) => {
          const Icon = btn.icon;
          return (
            <Button
              key={idx}
              onClick={btn.onClick}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Icon className="w-4 h-4" />
              {btn.label}
            </Button>
          );
        })}
        
        {/* Import Button */}
        <Button onClick={onImportClick} variant="outline" size="sm" className="gap-2">
          <Upload className="w-4 h-4" />
          Importar
        </Button>
        
        {/* New Item Button */}
        <Button onClick={onNewItem} size="sm" className="gap-2">
          <Plus className="w-5 h-5" />
          Novo
        </Button>
      </div>
    </div>
  );
}