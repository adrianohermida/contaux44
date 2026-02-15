import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function RLSDebugger() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const validateRLS = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await base44.functions.invoke('initializeRLSPolicies', {
        action: 'validate'
      });
      setResults(data);
    } catch (err) {
      setError(err.message || 'Erro ao validar RLS');
    } finally {
      setLoading(false);
    }
  };

  const testIsolation = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await base44.functions.invoke('initializeRLSPolicies', {
        action: 'test_isolation',
        target_workspace_id: 'other-workspace-test'
      });
      setResults(data);
    } catch (err) {
      setError(err.message || 'Erro ao testar isolamento');
    } finally {
      setLoading(false);
    }
  };

  const viewSQLExample = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await base44.functions.invoke('initializeRLSPolicies', {
        action: 'generate_sql'
      });
      setResults(data);
    } catch (err) {
      setError(err.message || 'Erro ao gerar SQL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">RLS Debugger - Sprint 9</h1>
          <p className="text-slate-600">Validar e testar Row Level Security</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={validateRLS}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Validar RLS Status
          </Button>
          <Button
            onClick={testIsolation}
            disabled={loading}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Testar Isolamento
          </Button>
          <Button
            onClick={viewSQLExample}
            disabled={loading}
            className="bg-slate-600 hover:bg-slate-700"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Ver SQL Example
          </Button>
        </div>

        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-300">
            <div className="flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Erro</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {results && (
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              {results.summary?.overall_status?.includes('✅') ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-600" />
              )}
              <h2 className="text-xl font-semibold">
                {results.summary?.overall_status || results.action}
              </h2>
            </div>

            <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(results, null, 2)}
            </pre>
          </Card>
        )}
      </div>
    </div>
  );
}