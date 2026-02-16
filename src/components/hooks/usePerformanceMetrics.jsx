import { useEffect, useRef } from 'react';

/**
 * Hook para medir métricas de performance da app
 * Coleta FCP, LCP, CLS e TTI
 */
export function usePerformanceMetrics() {
  const metricsRef = useRef({
    fcp: null,
    lcp: null,
    cls: 0,
    tti: null,
    pageLoadTime: 0
  });

  useEffect(() => {
    const metrics = metricsRef.current;
    metrics.pageLoadTime = performance.now();

    // Measure Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // FCP - First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries[0];
          if (fcp) metrics.fcp = fcp.startTime;
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // LCP - Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          if (lcp) metrics.lcp = lcp.renderTime || lcp.loadTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // CLS - Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              metrics.cls += entry.value;
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        return () => {
          fcpObserver.disconnect();
          lcpObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (e) {
        console.debug('Performance monitoring not supported');
      }
    }
  }, []);

  return metricsRef.current;
}