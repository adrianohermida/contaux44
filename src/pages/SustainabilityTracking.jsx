import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf } from 'lucide-react';

export default function SustainabilityTracking() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Sustainability Tracking</h1>
        <p className="text-slate-600">Rastreamento de sustentabilidade ESG</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Score ESG</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">78/100</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Emissões CO2</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">2.4k ton</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Redução</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">-12%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Certificações</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2"><Leaf className="h-5 w-5" /> Pilares ESG</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">Environmental</span>
              <Badge className="bg-green-100 text-green-800">82/100</Badge>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '82%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">Social</span>
              <Badge className="bg-green-100 text-green-800">75/100</Badge>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">Governance</span>
              <Badge className="bg-green-100 text-green-800">77/100</Badge>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '77%' }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}