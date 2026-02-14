import React, { useState } from 'react';
import { LogOut, Users, MessageSquare, PhoneCall } from 'lucide-react';
import { useVoxImplant } from '../components/hooks/useVoxImplant';
import LoginForm from '../components/voximplant/LoginForm';
import CallUI from '../components/voximplant/CallUI';
import ChatUI from '../components/voximplant/ChatUI';
import ContactItem from '../components/voximplant/ContactItem';

export default function Dashboard() {
  const { isAuthenticated, logout, startCall, currentUser } = useVoxImplant();
  const [selectedChatContact, setSelectedChatContact] = useState(null);

  // Mock contacts data
  const contacts = [
    { id: 1, name: 'Dr. João Silva', email: 'joao@contaux.com', phone: 'joao' },
    { id: 2, name: 'Dra. Camila Mendes', email: 'camila@contaux.com', phone: 'camila' },
    { id: 3, name: 'Dr. Ricardo Almeida', email: 'ricardo@contaux.com', phone: 'ricardo' },
    { id: 4, name: 'Maria Santos', email: 'maria@contaux.com', phone: 'maria' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    );
  }

  const handleCall = (contact) => {
    startCall(contact.phone, 'voice');
  };

  const handleChat = (contact) => {
    setSelectedChatContact(contact);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contaux VoIP</h1>
            <p className="text-sm text-slate-600">
              Bem-vindo, {currentUser?.username || 'Usuário'}
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Contacts List */}
          <div className="md:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">Contatos</h2>
              </div>
              <p className="text-sm text-slate-600">
                {contacts.length} contatos disponíveis
              </p>
            </div>

            <div className="divide-y divide-slate-200">
              {contacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  onCall={handleCall}
                  onChat={handleChat}
                  isOnline={Math.random() > 0.5}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {/* Calls Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Chamadas Hoje</p>
                  <p className="text-3xl font-bold">0</p>
                </div>
                <PhoneCall className="w-12 h-12 opacity-20" />
              </div>
            </div>

            {/* Messages Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Mensagens</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <MessageSquare className="w-12 h-12 opacity-20" />
              </div>
            </div>

            {/* Online Contacts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Online Agora</h3>
              <div className="space-y-2">
                {contacts.slice(0, 3).map((contact) => (
                  <div key={contact.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-slate-700">{contact.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Call UI */}
      <CallUI />

      {/* Chat UI */}
      {selectedChatContact && (
        <ChatUI
          contact={selectedChatContact}
          onClose={() => setSelectedChatContact(null)}
        />
      )}
    </div>
  );
}