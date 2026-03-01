import React, { useState, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import ClientsHeader from '../components/dashboard/clients/ClientsHeader';
import ClientsFiltersBar from '../components/dashboard/clients/ClientsFiltersBar';
import ClientsGrid from '../components/dashboard/clients/ClientsGrid';
import ClientsModals from '../components/dashboard/clients/ClientsModals';
import ClientCreateModal from '../components/dashboard/clients/ClientCreateModal';
import { useDebounce } from '../components/hooks/useDebounce';
import { usePagination } from '../components/hooks/usePagination';

export default function Clients() {
  const queryClient = useQueryClient();
  const { workspaceId, loading: authLoading } = useGlobalAuth('internal');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', type: 'all' });
  const [sortBy, setSortBy] = useState('created_date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const [modalState, setModalState] = useState({
    createClient: false,
    import: false,
    bulkActions: false
  });
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients', workspaceId, filters],
    queryFn: async () => {
      const query = {
        workspace_id: workspaceId,
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.type !== 'all' && { client_type: filters.type })
      };
      return await base44.entities.Client.filter(query);
    },
    enabled: !!workspaceId && !authLoading,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const filteredAndSortedClients = useMemo(() => {
    let result = clients;
    
    if (debouncedSearch) {
      result = result.filter(c =>
        c.company_name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        c.email?.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    result = result.sort((a, b) => {
      const aVal = a[sortBy] || '';
      const bVal = b[sortBy] || '';
      return sortOrder === 'desc' ? String(bVal).localeCompare(String(aVal)) : String(aVal).localeCompare(String(bVal));
    });

    return result;
  }, [clients, debouncedSearch, sortBy, sortOrder]);

  const { paginatedItems, currentPage, totalPages, goToPage, hasNext, hasPrev } = 
    usePagination(filteredAndSortedClients, 20);

  const openModal = (name) => setModalState(prev => ({ ...prev, [name]: true }));
  const closeModal = (name) => setModalState(prev => ({ ...prev, [name]: false }));

  return (
    <ProtectedInternalRoute>
      <div className="space-y-6 pb-20">
        <ClientsHeader
          totalCount={clients.length}
          filteredCount={filteredAndSortedClients.length}
          onNewClient={() => openModal('createClient')}
          onImportClick={() => openModal('import')}
        />

        <ClientsFiltersBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={(field, order) => {
            setSortBy(field);
            setSortOrder(order);
          }}
        />

        <ClientsGrid
          clients={paginatedItems}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />

        <ClientCreateModal
          open={modalState.createClient}
          onClose={() => closeModal('createClient')}
          workspaceId={workspaceId}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['clients', workspaceId] });
            closeModal('createClient');
          }}
        />

        <ClientsModals
          showImport={modalState.import}
          onCloseImport={() => closeModal('import')}
          workspaceId={workspaceId}
        />
      </div>
    </ProtectedInternalRoute>
  );
}