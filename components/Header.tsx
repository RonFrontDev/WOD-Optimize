import React from 'react';
import { LogoIcon } from './Icons';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onGoHome: () => void;
}

export default function Header({ onGoHome }: HeaderProps): React.JSX.Element {
  return (
    <header className="bg-surface/80 dark:bg-dark-base/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border-color dark:border-dark-border-color">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={onGoHome}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg p-1 -ml-1 transition-transform transform hover:scale-105"
            aria-label="Go to homepage"
          >
            <LogoIcon className="h-8 w-8 text-brand-primary" />
            <span className="ml-3 text-2xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">WOD Optimize</span>
          </button>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}