import React, { useState } from 'react';
import { useMultitenantAuthOptimized } from '@/components/auth/useMultitenantAuthOptimized';
import MFASetup from '@/components/security/MFASetup';
import AuditDashboard from '@/components/security/AuditDashboard';
import EncryptionManager from '@/components/security/EncryptionManager';
import { Shield, Lock, Activity, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SecurityCenter() {
  const { workspaceId } = useMultitenantAuthOptimized('internal');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-600" />
          <h1 className="text-3xl font-bold">Centro de Segurança</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Status de Segurança</p>
              <p className="text-2xl font-bold mt-1">Bom</p>
            </div>
            <Shield className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-green-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Conformidade</p>
              <p className="text-2xl font-bold mt-1">LGPD</p>
            </div>
            <Lock className="w-8 h-8 text-green-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-purple-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">Últimas Atividades</p>
              <p className="text-2xl font-bold mt-1">3</p>
            </div>
            <Activity className="w-8 h-8 text-purple-500 opacity-20" />
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mfa">2FA</TabsTrigger>
          <TabsTrigger value="encryption">Criptografia</TabsTrigger>
          <TabsTrigger value="audit">Auditoria</TabsTrigger>
        </TabsList>

        {/* MFA Tab */}
        <TabsContent value="mfa" className="mt-6">
          <MFASetup onMFAEnabled={() => console.log('MFA enabled')} />
        </TabsContent>

        {/* Encryption Tab */}
        <TabsContent value="encryption" className="mt-6">
          {workspaceId && <EncryptionManager workspaceId={workspaceId} />}
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="mt-6">
          {workspaceId && <AuditDashboard workspaceId={workspaceId} />}
        </TabsContent>
      </Tabs>

      <Card className="p-6 bg-yellow-50 border border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-900">Dicas de Segurança</h3>
            <ul className="text-sm text-yellow-800 mt-2 space-y-1">
              <li>✓ Ative 2FA em todos os usuários</li>
              <li>✓ Revise logs de auditoria regularmente</li>
              <li>✓ Mantenha senhas fortes e únicas</li>
              <li>✓ Ative criptografia de dados sensíveis</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}