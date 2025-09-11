import React, { useState, useCallback, useEffect } from 'react';
import { generateWorkoutStrategy, generateSimilarWorkouts } from '../services/geminiService';
import { ArrowLeftIcon, SparklesIcon, ClockIcon, CheckCircleIcon, ClipboardListIcon, BookmarkIcon, BookmarkOutlineIcon } from './Icons';
import LoadingSpinner from './LoadingSpinner';
import type { WorkoutStrategy, SuggestedWorkout, SavedWorkoutStrategy } from '../types';
import { BENCHMARK_WORKOUTS } from '../constants';
import Modal from './Modal';
import ThemeToggle from './ThemeToggle';
import StrategySection from './StrategySection';

interface WorkoutBuilderProps {
    onBack: () => void;
}

const levelKeys: (keyof WorkoutStrategy)[] = ['elite', 'rx', 'intermediate', 'scaledBeginner'];
const levelNames: Record<keyof WorkoutStrategy, string> = {
    elite: 'Elite',
    rx: 'RX',
    intermediate: 'Intermediate',
    scaledBeginner: 'Scaled / Beginner'
};

const predefinedLimiters = [
    'Cardio / Breathing',
    'Muscle Endurance',
    'Grip Strength',
    'Raw Strength',
    'Mobility / Technique',
];

export default function WorkoutBuilder({ onBack }: WorkoutBuilderProps): React.JSX.Element {
    const [workoutDescription, setWorkoutDescription] = useState<string>('');
    const [analyzedWorkout, setAnalyzedWorkout] = useState<string>('');
    const [limiters, setLimiters] = useState<string[]>([]);
    const [strategy, setStrategy] = useState<WorkoutStrategy | null>(null);
    const [similarWorkouts, setSimilarWorkouts] = useState<Record<keyof WorkoutStrategy, SuggestedWorkout[] | null>>({
        elite: null,
        rx: null,
        intermediate: null,
        scaledBeginner: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<keyof WorkoutStrategy>('rx');
    const [isSaved, setIsSaved] = useState(false);

    const handleLimiterChange = (limiter: string) => {
        setLimiters(prev =>
            prev.includes(limiter)
                ? prev.filter(l => l !== limiter)
                : [...prev, limiter]
        );
    };

     const handleSaveStrategy = () => {
        if (!strategy || !analyzedWorkout) return;

        const newSavedStrategy: SavedWorkoutStrategy = {
            id: Date.now(),
            date: new Date().toISOString(),
            workoutDescription: workoutDescription,
            analyzedWorkout: analyzedWorkout,
            limiters,
            strategy,
        };

        try {
            const existingSaved = JSON.parse(localStorage.getItem('wodOptimizeSavedWorkouts') || '[]');
            const updatedSaved = [newSavedStrategy, ...existingSaved];
            localStorage.setItem('wodOptimizeSavedWorkouts', JSON.stringify(updatedSaved));
            setIsSaved(true);
        } catch (e) {
            console.error("Failed to save workout strategy:", e);
            setError("Could not save the strategy. Local storage might be full.");
        }
    };

    const handleGenerateStrategy = useCallback(async () => {
        if (!workoutDescription.trim()) {
            setError('Please enter a workout description.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setStrategy(null);
        setIsSaved(false);
        setSimilarWorkouts({ elite: null, rx: null, intermediate: null, scaledBeginner: null });

        const upperCaseInput = workoutDescription.trim().toUpperCase();
        const benchmarkDescription = BENCHMARK_WORKOUTS[upperCaseInput as keyof typeof BENCHMARK_WORKOUTS];
        const descriptionForAnalysis = benchmarkDescription || workoutDescription;
        setAnalyzedWorkout(descriptionForAnalysis);

        try {
            const strategyResult = await generateWorkoutStrategy(descriptionForAnalysis, limiters);
            if (strategyResult) {
                setStrategy(strategyResult);
                setIsLoadingSimilar(true);
                const similarWorkoutsResult = await generateSimilarWorkouts(descriptionForAnalysis, levelNames['rx']);
                setSimilarWorkouts(prev => ({ ...prev, rx: similarWorkoutsResult }));
                setIsLoadingSimilar(false);
            } else {
                setError('An error occurred while generating the strategy.');
            }
        } catch (err) {
            setError('An error occurred while generating the strategy.');
        } finally {
            setIsLoading(false);
        }
    }, [workoutDescription, limiters]);

    useEffect(() => {
        const fetchSimilarForLevel = async () => {
            if (strategy && analyzedWorkout && !similarWorkouts[selectedLevel] && !isLoadingSimilar) {
                setIsLoadingSimilar(true);
                try {
                    const result = await generateSimilarWorkouts(analyzedWorkout, levelNames[selectedLevel]);
                    setSimilarWorkouts(prev => ({...prev, [selectedLevel]: result }));
                } catch (e) {
                    console.error(`Failed to fetch similar workouts for level: ${selectedLevel}`, e);
                } finally {
                    setIsLoadingSimilar(false);
                }
            }
        };

        fetchSimilarForLevel();
    }, [selectedLevel, strategy, analyzedWorkout, similarWorkouts, isLoadingSimilar]);


    const handleReset = () => {
        setWorkoutDescription('');
        setStrategy(null);
        setError(null);
        setLimiters([]);
        setSelectedLevel('rx');
        setAnalyzedWorkout('');
        setIsSaved(false);
        setSimilarWorkouts({ elite: null, rx: null, intermediate: null, scaledBeginner: null });
    }

    if (isLoading) {
        return (
            <div className="text-center animate-fade-in">
                <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Analyzing Your Workout...</h2>
                <p className="text-text-muted dark:text-dark-text-muted mb-8">We are crafting the perfect strategy for you.</p>
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <>
            <div className="animate-fade-in max-w-4xl mx-auto">
                <button onClick={onBack} className="flex items-center gap-2 mb-6 text-sm text-brand-primary hover:underline">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Home
                </button>
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-2">Workout Analyzer</h2>
                    <p className="text-lg text-text-muted dark:text-dark-text-muted">Enter any workout to get a custom, advanced strategy.</p>
                </div>

                <div className="bg-surface dark:bg-dark-surface rounded-lg p-6 shadow-lg border border-border-color dark:border-dark-border-color">
                    <label htmlFor="workout-description" className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                        Enter Workout Details
                    </label>
                    <textarea
                        id="workout-description"
                        rows={8}
                        value={workoutDescription}
                        onChange={(e) => setWorkoutDescription(e.target.value)}
                        placeholder='Enter a benchmark WOD (e.g., "Fran", "DT") or describe your custom workout.'
                        className="w-full bg-base dark:bg-dark-base text-text-primary dark:text-dark-text-primary p-3 rounded-md border border-border-color dark:border-dark-border-color focus:ring-2 focus:ring-brand-primary focus:border-brand-primary dark:focus:border-brand-primary transition duration-200"
                    />

                    <div className="mt-6">
                        <label className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-3">
                            What are your typical limiters? (Optional)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {predefinedLimiters.map(limiter => {
                                const isSelected = limiters.includes(limiter);
                                return (
                                    <button
                                        key={limiter}
                                        type="button"
                                        onClick={() => handleLimiterChange(limiter)}
                                        className={`p-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 border-2 ${isSelected
                                                ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                                                : 'bg-base dark:bg-dark-base border-border-color dark:border-dark-border-color hover:border-slate-400 dark:hover:border-slate-500 text-text-muted dark:text-dark-text-muted'
                                            }`}
                                    >
                                        {isSelected && <CheckCircleIcon className="w-5 h-5 text-brand-primary" />}
                                        {limiter}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleGenerateStrategy}
                            disabled={!workoutDescription.trim()}
                            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-cyan-600 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                        >
                            <SparklesIcon className="w-5 h-5" />
                            Analyze My Workout
                        </button>
                        {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2 text-center">{error}</p>}
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={!!strategy} 
                onClose={handleReset} 
                title="Your Workout Strategy"
                headerActions={<>
                    <button
                        onClick={handleSaveStrategy}
                        disabled={isSaved}
                        className="p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-slate-200 dark:hover:bg-dark-surface transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={isSaved ? "Strategy Saved" : "Save Strategy"}
                    >
                        {isSaved ? <BookmarkIcon className="w-6 h-6 text-brand-primary" /> : <BookmarkOutlineIcon className="w-6 h-6" />}
                    </button>
                    <ThemeToggle />
                </>}
            >
                {strategy && (
                    <div className="max-h-[80vh] overflow-y-auto pr-2">
                         <p className="text-slate-900 dark:text-slate-100 mb-6 px-1">Select your level to see a custom tactical guide.</p>
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
                            const currentStrategy = strategy[selectedLevel];
                            const currentSimilarWorkouts = similarWorkouts[selectedLevel];
                            return (
                                <div className="px-1">
                                    <div className="grid md:grid-cols-2 gap-6 mb-8 p-4 bg-base dark:bg-dark-base rounded-lg border border-border-color dark:border-dark-border-color">
                                        <div className="flex items-start gap-4">
                                            <ClockIcon className="w-8 h-8 text-text-muted dark:text-dark-text-muted flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-md font-semibold text-text-muted dark:text-dark-text-muted">Target Time</h3>
                                                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{currentStrategy.timeEstimate}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 md:border-l md:border-border-color md:dark:border-dark-border-color md:pl-6">
                                            <ClipboardListIcon className="w-8 h-8 text-text-muted dark:text-dark-text-muted flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-md font-semibold text-text-muted dark:text-dark-text-muted">Your Workout</h3>
                                                <p className="text-sm text-slate-900 dark:text-slate-100 whitespace-pre-wrap">{analyzedWorkout}</p>
                                            </div>
                                        </div>
                                    </div>
    
                                    <StrategySection title={<span className="text-brand-secondary">Overall Strategy & Goal</span>} content={currentStrategy.goal} defaultOpen={true} />
                                    <StrategySection title={<span className="text-brand-secondary">Pacing & Rep Scheme Breakdown</span>} content={currentStrategy.pacing} />
                                    <StrategySection title={<span className="text-brand-secondary">Movement Efficiency Under Fatigue</span>} content={currentStrategy.efficiency} />
                                    <StrategySection title={<span className="text-brand-secondary">Transition Plan</span>} content={currentStrategy.transitions} />
                                    <StrategySection title={<span className="text-brand-secondary">Where to Push vs. Where to Conserve Energy</span>} content={currentStrategy.pushVsConserve} />
                                    <StrategySection title={<span className="text-brand-secondary">Breathing Strategy</span>} content={currentStrategy.breathing} />
                                    <StrategySection title={<span className="text-brand-secondary">How to Improve Your Limiters</span>} content={currentStrategy.improvementFocus} />
                                    
                                    <StrategySection 
                                        title={<span className="text-brand-secondary">Similar Stimulus Workouts</span>}
                                        defaultOpen={true}
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
                )}
            </Modal>
        </>
    );
}