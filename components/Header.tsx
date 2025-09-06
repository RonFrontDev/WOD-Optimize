
import React from 'react';
import { BarbellIcon } from './Icons';

export default function Header(): React.JSX.Element {
  return (
    <header className="bg-surface-dark/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BarbellIcon className="h-8 w-8 text-brand-primary" />
            <span className="ml-3 text-2xl font-bold text-white tracking-tight">WOD Optimize</span>
          </div>
        </div>
      </div>
    </header>
  );
}
