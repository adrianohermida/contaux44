import React from 'react';

export default function ResponsiveTable({ children, className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          {children}
        </table>
      </div>
      
      {/* Mobile: Cards (handled by parent component) */}
      <div className="md:hidden">
        {children}
      </div>
    </div>
  );
}