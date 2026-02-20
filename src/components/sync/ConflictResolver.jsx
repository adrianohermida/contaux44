import React, { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Conflict Resolver - Resolve conflitos de sincronização
 */
export default function ConflictResolver() {
  const [conflicts, setConflicts] = useState([
    {
      id: 1,
      entity: 'Invoice #001',
      field: 'amount',
      local: '1500.00',
      remote: '1600.00',
      timestamp: new Date().toISOString(),
      resolved: false,
    },
  ]);

  const resolveConflict = (id, choice) => {
    setConflicts(conflicts.map(c =>
      c.id === id ? { ...c, resolved: true, resolvedWith: choice } : c
    ));
  };

  const getResolutionStrategy = (conflict) => {
    // Last-write-wins
    return 'last-write-wins';
  };

  const unresolvedCount = conflicts.filter(c => !c.resolved).length;

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <p className="font-medium">Conflitos Detectados</p>
        </div>
        <p className="text-2xl font-bold text-yellow-900">{unresolvedCount}</p>
        <p className="text-xs text-yellow-700">Aguardando resolução</p>
      </Card>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {conflicts.map(conflict => (
          <Card key={conflict.id} className={`p-4 ${conflict.resolved ? 'bg-green-50' : 'bg-white'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium">{conflict.entity}</p>
                <p className="text-sm text-gray-600">Campo: {conflict.field}</p>
                <p className="text-xs text-gray-500">
                  {new Date(conflict.timestamp).toLocaleTimeString()}
                </p>
              </div>
              {conflict.resolved && (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              )}
            </div>

            {!conflict.resolved ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="text-xs text-gray-600 mb-1">Local</p>
                    <p className="font-mono font-bold text-blue-900">{conflict.local}</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <p className="text-xs text-gray-600 mb-1">Remoto</p>
                    <p className="font-mono font-bold text-purple-900">{conflict.remote}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => resolveConflict(conflict.id, 'local')}
                  >
                    Usar Local
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => resolveConflict(conflict.id, 'remote')}
                  >
                    Usar Remoto
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-green-700">
                ✓ Resolvido com: <span className="font-medium capitalize">{conflict.resolvedWith}</span>
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}