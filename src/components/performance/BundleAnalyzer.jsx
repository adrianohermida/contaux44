/**
 * Bundle Analyzer
 * Tracks bundle size, chunk sizes, and provides optimization recommendations
 */

import { useEffect, useState, useCallback } from 'react';

/**
 * Hook para analisar bundle size
 */
export function useBundleAnalyzer() {
  const [bundleMetrics, setBundleMetrics] = useState({
    totalSize: 0,
    chunks: [],
    mainBundle: 0,
    vendorBundle: 0,
    timestamp: null,
  });

  const calculateBundleSize = useCallback(() => {
    // Use PerformanceResourceTiming to get script sizes
    const resources = performance.getEntriesByType('resource');
    const scripts = resources.filter(r => r.name.includes('.js'));
    
    const metrics = {
      chunks: scripts.map(script => ({
        name: script.name.split('/').pop(),
        size: script.transferSize || script.decodedBodySize || 0,
        gzipSize: script.transferSize || 0,
        duration: script.duration,
      })),
      totalSize: scripts.reduce((sum, s) => sum + (s.transferSize || s.decodedBodySize || 0), 0),
      timestamp: new Date().toISOString(),
    };

    // Categorize bundles
    metrics.mainBundle = metrics.chunks
      .filter(c => c.name.includes('main') || c.name.includes('index'))
      .reduce((sum, c) => sum + c.size, 0);

    metrics.vendorBundle = metrics.chunks
      .filter(c => c.name.includes('vendor') || c.name.includes('node_modules'))
      .reduce((sum, c) => sum + c.size, 0);

    setBundleMetrics(metrics);
    return metrics;
  }, []);

  useEffect(() => {
    // Calculate on mount
    setTimeout(() => {
      calculateBundleSize();
    }, 1000);

    // Recalculate on window load
    window.addEventListener('load', calculateBundleSize);
    return () => window.removeEventListener('load', calculateBundleSize);
  }, [calculateBundleSize]);

  const getOptimizationScore = useCallback(() => {
    const { totalSize } = bundleMetrics;
    
    // Scoring: <100KB = 100, 100-300KB = 80, 300-500KB = 60, >500KB = 40
    if (totalSize === 0) return 0;
    if (totalSize < 100 * 1024) return 100;
    if (totalSize < 300 * 1024) return 80;
    if (totalSize < 500 * 1024) return 60;
    return 40;
  }, [bundleMetrics.totalSize]);

  const getRecommendations = useCallback(() => {
    const { totalSize, mainBundle } = bundleMetrics;
    const recommendations = [];

    if (totalSize > 500 * 1024) {
      recommendations.push({
        priority: 'high',
        title: 'Large bundle size',
        description: `Total bundle is ${(totalSize / 1024).toFixed(0)}KB. Consider code splitting or lazy loading.`,
      });
    }

    if (mainBundle > 200 * 1024) {
      recommendations.push({
        priority: 'medium',
        title: 'Heavy main bundle',
        description: `Main bundle is ${(mainBundle / 1024).toFixed(0)}KB. Extract vendor libraries.`,
      });
    }

    return recommendations;
  }, [bundleMetrics]);

  const formatBytes = useCallback((bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return {
    bundleMetrics,
    getOptimizationScore,
    getRecommendations,
    formatBytes,
    calculateBundleSize,
  };
}

export default useBundleAnalyzer;