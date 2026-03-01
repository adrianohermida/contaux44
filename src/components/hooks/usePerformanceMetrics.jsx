/**
 * usePerformanceMetrics Hook
 * Monitor component performance metrics
 */

import { useEffect, useRef } from 'react';

export function usePerformanceMetrics(componentName) {
  const renderTimeRef = useRef(null);
  const metricsRef = useRef({
    renders: 0,
    avgRenderTime: 0,
    lastRenderTime: 0,
  });

  useEffect(() => {
    // Record render time
    const now = performance.now();
    
    if (renderTimeRef.current) {
      const renderTime = now - renderTimeRef.current;
      metricsRef.current.renders++;
      metricsRef.current.lastRenderTime = renderTime;
      
      // Calculate average
      metricsRef.current.avgRenderTime = 
        (metricsRef.current.avgRenderTime * (metricsRef.current.renders - 1) + renderTime) /
        metricsRef.current.renders;

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.debug(`[${componentName}] Render #${metricsRef.current.renders}: ${renderTime.toFixed(2)}ms`);
      }
    }
    
    renderTimeRef.current = now;

    return () => {
      renderTimeRef.current = null;
    };
  });

  return metricsRef.current;
}