import React, { useState, useEffect } from 'react';
import { Users, BarChart3, Settings, LogOut, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Admin() {
  const [currentTab, setCurrentTab] = useState('clients');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({ company_name: '', email: '', phone: '', address: '', currency: 'USD', status: 'active' });

  // Load clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await base44.entities.Client.list();
        setClients(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleSaveClient = async () => {
    try {
      if (editingClient) {
        await base44.entities.Client.update(editingClient.id, formData);
      } else {
        await base44.entities.Client.create(formData);
      }
      const data = await base44.entities.Client.list();
      setClients(data);
      setShowForm(false);
      setEditingClient(null);
      setFormData({ company_name: '', email: '', phone: '', address: '', currency: 'USD', status: 'active' });
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      try {
        await base44.entities.Client.delete(id);
        setClients(clients.filter(c => c.id !== id));
      } catch (error) {
        console.error('Erro ao deletar cliente:', error);
      }
    }
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setFormData({ company_name: client.company_name, email: client.email, phone: client.phone, address: client.address, currency: client.currency, status: client.status });
    setShowForm(true);
  };

  const filteredClients = clients.filter(c => c.company_name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </div>

      {/* Navigation */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex gap-8 px-4">
          <button onClick={() => setCurrentTab('clients')} className={`py-4 px-1 border-b-2 font-medium text-sm ${currentTab === 'clients' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'} flex items-center gap-2`}>
            <Users className="w-4 h-4" /> Clientes
          </button>
          <button onClick={() => setCurrentTab('reports')} className={`py-4 px-1 border-b-2 font-medium text-sm ${currentTab === 'reports' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'} flex items-center gap-2`}>
            <BarChart3 className="w-4 h-4" /> Relatórios
          </button>
          <button onClick={() => setCurrentTab('settings')} className={`py-4 px-1 border-b-2 font-medium text-sm ${currentTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'} flex items-center gap-2`}>
            <Settings className="w-4 h-4" /> Configurações
          </button>
        </div>
      </div>

      {/* Content */}
        {currentTab === 'clients' && (
          <div>
            {/* Search & Add */}
            <div className="mb-6 flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Buscar cliente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <button onClick={() => { setShowForm(true); setEditingClient(null); setFormData({ company_name: '', email: '', phone: '', address: '', currency: 'USD', status: 'active' }); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" /> Novo Cliente
              </button>
            </div>

            {/* Form */}
            {showForm && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-lg font-bold mb-4">{editingClient ? 'Editar Cliente' : 'Novo Cliente'}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nome da Empresa" value={formData.company_name} onChange={(e) => setFormData({...formData, company_name: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <input type="tel" placeholder="Telefone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <input type="text" placeholder="Endereço" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>BRL</option>
                  </select>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={handleSaveClient} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Salvar</button>
                  <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Carregando...</div>
              ) : filteredClients.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Nenhum cliente encontrado</div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Empresa</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Telefone</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Moeda</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map(client => (
                      <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{client.company_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{client.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{client.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{client.currency}</td>
                        <td className="px-6 py-4 text-sm"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{client.status}</span></td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button onClick={() => handleEditClient(client)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteClient(client.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {currentTab === 'reports' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6">Relatórios</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                <p className="text-blue-100 text-sm">Total de Clientes</p>
                <p className="text-4xl font-bold">{clients.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                <p className="text-green-100 text-sm">Clientes Ativos</p>
                <p className="text-4xl font-bold">{clients.filter(c => c.status === 'active').length}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                <p className="text-purple-100 text-sm">Clientes Inativos</p>
                <p className="text-4xl font-bold">{clients.filter(c => c.status === 'inactive').length}</p>
              </div>
            </div>
            <p className="text-gray-600">Gráficos e análises detalhadas virão na próxima atualização.</p>
          </div>
        )}

        {currentTab === 'settings' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6">Configurações</h2>
            <div className="space-y-6">
              <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold mb-2">Preferências Gerais</h3>
                <p className="text-gray-600">Configure as preferências do seu painel administrativo.</p>
              </div>
              <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold mb-2">Notificações</h3>
                <p className="text-gray-600">Gerencie as notificações do sistema.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Segurança</h3>
                <p className="text-gray-600">Configurações de segurança e autenticação.</p>
              </div>
            </div>
          </div>
        )}
        </div>
        );
        }