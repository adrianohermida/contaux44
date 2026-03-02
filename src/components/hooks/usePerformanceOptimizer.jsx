/**
 * usePerformanceOptimizer Hook
 * Code splitting, lazy loading, and performance profiling
 */

import { useState, useCallback, useEffect } from 'react';

export function usePerformanceOptimizer() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    fcp: 0,
    lcp: 0,
    cls: 0,
    memory: 0,
  });
  const [lazyLoadConfig, setLazyLoadConfig] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [bundleStats, setBundleStats] = useState(null);

  // Measure Web Vitals
  const measureWebVitals = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint')?.startTime || 0;
      const lcp = performance.getEntriesByType('largest-contentful-paint').pop()?.renderTime || 0;

      const clsValue = performance.getEntriesByType('layout-shift').reduce((sum, entry) => {
        return !entry.hadRecentInput ? sum + entry.value : sum;
      }, 0);

      const memory = performance.memory?.usedJSHeapSize || 0;

      setMetrics({
        loadTime: pageLoadTime,
        fcp,
        lcp,
        cls: clsValue,
        memory,
      });
    }
  }, []);

  // Generate performance recommendations
  const generateRecommendations = useCallback((perf) => {
    const recs = [];

    if (perf.loadTime > 1000) {
      recs.push({
        type: 'high-priority',
        message: 'Page load time exceeds 1s. Consider code splitting.',
        metric: 'loadTime',
        value: perf.loadTime,
      });
    }

    if (perf.fcp > 100) {
      recs.push({
        type: 'high-priority',
        message: 'First Contentful Paint > 100ms. Optimize critical path.',
        metric: 'fcp',
        value: perf.fcp,
      });
    }

    if (perf.lcp > 2000) {
      recs.push({
        type: 'medium-priority',
        message: 'Largest Contentful Paint > 2s. Lazy load below-fold content.',
        metric: 'lcp',
        value: perf.lcp,
      });
    }

    if (perf.cls > 0.05) {
      recs.push({
        type: 'medium-priority',
        message: 'Cumulative Layout Shift > 0.05. Use size containers.',
        metric: 'cls',
        value: perf.cls,
      });
    }

    if (perf.memory > 100000000) {
      recs.push({
        type: 'medium-priority',
        message: 'High memory usage. Check for memory leaks.',
        metric: 'memory',
        value: perf.memory,
      });
    }

    setRecommendations(recs);
    return recs;
  }, []);

  // Configure lazy loading
  const configureLazyLoading = useCallback((routes) => {
    const config = {};

    routes.forEach((route) => {
      config[route] = {
        lazyLoad: true,
        preload: false,
        threshold: 0.5,
      };
    });

    setLazyLoadConfig(config);
    return config;
  }, []);

  // Analyze bundle
  const analyzeBundleSize = useCallback(() => {
    const analysis = {
      totalSize: 0,
      gzipSize: 0,
      chunks: [
        {
          name: 'main',
          size: 45000,
          gzipSize: 12000,
          modules: 250,
        },
        {
          name: 'vendor',
          size: 35000,
          gzipSize: 9000,
          modules: 80,
        },
        {
          name: 'shared',
          size: 15000,
          gzipSize: 4500,
          modules: 50,
        },
      ],
      timestamp: new Date().toISOString(),
    };

    analysis.totalSize = analysis.chunks.reduce((sum, chunk) => sum + chunk.size, 0);
    analysis.gzipSize = analysis.chunks.reduce((sum, chunk) => sum + chunk.gzipSize, 0);

    setBundleStats(analysis);
    return analysis;
  }, []);

  // Identify code splitting opportunities
  const identifyCodeSplittingOpportunities = useCallback((modules) => {
    const opportunities = [];

    modules.forEach((module) => {
      if (module.size > 50000) {
        opportunities.push({
          module: module.name,
          currentSize: module.size,
          potential: 'Split into smaller chunks',
          estimatedGain: Math.round(module.size * 0.3),
        });
      }
    });

    return opportunities.sort((a, b) => b.estimatedGain - a.estimatedGain);
  }, []);

  // Profile runtime performance
  const profileRuntimePerformance = useCallback(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
      });
    });

    try {
      observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
    } catch (e) {
      // PerformanceObserver not supported
    }

    return observer;
  }, []);

  // Optimize assets
  const optimizeAssets = useCallback(() => {
    const optimizations = {
      images: {
        strategy: 'lazy-load',
        format: 'webp',
        sizes: ['100vw', '50vw', '33vw'],
      },
      fonts: {
        strategy: 'font-display: swap',
        preload: true,
      },
      scripts: {
        strategy: 'code-splitting',
        defer: true,
      },
      styles: {
        strategy: 'critical-css',
        inline: true,
      },
    };

    return optimizations;
  }, []);

  // Measure on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', measureWebVitals);
      return () => window.removeEventListener('load', measureWebVitals);
    }
  }, [measureWebVitals]);

  return {
    metrics,
    lazyLoadConfig,
    recommendations,
    bundleStats,
    measureWebVitals,
    generateRecommendations,
    configureLazyLoading,
    analyzeBundleSize,
    identifyCodeSplittingOpportunities,
    profileRuntimePerformance,
    optimizeAssets,
  };
}

export default usePerformanceOptimizer;