import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Zap, Shield } from 'lucide-react';
import SyncQueueManager from '@/components/sync/SyncQueueManager';
import ConflictResolver from '@/components/sync/ConflictResolver';
import DataValidator from '@/components/sync/DataValidator';
import SyncDashboard from '@/components/sync/SyncDashboard';

export default function RealtimeSyncDashboard() {
  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Activity className="w-8 h-8" />
          Real-time Data Sync
        </h1>
        <p className="text-gray-600">
          Gerenciamento de fila, resolução de conflitos e validação de dados
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="queue" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Fila
          </TabsTrigger>
          <TabsTrigger value="conflicts" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Conflitos
          </TabsTrigger>
          <TabsTrigger value="validation" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Validação
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <SyncDashboard />
        </TabsContent>

        <TabsContent value="queue" className="mt-6">
          <SyncQueueManager />
        </TabsContent>

        <TabsContent value="conflicts" className="mt-6">
          <ConflictResolver />
        </TabsContent>

        <TabsContent value="validation" className="mt-6">
          <DataValidator />
        </TabsContent>
      </Tabs>
    </div>
  );
}