import React from 'react';

interface IconProps {
    className?: string;
}

export const LogoIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    role="img"
    aria-labelledby="wod-optimize-logo-title"
  >
    <title id="wod-optimize-logo-title">WOD Optimize Logo</title>
    <desc>An icon showing an upward bar chart inside a circle, representing performance optimization within fitness.</desc>
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM7 16V12H9V16H7ZM11 16V9H13V16H11ZM15 16V6H17V16H15Z" 
    />
  </svg>
);

export const BarbellIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 6V4a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m4 0h-4m4 12v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2m4 0h-4M5 6h14M5 18h14" />
    </svg>
);

export const UploadIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const ArrowLeftIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

export const SparklesIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export const XCircleIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const LightningIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const HeartIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

export const GripIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V14" />
    </svg>
);


export const ForwardIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
);

export const EnergyIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
    </svg>
);

export const ClipboardListIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

export const TrashIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const PlusCircleIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CheckCircleIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ExclamationTriangleIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

export const ClockIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ChevronDownIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

export const SearchIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const ArchiveBoxIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);

export const SunIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const MoonIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

export const BookmarkIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.082l-7.854 3.589A.75.75 0 013 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
    </svg>
);

export const BookmarkOutlineIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
);

export const BookmarkSquareIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25L7.5 16.5V3.75m9 0H7.5A2.25 2.25 0 005.25 6v13.5A2.25 2.25 0 007.5 21.75h9a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0016.5 3.75z" />
    </svg>
);

export const UsersIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0112 13a5.995 5.995 0 014 2.803M12 4.354V13" />
    </svg>
);

export const ShieldCheckIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

export const SnatchLifterIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>Weightlifter performing a snatch</title>
    {/* Barbell */}
    <g strokeWidth="6">
      <rect x="5" y="10" width="30" height="50" rx="8" fill="currentColor" />
      <rect x="165" y="10" width="30" height="50" rx="8" fill="currentColor" />
      <line x1="35" y1="35" x2="165" y2="35" />
    </g>

    {/* Lifter */}
    <path d="M60 45 L 85 95" /> 
    <path d="M140 45 L 115 95" />
    
    <circle cx="100" cy="100" r="12" fill="currentColor" stroke="none" /> {/* Head */}
    <path d="M100 112 v 30" /> {/* Torso */}
    
    <path d="M100 142 L 75 165 L 60 190" />
    <path d="M100 142 L 125 165 L 140 190" />
    
    {/* Platform Line */}
    <line x1="40" y1="190" x2="160" y2="190" />
  </svg>
);

// RECOVERY ICONS
export const BedIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);
export const UtensilsIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.362A8.287 8.287 0 0015.362 5.214z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214C14.12 4.09 12.638 3.5 11.005 3.5c-1.634 0-3.116.59-4.354 1.714m8.708 0a8.261 8.261 0 01-4.354 4.354m4.354-4.354a8.286 8.286 0 00-4.354-4.354M12 21a8.25 8.25 0 005.962-13.952" />
    </svg>
);
export const DropletIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 01-9-9c0-4.968 4.032-9 9-9s9 4.032 9 9a9 9 0 01-9 9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-2.485 0-4.5-2.015-4.5-4.5S9.515 12 12 12s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zM12 3c-2.485 0-4.5 2.015-4.5 4.5S9.515 12 12 12s4.5-2.015 4.5-4.5S14.485 3 12 3z" />
    </svg>
);
export const BodyStretchIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a3.75 3.75 0 00-7.5 0v.75H9v7.5h-1.5v6.75h6V12.75H9V5.25h3v.75a3.75 3.75 0 107.5 0V4.5z" />
    </svg>
);
export const BrainCircuitIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75H12M8.25 3.75V12M8.25 3.75C6.31 3.75 4.5 5.56 4.5 7.5V12C4.5 13.94 6.31 15.75 8.25 15.75v0c1.94 0 3.5-1.56 3.5-3.5v-1.5c0-.966.784-1.75 1.75-1.75h1.5c.966 0 1.75.784 1.75 1.75v1.5c0 1.94 1.56 3.5 3.5 3.5v0c1.94 0 3.5-1.56 3.5-3.5V7.5c0-1.94-1.81-3.75-3.75-3.75M12 12V3.75" />
    </svg>
);
export const TrophyIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a2.25 2.25 0 01-2.25-2.25V9A2.25 2.25 0 017.5 6.75h9A2.25 2.25 0 0118.75 9v7.5a2.25 2.25 0 01-2.25 2.25z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75V21m-2.25-6.75H6.375c-.621 0-1.125-.504-1.125-1.125V9.375c0-.621.504-1.125 1.125-1.125h3.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125zm6 0h3.375c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125 1.125-1.125h-3.375c-.621 0-1.125.504-1.125 1.125v2.25c0 .621.504 1.125 1.125 1.125z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75V4.5m0 2.25a2.25 2.25 0 01-2.25-2.25V3a2.25 2.25 0 012.25-2.25h.008a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25h-.008z" />
    </svg>
);

export const FlameIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177.177a.938.938 0 00-1.327 0l-1.327-1.327a.938.938 0 00-1.327 0l-1.327 1.327a.938.938 0 00-1.327 0l-1.327-1.327a.938.938 0 00-1.327 0l-1.327 1.327a.938.938 0 00-1.327 0l-1.327-1.327a.938.938 0 00-1.327 0z" />
    </svg>
);


// REHAB ICONS
export const RehabIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L12 8" />
    <path d="M12 16L12 22" />
    <path d="M17 5L17 19" />
    <path d="M7 5L7 19" />
    <path d="M2 12L8 12" />
    <path d="M16 12L22 12" />
  </svg>
);

export const AnatomyIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1" />
    <path d="M9 20l-3-6" />
    <path d="M15 20l3-6" />
    <path d="M9 14h6" />
    <path d="M12 14V7.5" />
    <path d="M12 7.5L10 6" />
    <path d="M12 7.5L14 6" />
  </svg>
);

export const SnowflakeIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <line x1="19.07" y1="19.07" x2="4.93" y2="4.93" />
  </svg>
);

export const HeartPulseIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12H6.25l2.5-5 3.75 10 2.5-5h2.5" />
    </svg>
);

export const ShoulderIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 12.5a6.5 6.5 0 0113 0" />
    <path d="M5.5 12.5v7.5" />
    <path d="M18.5 12.5v7.5" />
  </svg>
);

export const KneeIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 10v4" />
    <path d="M16 10v4" />
    <path d="M8 10a4 4 0 014-4h0a4 4 0 014 4" />
    <path d="M8 14a4 4 0 004 4h0a4 4 0 004-4" />
    <path d="M12 6V2" />
    <path d="M12 18v4" />
  </svg>
);

export const BackIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v14" />
    <path d="M10 12c-2 0-3 1-3 3s1 3 3 3h4c2 0 3-1 3-3s-1-3-3-3" />
  </svg>
);

export const ElbowIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10l-6 6-6-6" />
    <path d="M12 4v12" />
  </svg>
);

export const WristIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

export const AnkleIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 18v-4" />
    <path d="M16 18v-4" />
    <path d="M8 14h8" />
    <path d="M8 10a4 4 0 014-4h0a4 4 0 014 4" />
    <path d="M12 10v4" />
    <path d="M10 22h4" />
  </svg>
);

export const HipIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0" />
    <path d="M12 14v8" />
    <path d="M12 12c-4-2-6-8-6-8s6 4 12 4" />
    <path d="M12 12c4-2 6-8 6-8s-6 4-12 4" />
  </svg>
);

export const ShinIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 3h4" />
    <path d="M9 21h6" />
    <path d="M11 3v18" />
    <path d="M14 4v16" />
  </svg>
);

export const ChartBarIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

export const KettlebellIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 8a5 5 0 0110 0v1h-10V8zM6 9h12v7a3 3 0 01-3 3H9a3 3 0 01-3-3V9z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


// FAULT ICONS
export const RoundedBackIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12C3.75 6.891 7.891 3 13 3c4.136 0 7.5 3.364 7.5 7.5c0 4.136-3.364 7.5-7.5 7.5" transform="rotate(-30 12 12)" />
        <path d="M10 17.5a7.5 7.5 0 0 1-5.1-12.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
export const KneesCaveIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20V10l-2-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 20V10l2-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 12h7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 12l-2 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 12l2 3" />
    </svg>
);
export const ChestDropIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <circle cx="12" cy="5" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l3-5 3 5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15L7 12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 10l-6 2" />
    </svg>
);
export const ShallowDepthIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <circle cx="12" cy="6" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19l3-4 3 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 13H8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 15h12" strokeDasharray="2 2" />
    </svg>
);
export const HeelsLiftIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20h12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 20L10 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20l.5-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8l-3 1" />
    </svg>
);
export const HipsRiseIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <circle cx="12" cy="5" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l3-5h0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-4-1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 14l-4-1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l6 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-7 2.5" />
    </svg>
);
export const BarPathIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16" strokeDasharray="2 2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4c2,3,6,6,2,16" />
        <circle cx="12" cy="4" r="2" />
        <circle cx="14" cy="20" r="2" />
    </svg>
);
export const EarlyArmBendIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l5-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-5-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8c-1.5 1-3 1.5-5 1.5s-3.5-.5-5-1.5" />
    </svg>
);
export const PressOutIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 12l-2 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 12l2 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16V8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 16V8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V4" />
    </svg>
);
export const UnstableOverheadIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l2-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 6l-2-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l-2-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 10l2-2" />
    </svg>
);
export const RhythmIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h2l3-6 4 12 3-6h2" />
        <circle cx="12" cy="12" r="10" />
    </svg>
);
export const PostureIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <circle cx="12" cy="5" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v13" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h-2l-1 8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h2l1 8" />
    </svg>
);
export const RangeOfMotionIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l4 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12l-4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12l-4 4" />
    </svg>
);
export const GripWeakIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 14.25c0 .966-.583 1.75-1.5 1.75s-1.5-.784-1.5-1.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14.25c0 .966-.583 1.75-1.5 1.75S7 15.216 7 14.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.5 10.25h-1c-.966 0-1.75.784-1.75 1.75v.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 12v-1.25c0-1.519-1.231-2.75-2.75-2.75h-4.5C8.231 8 7 9.231 7 10.75V12" />
    </svg>
);
export const BalanceIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 6h14" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 6l-2 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 6l2 4" />
    </svg>
);
export const CoreIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12H2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.07 4.93l-1.41 1.41" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.34 17.66l-1.41 1.41" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.07 19.07l-1.41-1.41" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.34 6.34l-1.41-1.41" />
    </svg>
);

export const MenuIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const XIcon = ({ className = 'w-6 h-6' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);