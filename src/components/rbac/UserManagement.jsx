import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Users, Plus, Trash2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * User Management - Gerencia usuários e suas roles
 * CRUD de usuários, atribuição de roles
 */
export default function UserManagement({ workspaceId }) {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');

  const { data: users, refetch } = useQuery({
    queryKey: ['users', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      return base44.entities.User.list() || [];
    },
    enabled: !!workspaceId
  });

  const inviteUser = useCallback(async () => {
    if (!newUserEmail) return;

    try {
      await base44.users.inviteUser(newUserEmail, newUserRole);
      setNewUserEmail('');
      setNewUserRole('user');
      refetch();
    } catch (error) {
      console.error('Erro ao convidar usuário:', error);
    }
  }, [newUserEmail, newUserRole, refetch]);

  const removeUser = useCallback(async (userId) => {
    if (confirm('Tem certeza que quer remover este usuário?')) {
      try {
        await base44.entities.User.delete(userId);
        refetch();
      } catch (error) {
        console.error('Erro ao remover usuário:', error);
      }
    }
  }, [refetch]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Gerenciar Usuários</h3>
      </div>

      <Card className="p-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              placeholder="usuario@example.com"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <Select value={newUserRole} onValueChange={setNewUserRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Usuário</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="manager">Gerente</SelectItem>
                <SelectItem value="viewer">Visualizador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={inviteUser} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Convidar Usuário
          </Button>
        </div>
      </Card>

      <div className="space-y-3">
        {users?.map(user => (
          <Card key={user.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium">{user.full_name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">{user.role}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeUser(user.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}