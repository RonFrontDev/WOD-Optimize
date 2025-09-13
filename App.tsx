import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import MovementDetail from './components/MovementDetail';
import WorkoutBuilder from './components/WorkoutBuilder';
import { MOVEMENTS } from './constants';
import type { Movement, AppView } from './types';
import { ClipboardListIcon, BookmarkSquareIcon, SearchIcon, SnatchLifterIcon } from './components/Icons';
import HomePageGripGuide from './components/HomePageGripGuide';
import TeamWorkoutGuide from './components/TeamWorkoutGuide';
import SavedWorkouts from './components/SavedWorkouts';
import MovementLibrary from './components/MovementLibrary';
import ShoeGuide from './components/ShoeGuide';
import RehabGuide from './components/RehabGuide';
import RecoveryGuide from './components/RecoveryGuide';

const orderedCategories: Movement['category'][] = ['Weightlifting', 'Gymnastics', 'Kettlebell', 'Strongman', 'Machines', 'Monostructural'];

export default function App(): React.JSX.Element {
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
  const [isBuildingWorkout, setIsBuildingWorkout] = useState(false);
  const [isViewingSavedWorkouts, setIsViewingSavedWorkouts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<AppView>('home');
  
  const handleSelectMovement = (movement: Movement): void => {
    setSelectedMovement(movement);
  };

  const handleGoHome = (): void => {
    setSelectedMovement(null);
    setIsBuildingWorkout(false);
    setIsViewingSavedWorkouts(false);
    setActiveView('home');
  };

  const handleNavigate = (view: AppView) => {
    setSelectedMovement(null);
    setIsBuildingWorkout(false);
    setIsViewingSavedWorkouts(false);
    setActiveView(view);
  };

  const handleStartWorkoutBuilder = () => {
    setSelectedMovement(null);
    setIsViewingSavedWorkouts(false);
    setActiveView('home');
    setIsBuildingWorkout(true);
  };

  const handleViewSavedWorkouts = () => {
    setSelectedMovement(null);
    setIsBuildingWorkout(false);
    setActiveView('home');
    setIsViewingSavedWorkouts(true);
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

  const equipmentByCategory = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const category of orderedCategories) {
        const equipmentSet = new Set<string>();
        MOVEMENTS.filter(m => m.category === category).forEach(m => equipmentSet.add(m.equipment));
        const options = Array.from(equipmentSet).sort();
        if (options.length > 1) {
          result[category] = ['All', ...options];
        } else {
          result[category] = [];
        }
    }
    return result;
  }, []);

  const renderActiveView = () => {
    switch(activeView) {
      case 'rehab':
        return <RehabGuide />;
      case 'recovery':
        return <RecoveryGuide />;
      case 'movements':
        return (
          <div className="animate-fade-in">
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
            <MovementLibrary
              categories={orderedCategories}
              movementsByCategory={filteredMovementsByCategory}
              equipmentByCategory={equipmentByCategory}
              onSelectMovement={handleSelectMovement}
              searchQuery={searchQuery}
            />
            {filteredMovements.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">No Movements Found</h3>
                <p className="text-text-muted dark:text-dark-text-muted mt-2">Try adjusting your search query.</p>
              </div>
            )}
          </div>
        );
      case 'gripGuide':
        return (
          <div className="bg-surface dark:bg-dark-surface rounded-lg shadow-lg border border-border-color dark:border-dark-border-color p-6 md:p-8 animate-fade-in">
              <h2 id="grip-guide-heading" className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                A Guide to CrossFit Grips
              </h2>
              <p className="text-md text-text-muted dark:text-dark-text-muted mb-6">Protect your hands and improve performance.</p>
            <HomePageGripGuide />
          </div>
        );
      case 'shoeGuide':
        return (
          <div className="bg-surface dark:bg-dark-surface rounded-lg shadow-lg border border-border-color dark:border-dark-border-color p-6 md:p-8 animate-fade-in">
              <h2 id="shoe-guide-heading" className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                A Guide to CrossFit Footwear
              </h2>
              <p className="text-md text-text-muted dark:text-dark-text-muted mb-6">The right shoe for the right job.</p>
            <ShoeGuide />
          </div>
        );
      case 'teamGuide':
        return (
          <div className="bg-surface dark:bg-dark-surface rounded-lg shadow-lg border border-border-color dark:border-dark-border-color p-6 md:p-8 animate-fade-in">
             <h2 id="team-guide-heading" className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                A Guide to Team Workouts
              </h2>
              <p className="text-md text-text-muted dark:text-dark-text-muted mb-6">Smarter strategy for partner & team WODs.</p>
            <TeamWorkoutGuide />
          </div>
        );
      case 'home':
      default:
        return (
          <div className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-center my-8 max-w-6xl mx-auto">
              
              {/* Image: Appears first on mobile */}
              <div className="flex justify-center items-center">
                <SnatchLifterIcon className="w-64 h-64 lg:w-80 lg:h-80 text-brand-primary opacity-80" />
              </div>

              {/* Text Content: Appears second on mobile, but first on desktop */}
              <div className="text-center md:text-left md:order-first">
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
                  Optimize Your Performance
                </h1>
                <p className="text-lg md:text-xl text-text-muted dark:text-dark-text-muted">
                  Select a movement for analysis, or build a custom workout plan for a custom strategy.
                </p>
                <div className="mt-8 flex justify-center md:justify-start items-center flex-wrap gap-4">
                  <button
                    onClick={handleStartWorkoutBuilder}
                    className="bg-brand-secondary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 w-64"
                  >
                    <ClipboardListIcon className="w-6 h-6" />
                    Analyze a Workout
                  </button>
                  <button
                    onClick={handleViewSavedWorkouts}
                    className="bg-brand-primary hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 w-64"
                  >
                    <BookmarkSquareIcon className="w-6 h-6" />
                    View Saved Strategies
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
    }
  }


  return (
    <div className="min-h-screen font-sans">
      <Header onGoHome={handleGoHome} onNavigate={handleNavigate} activeView={activeView} />
      <main className="container mx-auto p-4 md:p-8">
        {selectedMovement ? (
          <MovementDetail movement={selectedMovement} onBack={handleGoHome} />
        ) : isBuildingWorkout ? (
            <WorkoutBuilder onBack={handleGoHome} />
        ) : isViewingSavedWorkouts ? (
            <SavedWorkouts onBack={handleGoHome} />
        ) : (
          renderActiveView()
        )}
      </main>
    </div>
  );
}