import React from 'react';
import type { Movement } from '../types';

interface MovementCardProps {
  movement: Movement;
  onSelect: (movement: Movement) => void;
}

// FIX: Refactored `MovementCard` from a standard function declaration to a constant typed with `React.FC`.
// This explicitly identifies it as a React Function Component, resolving a TypeScript error in `App.tsx`
// where the special `key` prop was incorrectly being checked against the component's defined props.
const MovementCard: React.FC<MovementCardProps> = ({ movement, onSelect }) => {
  return (
    <div
      className="bg-surface-dark rounded-lg overflow-hidden shadow-lg hover:shadow-brand-primary/40 transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer group"
      onClick={() => onSelect(movement)}
    >
      <img className="w-full h-48 object-cover" src={movement.imageUrl} alt={movement.name} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{movement.name}</h3>
        <p className="text-muted-dark text-sm line-clamp-3">{movement.description}</p>
        <div className="mt-4">
            <span className="text-brand-primary font-semibold group-hover:underline">Analyze & Optimize →</span>
        </div>
      </div>
    </div>
  );
};

export default MovementCard;
