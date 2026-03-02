/**
 * useReportBuilder Hook
 * Manage custom report creation and configuration
 */

import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export function useReportBuilder(workspaceId) {
  const [reportConfig, setReportConfig] = useState({
    name: '',
    type: 'summary', // summary, detailed, comparison
    metrics: [], // revenue, contacts, opportunities, invoices
    dateRange: { start: null, end: null },
    filters: {},
    groupBy: 'month', // month, week, day
    sortBy: 'date',
    includeCharts: true,
  });

  // Fetch report data
  const { data: reportData = {}, isLoading } = useQuery({
    queryKey: ['report', workspaceId, reportConfig],
    queryFn: () => generateReportData(workspaceId, reportConfig),
    enabled: !!workspaceId && reportConfig.metrics.length > 0,
  });

  // Update report config
  const updateConfig = useCallback((updates) => {
    setReportConfig(prev => ({ ...prev, ...updates }));
  }, []);

  // Add metric to report
  const addMetric = useCallback((metric) => {
    setReportConfig(prev => ({
      ...prev,
      metrics: [...new Set([...prev.metrics, metric])],
    }));
  }, []);

  // Remove metric from report
  const removeMetric = useCallback((metric) => {
    setReportConfig(prev => ({
      ...prev,
      metrics: prev.metrics.filter(m => m !== metric),
    }));
  }, []);

  // Available metrics
  const availableMetrics = useMemo(() => [
    { id: 'revenue', label: 'Revenue', category: 'Financial' },
    { id: 'invoices', label: 'Invoices', category: 'Financial' },
    { id: 'payments', label: 'Payments', category: 'Financial' },
    { id: 'contacts', label: 'Contacts', category: 'Customer' },
    { id: 'opportunities', label: 'Opportunities', category: 'Sales' },
    { id: 'won_deals', label: 'Won Deals', category: 'Sales' },
    { id: 'pipeline', label: 'Pipeline Value', category: 'Sales' },
  ], []);

  return {
    reportConfig,
    reportData,
    isLoading,
    updateConfig,
    addMetric,
    removeMetric,
    availableMetrics,
  };
}

async function generateReportData(workspaceId, config) {
  // This would be called by a backend function in production
  const data = {
    summary: {},
    details: [],
    charts: [],
    generatedAt: new Date().toISOString(),
  };

  // Aggregate data based on config
  if (config.metrics.includes('revenue')) {
    data.summary.totalRevenue = 125000;
    data.summary.revenueGrowth = 12.5;
  }

  if (config.metrics.includes('contacts')) {
    data.summary.totalContacts = 1250;
    data.summary.newContacts = 47;
  }

  if (config.metrics.includes('opportunities')) {
    data.summary.totalOpportunities = 89;
    data.summary.wonOpportunities = 23;
    data.summary.pipelineValue = 450000;
  }

  return data;
}

export default useReportBuilder;