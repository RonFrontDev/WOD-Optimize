import React, { useState, useEffect, useRef } from 'react';
import { LogoIcon, ChevronDownIcon, MenuIcon, XIcon } from './Icons';
import ThemeToggle from './ThemeToggle';
import type { AppView } from '../types';

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

const DropdownNavLink: React.FC<{
  view: AppView;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  closeDropdown: () => void;
  children: React.ReactNode;
}> = ({ view, activeView, onNavigate, closeDropdown, children }) => (
    <a
        href="#"
        onClick={(e) => {
            e.preventDefault();
            onNavigate(view);
            closeDropdown();
        }}
        className={`block w-full text-left px-4 py-2 text-sm ${activeView === view ? 'bg-slate-100 dark:bg-slate-800 text-text-primary dark:text-dark-text-primary' : 'text-text-muted dark:text-dark-text-muted'} hover:bg-slate-100 dark:hover:bg-slate-800`}
        role="menuitem"
    >
        {children}
    </a>
);

const MobileNavLink: React.FC<{
  view: AppView;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  closeMenu: () => void;
  children: React.ReactNode;
}> = ({ view, activeView, onNavigate, closeMenu, children }) => (
  <button
    onClick={() => {
        onNavigate(view);
        closeMenu();
    }}
    className={`block w-full text-left py-3 px-4 text-lg font-medium rounded-md transition-colors duration-200 ${
      activeView === view
        ? 'bg-brand-primary/10 text-brand-primary'
        : 'text-text-primary dark:text-dark-text-primary hover:bg-slate-100 dark:hover:bg-slate-800'
    }`}
    aria-current={activeView === view ? 'page' : undefined}
  >
    {children}
  </button>
);


export default function Header({ onGoHome, onNavigate, activeView }: HeaderProps): React.JSX.Element {
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Effect for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsGuidesOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effect for mobile menu scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  
  const isGuideActive = ['gripGuide', 'shoeGuide', 'teamGuide', 'rehab', 'recovery', 'foodGuide', 'machineGuide', 'barbellCyclingGuide'].includes(activeView);

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
            <NavLink view="warmup" activeView={activeView} onNavigate={onNavigate}>Warm-up</NavLink>
            <NavLink view="movements" activeView={activeView} onNavigate={onNavigate}>Movements</NavLink>
            
            {/* Guides Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsGuidesOpen(!isGuidesOpen)}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                        isGuideActive
                        ? 'text-brand-primary dark:text-brand-primary'
                        : 'text-text-muted hover:text-text-primary dark:text-dark-text-muted dark:hover:text-dark-text-primary'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isGuidesOpen}
                >
                    <span>Guides</span>
                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isGuidesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isGuidesOpen && (
                    <div
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-surface dark:bg-dark-surface ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="guides-menu-button"
                    >
                        <div className="py-1" role="none">
                            <DropdownNavLink view="rehab" activeView={activeView} onNavigate={onNavigate} closeDropdown={() => setIsGuidesOpen(false)}>Rehab Guide</DropdownNavLink>
                            <DropdownNavLink view="recovery" activeView={activeView} onNavigate={onNavigate} closeDropdown={() => setIsGuidesOpen(false)}>Recovery Hub</DropdownNavLink>
                            <DropdownNavLink view="foodGuide" activeView={activeView} onNavigate={onNavigate} closeDropdown={() => setIsGuidesOpen(false)}>Food Guide</DropdownNavLink>
                            <DropdownNavLink view="machineGuide" activeView={activeView} onNavigate={onNavigate} closeDropdown={() => setIsGuidesOpen(false)}>Machine Guide</DropdownNavLink>
                            <DropdownNavLink view="barbellCyclingGuide" activeView={activeView} onNavigate={onNavigate} closeDropdown={() => setIsGuidesOpen(false)}>Barbell Cycling</DropdownNavLink>
                            <DropdownNavLink view="teamGuide" activeView={activeView} onNavigate={onNavigate} closeDropdown={() => setIsGuidesOpen(false)}>Team Guide</DropdownNavLink>
                            <DropdownNavLink view="gripGuide" activeView={activeView} onNavigate={onNavigate} closeDropdown={() => setIsGuidesOpen(false)}>Grip Guide</DropdownNavLink>
                            <DropdownNavLink view="shoeGuide" activeView={activeView} onNavigate={onNavigate} closeDropdown={() => setIsGuidesOpen(false)}>Shoe Guide</DropdownNavLink>
                        </div>
                    </div>
                )}
            </div>
          </nav>
          <div className="flex items-center">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 rounded-md text-text-muted dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
                    aria-label="Open main menu"
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-40 animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}></div>

            {/* Panel */}
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-surface dark:bg-dark-surface shadow-xl p-4 animate-slide-in-right flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b border-border-color dark:border-dark-border-color">
                    <span className="text-xl font-bold text-text-primary dark:text-dark-text-primary">Menu</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-md text-text-muted dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
                        aria-label="Close menu"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-6 flex-1 space-y-2 bg-surface dark:bg-dark-surface ">
                    <MobileNavLink view="home" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
                    <MobileNavLink view="warmup" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Warm-up</MobileNavLink>
                    <MobileNavLink view="movements" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Movements</MobileNavLink>
                    <MobileNavLink view="rehab" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Rehab Guide</MobileNavLink>
                    <MobileNavLink view="recovery" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Recovery Hub</MobileNavLink>
                    <MobileNavLink view="foodGuide" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Food Guide</MobileNavLink>
                    <MobileNavLink view="machineGuide" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Machine Guide</MobileNavLink>
                    <MobileNavLink view="barbellCyclingGuide" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Barbell Cycling</MobileNavLink>
                    <MobileNavLink view="teamGuide" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Team Guide</MobileNavLink>
                    <MobileNavLink view="gripGuide" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Grip Guide</MobileNavLink>
                    <MobileNavLink view="shoeGuide" activeView={activeView} onNavigate={onNavigate} closeMenu={() => setIsMobileMenuOpen(false)}>Shoe Guide</MobileNavLink>
                <div className="mt-auto flex justify-center pt-6">
                    <ThemeToggle />
                </div>
                </nav>
            </div>
        </div>
      )}
    </header>
  );
}