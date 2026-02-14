import React, { useState } from 'react';
import { Phone, MessageSquare, Users, Settings, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import CommunicationCenter from '../components/CommunicationCenter';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contaux</h1>
            <p className="text-sm text-slate-600">
              Bem-vindo, {user?.full_name || 'Usuário'}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-4 font-medium border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('communication')}
              className={`px-4 py-4 font-medium border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'communication'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-4 h-4" />
              Central de Comunicação
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' ? (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Chamadas</p>
                  <p className="text-3xl font-bold text-slate-900">--</p>
                </div>
                <Phone className="w-12 h-12 text-blue-100" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Mensagens</p>
                  <p className="text-3xl font-bold text-slate-900">--</p>
                </div>
                <MessageSquare className="w-12 h-12 text-green-100" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Contatos</p>
                  <p className="text-3xl font-bold text-slate-900">--</p>
                </div>
                <Users className="w-12 h-12 text-purple-100" />
              </div>
            </div>
          </div>
        ) : (
          <CommunicationCenter />
        )}
      </main>
    </div>
  );
}