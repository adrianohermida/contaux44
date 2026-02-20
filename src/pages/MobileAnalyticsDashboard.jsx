import React from 'react';
import { BarChart3 } from 'lucide-react';
import MobileAnalytics from '@/components/analytics/mobile/MobileAnalytics';
import DeviceTracker from '@/components/analytics/mobile/DeviceTracker';
import PerformanceMonitor from '@/components/analytics/mobile/PerformanceMonitor';

export default function MobileAnalyticsDashboard() {
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="w-8 h-8" />
          Mobile Analytics
        </h1>
        <p className="text-gray-600">
          Rastreamento de eventos, dispositivos e performance mobile
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Informações do Dispositivo</h2>
          <DeviceTracker />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Performance</h2>
          <PerformanceMonitor />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">Eventos Rastreados</h2>
        <MobileAnalytics />
      </div>
    </div>
  );
}