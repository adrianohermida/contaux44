import { useContext, createContext, useState, useEffect } from 'react';
import theme from '../theme';

// Criar contexto de tema
const ThemeContext = createContext();

/**
 * Provider de tema - colocar em Layout.js
 */
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Checar preferência do usuário no localStorage
    const saved = localStorage.getItem('contaux-theme');
    if (saved) {
      setIsDark(saved === 'dark');
    } else {
      // Checar preferência do sistema
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newValue = !prev;
      localStorage.setItem('contaux-theme', newValue ? 'dark' : 'light');
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook para usar tema globalmente
 * @returns {Object} { isDark, toggleTheme, theme }
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn('useTheme deve ser usado dentro de ThemeProvider');
    return {
      isDark: false,
      toggleTheme: () => {},
      theme,
    };
  }
  return context;
}

export default useTheme;