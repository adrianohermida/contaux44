import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';

export default function RBACManagement() {
  const [roles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Acesso completo',
      users: 2,
      permissions: ['create', 'read', 'update', 'delete', 'manage_users'],
      protected: true
    },
    {
      id: 2,
      name: 'Editor',
      description: 'Pode editar conteúdo',
      users: 5,
      permissions: ['create', 'read', 'update'],
      protected: false
    },
    {
      id: 3,
      name: 'Viewer',
      description: 'Somente leitura',
      users: 12,
      permissions: ['read'],
      protected: false
    },
    {
      id: 4,
      name: 'Manager',
      description: 'Gerencia cliente',
      users: 3,
      permissions: ['read', 'update', 'manage_clients'],
      protected: false
    }
  ]);

  const [showNewRole, setShowNewRole] = useState(false);

  const allPermissions = [
    'create', 'read', 'update', 'delete',
    'manage_users', 'manage_clients', 'view_reports',
    'export_data', 'manage_integrations'
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Controle de Acesso Baseado em Funções (RBAC)</h1>
          <p className="text-slate-600 dark:text-slate-400">Gerencie papéis e permissões</p>
        </div>
        <Button onClick={() => setShowNewRole(!showNewRole)} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Papel
        </Button>
      </div>

      {/* New Role Form */}
      {showNewRole && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle>Criar Novo Papel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input type="text" placeholder="Ex: Moderator" className="w-full mt-1 px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="text-sm font-medium">Descrição</label>
              <input type="text" placeholder="Descrição do papel" className="w-full mt-1 px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Permissões</label>
              <div className="grid grid-cols-2 gap-2">
                {allPermissions.map(perm => (
                  <label key={perm} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{perm}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowNewRole(false)}>
                Cancelar
              </Button>
              <Button>Criar Papel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roles List */}
      <div className="space-y-4">
        {roles.map(role => (
          <Card key={role.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{role.name}</h3>
                    {role.protected && <Badge className="bg-purple-100 text-purple-800">Protegido</Badge>}
                  </div>
                  <p className="text-sm text-slate-600">{role.description}</p>
                </div>
                <div className="flex gap-2">
                  {!role.protected && (
                    <>
                      <Button size="sm" variant="outline">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-600">Usuários</p>
                  <p className="text-lg font-bold">{role.users}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Permissões</p>
                  <p className="text-lg font-bold">{role.permissions.length}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-600 mb-2">Permissões Concedidas</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map(perm => (
                    <Badge key={perm} variant="secondary" className="text-xs">
                      {perm}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Matriz de Permissões</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Permissão</th>
                {roles.map(role => (
                  <th key={role.id} className="text-center p-2 font-medium">{role.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPermissions.map(perm => (
                <tr key={perm} className="border-b hover:bg-slate-50 dark:hover:bg-slate-900">
                  <td className="p-2">{perm}</td>
                  {roles.map(role => (
                    <td key={role.id} className="text-center p-2">
                      {role.permissions.includes(perm) && (
                        <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}