import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, BarChart3, TrendingUp, FileText } from 'lucide-react';
import MemoryProfiler from '@/components/profiling/MemoryProfiler';
import BundleAnalyzer from '@/components/profiling/BundleAnalyzer';
import ProfilingDashboard from '@/components/profiling/ProfilingDashboard';
import PerformanceReports from '@/components/profiling/PerformanceReports';

export default function ProfilingDashboardPage() {
  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Activity className="w-8 h-8" />
          Performance Profiling
        </h1>
        <p className="text-gray-600">
          Análise detalhada de memory, bundle size e performance
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="memory" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Memory
          </TabsTrigger>
          <TabsTrigger value="bundle" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Bundle
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Relatórios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <ProfilingDashboard />
        </TabsContent>

        <TabsContent value="memory" className="mt-6">
          <MemoryProfiler />
        </TabsContent>

        <TabsContent value="bundle" className="mt-6">
          <BundleAnalyzer />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <PerformanceReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}