import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useGlobalAuth } from '../components/auth/useGlobalAuth';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import UnifiedHeader from '../components/shared/UnifiedHeader';
import UnifiedFiltersBar from '../components/shared/UnifiedFiltersBar';
import UnifiedGrid from '../components/shared/UnifiedGrid';
import ContactGridItem from '../components/dashboard/contact/ContactGridItem';
import { Tag, TrendingUp } from 'lucide-react';
import ContactExportButton from '../components/dashboard/ContactExportButton';
import ContactModals from '../components/dashboard/contact/ContactModals';
import UnifiedContactForm from '../components/contact/shared/UnifiedContactForm';
import ContactBulkActions from '../components/dashboard/ContactBulkActions';
import ContactBulkTagEditor from '../components/dashboard/ContactBulkTagEditor';
import ContactExportCSV from '../components/dashboard/contact/ContactExportCSV';
import ContactImportCSVDialog from '../components/dashboard/contact/ContactImportCSVDialog';
import ContactTagManagerDialog from '../components/dashboard/contact/ContactTagManagerDialog';
import ContactRelationshipManagerDialog from '../components/dashboard/contact/ContactRelationshipManagerDialog';
import { usePagination } from '../components/hooks/usePagination';
import { useDebounce } from '../components/hooks/useDebounce';
import { buildContactQuery, normalizeAssignments, createTagMap, getContactTags, filterBySearch, sortContacts } from '../components/dashboard/ContactQueryHelpers';
import { withRateLimit } from '../components/security/RateLimiter';

export default function Contact() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { workspaceId, user, loading: authLoading } = useGlobalAuth('internal');
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', type: 'all', tag: 'all' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortBy, setSortBy] = useState('created_date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Modal state
  const [modalState, setModalState] = useState({
    createContact: false,
    import: false,
    importCSV: false,
    tagManager: false,
    tagStats: false,
    bulkTagEditor: false,
    tagManagerNew: false,
    relationshipManager: false,
    relationshipContactId: null,
  });
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Build backend query
  const backendQuery = useMemo(() => {
    return buildContactQuery(workspaceId, filters);
  }, [workspaceId, filters]);

  // Rate-limited Contact fetch
   const limitedContactFetch = useCallback(
     withRateLimit(
       () => base44.entities.Client.filter(backendQuery),
       'contacts.list',
       15,
       60000
     ),
     [backendQuery]
   );

   // Query 1: Contacts (with rate limiting + error handling)
   const { data: contacts = [], isLoading, error: contactsError, refetch } = useQuery({
     queryKey: ['contacts', workspaceId, filters],
     queryFn: limitedContactFetch,
     enabled: !!workspaceId && !authLoading,
     staleTime: 5 * 60 * 1000,
     gcTime: 10 * 60 * 1000,
     retry: 2,
     retryDelay: 1000
   });

  // Subscribe to real-time contact updates
  React.useEffect(() => {
    if (!workspaceId) return;
    const unsubscribe = base44.entities.Client.subscribe((event) => {
      if (event.data?.tenant_id === workspaceId) {
        queryClient.invalidateQueries({ queryKey: ['contacts', workspaceId] });
      }
    });
    return unsubscribe;
  }, [workspaceId, queryClient]);

  // Query 2: Tags (once per workspace) - longer cache
  const { data: tags = [] } = useQuery({
    queryKey: ['contact-tags', workspaceId],
    queryFn: async () => {
      return await base44.entities.ContactTag.filter({ workspace_id: workspaceId });
    },
    enabled: !!workspaceId,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  // Query 3: Assignments (once per workspace) - longer cache
  const { data: allAssignments = [] } = useQuery({
    queryKey: ['all-contact-tag-assignments', workspaceId],
    queryFn: async () => {
      return await base44.entities.ContactTagAssignment.filter({ workspace_id: workspaceId });
    },
    enabled: !!workspaceId,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  // Memoize normalized lookups (O(1) instead of O(n))
  const assignmentMap = useMemo(() => normalizeAssignments(allAssignments), [allAssignments]);
  const tagsMap = useMemo(() => createTagMap(tags), [tags]);

  // Client-side search, filter by tag, and sort (optimized)
  const filteredAndSortedContacts = useMemo(() => {
    let result = contacts;
    
    // Search
    result = filterBySearch(result, debouncedSearch);

    // Filter by tag
    if (filters.tag && filters.tag !== 'all') {
      const contactIdsWithTag = allAssignments
        .filter(a => a.tag_id === filters.tag)
        .map(a => a.contact_id);
      result = result.filter(c => contactIdsWithTag.includes(c.id));
    }
    
    // Sort
    result = sortContacts(result, sortBy, sortOrder);
    
    return result;
  }, [contacts, debouncedSearch, sortBy, sortOrder, filters.tag, allAssignments]);

  const { 
    paginatedItems, 
    currentPage, 
    totalPages, 
    goToPage, 
    hasNext, 
    hasPrev 
  } = usePagination(filteredAndSortedContacts, 20);

  // Handlers
  const handleNewContact = useCallback(() => {
    openModal('createContact');
  }, []);

  const handleViewContact = useCallback((id) => {
    if (selectedIds.length > 0) {
      setSelectedIds(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    } else {
      navigate(`/contact/${id}`);
    }
  }, [navigate, selectedIds]);

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const openModal = (modalName) => {
    setModalState(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModalState(prev => ({ ...prev, [modalName]: false }));
  };



  // Show error state if contacts query failed
  if (contactsError) {
    return (
      <ProtectedInternalRoute>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center" role="alert" aria-live="polite">
          <p className="text-red-600 dark:text-red-400 mb-4">Erro ao carregar contatos</p>
          <button 
            onClick={() => refetch()} 
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1"
            aria-label="Tentar carregar contatos novamente"
          >
            Tentar novamente
          </button>
        </div>
      </ProtectedInternalRoute>
    );
  }

  return (
    <ProtectedInternalRoute>
      <div className="space-y-6 pb-20 min-h-screen" role="main" aria-label="Gerenciador de contatos">
        <UnifiedHeader
          title="Contatos"
          filteredCount={filteredAndSortedContacts.length}
          totalCount={contacts.length}
          itemName="contato"
          onNewItem={handleNewContact}
          onImportClick={() => openModal('importCSV')}
          actionButtons={[
            { label: 'Estatísticas', icon: TrendingUp, onClick: () => openModal('tagStats') },
            { label: 'Tags', icon: Tag, onClick: () => openModal('tagManagerNew') },
            { label: 'Exportar', component: () => <ContactExportCSV contacts={filteredAndSortedContacts} workspaceId={workspaceId} /> }
          ]}
        />

        <UnifiedFiltersBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          additionalFilters={[
            {
              key: 'type',
              label: 'Tipo',
              options: [
                { value: 'pf', label: 'Pessoa Física' },
                { value: 'pj', label: 'Pessoa Jurídica' }
              ]
            },
            {
              key: 'tag',
              label: 'Tags',
              options: tags.map(tag => ({ value: tag.id, label: tag.name }))
            }
          ]}
        />

        <UnifiedGrid
          items={paginatedItems}
          isLoading={isLoading}
          renderItem={(contact) => {
            const contactTags = getContactTags(contact.id, assignmentMap, tagsMap);
            return (
              <ContactGridItem
                key={contact.id}
                contact={contact}
                tags={contactTags}
                isSelected={selectedIds.includes(contact.id)}
                onSelect={(id) => setSelectedIds(prev => 
                  prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
                )}
                onView={handleViewContact}
                showCheckbox={selectedIds.length > 0}
              />
            );
          }}
          emptyMessage={contacts.length === 0 ? 'Nenhum contato encontrado' : 'Nenhum contato corresponde aos filtros'}
          onNewItem={handleNewContact}
          onImportClick={() => openModal('importCSV')}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />

        <ContactBulkActions
          selectedIds={selectedIds}
          onClearSelection={() => setSelectedIds([])}
          onEditTags={() => openModal('bulkTagEditor')}
          userRole={user?.role}
          workspaceId={workspaceId}
        />

        <ContactBulkTagEditor
          selectedIds={selectedIds}
          workspaceId={workspaceId}
          open={modalState.bulkTagEditor}
          onClose={() => closeModal('bulkTagEditor')}
        />

        <UnifiedContactForm
          open={modalState.createContact}
          onClose={() => closeModal('createContact')}
          workspaceId={workspaceId}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['contacts', workspaceId] });
          }}
          type="full"
          modalType="custom"
        />

        <ContactModals
          showImport={false}
          onCloseImport={() => {}}
          showTagManager={modalState.tagManager}
          onCloseTagManager={() => closeModal('tagManager')}
          showTagStats={modalState.tagStats}
          onCloseTagStats={() => closeModal('tagStats')}
          workspaceId={workspaceId}
        />

        <ContactImportCSVDialog
          open={modalState.importCSV}
          onClose={() => closeModal('importCSV')}
          workspaceId={workspaceId}
        />

        <ContactTagManagerDialog
          open={modalState.tagManagerNew}
          onClose={() => closeModal('tagManagerNew')}
          workspaceId={workspaceId}
        />

        <ContactRelationshipManagerDialog
          open={modalState.relationshipManager}
          onClose={() => {
            setModalState(prev => ({ ...prev, relationshipManager: false, relationshipContactId: null }));
          }}
          contactId={modalState.relationshipContactId}
          workspaceId={workspaceId}
        />
      </div>
    </ProtectedInternalRoute>
  );
}