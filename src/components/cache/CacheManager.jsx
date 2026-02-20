import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Cache Manager - Gerencia cache com LRU e TTL
 */
export default function CacheManager() {
  const [cache, setCache] = useState(() => {
    const stored = localStorage.getItem('appCache') || '{}';
    return JSON.parse(stored);
  });
  const [stats, setStats] = useState({ hits: 0, misses: 0, size: 0 });
  const MAX_CACHE_SIZE = 50; // items
  const DEFAULT_TTL = 3600; // 1 hora

  useEffect(() => {
    updateStats();
  }, [cache]);

  const updateStats = () => {
    const cacheSize = Object.keys(cache).length;
    const hitRate = cache.hits || 0;
    const missRate = cache.misses || 0;

    // Calcular tamanho aproximado em KB
    const cacheStr = JSON.stringify(cache);
    const sizeKB = new Blob([cacheStr]).size / 1024;

    setStats({
      hits: hitRate,
      misses: missRate,
      size: sizeKB.toFixed(2),
    });
  };

  const set = (key, value, ttl = DEFAULT_TTL) => {
    const now = Date.now();
    const newCache = { ...cache };

    // LRU: remover item mais antigo se limite atingido
    if (Object.keys(newCache).length >= MAX_CACHE_SIZE) {
      const oldestKey = Object.entries(newCache).sort(
        (a, b) => a[1].lastAccess - b[1].lastAccess
      )[0][0];
      delete newCache[oldestKey];
    }

    newCache[key] = {
      value,
      expires: now + ttl * 1000,
      created: now,
      lastAccess: now,
      accessCount: 0,
    };

    setCache(newCache);
    localStorage.setItem('appCache', JSON.stringify(newCache));
  };

  const get = (key) => {
    const item = cache[key];
    if (!item) {
      setCache(prev => ({ ...prev, misses: (prev.misses || 0) + 1 }));
      return null;
    }

    // Verificar TTL
    if (Date.now() > item.expires) {
      delete cache[key];
      localStorage.setItem('appCache', JSON.stringify(cache));
      return null;
    }

    // Atualizar acesso
    item.lastAccess = Date.now();
    item.accessCount = (item.accessCount || 0) + 1;
    setCache({ ...cache });
    setStats(prev => ({ ...prev, hits: prev.hits + 1 }));

    return item.value;
  };

  const clearExpired = () => {
    const now = Date.now();
    const filtered = Object.entries(cache).reduce((acc, [key, val]) => {
      if (now < val.expires) {
        acc[key] = val;
      }
      return acc;
    }, {});

    setCache(filtered);
    localStorage.setItem('appCache', JSON.stringify(filtered));
  };

  const clearAll = () => {
    setCache({});
    localStorage.removeItem('appCache');
  };

  const hitRate = stats.hits + stats.misses > 0
    ? Math.round((stats.hits / (stats.hits + stats.misses)) * 100)
    : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3 bg-blue-50">
          <p className="text-xs text-blue-600">Hits</p>
          <p className="text-2xl font-bold text-blue-900">{stats.hits}</p>
        </Card>
        <Card className="p-3 bg-red-50">
          <p className="text-xs text-red-600">Misses</p>
          <p className="text-2xl font-bold text-red-900">{stats.misses}</p>
        </Card>
        <Card className="p-3 bg-green-50">
          <p className="text-xs text-green-600">Hit Rate</p>
          <p className="text-2xl font-bold text-green-900">{hitRate}%</p>
        </Card>
        <Card className="p-3 bg-purple-50">
          <p className="text-xs text-purple-600">Tamanho</p>
          <p className="text-2xl font-bold text-purple-900">{stats.size}KB</p>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button onClick={clearExpired} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Limpar Expirados
        </Button>
        <Button onClick={clearAll} variant="destructive" size="sm">
          <Trash2 className="w-4 h-4 mr-2" />
          Limpar Tudo
        </Button>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Items em Cache ({Object.keys(cache).length})</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {Object.entries(cache).length === 0 ? (
            <p className="text-center text-gray-500 py-4">Cache vazio</p>
          ) : (
            Object.entries(cache).map(([key, val]) => (
              <div key={key} className="p-2 bg-gray-50 rounded text-sm">
                <div className="flex justify-between items-start">
                  <p className="font-mono font-bold text-xs break-all">{key}</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {val.accessCount} acessos
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Expira em: {new Date(val.expires).toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}