import React, { useState, useEffect } from 'react';
import type { SavedWorkoutStrategy, WorkoutStrategy, SuggestedWorkout } from '../types';
import { ArrowLeftIcon, TrashIcon, ArchiveBoxIcon, ClockIcon, ClipboardListIcon } from './Icons';
import Modal from './Modal';
import ThemeToggle from './ThemeToggle';
import StrategySection from './StrategySection';
import { generateSimilarWorkouts } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const SAVED_WORKOUTS_KEY = 'wodOptimizeSavedWorkouts';

const levelKeys: (keyof WorkoutStrategy)[] = ['elite', 'rx', 'intermediate', 'scaledBeginner'];
const levelNames: Record<keyof WorkoutStrategy, string> = {
    elite: 'Elite',
    rx: 'RX',
    intermediate: 'Intermediate',
    scaledBeginner: 'Scaled / Beginner'
};

const MUSCLE_MAP: Record<string, string> = {
  deltoids: 'Deltoids',
  chest: 'Chest',
  biceps: 'Biceps',
  abdominals: 'Abdominals',
  obliques: 'Obliques',
  quadriceps: 'Quadriceps',
  traps: 'Trapezius',
  triceps: 'Triceps',
  lats: 'Lats',
  lower_back: 'Lower Back',
  glutes: 'Glutes',
  hamstrings: 'Hamstrings',
  calves: 'Calves',
  forearms: 'Forearms',
};

interface SavedWorkoutsProps {
    onBack: () => void;
}

export default function SavedWorkouts({ onBack }: SavedWorkoutsProps) {
    const [savedStrategies, setSavedStrategies] = useState<SavedWorkoutStrategy[]>([]);
    const [selectedStrategy, setSelectedStrategy] = useState<SavedWorkoutStrategy | null>(null);

    const [selectedLevel, setSelectedLevel] = useState<keyof WorkoutStrategy>('rx');
    const [similarWorkouts, setSimilarWorkouts] = useState<Record<keyof WorkoutStrategy, SuggestedWorkout[] | null>>({
        elite: null, rx: null, intermediate: null, scaledBeginner: null,
    });
    const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(SAVED_WORKOUTS_KEY);
            if (stored) {
                setSavedStrategies(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load saved workouts:", e);
        }
    }, []);

    const handleDelete = (id: number) => {
        const updated = savedStrategies.filter(s => s.id !== id);
        setSavedStrategies(updated);
        localStorage.setItem(SAVED_WORKOUTS_KEY, JSON.stringify(updated));
    };

    const handleView = (strategy: SavedWorkoutStrategy) => {
        setSelectedStrategy(strategy);
        setSelectedLevel('rx');
        setSimilarWorkouts({ elite: null, rx: null, intermediate: null, scaledBeginner: null });
    };

    const handleCloseModal = () => {
        setSelectedStrategy(null);
    };
    
    useEffect(() => {
        const fetchSimilarForLevel = async () => {
            if (selectedStrategy && !similarWorkouts[selectedLevel] && !isLoadingSimilar) {
                setIsLoadingSimilar(true);
                try {
                    const result = await generateSimilarWorkouts(selectedStrategy.analyzedWorkout, levelNames[selectedLevel]);
                    setSimilarWorkouts(prev => ({ ...prev, [selectedLevel]: result }));
                } catch (e) {
                    console.error(`Failed to fetch similar workouts for level: ${selectedLevel}`, e);
                } finally {
                    setIsLoadingSimilar(false);
                }
            }
        };

        if (selectedStrategy) {
          fetchSimilarForLevel();
        }
    }, [selectedStrategy, selectedLevel, similarWorkouts, isLoadingSimilar]);

    const modalContent = selectedStrategy ? (
        <div className="max-h-[80vh] overflow-y-auto pr-2">
            <p className="text-slate-900 dark:text-slate-100 mb-6 px-1">Select a level to review the tactical guide.</p>
            <div className="border-b border-border-color dark:border-dark-border-color flex overflow-x-auto mb-6 sticky top-0 bg-surface dark:bg-dark-surface py-2">
                {levelKeys.map(level => (
                    <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`flex-grow flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none whitespace-nowrap ${selectedLevel === level
                                ? 'text-brand-primary border-b-2 border-brand-primary'
                                : 'text-text-muted dark:text-dark-text-muted hover:text-text-primary dark:hover:text-dark-text-primary'
                            }`}
                    >
                        {levelNames[level]}
                    </button>
                ))}
            </div>
            {(() => {
                const currentStrategyDetails = selectedStrategy.strategy[selectedLevel];
                const currentSimilarWorkouts = similarWorkouts[selectedLevel];
                return (
                    <div className="px-1">
                         <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 mb-8 p-4 bg-base dark:bg-dark-base rounded-lg border border-border-color dark:border-dark-border-color">
                            <div className="flex items-start gap-4">
                                <ClockIcon className="w-8 h-8 text-text-muted dark:text-dark-text-muted flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-md font-semibold text-text-muted dark:text-dark-text-muted">Target Time</h3>
                                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{currentStrategyDetails.timeEstimate}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 md:border-l md:border-border-color md:dark:border-dark-border-color md:pl-6">
                                <ClipboardListIcon className="w-8 h-8 text-text-muted dark:text-dark-text-muted flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-md font-semibold text-text-muted dark:text-dark-text-muted">Workout</h3>
                                    <p className="text-sm text-slate-900 dark:text-slate-100 whitespace-pre-wrap">{selectedStrategy.analyzedWorkout}</p>
                                </div>
                            </div>
                        </div>

                        <StrategySection title={<span className="text-brand-secondary">Overall Strategy & Goal</span>} content={currentStrategyDetails.goal} defaultOpen={true} />
                        {selectedStrategy.muscleActivation && (
                            <StrategySection 
                                title={<span className="text-brand-secondary">Muscle Activation</span>}
                                content={
                                    <div className={`grid grid-cols-1 ${selectedStrategy.muscleActivation.primaryMuscles.length > 0 && selectedStrategy.muscleActivation.secondaryMuscles.length > 0 ? 'md:grid-cols-2' : ''} gap-x-8 gap-y-4`}>
                                        {selectedStrategy.muscleActivation.primaryMuscles.length > 0 && <div>
                                            <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2 flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-brand-secondary flex-shrink-0"></div>
                                                Primary Muscles
                                            </h4>
                                            <ul className="list-disc list-inside pl-1 text-text-muted dark:text-dark-text-muted space-y-1">
                                                {selectedStrategy.muscleActivation.primaryMuscles.map(muscle => <li key={muscle}>{MUSCLE_MAP[muscle] || muscle.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>)}
                                            </ul>
                                        </div>}
                                        {selectedStrategy.muscleActivation.secondaryMuscles.length > 0 && <div>
                                            <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2 flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-brand-primary flex-shrink-0"></div>
                                                Secondary Muscles
                                            </h4>
                                            <ul className="list-disc list-inside pl-1 text-text-muted dark:text-dark-text-muted space-y-1">
                                                {selectedStrategy.muscleActivation.secondaryMuscles.map(muscle => <li key={muscle}>{MUSCLE_MAP[muscle] || muscle.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>)}
                                            </ul>
                                        </div>}
                                    </div>
                                }
                            />
                        )}
                        <StrategySection title={<span className="text-brand-secondary">Pacing & Rep Scheme Breakdown</span>} content={currentStrategyDetails.pacing} />
                        <StrategySection title={<span className="text-brand-secondary">Movement Efficiency Under Fatigue</span>} content={currentStrategyDetails.efficiency} />
                        <StrategySection title={<span className="text-brand-secondary">Transition Plan</span>} content={currentStrategyDetails.transitions} />
                        <StrategySection title={<span className="text-brand-secondary">Where to Push vs. Where to Conserve Energy</span>} content={currentStrategyDetails.pushVsConserve} />
                        <StrategySection title={<span className="text-brand-secondary">Breathing Strategy</span>} content={currentStrategyDetails.breathing} />
                        <StrategySection title={<span className="text-brand-secondary">How to Improve Your Limiters</span>} content={currentStrategyDetails.improvementFocus} />
                        
                        <StrategySection 
                            title={<span className="text-brand-secondary">Similar Stimulus Workouts</span>}
                            content={
                                isLoadingSimilar ? (
                                    <div className="flex justify-center py-4"><LoadingSpinner /></div>
                                ) : currentSimilarWorkouts && currentSimilarWorkouts.length > 0 ? (
                                    <div className="space-y-4">
                                        {currentSimilarWorkouts.map((workout, index) => (
                                            <div key={index} className="p-4 bg-base dark:bg-dark-base rounded-lg border border-border-color dark:border-dark-border-color">
                                                <h4 className="font-bold text-brand-primary">{workout.name}</h4>
                                                <p className="whitespace-pre-wrap mt-2 text-slate-900 dark:text-slate-100">{workout.description}</p>
                                                <div className="mt-3 pt-3 border-t border-border-color dark:border-dark-border-color/50">
                                                    <h5 className="text-sm font-semibold text-text-muted dark:text-dark-text-muted">Goal:</h5>
                                                    <p className="text-sm text-text-muted dark:text-dark-text-muted">{workout.goal}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-text-muted dark:text-dark-text-muted">Could not generate similar workouts for this level.</p>
                                )
                            } 
                        />
                    </div>
                );
            })()}
        </div>
    ) : null;

    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 mb-6 text-sm text-brand-primary hover:underline">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Home
        </button>
        <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-2">Saved Strategies</h2>
            <p className="text-lg text-text-muted dark:text-dark-text-muted">Review your previously analyzed workout plans.</p>
        </div>

        {savedStrategies.length === 0 ? (
          <div className="text-center p-8 bg-surface dark:bg-dark-surface rounded-lg shadow-md border border-border-color dark:border-dark-border-color">
              <ArchiveBoxIcon className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500 mb-4" />
              <p className="text-text-muted dark:text-dark-text-muted font-semibold">You have no saved workout strategies.</p>
              <button onClick={onBack} className="mt-4 text-brand-primary font-bold hover:underline">
                  Analyze a new workout to get started!
              </button>
          </div>
        ) : (
          <ul className="space-y-4">
            {savedStrategies.map(s => (
              <li key={s.id} className="bg-surface dark:bg-dark-surface p-4 rounded-lg shadow-md border border-border-color dark:border-dark-border-color flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-grow">
                    <p className="text-sm text-text-muted dark:text-dark-text-muted font-semibold">
                        {new Date(s.date).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="font-bold text-text-primary dark:text-dark-text-primary mt-1 whitespace-pre-wrap line-clamp-2">{s.analyzedWorkout}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleDelete(s.id)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-colors" aria-label="Delete strategy">
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={() => handleView(s)} className="bg-brand-primary hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        View
                    </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Modal isOpen={!!selectedStrategy} onClose={handleCloseModal} title="Saved Workout Strategy" headerActions={<ThemeToggle />}>
          {modalContent}
        </Modal>
      </div>
    );
}