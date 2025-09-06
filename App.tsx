import React, { useState } from 'react';
import Header from './components/Header';
import MovementCard from './components/MovementCard';
import MovementDetail from './components/MovementDetail';
import WorkoutBuilder from './components/WorkoutBuilder';
import { MOVEMENTS } from './constants';
import type { Movement } from './types';
import { ClipboardListIcon, ChevronDownIcon, SearchIcon } from './components/Icons';

const orderedCategories: Movement['category'][] = ['Weightlifting', 'Gymnastics', 'Kettlebell', 'Strongman', 'Monostructural'];

export default function App(): React.JSX.Element {
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
  const [isBuildingWorkout, setIsBuildingWorkout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>(() =>
    orderedCategories.reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleSelectMovement = (movement: Movement): void => {
    setSelectedMovement(movement);
  };

  const handleBack = (): void => {
    setSelectedMovement(null);
    setIsBuildingWorkout(false);
  };

  const handleStartWorkoutBuilder = () => {
    setSelectedMovement(null);
    setIsBuildingWorkout(true);
  };

  const toggleCategory = (categoryName: Movement['category']) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const filteredMovements = MOVEMENTS.filter(movement =>
    movement.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMovementsByCategory = filteredMovements.reduce((acc, movement) => {
    const { category } = movement;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(movement);
    return acc;
  }, {} as Record<Movement['category'], Movement[]>);


  return (
    <div className="min-h-screen bg-base dark:bg-dark-base font-sans">
      <Header onGoHome={handleBack} />
      <main className="container mx-auto p-4 md:p-8">
        {selectedMovement ? (
          <MovementDetail movement={selectedMovement} onBack={handleBack} />
        ) : isBuildingWorkout ? (
            <WorkoutBuilder onBack={handleBack} />
        ) : (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                Optimize Your Performance
              </h1>
              <p className="text-lg md:text-xl text-text-muted dark:text-dark-text-muted max-w-2xl mx-auto">
                Select a movement for analysis, or build a custom workout plan for a custom strategy.
              </p>
              <div className="mt-8">
                <button
                  onClick={handleStartWorkoutBuilder}
                  className="bg-brand-secondary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 inline-flex items-center gap-3"
                >
                  <ClipboardListIcon className="w-6 h-6" />
                  Analyze a Workout
                </button>
              </div>
            </div>

            <div className="mb-12 max-w-2xl mx-auto">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="w-5 h-5 text-text-muted dark:text-dark-text-muted" />
                </span>
                <input
                  type="text"
                  placeholder="Search for a movement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface dark:bg-dark-surface text-text-primary dark:text-dark-text-primary placeholder-text-muted dark:placeholder-dark-text-muted pl-10 pr-4 py-3 rounded-lg border-2 border-border-color dark:border-dark-border-color focus:ring-2 focus:ring-brand-primary focus:border-brand-primary dark:focus:border-brand-primary transition duration-200"
                  aria-label="Search movements"
                />
              </div>
            </div>


            <div className="space-y-8">
              {orderedCategories.map((category) => {
                const movements = filteredMovementsByCategory[category];
                if (!movements || movements.length === 0) {
                  return null;
                }

                const isCollapsed = searchQuery.trim() !== '' ? false : collapsedCategories[category];
                return (
                  <section key={category} aria-labelledby={`${category}-heading`}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleCategory(category)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleCategory(category)}
                      className="flex justify-between items-center cursor-pointer mb-6 pb-2 border-b-2 border-border-color dark:border-dark-border-color hover:border-brand-primary dark:hover:border-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary rounded"
                      aria-expanded={!isCollapsed}
                      aria-controls={`${category}-grid-container`}
                    >
                      <h2 id={`${category}-heading`} className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">
                        {category}
                      </h2>
                      <ChevronDownIcon className={`w-6 h-6 text-text-muted dark:text-dark-text-muted transition-transform duration-300 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`} />
                    </div>

                    <div
                      id={`${category}-grid-container`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {movements.map((movement) => (
                            <MovementCard
                              key={movement.id}
                              movement={movement}
                              onSelect={handleSelectMovement}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
              {filteredMovements.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">No Movements Found</h3>
                  <p className="text-text-muted dark:text-dark-text-muted mt-2">Try adjusting your search query.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}