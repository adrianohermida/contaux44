import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import ContactListFilters from '../components/dashboard/ContactListFilters';
import ContactExportButton from '../components/dashboard/ContactExportButton';
import ContactCard from '../components/dashboard/ContactCard';
import { usePagination } from '../components/hooks/usePagination';
import { Pagination } from '../components/ui/pagination';
import { useDebounce } from '../components/hooks/useDebounce';

export default function Contact() {
  const navigate = useNavigate();
  const { workspaceId, loading: authLoading } = useMultitenantAuthOptimized('internal');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', type: 'all' });
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

  // Client-side search only (backend doesn't support LIKE queries)
  const filteredContacts = useMemo(() => {
    if (!debouncedSearch) return contacts;
    return contacts.filter(c => 
      c.company_name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
      c.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [contacts, debouncedSearch]);

  const { 
    paginatedItems, 
    currentPage, 
    totalPages, 
    goToPage, 
    hasNext, 
    hasPrev 
  } = usePagination(filteredContacts, 20);

  const handleNewContact = useCallback(() => {
    navigate('/contact/new');
  }, [navigate]);

  const handleViewContact = useCallback((contactId) => {
    navigate(`/contact/${contactId}`);
  }, [navigate]);

  return (
    <ProtectedInternalRoute>
      <div className="space-y-6">
        {/* Header */}
           <div className="flex justify-between items-center">
             <div>
               <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Contatos</h1>
               <p className="text-slate-600 dark:text-slate-400 mt-1">{filteredContacts.length} contato{filteredContacts.length !== 1 ? 's' : ''}</p>
             </div>
             <div className="flex gap-2">
               <ContactExportButton contacts={filteredContacts} />
               <Button 
                 onClick={handleNewContact}
                 className="bg-blue-600 hover:bg-blue-700"
               >
                 <Plus className="w-5 h-5 mr-2" />
                 Novo Contato
               </Button>
             </div>
           </div>

           {/* Search */}
           <div className="relative">
             <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
             <Input
               placeholder="Buscar contato por nome ou email..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="pl-10"
             />
           </div>

           {/* Filters */}
           <ContactListFilters onFilterChange={setFilters} />

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
                <Button onClick={handleNewContact} variant="outline">
                  {contacts.length === 0 ? 'Criar primeiro contato' : 'Limpar filtros'}
                </Button>
              </div>
            ) : (
              paginatedItems.map(contact => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onClick={() => handleViewContact(contact.id)}
                />
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
      </div>
    </ProtectedInternalRoute>
  );
}