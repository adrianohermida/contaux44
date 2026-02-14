import React from 'react';
import { ThemeProvider } from './components/hooks/useTheme';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Layout({ children, currentPageName }) {
    React.useEffect(() => {
      const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
      link.rel = 'icon';
      link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ff672740bf3d542ac6481/d48cce015_favicon.png';
      if (!document.querySelector("link[rel~='icon']")) {
        document.head.appendChild(link);
      }
    }, []);

    return (
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
  );
}