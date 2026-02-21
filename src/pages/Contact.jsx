import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Upload, Download, Tag, Edit } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import ContactListFilters from '../components/dashboard/ContactListFilters';
import ContactExportButton from '../components/dashboard/ContactExportButton';
import ContactCard from '../components/dashboard/ContactCard';
import ContactBulkActions from '../components/dashboard/ContactBulkActions';
import ContactImportCSV from '../components/dashboard/ContactImportCSV';
import ContactSorting from '../components/dashboard/ContactSorting';
import ContactTagManager from '../components/dashboard/ContactTagManager';
import ContactBulkTagEditor from '../components/dashboard/ContactBulkTagEditor';
import { usePagination } from '../components/hooks/usePagination';
import { Pagination } from '../components/ui/pagination';
import { useDebounce } from '../components/hooks/useDebounce';

export default function Contact() {
  const navigate = useNavigate();
  const { workspaceId, user, loading: authLoading } = useMultitenantAuthOptimized('internal');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', type: 'all' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [showImport, setShowImport] = useState(false);
  const [showTagManager, setShowTagManager] = useState(false);
  const [showBulkTagEditor, setShowBulkTagEditor] = useState(false);
  const [sortBy, setSortBy] = useState('created_date');
  const [sortOrder, setSortOrder] = useState('desc');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Build backend query
  const backendQuery = useMemo(() => {
    const query = { tenant_id: workspaceId };
    if (filters.status !== 'all') query.status = filters.status;
    if (filters.type !== 'all') query.client_type = filters.type;
    return query;
  }, [workspaceId, filters]);

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['contacts', workspaceId, filters],
    queryFn: async () => {
      if (!workspaceId) return [];
      return await base44.entities.Client.filter(backendQuery);
    },
    enabled: !!workspaceId && !authLoading,
    staleTime: 5 * 60 * 1000,
  });

  // Client-side search and sort
  const filteredAndSortedContacts = useMemo(() => {
    let result = contacts;
    
    // Search
    if (debouncedSearch) {
      result = result.filter(c => 
        c.company_name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
        c.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    
    // Sort
    result = [...result].sort((a, b) => {
      const aVal = a[sortBy] || '';
      const bVal = b[sortBy] || '';
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return result;
  }, [contacts, debouncedSearch, sortBy, sortOrder]);

  const { 
    paginatedItems, 
    currentPage, 
    totalPages, 
    goToPage, 
    hasNext, 
    hasPrev 
  } = usePagination(filteredAndSortedContacts, 20);

  const handleNewContact = useCallback(() => {
    navigate('/contact/new');
  }, [navigate]);

  const handleViewContact = useCallback((id) => {
    if (selectedIds.length > 0) {
      toggleSelection(id);
    } else {
      navigate(`/contact/${id}`);
    }
  }, [navigate, selectedIds]);

  const toggleSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  if (showImport) {
    return (
      <ProtectedInternalRoute>
        <ContactImportCSV 
          workspaceId={workspaceId}
          onClose={() => setShowImport(false)}
        />
      </ProtectedInternalRoute>
    );
  }

  if (showTagManager) {
    return (
      <ProtectedInternalRoute>
        <ContactTagManager 
          workspaceId={workspaceId}
          onClose={() => setShowTagManager(false)}
        />
      </ProtectedInternalRoute>
    );
  }

  return (
    <ProtectedInternalRoute>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Contatos</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {filteredAndSortedContacts.length} de {contacts.length} contato{contacts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowTagManager(true)} variant="outline" size="sm" className="gap-2">
              <Tag className="w-4 h-4" />
              Tags
            </Button>
            <Button onClick={() => setShowImport(true)} variant="outline" size="sm" className="gap-2">
              <Upload className="w-4 h-4" />
              Importar
            </Button>
            <ContactExportButton contacts={filteredAndSortedContacts} />
            <Button onClick={handleNewContact} size="sm" className="gap-2">
              <Plus className="w-5 h-5" />
              Novo
            </Button>
          </div>
        </div>

        {/* Search, Filters and Sorting */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters and Sorting */}
          <div className="flex gap-2">
            <ContactListFilters onFilterChange={setFilters} />
            <ContactSorting 
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        {/* Contacts Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-xl border p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            ) : paginatedItems.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {contacts.length === 0 ? 'Nenhum contato encontrado' : 'Nenhum contato corresponde aos filtros'}
                </p>
                <div className="flex gap-2 justify-center">
                  {contacts.length === 0 && (
                    <Button onClick={() => setShowImport(true)} variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Importar CSV
                    </Button>
                  )}
                  <Button onClick={handleNewContact} variant="outline">
                    {contacts.length === 0 ? 'Criar primeiro contato' : 'Limpar filtros'}
                  </Button>
                </div>
              </div>
            ) : (
              paginatedItems.map(contact => (
                <div
                  key={contact.id}
                  className="relative"
                  onClick={() => handleViewContact(contact.id)}
                >
                  {selectedIds.length > 0 && (
                    <div className="absolute top-2 right-2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(contact.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelection(contact.id);
                        }}
                        className="w-5 h-5 rounded border-slate-300"
                      />
                    </div>
                  )}
                  <ContactCard contact={contact} onClick={() => {}} />
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        </div>

        {/* Bulk Actions */}
        <ContactBulkActions
          selectedIds={selectedIds}
          onClearSelection={() => setSelectedIds([])}
          onEditTags={() => setShowBulkTagEditor(true)}
          userRole={user?.role}
        />

        {/* Bulk Tag Editor */}
        <ContactBulkTagEditor
          selectedIds={selectedIds}
          workspaceId={workspaceId}
          open={showBulkTagEditor}
          onClose={() => setShowBulkTagEditor(false)}
        />
      </div>
    </ProtectedInternalRoute>
  );
}