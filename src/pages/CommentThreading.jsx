import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

export default function CommentThreading() {
  const [threads] = useState([
    {
      id: 1,
      document: 'Blog: SEO Guide',
      author: 'João Silva',
      comment: 'Revisar keywords nesta seção',
      replies: 3,
      status: 'open'
    },
    {
      id: 2,
      document: 'Invoice #2026-001',
      author: 'Maria Santos',
      comment: 'Confirmar valor total',
      replies: 1,
      status: 'resolved'
    },
    {
      id: 3,
      document: 'Client Profile',
      author: 'Admin',
      comment: 'Atualizar contato',
      replies: 0,
      status: 'open'
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Threads de Comentários</h1>
        <p className="text-slate-600">Organize discussões em threads estruturadas</p>
      </div>

      {/* Comment Threads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Threads Ativos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {threads.map(thread => (
            <div key={thread.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-sm">{thread.document}</p>
                  <p className="text-xs text-slate-600 mt-1">{thread.comment}</p>
                </div>
                <Badge className={thread.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                  {thread.status === 'resolved' ? '✓ Resolvido' : '○ Aberto'}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-2 border-t text-xs text-slate-600">
                <p>Por {thread.author}</p>
                <p>{thread.replies} resposta{thread.replies !== 1 ? 's' : ''}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Threads</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">47</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Abertos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">23</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Resolvidos</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Comentários</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">156</div></CardContent>
        </Card>
      </div>
    </div>
  );
}