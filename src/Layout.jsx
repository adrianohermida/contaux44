import React from 'react';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

export default function Layout({ children, currentPageName }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}