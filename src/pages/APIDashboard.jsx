import React, { useState } from 'react';
import { Key, Code, Copy, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function APIDashboard() {
  const [apiKey, setApiKey] = useState('sk_live_1234567890abcdef1234567890ab');
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const endpoints = [
    { method: 'GET', path: '/v1/clients', description: 'Lista todos os clientes' },
    { method: 'GET', path: '/v1/clients/{id}', description: 'Obtém um cliente específico' },
    { method: 'GET', path: '/v1/invoices', description: 'Lista todas as faturas' },
    { method: 'GET', path: '/v1/invoices/{id}', description: 'Obtém uma fatura específica' },
  ];

  const testEndpoint = async (endpoint) => {
    try {
      const response = await fetch(endpoint.path, {
        headers: {
          'X-API-Key': apiKey,
        },
      });
      
      const data = await response.json();
      setTestResult({
        endpoint: endpoint.path,
        status: response.status,
        data,
        success: response.ok,
      });
    } catch (error) {
      setTestResult({
        endpoint: endpoint.path,
        status: 'error',
        data: { error: error.message },
        success: false,
      });
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <Code className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold">API Dashboard</h1>
      </div>

      <Tabs defaultValue="keys" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="test">Teste</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Gerenciar API Keys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">API Key Ativa</label>
                <div className="flex gap-2">
                  <Input
                    value={apiKey}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-sm">
                <p className="font-medium text-blue-900">ℹ️ Segurança</p>
                <ul className="mt-2 space-y-1 text-blue-800 text-xs">
                  <li>• Nunca compartilhe sua API Key</li>
                  <li>• Use variáveis de ambiente em produção</li>
                  <li>• Regenere keys comprometidas imediatamente</li>
                </ul>
              </div>

              <Button className="w-full">Gerar Nova API Key</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Endpoints Disponíveis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {endpoints.map((endpoint, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-white text-xs font-bold ${
                      endpoint.method === 'GET' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-sm font-mono flex-1">{endpoint.path}</code>
                  </div>
                  <p className="text-sm text-gray-600">{endpoint.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rate Limiting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• <strong>Limite:</strong> 100 requisições por minuto</p>
                <p>• <strong>Header:</strong> X-RateLimit-Remaining</p>
                <p>• <strong>Retry-After:</strong> 60 segundos quando excedido</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Testar Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {endpoints.map((endpoint, idx) => (
                <Button
                  key={idx}
                  onClick={() => testEndpoint(endpoint)}
                  variant="outline"
                  className="w-full text-left justify-between"
                >
                  <span>{endpoint.method} {endpoint.path}</span>
                  <span className="text-xs">→</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {testResult && (
            <Card className={testResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className={testResult.success ? 'text-green-600' : 'text-red-600'}>
                    {testResult.status}
                  </span>
                  {testResult.endpoint}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-white p-3 rounded border text-xs overflow-auto max-h-60">
                  {JSON.stringify(testResult.data, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}