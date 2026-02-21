import React, { useState } from 'react';
import { Link2, Plus, Trash2, Search, Building2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const RELATIONSHIP_TYPES = {
  matriz_filial: { label: 'Matriz/Filial', icon: Building2, color: 'blue' },
  grupo_economico: { label: 'Grupo Econômico', icon: Users, color: 'purple' },
  parceiro: { label: 'Parceiro', icon: Link2, color: 'green' },
  fornecedor: { label: 'Fornecedor', icon: Link2, color: 'orange' },
  cliente: { label: 'Cliente', icon: Link2, color: 'indigo' },
  outro: { label: 'Outro', icon: Link2, color: 'gray' },
};

export default function ContactRelationshipManager({ contactId, workspaceId }) {
  const [showDialog, setShowDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [relationshipType, setRelationshipType] = useState('parceiro');
  const [notes, setNotes] = useState('');
  const queryClient = useQueryClient();

  // Fetch relationships
  const { data: relationships = [], isLoading } = useQuery({
    queryKey: ['contact-relationships', contactId],
    queryFn: async () => {
      const outgoing = await base44.entities.ContactRelationship.filter({ contact_id: contactId });
      const incoming = await base44.entities.ContactRelationship.filter({ related_contact_id: contactId });
      return [...outgoing, ...incoming];
    },
    enabled: !!contactId,
  });

  // Fetch all contacts for search
  const { data: allContacts = [] } = useQuery({
    queryKey: ['contacts-search', workspaceId],
    queryFn: () => base44.entities.Client.filter({ tenant_id: workspaceId }),
    enabled: !!workspaceId && showDialog,
  });

  // Get related contacts details
  const relatedContactIds = [
    ...relationships.filter(r => r.contact_id === contactId).map(r => r.related_contact_id),
    ...relationships.filter(r => r.related_contact_id === contactId).map(r => r.contact_id),
  ];

  const { data: relatedContacts = [] } = useQuery({
    queryKey: ['related-contacts', relatedContactIds],
    queryFn: async () => {
      const contacts = await Promise.all(
        relatedContactIds.map(id => base44.entities.Client.get(id))
      );
      return contacts;
    },
    enabled: relatedContactIds.length > 0,
  });

  const createRelationshipMutation = useMutation({
    mutationFn: async ({ relatedContactId, type, notes }) => {
      const relationship = await base44.entities.ContactRelationship.create({
        workspace_id: workspaceId,
        contact_id: contactId,
        related_contact_id: relatedContactId,
        relationship_type: type,
        notes: notes || '',
        is_reciprocal: true,
      });

      // Create activity
      const contact = relatedContacts.find(c => c.id === relatedContactId);
      await base44.entities.ContactActivity.create({
        workspace_id: workspaceId,
        contact_id: contactId,
        activity_type: 'edit',
        description: `Relacionamento criado com ${contact?.company_name || 'contato'}`,
        metadata: {
          relationship_id: relationship.id,
          relationship_type: type,
          related_contact_id: relatedContactId,
        },
      });

      return relationship;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-relationships'] });
      queryClient.invalidateQueries({ queryKey: ['contact-activities'] });
      handleCloseDialog();
    },
  });

  const deleteRelationshipMutation = useMutation({
    mutationFn: async (relationshipId) => {
      await base44.entities.ContactRelationship.delete(relationshipId);

      // Create activity
      await base44.entities.ContactActivity.create({
        workspace_id: workspaceId,
        contact_id: contactId,
        activity_type: 'edit',
        description: 'Relacionamento removido',
        metadata: { relationship_id: relationshipId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-relationships'] });
      queryClient.invalidateQueries({ queryKey: ['contact-activities'] });
    },
  });

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedContact(null);
    setSearchTerm('');
    setRelationshipType('parceiro');
    setNotes('');
  };

  const handleCreate = () => {
    if (!selectedContact) return;
    createRelationshipMutation.mutate({
      relatedContactId: selectedContact.id,
      type: relationshipType,
      notes,
    });
  };

  const availableContacts = allContacts
    .filter(c => c.id !== contactId)
    .filter(c => !relatedContactIds.includes(c.id))
    .filter(c => c.company_name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Relacionamentos</h3>
        <Button onClick={() => setShowDialog(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar
        </Button>
      </div>

      {isLoading ? (
        <p className="text-center text-slate-500 py-8">Carregando...</p>
      ) : relationships.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Link2 className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
              Nenhum relacionamento cadastrado
            </p>
            <Button onClick={() => setShowDialog(true)} variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Adicionar primeiro relacionamento
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {relationships.map((rel) => {
            const isOutgoing = rel.contact_id === contactId;
            const relatedId = isOutgoing ? rel.related_contact_id : rel.contact_id;
            const relatedContact = relatedContacts.find(c => c.id === relatedId);
            const typeConfig = RELATIONSHIP_TYPES[rel.relationship_type];
            const Icon = typeConfig?.icon || Link2;

            return (
              <Card key={rel.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-${typeConfig?.color || 'gray'}-100`}>
                      <Icon className={`w-4 h-4 text-${typeConfig?.color || 'gray'}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {relatedContact?.company_name || 'Carregando...'}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full bg-${typeConfig?.color || 'gray'}-100 text-${typeConfig?.color || 'gray'}-700`}>
                          {typeConfig?.label || rel.relationship_type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {relatedContact?.email || ''}
                      </p>
                      {rel.notes && (
                        <p className="text-xs text-slate-500 mt-2">{rel.notes}</p>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        if (window.confirm('Remover este relacionamento?')) {
                          deleteRelationshipMutation.mutate(rel.id);
                        }
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={(o) => !o && handleCloseDialog()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Relacionamento</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Buscar Contato</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Digite o nome do contato..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {searchTerm && (
              <div className="max-h-48 overflow-auto border rounded-lg">
                {availableContacts.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">
                    Nenhum contato encontrado
                  </p>
                ) : (
                  availableContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => {
                        setSelectedContact(contact);
                        setSearchTerm('');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <p className="text-sm font-medium">{contact.company_name}</p>
                      <p className="text-xs text-slate-500">{contact.email}</p>
                    </button>
                  ))
                )}
              </div>
            )}

            {selectedContact && (
              <Card className="bg-blue-50 dark:bg-blue-900 border-blue-200">
                <CardContent className="pt-4">
                  <p className="text-sm font-medium">{selectedContact.company_name}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{selectedContact.email}</p>
                </CardContent>
              </Card>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Relacionamento</label>
              <select
                value={relationshipType}
                onChange={(e) => setRelationshipType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-slate-800"
              >
                {Object.entries(RELATIONSHIP_TYPES).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Observações (opcional)</label>
              <Input
                placeholder="Detalhes sobre o relacionamento..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleCloseDialog} variant="outline">
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!selectedContact || createRelationshipMutation.isPending}
            >
              {createRelationshipMutation.isPending ? 'Criando...' : 'Criar Relacionamento'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}