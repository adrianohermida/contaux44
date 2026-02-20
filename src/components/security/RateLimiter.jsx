import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AlertCircle, Clock } from 'lucide-react';

class RateLimitManager {
  constructor(maxRequests = 60, timeWindowMs = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindowMs = timeWindowMs;
    this.requestsKey = 'rate_limit_requests';
    this.blockedKey = 'rate_limit_blocked';
  }

  getRequests() {
    try {
      const data = localStorage.getItem(this.requestsKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveRequests(requests) {
    localStorage.setItem(this.requestsKey, JSON.stringify(requests));
  }

  isBlocked() {
    try {
      const blocked = localStorage.getItem(this.blockedKey);
      if (!blocked) return false;
      
      const { until } = JSON.parse(blocked);
      if (Date.now() < until) {
        return { blocked: true, remainingMs: until - Date.now() };
      }
      
      localStorage.removeItem(this.blockedKey);
      return false;
    } catch {
      return false;
    }
  }

  canMakeRequest() {
    const blocked = this.isBlocked();
    if (blocked) return blocked;

    const now = Date.now();
    const requests = this.getRequests();
    
    // Remove old requests outside time window
    const recentRequests = requests.filter(t => now - t < this.timeWindowMs);
    
    if (recentRequests.length >= this.maxRequests) {
      // Block for exponential backoff
      const blockDuration = Math.min(60000, 5000 * Math.pow(1.5, recentRequests.length - this.maxRequests));
      localStorage.setItem(this.blockedKey, JSON.stringify({
        until: now + blockDuration
      }));
      
      return { blocked: true, remainingMs: blockDuration };
    }

    return { blocked: false, requestsUsed: recentRequests.length, remaining: this.maxRequests - recentRequests.length };
  }

  recordRequest() {
    const requests = this.getRequests();
    requests.push(Date.now());
    this.saveRequests(requests);
  }

  getRemainingRequests() {
    const now = Date.now();
    const requests = this.getRequests();
    const recentRequests = requests.filter(t => now - t < this.timeWindowMs);
    return this.maxRequests - recentRequests.length;
  }

  reset() {
    localStorage.removeItem(this.requestsKey);
    localStorage.removeItem(this.blockedKey);
  }
}

export const rateLimiter = new RateLimitManager();

const RateLimiterComponent = ({ maxRequests = 60, timeWindowMs = 60000, children }) => {
  const [status, setStatus] = useState({ blocked: false, remaining: maxRequests });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const status = rateLimiter.canMakeRequest();
      setStatus(status);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRequest = useCallback(() => {
    const status = rateLimiter.canMakeRequest();
    
    if (status.blocked) {
      setShowAlert(true);
      setStatus(status);
      setTimeout(() => setShowAlert(false), 3000);
      return false;
    }

    rateLimiter.recordRequest();
    setStatus({
      blocked: false,
      remaining: status.remaining - 1
    });
    return true;
  }, []);

  const remainingPercentage = useMemo(() => {
    return Math.round((status.remaining / maxRequests) * 100);
  }, [status.remaining, maxRequests]);

  return (
    <div>
      {showAlert && status.blocked && (
        <div className="fixed bottom-4 right-4 bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-lg z-50">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <div>
              <p className="font-semibold text-amber-900">Limite de requisições atingido</p>
              <p className="text-sm text-amber-700">Aguarde {Math.ceil(status.remainingMs / 1000)}s</p>
            </div>
          </div>
        </div>
      )}

      {children && typeof children === 'function' ? children(handleRequest, status) : children}
    </div>
  );
};

export const useRateLimit = (maxRequests = 60, timeWindowMs = 60000) => {
  const [status, setStatus] = useState({ blocked: false, remaining: maxRequests });

  useEffect(() => {
    const interval = setInterval(() => {
      const limitStatus = rateLimiter.canMakeRequest();
      setStatus(limitStatus);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const canMakeRequest = useCallback(() => {
    const limitStatus = rateLimiter.canMakeRequest();
    if (!limitStatus.blocked) {
      rateLimiter.recordRequest();
      return true;
    }
    return false;
  }, []);

  return {
    canMakeRequest,
    isBlocked: status.blocked,
    remaining: status.remaining || maxRequests,
    remainingMs: status.remainingMs
  };
};

export default RateLimiterComponent;