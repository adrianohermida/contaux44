import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import ContactHeader from '../components/dashboard/contact/ContactHeader';
import ContactFiltersBar from '../components/dashboard/contact/ContactFiltersBar';
import ContactGrid from '../components/dashboard/contact/ContactGrid';
import ContactModals from '../components/dashboard/contact/ContactModals';
import ContactBulkActions from '../components/dashboard/ContactBulkActions';
import ContactBulkTagEditor from '../components/dashboard/ContactBulkTagEditor';
import { usePagination } from '../components/hooks/usePagination';
import { useDebounce } from '../components/hooks/useDebounce';
import { buildContactQuery, normalizeAssignments, createTagMap, getContactTags, filterBySearch, sortContacts } from '../components/dashboard/ContactQueryHelpers';
import { withRateLimit } from '../components/security/RateLimiter';

export default function Contact() {
  const navigate = useNavigate();
  const { workspaceId, user, loading: authLoading } = useMultitenantAuthOptimized('internal');
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', type: 'all' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortBy, setSortBy] = useState('created_date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Modal state
  const [modalState, setModalState] = useState({
    import: false,
    tagManager: false,
    tagStats: false,
    bulkTagEditor: false
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
       15, // Allow 15 requests per minute for list
       60000
     ),
     [backendQuery]
   );

   // Query 1: Contacts (with rate limiting)
   const { data: contacts = [], isLoading } = useQuery({
     queryKey: ['contacts', workspaceId, filters],
     queryFn: limitedContactFetch,
     enabled: !!workspaceId && !authLoading,
     staleTime: 5 * 60 * 1000,
     gcTime: 10 * 60 * 1000,
   });

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
    navigate('/contact/new');
  }, [navigate]);

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



  return (
    <ProtectedInternalRoute>
      <div className="space-y-6 pb-20">
        <ContactHeader
          filteredCount={filteredAndSortedContacts.length}
          totalCount={contacts.length}
          onNewContact={handleNewContact}
          onImportClick={() => openModal('import')}
          onTagsClick={() => openModal('tagManager')}
          onStatsClick={() => openModal('tagStats')}
          contacts={filteredAndSortedContacts}
        />

        <ContactFiltersBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFiltersChange={setFilters}
          tags={tags}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />

        <ContactGrid
          paginatedItems={paginatedItems}
          isLoading={isLoading}
          selectedIds={selectedIds}
          onSelect={(id) => setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
          )}
          onViewContact={handleViewContact}
          contacts={contacts}
          allAssignments={allAssignments}
          tagsMap={tagsMap}
          assignmentMap={assignmentMap}
          getContactTags={getContactTags}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onNewContact={handleNewContact}
          onImportClick={() => openModal('import')}
        />

        <ContactBulkActions
          selectedIds={selectedIds}
          onClearSelection={() => setSelectedIds([])}
          onEditTags={() => openModal('bulkTagEditor')}
          userRole={user?.role}
        />

        <ContactBulkTagEditor
          selectedIds={selectedIds}
          workspaceId={workspaceId}
          open={modalState.bulkTagEditor}
          onClose={() => closeModal('bulkTagEditor')}
        />

        <ContactModals
          showImport={modalState.import}
          onCloseImport={() => closeModal('import')}
          showTagManager={modalState.tagManager}
          onCloseTagManager={() => closeModal('tagManager')}
          showTagStats={modalState.tagStats}
          onCloseTagStats={() => closeModal('tagStats')}
          workspaceId={workspaceId}
        />
      </div>
    </ProtectedInternalRoute>
  );
}