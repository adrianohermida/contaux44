/**
 * Load Test Configuration para PHASE 14.1
 * 
 * Executar com:
 * - Apache Bench: ab -n 1000 -c 100 http://localhost/api/endpoint
 * - Artillery: artillery run load-test.yml
 * - k6: k6 run load-test.js
 */

export const loadTestConfig = {
  scenarios: [
    {
      name: 'Normal Load',
      duration: '5m',
      arrivalRate: 50,
      rampUp: '1m',
      expectedSuccess: '100%',
      expectedLatency: '<200ms',
      description: 'Simula carga normal: 50 req/s durante 5 minutos'
    },
    {
      name: 'Spike Load',
      duration: '2m',
      arrivalRate: 200,
      expectedSuccess: '50%', // 100 bloqueadas por rate limit
      expectedLatency: '<1s',
      description: 'Simula spike: 200 req/s (rate limit em 100/min = ~1.66/s)',
      expectedRateLimitHits: 'Yes',
    },
    {
      name: 'Sustained Load',
      duration: '15m',
      arrivalRate: 80,
      expectedSuccess: '100%',
      expectedLatency: '<300ms',
      description: 'Simula carga sustentada: 80 req/s durante 15 minutos',
      expectedMemoryStable: true,
    },
    {
      name: 'Burst Load',
      duration: '2s',
      totalRequests: 500,
      parallelConnections: 100,
      expectedSuccess: '100%',
      expectedLatency: '<500ms',
      description: 'Simula burst: 500 requisições em 2 segundos (250 req/s)',
      expectedGracefulDegradation: true,
    },
  ],

  endpoints: [
    {
      path: '/api/contact-create',
      method: 'POST',
      payload: {
        company_name: 'Load Test Company',
        email: 'test@loadtest.com',
        client_type: 'pj',
        cnpj: '12345678000100',
        phone: '1133334444',
      },
    },
    {
      path: '/api/contact-update',
      method: 'POST',
      payload: {
        contact_id: 'test-contact-id',
        company_name: 'Updated Company',
      },
    },
    {
      path: '/api/note-create',
      method: 'POST',
      payload: {
        contact_id: 'test-contact-id',
        content: 'Load test note',
        note_type: 'general',
      },
    },
  ],

  metrics: {
    latency: {
      p50: '<100ms',
      p95: '<300ms',
      p99: '<500ms',
      max: '<1s',
    },
    throughput: {
      min: '>1000 req/s per gateway instance',
      sustainable: '>500 req/s per gateway instance',
    },
    rateLimit: {
      enforcement: 'Strict (100 req/min per user/IP)',
      blocks: 'HTTP 429 with Retry-After header',
      noFalsePositives: true,
    },
    memory: {
      stable: true,
      noLeaks: true,
      maxHeap: '<500MB',
    },
    errorRate: {
      expected: '<0.1%',
      acceptable: '<0.5%',
    },
  },

  successCriteria: [
    {
      criterion: 'Response time (p99)',
      target: '<500ms',
      critical: true,
    },
    {
      criterion: 'Error rate',
      target: '<0.1%',
      critical: true,
    },
    {
      criterion: 'Rate limiting enforcement',
      target: 'HTTP 429 only after 100 req/min',
      critical: true,
    },
    {
      criterion: 'Security headers',
      target: 'All 8 headers present on 100% responses',
      critical: true,
    },
    {
      criterion: 'Logging',
      target: '100% of requests logged',
      critical: true,
    },
    {
      criterion: 'No cascading failures',
      target: 'Graceful degradation under load',
      critical: true,
    },
    {
      criterion: 'Memory stability',
      target: 'No memory leaks over 15 min sustained load',
      critical: false,
    },
    {
      criterion: 'CPU usage',
      target: '<80% CPU per core',
      critical: false,
    },
  ],

  reportMetrics: {
    successRatio: {
      description: '% of successful responses',
      importance: 'critical',
    },
    latencyPercentiles: {
      description: 'p50, p95, p99 latency',
      importance: 'critical',
    },
    errorBreakdown: {
      description: 'Erros por tipo (400, 401, 403, 429, 500)',
      importance: 'critical',
    },
    rateLimitStats: {
      description: 'How many requests blocked, reset times',
      importance: 'critical',
    },
    throughput: {
      description: 'Requests per second sustained',
      importance: 'high',
    },
    peakLoad: {
      description: 'Maximum sustained throughput before degradation',
      importance: 'high',
    },
    resourceUsage: {
      description: 'Memory, CPU, connection usage over time',
      importance: 'medium',
    },
  },
};

export const testSummaryTemplate = `
# Load Test Results - PHASE 14.1

## Executive Summary
- **Status**: [PASS/FAIL]
- **Date**: [Date]
- **Duration**: [Total test duration]
- **Total Requests**: [Number]
- **Success Rate**: [Percentage]
- **Peak Throughput**: [Req/s]

## Scenario Results

### Scenario 1: Normal Load (50 req/s, 5 min)
- Status: [PASS/FAIL]
- Success Rate: [Percentage]
- p50 latency: [ms]
- p99 latency: [ms]
- Rate limit blocks: [Count]

### Scenario 2: Spike Load (200 req/s, 2 min)
- Status: [PASS/FAIL]
- Success Rate: [Percentage] (expect ~50%)
- Rate limit effectiveness: [Working/Failing]
- Graceful degradation: [Yes/No]

### Scenario 3: Sustained Load (80 req/s, 15 min)
- Status: [PASS/FAIL]
- Success Rate: [Percentage]
- p99 latency: [ms]
- Memory trend: [Stable/Increasing]
- No memory leaks: [Yes/No]

### Scenario 4: Burst Load (500 req in 2s)
- Status: [PASS/FAIL]
- Success Rate: [Percentage]
- Peak latency: [ms]
- Recovery time: [seconds]

## Security Validation
- All security headers present: [Yes/No]
- Rate limiting enforced: [Yes/No]
- Input validation working: [Yes/No]
- Error handling correct: [Yes/No]

## Performance Metrics
- Overhead vs baseline: [ms] (<5ms target)
- Memory consumption: [MB]
- CPU utilization: [Percentage]

## Critical Issues Found
[List any critical issues]

## Recommendations
[List any recommendations for optimization]

## Approval
- Load testing: [APPROVED/REJECTED]
- Ready for production: [YES/NO]
`;