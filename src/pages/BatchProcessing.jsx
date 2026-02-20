import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BatchProcessing() {
  const [jobs] = useState([
    { id: 1, name: 'Import Clients', status: 'completed', progress: 100, items: 1250 },
    { id: 2, name: 'Export Invoices', status: 'processing', progress: 75, items: 5680 },
    { id: 3, name: 'Generate Reports', status: 'queued', progress: 0, items: 342 }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Batch Processing</h1>
        <p className="text-slate-600">Processamento em lote de grandes volumes</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Batch Jobs</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {jobs.map(job => (
            <div key={job.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{job.name}</p>
                <Badge className={job.status === 'completed' ? 'bg-green-100 text-green-800' : job.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100'}>
                  {job.status}
                </Badge>
              </div>
              <div className="w-full bg-slate-200 rounded h-2 mb-1">
                <div className="bg-blue-600 h-2 rounded" style={{ width: `${job.progress}%` }} />
              </div>
              <p className="text-xs text-slate-600">{job.progress}% • {job.items} itens</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Total Jobs</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">127</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Completed</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">124</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Failed</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">0</div></CardContent>
        </Card>
      </div>
    </div>
  );
}