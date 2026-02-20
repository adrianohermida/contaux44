import React, { useState } from 'react';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * Data Validator - Valida integridade dos dados
 */
export default function DataValidator() {
  const [validationResults, setValidationResults] = useState([
    { id: 1, entity: 'Invoice', total: 150, valid: 148, invalid: 2, status: 'warning' },
    { id: 2, entity: 'Payment', total: 85, valid: 85, invalid: 0, status: 'success' },
    { id: 3, entity: 'Ticket', total: 220, valid: 215, invalid: 5, status: 'warning' },
  ]);

  const runValidation = () => {
    console.log('Executando validação de dados...');
  };

  const getStatusIcon = (status) => {
    return status === 'success' ? (
      <CheckCircle2 className="w-5 h-5 text-green-600" />
    ) : (
      <AlertCircle className="w-5 h-5 text-yellow-600" />
    );
  };

  const totalValid = validationResults.reduce((sum, r) => sum + r.valid, 0);
  const totalInvalid = validationResults.reduce((sum, r) => sum + r.invalid, 0);
  const totalValidityRate = Math.round((totalValid / (totalValid + totalInvalid)) * 100);

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <p className="font-medium">Taxa de Integridade</p>
        </div>
        <div className="flex items-end gap-4">
          <div>
            <p className="text-3xl font-bold text-blue-900">{totalValidityRate}%</p>
            <p className="text-sm text-blue-700">{totalValid} de {totalValid + totalInvalid}</p>
          </div>
          <div className="flex-1 bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${totalValidityRate}%` }}
            />
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        {validationResults.map(result => (
          <Card key={result.id} className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(result.status)}
                <p className="font-medium">{result.entity}</p>
              </div>
              <span className="text-sm font-bold text-green-600">
                {Math.round((result.valid / result.total) * 100)}%
              </span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-green-600">✓ {result.valid} válidos</span>
              <span className="text-red-600">✗ {result.invalid} inválidos</span>
            </div>
            <div className="flex gap-1 mt-2">
              <div
                className="bg-green-500 rounded-full h-1"
                style={{ width: `${(result.valid / result.total) * 100}%` }}
              />
              <div
                className="bg-red-500 rounded-full h-1"
                style={{ width: `${(result.invalid / result.total) * 100}%` }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}