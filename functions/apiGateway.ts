import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * API Gateway - Centralized request/response middleware
 * Handles: rate limiting, request validation, response filtering, security headers, logging
 */

class APIGateway {
  constructor() {
    this.requestLog = [];
    this.rateLimitMap = new Map();
    this.endpointSchemas = this.initializeSchemas();
  }

  initializeSchemas() {
    return {
      'clients.list': {
        method: 'GET',
        maxSize: 1000,
        timeout: 30000,
        rateLimit: { perUser: 100, perIP: 50, window: 60000 }
      },
      'clients.create': {
        method: 'POST',
        maxSize: 10000,
        timeout: 30000,
        rateLimit: { perUser: 20, perIP: 10, window: 60000 },
        requiredFields: ['company_name', 'email']
      },
      'clients.update': {
        method: 'PUT',
        maxSize: 10000,
        timeout: 30000,
        rateLimit: { perUser: 50, perIP: 20, window: 60000 }
      },
      'contacts.list': {
        method: 'GET',
        maxSize: 1000,
        timeout: 30000,
        rateLimit: { perUser: 100, perIP: 50, window: 60000 }
      }
    };
  }

  // Rate limiting with sliding window
  checkRateLimit(key, limit, window = 60000) {
    const now = Date.now();
    if (!this.rateLimitMap.has(key)) {
      this.rateLimitMap.set(key, []);
    }

    const requests = this.rateLimitMap.get(key);
    const recentRequests = requests.filter(ts => now - ts < window);

    if (recentRequests.length >= limit) {
      return { allowed: false, remaining: 0, resetTime: recentRequests[0] + window };
    }

    recentRequests.push(now);
    this.rateLimitMap.set(key, recentRequests);

    return {
      allowed: true,
      remaining: limit - recentRequests.length,
      resetTime: now + window
    };
  }

  // Request validation
  validateRequest(endpoint, req, payload) {
    const schema = this.endpointSchemas[endpoint];
    if (!schema) {
      return { valid: true };
    }

    // Check required fields
    if (schema.requiredFields) {
      const missing = schema.requiredFields.filter(field => !payload[field]);
      if (missing.length > 0) {
        return { valid: false, error: `Missing required fields: ${missing.join(', ')}` };
      }
    }

    // Check size limits
    const payloadSize = JSON.stringify(payload).length;
    if (payloadSize > schema.maxSize) {
      return { valid: false, error: `Payload too large. Max: ${schema.maxSize} bytes` };
    }

    return { valid: true };
  }

  // Security headers
  getSecurityHeaders() {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Security-Policy': "default-src 'self'",
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    };
  }

  // Response filtering (remove sensitive fields)
  filterResponse(data, endpoint) {
    if (!data) return data;
    if (Array.isArray(data)) {
      return data.map(item => this.filterSingleResponse(item, endpoint));
    }
    return this.filterSingleResponse(data, endpoint);
  }

  filterSingleResponse(item, endpoint) {
    const sensitiveFields = ['password', 'token', 'secret', 'api_key', 'credit_card'];
    const filtered = { ...item };

    sensitiveFields.forEach(field => {
      if (filtered[field]) {
        delete filtered[field];
      }
    });

    return filtered;
  }

  // Audit logging
  logRequest(endpoint, user, method, statusCode, duration, metadata = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      endpoint,
      user: user?.email || 'anonymous',
      method,
      statusCode,
      duration,
      metadata
    };

    this.requestLog.push(logEntry);

    // Keep only last 10000 logs in memory
    if (this.requestLog.length > 10000) {
      this.requestLog = this.requestLog.slice(-10000);
    }

    return logEntry;
  }

  // Get gateway stats
  getStats() {
    const now = Date.now();
    const last1Hour = this.requestLog.filter(log => now - new Date(log.timestamp).getTime() < 3600000);

    return {
      totalRequests: this.requestLog.length,
      requestsLastHour: last1Hour.length,
      averageLatency: last1Hour.length > 0
        ? Math.round(last1Hour.reduce((sum, log) => sum + log.duration, 0) / last1Hour.length)
        : 0,
      failedRequests: last1Hour.filter(log => log.statusCode >= 400).length,
      successRate: last1Hour.length > 0
        ? Math.round((last1Hour.filter(log => log.statusCode < 400).length / last1Hour.length) * 100)
        : 100,
      topEndpoints: this.getTopEndpoints(last1Hour, 5)
    };
  }

  getTopEndpoints(logs, limit = 5) {
    const endpoints = {};
    logs.forEach(log => {
      endpoints[log.endpoint] = (endpoints[log.endpoint] || 0) + 1;
    });
    return Object.entries(endpoints)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([endpoint, count]) => ({ endpoint, count }));
  }

  // Get detailed logs
  getLogs(filters = {}) {
    let logs = this.requestLog;

    if (filters.endpoint) {
      logs = logs.filter(log => log.endpoint === filters.endpoint);
    }

    if (filters.status) {
      logs = logs.filter(log => log.statusCode === filters.status);
    }

    if (filters.user) {
      logs = logs.filter(log => log.user === filters.user);
    }

    if (filters.minDuration) {
      logs = logs.filter(log => log.duration >= filters.minDuration);
    }

    return logs.slice(-100); // Return last 100 matching logs
  }
}

// Global gateway instance
const gateway = new APIGateway();

Deno.serve(async (req) => {
  const startTime = performance.now();

  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);

    const url = new URL(req.url);
    const endpoint = url.pathname.split('/').filter(Boolean).join('.');
    const method = req.method;

    // Get rate limit keys
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    const userKey = user?.email || clientIP;

    // Check rate limits
    const schema = gateway.endpointSchemas[endpoint];
    if (schema?.rateLimit) {
      const userLimit = gateway.checkRateLimit(`user:${userKey}`, schema.rateLimit.perUser, schema.rateLimit.window);
      const ipLimit = gateway.checkRateLimit(`ip:${clientIP}`, schema.rateLimit.perIP, schema.rateLimit.window);

      if (!userLimit.allowed || !ipLimit.allowed) {
        const duration = performance.now() - startTime;
        gateway.logRequest(endpoint, user, method, 429, duration, { reason: 'rate_limit_exceeded' });

        return new Response(
          JSON.stringify({
            error: 'Too many requests',
            remaining: Math.min(userLimit.remaining, ipLimit.remaining),
            resetTime: Math.max(userLimit.resetTime, ipLimit.resetTime)
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'X-RateLimit-Limit': '100',
              'X-RateLimit-Remaining': Math.min(userLimit.remaining, ipLimit.remaining).toString(),
              'X-RateLimit-Reset': Math.max(userLimit.resetTime, ipLimit.resetTime).toString(),
              ...gateway.getSecurityHeaders()
            }
          }
        );
      }
    }

    // Parse request body
    let payload = {};
    if (method !== 'GET' && req.body) {
      try {
        payload = await req.json();
      } catch {
        const duration = performance.now() - startTime;
        gateway.logRequest(endpoint, user, method, 400, duration, { reason: 'invalid_json' });

        return new Response(
          JSON.stringify({ error: 'Invalid JSON in request body' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...gateway.getSecurityHeaders() } }
        );
      }
    }

    // Validate request
    const validation = gateway.validateRequest(endpoint, req, payload);
    if (!validation.valid) {
      const duration = performance.now() - startTime;
      gateway.logRequest(endpoint, user, method, 400, duration, { reason: validation.error });

      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...gateway.getSecurityHeaders() } }
      );
    }

    // Log successful request
    const duration = performance.now() - startTime;
    gateway.logRequest(endpoint, user, method, 200, duration, { payload_size: JSON.stringify(payload).length });

    // Return gateway stats or logs based on request
    if (endpoint === 'gateway.stats') {
      return new Response(
        JSON.stringify(gateway.getStats()),
        { status: 200, headers: { 'Content-Type': 'application/json', ...gateway.getSecurityHeaders() } }
      );
    }

    if (endpoint === 'gateway.logs') {
      const filters = Object.fromEntries(url.searchParams);
      return new Response(
        JSON.stringify(gateway.getLogs(filters)),
        { status: 200, headers: { 'Content-Type': 'application/json', ...gateway.getSecurityHeaders() } }
      );
    }

    // Default response
    return new Response(
      JSON.stringify({
        success: true,
        endpoint,
        method,
        timestamp: new Date().toISOString(),
        processingTime: Math.round(duration) + 'ms'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...gateway.getSecurityHeaders() } }
    );
  } catch (error) {
    const duration = performance.now() - startTime;
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...gateway.getSecurityHeaders() } }
    );
  }
});