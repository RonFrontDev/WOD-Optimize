import React from 'react';
import { useTheme } from '../ThemeContext';
import { SunIcon, MoonIcon } from './Icons';

export default function ThemeToggle(): React.JSX.Element {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-slate-200 dark:hover:bg-dark-surface transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
}
