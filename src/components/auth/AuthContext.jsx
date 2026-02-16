import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar user na primeira vez e manter em cache
  useEffect(() => {
    const loadUser = async () => {
      try {
        const cachedUser = sessionStorage.getItem('authUser');
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
          setLoading(false);
          return;
        }

        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          setLoading(false);
          return;
        }

        const currentUser = await base44.auth.me();
        setUser(currentUser);
        sessionStorage.setItem('authUser', JSON.stringify(currentUser));
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Erro ao autenticar');
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = useCallback(async () => {
    sessionStorage.removeItem('authUser');
    setUser(null);
    await base44.auth.logout();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}