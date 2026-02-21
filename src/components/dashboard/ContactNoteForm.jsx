import React, { useState } from 'react';
import { FileText, Phone, Users, Mail, CheckSquare, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NOTE_TYPES = [
  { value: 'general', label: 'Geral', icon: FileText },
  { value: 'call', label: 'Ligação', icon: Phone },
  { value: 'meeting', label: 'Reunião', icon: Users },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'task', label: 'Tarefa', icon: CheckSquare },
];

export default function ContactNoteForm({ onSubmit, onCancel, editNote = null }) {
  const [formData, setFormData] = useState({
    content: editNote?.content || '',
    note_type: editNote?.note_type || 'general',
    is_pinned: editNote?.is_pinned || false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editNote ? 'Editar Nota' : 'Nova Nota'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tipo</label>
            <div className="grid grid-cols-5 gap-2">
              {NOTE_TYPES.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({ ...formData, note_type: value })}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    formData.note_type === value
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Conteúdo</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Escreva sua nota aqui..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_pinned"
              checked={formData.is_pinned}
              onChange={(e) => setFormData({ ...formData, is_pinned: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="is_pinned" className="text-sm flex items-center gap-1">
              <Pin className="w-4 h-4" />
              Fixar nota no topo
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onCancel} variant="outline">
              Cancelar
            </Button>
            <Button type="submit">
              {editNote ? 'Atualizar' : 'Adicionar'} Nota
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}