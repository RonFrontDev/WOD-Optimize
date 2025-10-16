import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import MovementDetail from './components/MovementDetail';
import WorkoutBuilder from './components/WorkoutBuilder';
import { MOVEMENTS } from './constants';
import type { Movement, AppView } from './types';
import { 
  ClipboardListIcon, BookmarkSquareIcon, SearchIcon, BarbellIcon, KettlebellIcon, 
  UsersIcon, HeartIcon, SparklesIcon, ChartBarIcon
} from './components/Icons';
import HomePageGripGuide from './components/HomePageGripGuide';
import TeamWorkoutGuide from './components/TeamWorkoutGuide';
import SavedWorkouts from './components/SavedWorkouts';
import MovementLibrary from './components/MovementLibrary';
import ShoeGuide from './components/ShoeGuide';
import RehabGuide from './components/RehabGuide';
import RecoveryGuide from './components/RecoveryGuide';
import FoodGuide from './components/FoodGuide';
import WarmupGenerator from './components/WarmupGenerator';
import MachineGuide from './components/MachineGuide';
import BarbellCyclingGuide from './components/BarbellCyclingGuide';

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
      case 'warmup':
        return <WarmupGenerator />;
      case 'rehab':
        return <RehabGuide />;
      case 'recovery':
        return <RecoveryGuide />;
      case 'foodGuide':
        return <FoodGuide />;
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
      case 'machineGuide':
        return (
          <div className="bg-surface dark:bg-dark-surface rounded-lg shadow-lg border border-border-color dark:border-dark-border-color p-6 md:p-8 animate-fade-in">
             <h2 id="machine-guide-heading" className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                A Guide to CrossFit Machines
              </h2>
              <p className="text-md text-text-muted dark:text-dark-text-muted mb-6">Pacing, strategy, and efficiency for the bike, rower, and ski erg.</p>
            <MachineGuide />
          </div>
        );
      case 'barbellCyclingGuide':
        return (
          <div className="bg-surface dark:bg-dark-surface rounded-lg shadow-lg border border-border-color dark:border-dark-border-color p-6 md:p-8 animate-fade-in">
             <h2 id="barbell-cycling-guide-heading" className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                A Guide to Barbell Cycling
              </h2>
              <p className="text-md text-text-muted dark:text-dark-text-muted mb-6">Improve your speed, efficiency, and workout times.</p>
            <BarbellCyclingGuide />
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
          <div className="space-y-16 md:space-y-24 animate-fade-in">

            {/* Hero Section */}
            <section className="text-center pt-8 md:pt-12">
                <div className="flex justify-center items-center gap-4 mb-6 text-brand-primary/80 dark:text-brand-primary/70">
                    <BarbellIcon className="w-10 h-10" />
                    <KettlebellIcon className="w-10 h-10" />
                    <UsersIcon className="w-10 h-10" />
                    <HeartIcon className="w-10 h-10" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary dark:text-dark-text-primary mb-4 tracking-tight">
                  Optimize Your Performance
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-muted dark:text-dark-text-muted">
                  Your AI-powered coach for smarter training, better movement, and faster results.
                </p>
                <div className="mt-10 flex justify-center items-center flex-wrap gap-4">
                  <button
                    onClick={handleStartWorkoutBuilder}
                    className="bg-brand-secondary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 inline-flex items-center justify-center md:gap-3 text-lg"
                  >
                    <SparklesIcon className="w-6 h-6" />
                    Analyze a Workout
                  </button>
                  <button
                    onClick={() => handleNavigate('movements')}
                    className="bg-surface dark:bg-dark-surface border-2 border-border-color dark:border-dark-border-color hover:border-brand-primary dark:hover:border-brand-primary hover:text-brand-primary dark:hover:text-brand-primary text-text-primary dark:text-dark-text-primary font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 inline-flex items-center justify-center md:gap-3 text-lg"
                  >
                    <SearchIcon className="w-6 h-6" />
                    Explore Movements
                  </button>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-text-primary dark:text-dark-text-primary">How WOD Optimize Works</h2>
                <div className="mt-10 grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-surface dark:bg-dark-surface rounded-lg border border-border-color dark:border-dark-border-color">
                    <div className="flex justify-center items-center w-16 h-16 rounded-full bg-brand-primary/10 mx-auto">
                      <SparklesIcon className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-text-primary dark:text-dark-text-primary">1. Analyze</h3>
                    <p className="mt-2 text-text-muted dark:text-dark-text-muted">Describe any workout or upload a photo of your form to get instant, data-driven feedback.</p>
                  </div>
                  <div className="text-center p-6 bg-surface dark:bg-dark-surface rounded-lg border border-border-color dark:border-dark-border-color">
                    <div className="flex justify-center items-center w-16 h-16 rounded-full bg-brand-primary/10 mx-auto">
                      <ClipboardListIcon className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-text-primary dark:text-dark-text-primary">2. Strategize</h3>
                    <p className="mt-2 text-text-muted dark:text-dark-text-muted">Receive elite-level pacing guides, efficiency tips, and personalized strategies for any skill level.</p>
                  </div>
                  <div className="text-center p-6 bg-surface dark:bg-dark-surface rounded-lg border border-border-color dark:border-dark-border-color">
                    <div className="flex justify-center items-center w-16 h-16 rounded-full bg-brand-primary/10 mx-auto">
                      <ChartBarIcon className="w-8 h-8 text-brand-primary" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-text-primary dark:text-dark-text-primary">3. Optimize</h3>
                    <p className="mt-2 text-text-muted dark:text-dark-text-muted">Access targeted drills, mobility routines, and guides to break plateaus and prevent injury.</p>
                  </div>
                </div>
            </section>

            {/* Featured Guides Section */}
            <section className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-text-primary dark:text-dark-text-primary">Featured Guides</h2>
                <p className="text-center mt-2 max-w-2xl mx-auto text-text-muted dark:text-dark-text-muted">Dive deeper with our expert guides on strategy, recovery, and technique.</p>
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Guide Card 1 */}
                  <button onClick={() => handleNavigate('barbellCyclingGuide')} className="group text-left bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg hover:shadow-brand-primary/20 border border-border-color dark:border-dark-border-color transition-all duration-300 transform hover:-translate-y-1">
                    <BarbellIcon className="w-10 h-10 text-brand-secondary mb-4" />
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">Barbell Cycling</h3>
                    <p className="mt-1 text-text-muted dark:text-dark-text-muted">Master efficiency for light, moderate, and heavy loads to crush your WOD times.</p>
                    <span className="block mt-4 font-semibold text-brand-primary group-hover:underline">Read Guide →</span>
                  </button>
                  {/* Guide Card 2 */}
                  <button onClick={() => handleNavigate('teamGuide')} className="group text-left bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg hover:shadow-brand-primary/20 border border-border-color dark:border-dark-border-color transition-all duration-300 transform hover:-translate-y-1">
                    <UsersIcon className="w-10 h-10 text-brand-secondary mb-4" />
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">Team Strategy</h3>
                    <p className="mt-1 text-text-muted dark:text-dark-text-muted">Learn the secrets of communication and rep schemes for partner and team events.</p>
                     <span className="block mt-4 font-semibold text-brand-primary group-hover:underline">Read Guide →</span>
                  </button>
                  {/* Guide Card 3 */}
                  <button onClick={() => handleNavigate('recovery')} className="group text-left bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-lg hover:shadow-brand-primary/20 border border-border-color dark:border-dark-border-color transition-all duration-300 transform hover:-translate-y-1">
                    <HeartIcon className="w-10 h-10 text-brand-secondary mb-4" />
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">Recovery Hub</h3>
                    <p className="mt-1 text-text-muted dark:text-dark-text-muted">Unlock protocols for post-workout, competition, and daily recovery to stay in the game.</p>
                     <span className="block mt-4 font-semibold text-brand-primary group-hover:underline">Read Guide →</span>
                  </button>
                </div>
            </section>

             {/* View Saved Strategies Section */}
            <section className="text-center bg-slate-50 dark:bg-dark-surface/50 p-8 md:p-12 rounded-lg border border-border-color dark:border-dark-border-color">
                <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">Ready to Review?</h2>
                <p className="mt-2 max-w-xl mx-auto text-text-muted dark:text-dark-text-muted">Access all of your previously analyzed workouts and custom strategies in one place.</p>
                <button
                    onClick={handleViewSavedWorkouts}
                    className="mt-6 bg-brand-primary hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 inline-flex items-center justify-center md:gap-3"
                  >
                    <BookmarkSquareIcon className="w-6 h-6" />
                    View Saved Strategies
                  </button>
            </section>

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