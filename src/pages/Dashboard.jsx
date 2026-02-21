import React from 'react';
import { useMultitenantAuthOptimized } from '../components/auth/useMultitenantAuthOptimized';
import ContactStatisticsWidget from '../components/dashboard/widgets/ContactStatisticsWidget';
import ContactTagsWidget from '../components/dashboard/widgets/ContactTagsWidget';
import RecentActivityWidget from '../components/dashboard/widgets/RecentActivityWidget';
import DuplicateAlertsWidget from '../components/dashboard/widgets/DuplicateAlertsWidget';
import DataQualityWidget from '../components/dashboard/widgets/DataQualityWidget';
import ContactGrowthWidget from '../components/dashboard/widgets/ContactGrowthWidget';
import TagPerformanceWidget from '../components/dashboard/widgets/TagPerformanceWidget';
import SalesPipelineWidget from '../components/dashboard/widgets/SalesPipelineWidget';
import LeadScoringWidget from '../components/dashboard/widgets/LeadScoringWidget';
import RevenueForecastWidget from '../components/dashboard/widgets/RevenueForecastWidget';
import PipelinePerformanceWidget from '../components/dashboard/widgets/PipelinePerformanceWidget';

export default function Dashboard() {
  const { workspaceId, loading } = useMultitenantAuthOptimized('internal');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Visão geral do seu workspace</p>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <ContactStatisticsWidget workspaceId={workspaceId} />
        <ContactTagsWidget workspaceId={workspaceId} />
        <div className="grid grid-cols-1 gap-6 md:col-span-2 lg:col-span-1">
          <DuplicateAlertsWidget workspaceId={workspaceId} />
          <DataQualityWidget workspaceId={workspaceId} />
        </div>
      </div>

      {/* Row 2 - Activity + Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityWidget workspaceId={workspaceId} />
        <TagPerformanceWidget workspaceId={workspaceId} />
      </div>

      {/* Row 3 - Full width growth chart */}
      <div className="grid grid-cols-1 gap-6">
        <ContactGrowthWidget workspaceId={workspaceId} />
      </div>

      {/* Row 4 - Sales Pipeline & Forecasting */}
      <div className="grid grid-cols-1 gap-6">
        <SalesPipelineWidget workspaceId={workspaceId} />
      </div>

      {/* Row 5 - Lead Scoring & Revenue Forecast */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LeadScoringWidget workspaceId={workspaceId} />
        <div className="md:col-span-2">
          <RevenueForecastWidget workspaceId={workspaceId} />
        </div>
      </div>

      {/* Row 6 - Pipeline Performance Analysis */}
      <div className="grid grid-cols-1 gap-6">
        <PipelinePerformanceWidget workspaceId={workspaceId} />
      </div>
    </div>
  );
}