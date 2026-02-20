import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

export default function ComplianceReporting() {
  const [reports] = useState([
    { name: 'GDPR Compliance', status: 'compliant', lastAudit: '2026-02-18' },
    { name: 'SOC 2 Type II', status: 'compliant', lastAudit: '2026-02-10' },
    { name: 'ISO 27001', status: 'compliant', lastAudit: '2026-01-15' },
    { name: 'LGPD', status: 'compliant', lastAudit: '2026-02-20' }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Automated Compliance Reporting</h1>
        <p className="text-slate-600">Relatórios de conformidade automáticos</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Status de Conformidade</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {reports.map(r => (
            <div key={r.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  {r.name}
                </p>
                <p className="text-xs text-slate-600">Última auditoria: {r.lastAudit}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">✓ {r.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Certificações</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Compliance Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">100%</div></CardContent>
        </Card>
      </div>
    </div>
  );
}