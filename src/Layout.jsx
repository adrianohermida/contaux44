import React from 'react';
import { ThemeProvider } from './components/hooks/useTheme';
import { VoxImplantProvider } from './components/voximplant/context';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Layout({ children, currentPageName }) {
  return (
    <ThemeProvider>
      <VoxImplantProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </VoxImplantProvider>
    </ThemeProvider>
  );
}