import React from 'react';
import { LogoIcon } from './Icons';
import ThemeToggle from './ThemeToggle';
import type { AppView } from '../App';

interface HeaderProps {
  onGoHome: () => void;
  onNavigate: (view: AppView) => void;
  activeView: AppView;
}

const NavLink: React.FC<{
  view: AppView;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  children: React.ReactNode;
}> = ({ view, activeView, onNavigate, children }) => (
  <button
    onClick={() => onNavigate(view)}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      activeView === view
        ? 'text-brand-primary dark:text-brand-primary'
        : 'text-text-muted hover:text-text-primary dark:text-dark-text-muted dark:hover:text-dark-text-primary'
    }`}
    aria-current={activeView === view ? 'page' : undefined}
  >
    {children}
  </button>
);

export default function Header({ onGoHome, onNavigate, activeView }: HeaderProps): React.JSX.Element {
  return (
    <header className="bg-surface/80 dark:bg-dark-base/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border-color dark:border-dark-border-color">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onGoHome}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg p-1 -ml-1 transition-transform transform hover:scale-105"
              aria-label="Go to homepage"
            >
              <LogoIcon className="h-8 w-8 text-brand-primary" />
              <span className="ml-3 text-2xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight hidden sm:inline">WOD Optimize</span>
            </button>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink view="home" activeView={activeView} onNavigate={onNavigate}>Home</NavLink>
            <NavLink view="movements" activeView={activeView} onNavigate={onNavigate}>Movements</NavLink>
            <NavLink view="gripGuide" activeView={activeView} onNavigate={onNavigate}>Grip Guide</NavLink>
            <NavLink view="teamGuide" activeView={activeView} onNavigate={onNavigate}>Team Guide</NavLink>
          </nav>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden flex items-center justify-center border-t border-border-color dark:border-dark-border-color">
           <nav className="flex space-x-2 overflow-x-auto">
              <NavLink view="home" activeView={activeView} onNavigate={onNavigate}>Home</NavLink>
              <NavLink view="movements" activeView={activeView} onNavigate={onNavigate}>Movements</NavLink>
              <NavLink view="gripGuide" activeView={activeView} onNavigate={onNavigate}>Grip Guide</NavLink>
              <NavLink view="teamGuide" activeView={activeView} onNavigate={onNavigate}>Team Guide</NavLink>
            </nav>
        </div>
      </div>
    </header>
  );
}