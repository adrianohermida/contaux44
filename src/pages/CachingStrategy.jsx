import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Zap, Settings } from 'lucide-react';
import CacheManager from '@/components/cache/CacheManager';
import CacheStatistics from '@/components/cache/CacheStatistics';
import CompressionEngine from '@/components/cache/CompressionEngine';
import CachingDashboard from '@/components/cache/CachingDashboard';

export default function CachingStrategy() {
  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="w-8 h-8" />
          Advanced Caching Strategies
        </h1>
        <p className="text-gray-600">
          LRU, TTL e compressão para otimização máxima de performance
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="manager" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Gerenciador
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Estatísticas
          </TabsTrigger>
          <TabsTrigger value="compression" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Compressão
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <CachingDashboard />
        </TabsContent>

        <TabsContent value="manager" className="mt-6">
          <CacheManager />
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <CacheStatistics />
        </TabsContent>

        <TabsContent value="compression" className="mt-6">
          <CompressionEngine />
        </TabsContent>
      </Tabs>
    </div>
  );
}