import React from 'react';
import type { Movement } from '../types';

interface MovementCardProps {
  movement: Movement;
  onSelect: (movement: Movement) => void;
}

const MovementCard: React.FC<MovementCardProps> = ({ movement, onSelect }) => {
  return (
    <div
      className="bg-surface dark:bg-dark-surface rounded-lg overflow-hidden shadow-lg hover:shadow-brand-primary/20 border border-border-color dark:border-dark-border-color transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer group"
      onClick={() => onSelect(movement)}
    >
      <img className="w-full h-48 object-cover" src={movement.imageUrl} alt={movement.name} />
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">{movement.name}</h3>
        <p className="text-text-muted dark:text-dark-text-muted text-sm line-clamp-3">{movement.description}</p>
        <div className="mt-4">
            <span className="text-brand-primary font-semibold group-hover:underline">Analyze & Optimize →</span>
        </div>
      </div>
    </div>
  );
};

export default MovementCard;