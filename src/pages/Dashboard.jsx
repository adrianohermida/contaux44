import React, { useState, useEffect } from 'react';
import { LogOut, Users, MessageSquare, PhoneCall, History } from 'lucide-react';
import { useVoxImplant } from '../components/hooks/useVoxImplant';
import { base44 } from '@/api/base44Client';
import LoginForm from '../components/voximplant/LoginForm';
import CallUI from '../components/voximplant/CallUI';
import ChatUI from '../components/voximplant/ChatUI';
import IncomingCallDialog from '../components/voximplant/IncomingCallDialog';
import ConferenceUI from '../components/voximplant/ConferenceUI';
import CallHistoryCard from '../components/voximplant/CallHistoryCard';
import ContactListItem from '../components/voximplant/ContactListItem';
import SettingsPanel from '../components/voximplant/SettingsPanel';

export default function Dashboard() {
  const { isAuthenticated, logout, startCall, currentUser, callHistory, messages, notification, incomingCall, acceptIncomingCall, rejectIncomingCall, activeConference } = useVoxImplant();
  const [selectedChatContact, setSelectedChatContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [callHistoryData, setCallHistoryData] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Load contacts and call history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clients, history] = await Promise.all([
          base44.entities.Client.list(),
          base44.entities.CallHistory.list()
        ]);

        const mappedContacts = clients.map(client => ({
          id: client.id,
          name: client.company_name,
          email: client.email,
          phone: client.company_name.toLowerCase().replace(/\s+/g, ''),
        }));

        setContacts(mappedContacts);
        setCallHistoryData(history || []);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setContacts([]);
        setCallHistoryData([]);
      } finally {
        setLoadingContacts(false);
      }
    };

    fetchData();
  }, []);

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

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
            >
              ⚙️ Configurações
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
                  {/* Sidebar */}
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Chamadas</p>
                          <p className="text-3xl font-bold">{callHistoryData.length}</p>
                        </div>
                        <PhoneCall className="w-12 h-12 opacity-20" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">Mensagens</p>
                          <p className="text-3xl font-bold">{messages.length}</p>
                        </div>
                        <MessageSquare className="w-12 h-12 opacity-20" />
                      </div>
                    </div>

                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <History className="w-4 h-4" />
                      Histórico
                    </button>
                  </div>

                  {/* Main Content */}
                  <div className="lg:col-span-3">
                    {showHistory ? (
                      <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <History className="w-5 h-5 text-blue-600" />
                          Histórico de Chamadas
                        </h2>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {callHistoryData.length === 0 ? (
                            <p className="text-center text-slate-500">Nenhuma chamada registrada</p>
                          ) : (
                            callHistoryData.slice().reverse().map((call) => (
                              <CallHistoryCard key={call.id} call={call} />
                            ))
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="w-5 h-5 text-blue-600" />
                          <h2 className="text-lg font-bold text-slate-900">Contatos</h2>
                        </div>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {loadingContacts ? (
                            <p className="text-center text-slate-600">Carregando contatos...</p>
                          ) : contacts.length === 0 ? (
                            <p className="text-center text-slate-500">Nenhum contato disponível</p>
                          ) : (
                            contacts.map((contact) => (
                              <ContactListItem
                                key={contact.id}
                                contact={contact}
                                isOnline={Math.random() > 0.6}
                                onCall={handleCall}
                                onChat={handleChat}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    )}
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

      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-4 left-4 px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-2 z-50 ${
          notification.type === 'error' ? 'bg-red-500' :
          notification.type === 'success' ? 'bg-green-500' :
          'bg-blue-500'
        }`}>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Conference UI */}
      {activeConference && (
        <ConferenceUI onClose={() => {}} />
      )}

      {/* Incoming Call Dialog */}
      {incomingCall && (
        <IncomingCallDialog
          call={incomingCall}
          onAccept={acceptIncomingCall}
          onReject={rejectIncomingCall}
        />
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
      </div>
      );
      }