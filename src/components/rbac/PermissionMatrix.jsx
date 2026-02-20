import React, { useState, useCallback } from 'react';
import { Grid3x3, Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Permission Matrix - Define permissões por role e entidade
 * Matriz RBAC completa
 */
export default function PermissionMatrix() {
  const [permissions, setPermissions] = useState({
    admin: { create: true, read: true, update: true, delete: true },
    manager: { create: true, read: true, update: true, delete: false },
    user: { create: true, read: true, update: false, delete: false },
    viewer: { create: false, read: true, update: false, delete: false }
  });

  const roles = Object.keys(permissions);
  const actions = ['create', 'read', 'update', 'delete'];
  const entities = ['Invoice', 'Payment', 'Client', 'Ticket'];

  const togglePermission = useCallback((role, action, entity) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [`${entity}_${action}`]: !prev[role][`${entity}_${action}`]
      }
    }));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Grid3x3 className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Matriz de Permissões</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-3 text-left font-medium">Role / Ação</th>
              {entities.map(entity => (
                <th key={entity} colSpan={4} className="border p-3 text-center font-medium text-sm">
                  {entity}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <th className="border p-2"></th>
              {entities.map(entity => (
                <React.Fragment key={entity}>
                  {actions.map(action => (
                    <th key={`${entity}-${action}`} className="border p-2 text-center text-xs font-medium text-gray-600">
                      {action.charAt(0).toUpperCase()}
                    </th>
                  ))}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role} className="border-b hover:bg-gray-50">
                <td className="border p-3 font-medium text-sm capitalize bg-gray-50">{role}</td>
                {entities.map(entity => (
                  <React.Fragment key={`${role}-${entity}`}>
                    {actions.map(action => {
                      const key = `${entity}_${action}`;
                      const isPermitted = permissions[role][key] !== false;
                      return (
                        <td
                          key={key}
                          className="border p-2 text-center cursor-pointer hover:bg-blue-50"
                          onClick={() => togglePermission(role, action, entity)}
                        >
                          {isPermitted ? (
                            <Check className="w-4 h-4 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-red-600 mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Card className="p-4 text-sm text-gray-600">
        Clique em qualquer célula para alternar permissões. Green = Permitido, Red = Negado
      </Card>
    </div>
  );
}