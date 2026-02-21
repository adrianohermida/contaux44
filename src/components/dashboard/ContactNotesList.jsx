import React, { useState } from 'react';
import { Plus, FileText, Phone, Users, Mail, CheckSquare, Pin, Edit2, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ContactNoteForm from './ContactNoteForm';

const NOTE_TYPE_ICONS = {
  general: FileText,
  call: Phone,
  meeting: Users,
  email: Mail,
  task: CheckSquare,
};

const NOTE_TYPE_LABELS = {
  general: 'Geral',
  call: 'Ligação',
  meeting: 'Reunião',
  email: 'Email',
  task: 'Tarefa',
};

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

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(n => n.is_pinned);
  const regularNotes = filteredNotes.filter(n => !n.is_pinned);
  const hasMore = allNotes.length > notes.length;

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
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar notas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Nota
        </Button>
      </div>

      {isLoading ? (
        <p className="text-center text-slate-500 py-8">Carregando notas...</p>
      ) : filteredNotes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-slate-400 mb-4" />
            <p className="text-slate-600 dark:text-slate-400 text-center">
              {searchTerm ? 'Nenhuma nota encontrada' : 'Nenhuma nota ainda'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowForm(true)} variant="outline" size="sm" className="mt-4 gap-2">
                <Plus className="w-4 h-4" />
                Adicionar primeira nota
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pinnedNotes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Pin className="w-4 h-4" />
                FIXADAS
              </h3>
              {pinnedNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {regularNotes.length > 0 && (
            <div className="space-y-2">
              {pinnedNotes.length > 0 && (
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  TODAS AS NOTAS
                </h3>
              )}
              {regularNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {hasMore && (
            <Button 
              onClick={() => setPage(p => p + 1)}
              variant="outline"
              className="w-full"
            >
              Carregar mais ({allNotes.length - notes.length} restantes)
            </Button>
          )}
          </div>
          )}
    </div>
  );
}

function NoteItem({ note, onEdit, onDelete }) {
  const Icon = NOTE_TYPE_ICONS[note.note_type];
  const timeAgo = formatDistanceToNow(new Date(note.created_date), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <Card className="relative">
      {note.is_pinned && (
        <div className="absolute top-2 left-2">
          <Pin className="w-4 h-4 text-blue-600 fill-blue-600" />
        </div>
      )}
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
            <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-slate-500">
                {NOTE_TYPE_LABELS[note.note_type]}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{timeAgo}</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{note.created_by}</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
              {note.content}
            </p>
          </div>
          <div className="flex gap-1">
            <Button
              onClick={() => onEdit(note)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onDelete(note)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}