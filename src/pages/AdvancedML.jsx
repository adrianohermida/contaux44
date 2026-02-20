import React, { useState } from 'react';
import { Brain, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnomalyDetector from '@/components/ml/AnomalyDetector';
import ClusterAnalyzer from '@/components/ml/ClusterAnalyzer';
import PatternRecognizer from '@/components/ml/PatternRecognizer';
import ForecastingDashboard from '@/components/ml/ForecastingDashboard';

export default function AdvancedML() {
  const [activeTab, setActiveTab] = useState('anomalies');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="w-6 h-6 text-blue-600" />
        <h1 className="text-3xl font-bold">Machine Learning Avançado</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="anomalies">Anomalias</TabsTrigger>
          <TabsTrigger value="clusters">Clusters</TabsTrigger>
          <TabsTrigger value="patterns">Padrões</TabsTrigger>
          <TabsTrigger value="forecast">Previsões</TabsTrigger>
        </TabsList>

        <TabsContent value="anomalies" className="mt-6">
          <AnomalyDetector />
        </TabsContent>

        <TabsContent value="clusters" className="mt-6">
          <ClusterAnalyzer />
        </TabsContent>

        <TabsContent value="patterns" className="mt-6">
          <PatternRecognizer />
        </TabsContent>

        <TabsContent value="forecast" className="mt-6">
          <ForecastingDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}