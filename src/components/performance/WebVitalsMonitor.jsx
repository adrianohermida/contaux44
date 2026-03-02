/**
 * Web Vitals Monitoring
 * Rastreia Core Web Vitals e envia para analytics
 */

export function initWebVitalsMonitoring() {
  if (typeof window === 'undefined') return;

  // Importar dinâmico da lib web-vitals (pode ser adicionada depois)
  try {
    // LCP - Largest Contentful Paint
    observeMetric('largest-contentful-paint', (entry) => {
      trackWebVital('LCP', entry.renderTime || entry.loadTime);
    });

    // FID - First Input Delay (Legacy, substituído por INP)
    observeMetric('first-input', (entry) => {
      trackWebVital('FID', entry.processingDuration);
    });

    // CLS - Cumulative Layout Shift
    observeMetric('layout-shift', (entry) => {
      if (!entry.hadRecentInput) {
        trackWebVital('CLS', entry.value, true);
      }
    });

    // INP - Interaction to Next Paint
    observeMetric('long-animation-frame', (entry) => {
      trackWebVital('INP', entry.duration);
    });

    // TTFB - Time to First Byte
    if (performance.timing) {
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
      trackWebVital('TTFB', ttfb);
    }
  } catch (error) {
    console.warn('Web Vitals monitoring error:', error);
  }
}

/**
 * Observer genérico para Performance API
 */
function observeMetric(entryType, callback) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        callback(entry);
      }
    });

    observer.observe({ entryTypes: [entryType], buffered: true });
  } catch (error) {
    console.warn(`Failed to observe ${entryType}:`, error);
  }
}

/**
 * Track individual vital
 */
function trackWebVital(name, value, isCumulative = false) {
  // Validar valores
  if (typeof value !== 'number' || value < 0) return;

  // Exemplo de estrutura para enviar
  const vital = {
    name,
    value: Math.round(value),
    unit: name === 'CLS' ? '' : 'ms',
    timestamp: new Date().toISOString(),
  };

  // Log no console em dev
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Web Vital: ${name} = ${vital.value}${vital.unit}`);
  }

  // Enviar para analytics (quando analytics SDK estiver ready)
  if (window.__trackWebVital) {
    window.__trackWebVital(vital);
  }

  // Armazenar no sessionStorage para debugging
  try {
    const vitals = JSON.parse(sessionStorage.getItem('webVitals') || '{}');
    vitals[name] = vital.value;
    sessionStorage.setItem('webVitals', JSON.stringify(vitals));
  } catch (e) {
    // Ignorar erro de storage
  }
}

/**
 * Get vitals do sessionStorage
 */
export function getWebVitals() {
  try {
    return JSON.parse(sessionStorage.getItem('webVitals') || '{}');
  } catch {
    return {};
  }
}

/**
 * Check se vitals estão OK (threshold checking)
 */
export function checkWebVitalsThresholds() {
  const vitals = getWebVitals();
  
  const thresholds = {
    LCP: 2500,    // 2.5s
    FID: 100,     // 100ms
    INP: 200,     // 200ms
    CLS: 0.1,     // 0.1
    TTFB: 600,    // 600ms
  };

  const failures = [];
  
  Object.entries(vitals).forEach(([name, value]) => {
    if (thresholds[name] && value > thresholds[name]) {
      failures.push({
        metric: name,
        value,
        threshold: thresholds[name],
        status: 'warning',
      });
    }
  });

  return {
    vitals,
    failures,
    isGood: failures.length === 0,
  };
}

/**
 * Initialize monitoring on app load
 */
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      initWebVitalsMonitoring();
    }, 0);
  });
}