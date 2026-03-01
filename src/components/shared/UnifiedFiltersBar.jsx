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
          <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
          <select
            value={filters.status || 'all'}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="px-3 py-2 min-h-[44px] border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filtrar por status"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </fieldset>

        {/* Additional Filters */}
        {additionalFilters.map(filter => (
          <fieldset key={filter.key} className="flex items-center gap-2 border-0">
            <legend className="sr-only">Filtrar por {filter.label}</legend>
            <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
            <select
              value={filters[filter.key] || 'all'}
              onChange={(e) => onFiltersChange({ ...filters, [filter.key]: e.target.value })}
              className="px-3 py-2 min-h-[44px] border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Filtrar por ${filter.label}`}
            >
              <option value="all">{filter.label}</option>
              {filter.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </fieldset>
        ))}

        {/* Sort By */}
        <fieldset className="flex items-center gap-2 border-0">
          <legend className="sr-only">Ordenar por</legend>
          <ArrowUpDown className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value, sortOrder)}
            className="px-3 py-2 min-h-[44px] border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Campo de ordenação"
          >
            <option value="created_date">Data de Criação</option>
            <option value="company_name">Nome</option>
            <option value="status">Status</option>
          </select>
        </fieldset>

        {/* Sort Order Toggle */}
        <button
          onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
          className="px-3 py-2 min-h-[44px] border border-slate-300 dark:border-slate-600 rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Ordem de classificação: ${sortOrder === 'asc' ? 'Ascendente, clique para descendente' : 'Descendente, clique para ascendente'}`}
          aria-pressed={sortOrder === 'desc'}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  );
}