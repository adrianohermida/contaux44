import React, { useState, useEffect, useRef, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Send, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MessageBubble from './MessageBubble';
import { useMultitenantAuthOptimized } from '@/components/auth/useMultitenantAuthOptimized';

export default function VirtualCounterChat({ conversationId, onClose }) {
  const { workspaceId, user } = useMultitenantAuthOptimized('internal');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Carregar mensagens
  useEffect(() => {
    if (!conversationId) return;

    const loadMessages = async () => {
      try {
        const data = await base44.entities.VirtualCounterMessage.filter({
          conversation_id: conversationId
        });
        setMessages(data.sort((a, b) => new Date(a.created_date) - new Date(b.created_date)));
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
        setLoading(false);
      }
    };

    loadMessages();

    // Subscribe para atualizações em tempo real
    const unsubscribe = base44.entities.VirtualCounterMessage.subscribe((event) => {
      if (event.data.conversation_id === conversationId && event.type === 'create') {
        setMessages(prev => [...prev, event.data]);
      }
    });

    return unsubscribe;
  }, [conversationId]);

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || !conversationId) return;

    setSending(true);
    try {
      // Criar mensagem do visitante
      await base44.entities.VirtualCounterMessage.create({
        conversation_id: conversationId,
        sender_type: 'visitor',
        sender_name: 'Você',
        content: input
      });

      setInput('');

      // Chamar agente de IA
      const conversation = await base44.agents.getConversation(conversationId);
      await base44.agents.addMessage(conversation, {
        role: 'user',
        content: input
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setSending(false);
    }
  }, [input, conversationId]);

  if (loading) {
    return (
      <div className="h-96 bg-white rounded-lg shadow flex items-center justify-center">
        <div className="text-slate-500">Carregando conversa...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-96 sm:h-[500px]">
      {/* Header */}
      <div className="border-b p-3 sm:p-4 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <h3 className="font-semibold">Balcão Virtual</h3>
        <Button size="icon" variant="ghost" onClick={onClose} className="text-white hover:bg-blue-600">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            <p className="text-sm">Inicie uma conversa</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              isUser={msg.sender_type === 'visitor'}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 sm:p-4 bg-slate-50 rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua mensagem..."
            disabled={sending}
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSendMessage}
            disabled={sending || !input.trim()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}