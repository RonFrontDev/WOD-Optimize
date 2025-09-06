
import React from 'react';

export default function LoadingSpinner(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-brand-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-brand-primary [animation-delay:0.2s]"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-brand-primary [animation-delay:0.4s]"></div>
    </div>
  );
}
