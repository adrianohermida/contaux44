import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import IntegrationsManager from '../components/dashboard/IntegrationsManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, LogOut, Settings, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('profile');

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
        setFormData(userData);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await base44.auth.updateMe(formData);
      setUser(formData);
      alert('Configurações salvas com sucesso!');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Tem certeza que deseja fazer logout?')) {
      base44.auth.logout();
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Tem certeza que deseja deletar sua conta? Esta ação é irreversível.')) return;
    if (!confirm('Digite "DELETAR" para confirmar a exclusão permanente de sua conta')) return;
    
    try {
      // Call backend function to delete user account
      await base44.functions.invoke('deleteUserAccount', { userId: user.id });
      alert('Conta deletada com sucesso.');
      base44.auth.logout();
    } catch (error) {
      alert('Erro ao deletar conta: ' + error.message);
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
            <p className="text-slate-600 mt-1">Gerencie sua conta e integrações</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Meu Perfil
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                🔌 Integrações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <h2 className="text-lg font-semibold">Informações da Conta</h2>
                <Input label="Email" type="email" value={formData.email || ''} disabled />
                <Input label="Nome Completo" name="full_name" value={formData.full_name || ''} onChange={handleChange} />
                <Input label="Função" value={formData.role || ''} disabled />
                
                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex gap-3">
                    <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                    <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:text-red-700">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                  <Button onClick={handleDeleteAccount} variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Deletar Conta
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="integrations">
              <IntegrationsManager />
            </TabsContent>
          </Tabs>
          </div>
          );
          }