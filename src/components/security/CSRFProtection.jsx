import React, { useEffect, useMemo, useCallback } from 'react';

class CSRFTokenManager {
  constructor() {
    this.tokenKey = 'csrf_token';
    this.headerName = 'X-CSRF-Token';
  }

  generateToken() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getToken() {
    let token = localStorage.getItem(this.tokenKey);
    if (!token) {
      token = this.generateToken();
      localStorage.setItem(this.tokenKey, token);
    }
    return token;
  }

  refreshToken() {
    const newToken = this.generateToken();
    localStorage.setItem(this.tokenKey, newToken);
    return newToken;
  }

  validateToken(token) {
    const stored = localStorage.getItem(this.tokenKey);
    return stored && stored === token;
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }
}

export const csrfManager = new CSRFTokenManager();

const CSRFProtection = ({ children }) => {
  useEffect(() => {
    const token = csrfManager.getToken();
    
    // Injetar token nos headers de requisições
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const [resource, config = {}] = args;
      const method = (config.method || 'GET').toUpperCase();
      
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
        config.headers = config.headers || {};
        config.headers[csrfManager.headerName] = token;
      }
      
      return originalFetch.apply(this, args);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return children;
};

export const useCSRFToken = () => {
  const token = useMemo(() => csrfManager.getToken(), []);

  return {
    token,
    refreshToken: useCallback(() => csrfManager.refreshToken(), []),
    getHeader: useCallback(() => ({
      [csrfManager.headerName]: token
    }), [token]),
    validateToken: useCallback((t) => csrfManager.validateToken(t), [])
  };
};

export default CSRFProtection;