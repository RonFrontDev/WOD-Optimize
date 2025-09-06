import React from 'react';

export default function SkeletonLoader(): React.JSX.Element {
  return (
    <div className="bg-surface dark:bg-dark-surface p-4 rounded-lg shadow-md animate-pulse border border-border-color dark:border-dark-border-color">
      <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-1/3 mb-3"></div>
      <div className="h-3 bg-slate-200 dark:bg-slate-600 rounded w-full mb-2"></div>
      <div className="h-3 bg-slate-200 dark:bg-slate-600 rounded w-5/6"></div>
    </div>
  );
}