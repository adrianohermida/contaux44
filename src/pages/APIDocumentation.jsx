import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Code } from 'lucide-react';

export default function APIDocumentation() {
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/blogs',
      description: 'List all blog posts',
      params: 'limit, offset, status',
      response: '200 - Array of BlogPost'
    },
    {
      method: 'POST',
      path: '/api/v1/blogs',
      description: 'Create new blog post',
      params: 'title, content, featured_image',
      response: '201 - BlogPost created'
    },
    {
      method: 'GET',
      path: '/api/v1/blogs/{id}',
      description: 'Get blog post by ID',
      params: 'id',
      response: '200 - BlogPost object'
    },
    {
      method: 'PUT',
      path: '/api/v1/blogs/{id}',
      description: 'Update blog post',
      params: 'id, title, content',
      response: '200 - Updated BlogPost'
    },
    {
      method: 'DELETE',
      path: '/api/v1/blogs/{id}',
      description: 'Delete blog post',
      params: 'id',
      response: '204 - No content'
    }
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMethodBadge = (method) => {
    const colors = {
      GET: 'bg-blue-100 text-blue-800',
      POST: 'bg-green-100 text-green-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800'
    };
    return colors[method];
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Documentação REST API</h1>
        <p className="text-slate-600 dark:text-slate-400">API Reference v1.0</p>
      </div>

      {/* Base URL */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Base URL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-center">
            <code className="flex-1 p-3 bg-slate-100 dark:bg-slate-900 rounded font-mono text-sm">
              https://api.contaux.com/api/v1
            </code>
            <button onClick={() => copyCode('https://api.contaux.com/api/v1')} className="p-2 hover:bg-slate-100 rounded">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Autenticação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-600">Use Bearer Token no header:</p>
          <code className="block p-3 bg-slate-100 dark:bg-slate-900 rounded font-mono text-xs">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Endpoints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {endpoints.map((ep, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Badge className={getMethodBadge(ep.method)}>{ep.method}</Badge>
                <code className="flex-1 font-mono text-sm">{ep.path}</code>
              </div>
              <p className="text-sm mb-2">{ep.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>
                  <p className="font-medium">Parâmetros: {ep.params}</p>
                </div>
                <div>
                  <p className="font-medium">{ep.response}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Example Request */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Exemplo de Requisição
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">JavaScript/Fetch:</p>
              <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded text-xs overflow-x-auto">
{`const response = await fetch(
  'https://api.contaux.com/api/v1/blogs',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);`}
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">cURL:</p>
              <pre className="bg-slate-100 dark:bg-slate-900 p-3 rounded text-xs overflow-x-auto">
{`curl -X GET https://api.contaux.com/api/v1/blogs \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Handling */}
      <Card>
        <CardHeader>
          <CardTitle>Tratamento de Erros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="p-3 border rounded-lg">
            <p className="font-medium">400 - Bad Request</p>
            <p className="text-slate-600">Parâmetros inválidos</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-medium">401 - Unauthorized</p>
            <p className="text-slate-600">Token ausente ou inválido</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-medium">404 - Not Found</p>
            <p className="text-slate-600">Recurso não encontrado</p>
          </div>
          <div className="p-3 border rounded-lg">
            <p className="font-medium">429 - Too Many Requests</p>
            <p className="text-slate-600">Rate limit excedido</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}