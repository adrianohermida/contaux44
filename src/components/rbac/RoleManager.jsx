import React, { useState, useCallback } from 'react';
import { UserCheck, Plus, Trash2, Edit2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

/**
 * Role Manager - Gerencia roles customizados
 * CRUD, permissões, hierarquia
 */
export default function RoleManager() {
  const [roles, setRoles] = useState([
    { id: 'admin', name: 'Administrador', description: 'Acesso completo', locked: true },
    { id: 'user', name: 'Usuário', description: 'Acesso padrão', locked: true },
  ]);
  
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const addRole = useCallback(() => {
    if (!newRole.name) return;

    const role = {
      id: `role-${Date.now()}`,
      ...newRole,
      locked: false
    };

    setRoles([...roles, role]);
    setNewRole({ name: '', description: '' });
  }, [newRole, roles]);

  const removeRole = useCallback((id) => {
    if (roles.find(r => r.id === id)?.locked) return;
    setRoles(roles.filter(r => r.id !== id));
  }, [roles]);

  const updateRole = useCallback((id, updates) => {
    setRoles(roles.map(r => r.id === id ? { ...r, ...updates } : r));
  }, [roles]);

  const toggleEditMode = useCallback((id) => {
    setEditingId(editingId === id ? null : id);
  }, [editingId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <UserCheck className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Gerenciar Roles</h3>
      </div>

      <Card className="p-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Nome da Role</label>
            <Input
              placeholder="Ex: Gerente de Vendas"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <Input
              placeholder="Ex: Acesso a vendas e relatórios"
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
            />
          </div>
          <Button onClick={addRole} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Role
          </Button>
        </div>
      </Card>

      <div className="space-y-3">
        {roles.map(role => (
          <Card key={role.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{role.name}</p>
                  {role.locked && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Sistema
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{role.description}</p>
              </div>
              <div className="flex gap-2">
                {!role.locked && (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => toggleEditMode(role.id)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeRole(role.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </>
                )}
              </div>
              {editingId === role.id && !role.locked && (
                <div className="mt-3 pt-3 border-t space-y-2">
                  <Input
                    placeholder="Nome"
                    defaultValue={role.name}
                    onChange={(e) => updateRole(role.id, { name: e.target.value })}
                  />
                  <Input
                    placeholder="Descrição"
                    defaultValue={role.description}
                    onChange={(e) => updateRole(role.id, { description: e.target.value })}
                  />
                  <Button size="sm" onClick={() => toggleEditMode(role.id)} className="w-full">
                    Salvar
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Roles de sistema não podem ser deletadas</p>
            <p className="mt-1">Admin e User são roles padrão e protegidas</p>
          </div>
        </div>
      </Card>
    </div>
  );
}