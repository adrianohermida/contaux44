import React, { useState } from 'react';
import { useMultitenantAuthOptimized } from '@/components/auth/useMultitenantAuthOptimized';
import RoleManager from '@/components/rbac/RoleManager';
import PermissionMatrix from '@/components/rbac/PermissionMatrix';
import UserManagement from '@/components/rbac/UserManagement';
import { Shield, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function RBACManagement() {
  const { workspaceId } = useMultitenantAuthOptimized('internal');
  const [activeTab, setActiveTab] = useState('roles');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-600" />
          <h1 className="text-3xl font-bold">RBAC - Controle de Acesso</h1>
        </div>
        <Settings className="w-6 h-6 text-gray-400" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>

        {/* Roles Tab */}
        <TabsContent value="roles" className="mt-6">
          <RoleManager />
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="mt-6">
          <PermissionMatrix />
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-6">
          {workspaceId && <UserManagement workspaceId={workspaceId} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}