import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import ProtectedInternalRoute from '../components/auth/ProtectedInternalRoute';
import ContactListFilters from '../components/dashboard/ContactListFilters';
import ContactExportButton from '../components/dashboard/ContactExportButton';

export default function Contact() {
  const navigate = useNavigate();
  const { workspaceId, loading: authLoading } = useMultitenantAuthOptimized('internal');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', type: 'all' });

  const { data: contacts = [], isLoading, error } = useQuery({
    queryKey: ['contacts', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      return await base44.entities.Client.filter({ tenant_id: workspaceId });
    },
    enabled: !!workspaceId && !authLoading,
    staleTime: 5 * 60 * 1000,
  });

  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      const matchSearch = !searchTerm || 
        c.company_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = filters.status === 'all' || c.status === filters.status;
      const matchType = filters.type === 'all' || c.client_type === filters.type;
      
      return matchSearch && matchStatus && matchType;
    });
  }, [contacts, searchTerm, filters]);

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
           <ContactListFilters 
             onFilterChange={setFilters}
             activeFilters={filters}
           />

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredContacts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {contacts.length === 0 ? 'Nenhum contato encontrado' : 'Nenhum contato corresponde aos filtros'}
              </p>
              <Button onClick={handleNewContact} variant="outline">
                {contacts.length === 0 ? 'Criar primeiro contato' : 'Limpar filtros'}
              </Button>
            </div>
          ) : (
            filteredContacts.map(contact => (
              <Card 
                key={contact.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden"
                onClick={() => handleViewContact(contact.id)}
              >
                {new Date(contact.created_date).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded-bl-lg flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Novo
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{contact.company_name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">{contact.email}</p>
                  {contact.phone && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">{contact.phone}</p>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${contact.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {contact.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {contact.client_type === 'pf' ? 'PF' : 'PJ'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </ProtectedInternalRoute>
  );
}