import React, { useState } from 'react';
import { Zap, TrendingDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BundleAnalyzer from '@/components/performance/BundleAnalyzer';
import LazyLoadingOptimizer from '@/components/performance/LazyLoadingOptimizer';
import ImageOptimizer from '@/components/performance/ImageOptimizer';
import QueryOptimizer from '@/components/performance/QueryOptimizer';

export default function PerformanceOptimization() {
  const [activeTab, setActiveTab] = useState('bundle');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Zap className="w-6 h-6 text-amber-600" />
        <h1 className="text-3xl font-bold">Otimização de Performance</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bundle">Bundle</TabsTrigger>
          <TabsTrigger value="lazy">Lazy Loading</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
          <TabsTrigger value="queries">Queries</TabsTrigger>
        </TabsList>

        <TabsContent value="bundle" className="mt-6">
          <BundleAnalyzer />
        </TabsContent>

        <TabsContent value="lazy" className="mt-6">
          <LazyLoadingOptimizer />
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          <ImageOptimizer />
        </TabsContent>

        <TabsContent value="queries" className="mt-6">
          <QueryOptimizer />
        </TabsContent>
      </Tabs>
    </div>
  );
}