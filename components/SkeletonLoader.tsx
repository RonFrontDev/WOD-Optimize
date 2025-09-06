
import React from 'react';

export default function SkeletonLoader(): React.JSX.Element {
  return (
    <div className="bg-surface-dark p-4 rounded-lg shadow-md animate-pulse">
      <div className="h-4 bg-slate-700 rounded w-1/3 mb-3"></div>
      <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
      <div className="h-3 bg-slate-700 rounded w-5/6"></div>
    </div>
  );
}
