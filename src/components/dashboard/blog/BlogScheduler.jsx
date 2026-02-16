import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Send } from 'lucide-react';

export default function BlogScheduler({ blogData, onSchedule }) {
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('09:00');
  const [autoShare, setAutoShare] = useState({
    twitter: false,
    facebook: false,
    linkedin: false
  });

  const handleSchedule = () => {
    if (!scheduledDate) {
      alert('Selecione uma data para agendamento');
      return;
    }

    const scheduled = new Date(`${scheduledDate}T${scheduledTime}`);
    
    onSchedule({
      scheduled_date: scheduled.toISOString(),
      status: 'scheduled',
      auto_share: autoShare
    });
  };

  const handlePublishNow = () => {
    onSchedule({
      publish_date: new Date().toISOString(),
      status: 'published',
      auto_share: autoShare
    });
  };

  return (
    <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-semibold text-slate-900">Publicação e Agendamento</h3>

      {/* Data e Hora */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-2">Data de Publicação</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Horário</label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full pl-10 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Compartilhamento Automático */}
      <div>
        <label className="block text-sm font-medium mb-2">Compartilhar Automaticamente</label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoShare.twitter}
              onChange={(e) => setAutoShare({ ...autoShare, twitter: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm">Twitter/X</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoShare.facebook}
              onChange={(e) => setAutoShare({ ...autoShare, facebook: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm">Facebook</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoShare.linkedin}
              onChange={(e) => setAutoShare({ ...autoShare, linkedin: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm">LinkedIn</span>
          </label>
        </div>
      </div>

      {/* Ações */}
      <div className="flex gap-2 pt-2 border-t border-slate-200">
        <Button
          onClick={handlePublishNow}
          className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
        >
          <Send className="w-4 h-4" />
          Publicar Agora
        </Button>

        <Button
          onClick={handleSchedule}
          variant="outline"
          className="flex-1 gap-2"
        >
          <Clock className="w-4 h-4" />
          Agendar Publicação
        </Button>
      </div>

      {scheduledDate && (
        <p className="text-xs text-slate-600 text-center">
          Será publicado em {new Date(`${scheduledDate}T${scheduledTime}`).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      )}
    </div>
  );
}