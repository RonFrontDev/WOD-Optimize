import React, { useState, useEffect } from 'react';
import type { Movement } from '../types';
import MovementCard from './MovementCard';

interface MovementLibraryProps {
  categories: Movement['category'][];
  movementsByCategory: Record<Movement['category'], Movement[]>;
  onSelectMovement: (movement: Movement) => void;
  searchQuery: string;
}

export default function MovementLibrary({ categories, movementsByCategory, onSelectMovement, searchQuery }: MovementLibraryProps): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<Movement['category']>(categories[0]);

  const handleTabClick = (category: Movement['category']) => {
    setActiveCategory(category);
  };

  const visibleCategories = categories.filter(category => movementsByCategory[category]?.length > 0);

  useEffect(() => {
    // If a search filters out the currently active category, switch to the first available one.
    if (searchQuery.trim() !== '' && !visibleCategories.includes(activeCategory) && visibleCategories.length > 0) {
      setActiveCategory(visibleCategories[0]);
    }
     // If the search is cleared and the active category was not previously visible, reset to the first default category.
    if (searchQuery.trim() === '' && !visibleCategories.includes(activeCategory)) {
        setActiveCategory(categories[0]);
    }
  }, [searchQuery, visibleCategories, activeCategory, categories]);

  const movements = movementsByCategory[activeCategory] || [];

  return (
    <section aria-labelledby="movement-library-heading">
      <h2 id="movement-library-heading" className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-6">Movement Library</h2>
      <div className="border-b border-border-color dark:border-dark-border-color">
        <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Movement Categories">
          {visibleCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleTabClick(category)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-t-md ${
                activeCategory === category
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-text-muted hover:text-text-primary dark:hover:text-dark-text-primary'
              }`}
              aria-current={activeCategory === category ? 'page' : undefined}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      <div key={activeCategory} className="animate-fade-in pt-8">
        {movements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movements.map((movement) => (
              <MovementCard
                key={movement.id}
                movement={movement}
                onSelect={onSelectMovement}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}