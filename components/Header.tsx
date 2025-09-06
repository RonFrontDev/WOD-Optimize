import React from 'react';
import { BarbellIcon } from './Icons';
import ThemeToggle from './ThemeToggle';

export default function Header(): React.JSX.Element {
  return (
    <header className="bg-surface/80 dark:bg-dark-base/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border-color dark:border-dark-border-color">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BarbellIcon className="h-8 w-8 text-brand-primary" />
            <span className="ml-3 text-2xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">WOD Optimize</span>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}