import React from 'react';
import { Smartphone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import MobileNav from '@/components/mobile/MobileNav';
import MobileDashboard from '@/components/mobile/MobileDashboard';

export default function MobileOptimized() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileNav />
      
      <main className="pt-16">
        <div className="max-w-md mx-auto px-4 py-6 space-y-4">
          <div className="flex items-center gap-3 md:hidden">
            <Smartphone className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold">Mobile First</h1>
          </div>

          <Card className="hidden md:block p-6 bg-blue-50 border-blue-200">
            <p className="text-center text-blue-800">
              👉 Visualize em mobile (viewport &lt; 768px) para ver a UI otimizada
            </p>
          </Card>

          <MobileDashboard />
        </div>
      </main>
    </div>
  );
}