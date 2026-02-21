import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ContactNoteForm from './ContactNoteForm';
import NotesHeader from './notes/NotesHeader';
import NotesList from './notes/NotesList';

export default function ContactNotesList({ contactId, workspaceId }) {
   const [showForm, setShowForm] = useState(false);
   const [editingNote, setEditingNote] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [page, setPage] = useState(1);
   const ITEMS_PER_PAGE = 20;
   const queryClient = useQueryClient();

   const { data: allNotes = [], isLoading } = useQuery({
     queryKey: ['contact-notes', contactId, workspaceId],
     queryFn: async () => {
       const data = await base44.entities.ContactNote.filter({ 
         contact_id: contactId,
         workspace_id: workspaceId
       });
       return data.sort((a, b) => {
         if (a.is_pinned && !b.is_pinned) return -1;
         if (!a.is_pinned && b.is_pinned) return 1;
         return new Date(b.created_date) - new Date(a.created_date);
       });
     },
     enabled: !!contactId && !!workspaceId,
   });

   const notes = allNotes.slice(0, page * ITEMS_PER_PAGE);

  const createNoteMutation = useMutation({
    mutationFn: async (data) => {
      if (!workspaceId || !contactId) throw new Error('Workspace ID required');
      const note = await base44.entities.ContactNote.create({
        ...data,
        workspace_id: workspaceId,
        contact_id: contactId,
      });

      await base44.entities.ContactActivity.create({
        workspace_id: workspaceId,
        contact_id: contactId,
        activity_type: 'note',
        description: `Nota adicionada: ${NOTE_TYPE_LABELS[data.note_type]}`,
        metadata: { note_id: note.id, note_type: data.note_type },
      });

      return note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-notes', contactId, workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['contact-activities', contactId, workspaceId] });
      setShowForm(false);
    },
    onError: () => {
      throw new Error('Erro ao adicionar nota');
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      return await base44.entities.ContactNote.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-notes'] });
      setShowForm(false);
      setEditingNote(null);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id) => {
      if (!workspaceId) throw new Error('Workspace ID required');
      await base44.entities.ContactActivity.create({
        workspace_id: workspaceId,
        contact_id: contactId,
        activity_type: 'note',
        description: 'Nota deletada',
        metadata: { deleted_note_id: id },
      });
      return await base44.entities.ContactNote.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-notes', contactId, workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['contact-activities', contactId, workspaceId] });
    },
    onError: () => {
      throw new Error('Erro ao deletar nota');
    },
  });

  const handleSubmit = (data) => {
    if (editingNote) {
      updateNoteMutation.mutate({ id: editingNote.id, data });
    } else {
      createNoteMutation.mutate(data);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDelete = (note) => {
    if (window.confirm('Deletar esta nota?')) {
      deleteNoteMutation.mutate(note.id);
    }
  };

  const { pinnedNotes, regularNotes, hasMore } = useMemo(() => {
    const filtered = notes.filter(note =>
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      pinnedNotes: filtered.filter(n => n.is_pinned),
      regularNotes: filtered.filter(n => !n.is_pinned),
      hasMore: allNotes.length > notes.length
    };
  }, [notes, searchTerm, allNotes.length]);

  if (showForm) {
    return (
      <ContactNoteForm
        editNote={editingNote}
        onSubmit={handleSubmit}
        onCancel={() => {
          setShowForm(false);
          setEditingNote(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <NotesHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddNote={() => setShowForm(true)}
      />

      {isLoading ? (
        <p className="text-center text-slate-500 py-8">Carregando notas...</p>
      ) : (
        <NotesList
          pinnedNotes={pinnedNotes}
          regularNotes={regularNotes}
          hasMore={hasMore}
          allNotesCount={allNotes.length}
          displayedNotesCount={notes.length}
          onLoadMore={() => setPage(p => p + 1)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddNote={() => setShowForm(true)}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
}