import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import IntegrationsManager from '../components/dashboard/IntegrationsManager';
import CustomFieldsManager from '../components/dashboard/CustomFieldsManager';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, LogOut, Settings, Trash2, Sliders } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  const { workspaceId } = useMultitenantAuthOptimized('internal');
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
      const { toast } = await import('sonner');
      await base44.auth.updateMe(formData);
      setUser(formData);
      toast.success('Configurações salvas com sucesso');
    } catch (error) {
      const { toast } = await import('sonner');
      toast.error('Erro ao salvar: ' + error.message);
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
    if (!confirm('Esta ação não pode ser desfeita. Tem certeza?')) return;
    
    try {
      const { toast } = await import('sonner');
      await base44.functions.invoke('deleteUserAccount', { userId: user.id });
      toast.success('Conta deletada com sucesso');
      base44.auth.logout();
    } catch (error) {
      const { toast } = await import('sonner');
      toast.error('Erro ao deletar conta: ' + error.message);
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Meu Perfil
              </TabsTrigger>
              <TabsTrigger value="custom-fields" className="flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                Campos Customizados
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
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 sm:flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                    <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:text-red-700 sm:flex-1">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                  <div className="border-t pt-4 mt-2">
                    <h3 className="font-semibold text-red-600 mb-3 text-sm">Zona de Perigo</h3>
                    <Button onClick={handleDeleteAccount} variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Deletar Conta Permanentemente
                    </Button>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Esta ação é irreversível. Sua conta e todos os dados serão deletados.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom-fields">
              <div className="bg-white rounded-lg shadow p-6">
                <CustomFieldsManager workspaceId={workspaceId} />
              </div>
            </TabsContent>

            <TabsContent value="integrations">
              <IntegrationsManager />
            </TabsContent>
          </Tabs>
          </div>
          );
          }