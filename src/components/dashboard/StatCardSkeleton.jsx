import React, { memo } from 'react';

const StatCardSkeleton = memo(function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-slate-200 rounded-lg" />
      </div>
      <div className="h-4 bg-slate-200 rounded w-24 mb-2" />
      <div className="h-8 bg-slate-200 rounded w-32 mb-2" />
      <div className="h-3 bg-slate-100 rounded w-40" />
    </div>
  );
});

export default StatCardSkeleton;