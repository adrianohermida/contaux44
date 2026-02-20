import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactListFilters({ onFilterChange, activeFilters }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = { status: 'all', type: 'all' };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeCount = Object.values(filters).filter(v => v !== 'all').length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filtros
          {activeCount > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-xs font-semibold">
              {activeCount}
            </span>
          )}
        </Button>
        {activeCount > 0 && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-slate-600 dark:text-slate-400"
          >
            <X className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Status
            </label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'active', 'inactive'].map((value) => (
                <button
                  key={value}
                  onClick={() => handleFilterChange('status', value)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.status === value
                      ? 'bg-blue-600 text-white dark:bg-blue-700'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-blue-300'
                  }`}
                >
                  {value === 'all' ? 'Todos' : value === 'active' ? 'Ativos' : 'Inativos'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Tipo
            </label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'pf', 'pj'].map((value) => (
                <button
                  key={value}
                  onClick={() => handleFilterChange('type', value)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.type === value
                      ? 'bg-blue-600 text-white dark:bg-blue-700'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-blue-300'
                  }`}
                >
                  {value === 'all' ? 'Todos' : value === 'pf' ? 'PF' : 'PJ'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}