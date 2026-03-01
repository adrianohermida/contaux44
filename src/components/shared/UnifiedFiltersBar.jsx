/**
 * UNIFIED FILTERS BAR
 * Advanced search and filters with full-text and faceted navigation
 */

import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UnifiedFiltersBar({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  sortBy,
  sortOrder,
  onSortChange,
  additionalFilters = [] // Array of {key, label, options}
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const activeFiltersCount = Object.values(filters).filter(v => v && v !== 'all').length;

  const handleClearFilters = () => {
    onSearchChange('');
    onFiltersChange(Object.keys(filters).reduce((acc, key) => ({ ...acc, [key]: 'all' }), {}));
  };

  return (
    <div className="space-y-4" role="search" aria-label="Filtros e busca avançada">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none flex-shrink-0" aria-hidden="true" />
        <Input
          type="text"
          placeholder="Buscar por nome, email, telefone..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 min-h-[44px] text-base sm:text-sm"
          aria-label="Campo de busca por nome, email ou telefone"
          autoComplete="off"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Status Filter */}
        <fieldset className="flex items-center gap-2 border-0">
          <legend className="sr-only">Filtrar por status</legend>
          <select
            value={filters.status || 'all'}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="px-3 py-2 min-h-[44px] border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filtrar por status"
          >
            <option value="all">Status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </fieldset>

        {/* Additional Filters */}
        {additionalFilters.slice(0, 2).map(filter => (
          <fieldset key={filter.key} className="flex items-center gap-2 border-0">
            <legend className="sr-only">Filtrar por {filter.label}</legend>
            <select
              value={filters[filter.key] || 'all'}
              onChange={(e) => onFiltersChange({ ...filters, [filter.key]: e.target.value })}
              className="px-3 py-2 min-h-[44px] border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Filtrar por ${filter.label}`}
            >
              <option value="all">{filter.label}</option>
              {filter.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </fieldset>
        ))}

        {/* Sort Controls - Hide on mobile, show on desktop */}
        <fieldset className="hidden sm:flex items-center gap-2 border-0">
          <legend className="sr-only">Ordenar</legend>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value, sortOrder)}
            className="px-3 py-2 min-h-[44px] border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Ordenar por"
          >
            <option value="created_date">Data</option>
            <option value="company_name">Nome</option>
            <option value="status">Status</option>
          </select>

          <button
            onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-2 min-h-[44px] border border-slate-300 dark:border-slate-600 rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Ordem: ${sortOrder === 'asc' ? 'ascendente' : 'descendente'}`}
            aria-pressed={sortOrder === 'desc'}
            title={sortOrder === 'asc' ? 'Clique para descendente' : 'Clique para ascendente'}
          >
            <ArrowUpDown className="w-4 h-4" aria-hidden="true" />
          </button>
        </fieldset>

        {/* Advanced Filters Toggle & Clear */}
        <div className="flex gap-2 ml-auto">
          {activeFiltersCount > 0 && (
            <Button
              onClick={handleClearFilters}
              variant="outline"
              size="sm"
              className="min-h-[44px] text-xs sm:text-sm"
              aria-label={`Limpar ${activeFiltersCount} filtro${activeFiltersCount > 1 ? 's' : ''} ativo${activeFiltersCount > 1 ? 's' : ''}`}
            >
              <X className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
              Limpar
            </Button>
          )}
          <Button
            onClick={() => setShowAdvanced(!showAdvanced)}
            variant={showAdvanced ? 'default' : 'outline'}
            size="sm"
            className="min-h-[44px] text-xs sm:text-sm"
            aria-expanded={showAdvanced}
            aria-label="Alternar entre filtros básicos e avançados"
          >
            <Filter className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline ml-1">Filtros</span>
          </Button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && additionalFilters.length > 2 && (
        <div className="p-4 bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Filtros Avançados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {additionalFilters.slice(2).map(filter => (
              <fieldset key={filter.key} className="flex flex-col gap-2 border-0">
                <legend className="text-xs font-medium text-slate-700 dark:text-slate-300">{filter.label}</legend>
                <select
                  value={filters[filter.key] || 'all'}
                  onChange={(e) => onFiltersChange({ ...filters, [filter.key]: e.target.value })}
                  className="px-3 py-2 min-h-[44px] border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Filtrar por ${filter.label}`}
                >
                  <option value="all">Todos</option>
                  {filter.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </fieldset>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}