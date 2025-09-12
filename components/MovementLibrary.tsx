import React, { useState, useEffect, useMemo } from 'react';
import type { Movement } from '../types';
import MovementCard from './MovementCard';

interface MovementLibraryProps {
  categories: Movement['category'][];
  movementsByCategory: Record<Movement['category'], Movement[]>;
  equipmentByCategory: Record<string, string[]>;
  onSelectMovement: (movement: Movement) => void;
  searchQuery: string;
}

export default function MovementLibrary({ categories, movementsByCategory, equipmentByCategory, onSelectMovement, searchQuery }: MovementLibraryProps): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<Movement['category']>(categories[0]);
  const [activeEquipment, setActiveEquipment] = useState<string>('All');

  const handleTabClick = (category: Movement['category']) => {
    setActiveCategory(category);
    setActiveEquipment('All');
  };

  const visibleCategories = categories.filter(category => movementsByCategory[category]?.length > 0);

  useEffect(() => {
    if (searchQuery.trim() !== '' && !visibleCategories.includes(activeCategory) && visibleCategories.length > 0) {
      setActiveCategory(visibleCategories[0]);
      setActiveEquipment('All');
    }
    if (searchQuery.trim() === '' && !visibleCategories.includes(activeCategory)) {
        setActiveCategory(categories[0]);
        setActiveEquipment('All');
    }
  }, [searchQuery, visibleCategories, activeCategory, categories]);

  const currentEquipmentOptions = equipmentByCategory[activeCategory] || [];
  const allMovementsForCategory = movementsByCategory[activeCategory] || [];

  const visibleEquipmentOptions = useMemo(() => {
    return currentEquipmentOptions.filter(equip => {
      if (equip === 'All') return true;
      return allMovementsForCategory.some(m => m.equipment === equip);
    });
  }, [currentEquipmentOptions, allMovementsForCategory]);

  useEffect(() => {
      if (!visibleEquipmentOptions.includes(activeEquipment)) {
          setActiveEquipment('All');
      }
  }, [visibleEquipmentOptions, activeEquipment]);

  const movementsToDisplay = allMovementsForCategory.filter(movement => {
      if (activeEquipment === 'All') return true;
      return movement.equipment === activeEquipment;
  });

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

      {visibleEquipmentOptions.length > 0 && (
        <div className="py-4 border-b border-border-color dark:border-dark-border-color">
            <div className="flex items-center gap-2 overflow-x-auto">
                {visibleEquipmentOptions.map(equip => (
                    <button
                        key={equip}
                        onClick={() => setActiveEquipment(equip)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                            activeEquipment === equip
                            ? 'bg-brand-primary text-white'
                            : 'bg-surface dark:bg-dark-surface text-text-muted dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                    >
                        {equip}
                    </button>
                ))}
            </div>
        </div>
      )}

      <div key={`${activeCategory}-${activeEquipment}`} className="animate-fade-in pt-8">
        {movementsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movementsToDisplay.map((movement) => (
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