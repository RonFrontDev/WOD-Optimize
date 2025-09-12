import React, { useState, useCallback, useEffect } from 'react';
import { generateWorkoutStrategy, generateSimilarWorkouts, generateAdaptiveStrategy } from '../services/geminiService';
import { ArrowLeftIcon, SparklesIcon, ClockIcon, CheckCircleIcon, ClipboardListIcon, BookmarkIcon, BookmarkOutlineIcon, ShieldCheckIcon, ExclamationTriangleIcon, ForwardIcon } from './Icons';
import LoadingSpinner from './LoadingSpinner';
import type { WorkoutStrategy, SuggestedWorkout, SavedWorkoutStrategy, MuscleActivation, AdaptiveWorkoutStrategy, InjurySeverity, MovementModification } from '../types';
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
    'Transitions / Logistics',
    'Communication',
    'Pacing / Strategy',
    'Synchronization',
];

const severityLevels: { id: InjurySeverity, label: string, description: string }[] = [
    { id: 'sore', label: 'Sore/Stiff', description: 'Can move with some discomfort.' },
    { id: 'painful', label: 'Painful to Use', description: 'Specific movements cause pain.' },
    { id: 'unusable', label: 'Completely Unusable', description: 'Cannot use or load the area at all.' }
];

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

type TeamSize = 'individual' | 2 | 4;
type AnalysisMode = 'standard' | 'adaptive';
interface FullWorkoutStrategy extends WorkoutStrategy, MuscleActivation {}

const MovementModificationCard: React.FC<{ mod: MovementModification }> = ({ mod }) => (
    <div className="bg-base dark:bg-dark-base rounded-lg p-4 border border-border-color dark:border-dark-border-color">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-4 text-center">
            <div>
                <p className="text-sm font-semibold text-text-muted dark:text-dark-text-muted">Original</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400 line-through">{mod.originalMovement}</p>
            </div>
            <ForwardIcon className="w-6 h-6 text-text-muted dark:text-dark-text-muted mx-auto transform rotate-90 md:rotate-0" />
            <div>
                <p className="text-sm font-semibold text-text-muted dark:text-dark-text-muted">Modification</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{mod.modifiedMovement}</p>
            </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border-color dark:border-dark-border-color/50">
             <p className="text-sm text-text-muted dark:text-dark-text-muted"><strong className="text-text-primary dark:text-dark-text-primary">Reasoning:</strong> {mod.reasoning}</p>
        </div>
    </div>
);


export default function WorkoutBuilder({ onBack }: WorkoutBuilderProps): React.JSX.Element {
    const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('standard');

    // Standard state
    const [workoutDescription, setWorkoutDescription] = useState<string>('');
    const [analyzedWorkout, setAnalyzedWorkout] = useState<string>('');
    const [limiters, setLimiters] = useState<string[]>([]);
    const [teamSize, setTeamSize] = useState<TeamSize>('individual');
    const [strategy, setStrategy] = useState<WorkoutStrategy | null>(null);
    const [muscleActivation, setMuscleActivation] = useState<MuscleActivation | null>(null);
    const [similarWorkouts, setSimilarWorkouts] = useState<Record<keyof WorkoutStrategy, SuggestedWorkout[] | null>>({
        elite: null, rx: null, intermediate: null, scaledBeginner: null,
    });
    const [selectedLevel, setSelectedLevel] = useState<keyof WorkoutStrategy>('rx');
    const [isSaved, setIsSaved] = useState(false);

    // Adaptive state
    const [injuryDescription, setInjuryDescription] = useState<string>('');
    const [injurySeverity, setInjurySeverity] = useState<InjurySeverity>('painful');
    const [adaptiveStrategy, setAdaptiveStrategy] = useState<AdaptiveWorkoutStrategy | null>(null);

    // Common state
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLimiterChange = (limiter: string) => {
        setLimiters(prev =>
            prev.includes(limiter)
                ? prev.filter(l => l !== limiter)
                : [...prev, limiter]
        );
    };

     const handleSaveStrategy = () => {
        if (!strategy || !analyzedWorkout || !muscleActivation) return;

        const newSavedStrategy: SavedWorkoutStrategy = {
            id: Date.now(),
            date: new Date().toISOString(),
            workoutDescription: workoutDescription,
            analyzedWorkout: analyzedWorkout,
            limiters,
            strategy,
            muscleActivation,
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
        setMuscleActivation(null);
        setIsSaved(false);
        setSimilarWorkouts({ elite: null, rx: null, intermediate: null, scaledBeginner: null });

        const upperCaseInput = workoutDescription.trim().toUpperCase();
        const benchmarkDescription = BENCHMARK_WORKOUTS[upperCaseInput as keyof typeof BENCHMARK_WORKOUTS];
        const descriptionForAnalysis = benchmarkDescription || workoutDescription;
        setAnalyzedWorkout(descriptionForAnalysis);

        try {
            const result: FullWorkoutStrategy | null = await generateWorkoutStrategy(descriptionForAnalysis, limiters, teamSize);
            if (result) {
                const { primaryMuscles, secondaryMuscles, ...strategyResult } = result;
                setStrategy(strategyResult);
                setMuscleActivation({ primaryMuscles, secondaryMuscles });
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
    }, [workoutDescription, limiters, teamSize]);

    const handleGenerateAdaptiveStrategy = useCallback(async () => {
        if (!workoutDescription.trim() || !injuryDescription.trim()) {
            setError('Please describe both the workout and your injury.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setAdaptiveStrategy(null);

        try {
            const result = await generateAdaptiveStrategy(workoutDescription, injuryDescription, injurySeverity);
            if (result) {
                setAdaptiveStrategy(result);
            } else {
                setError('An error occurred. The model may be unable to provide a safe modification for this workout/injury combination.');
            }
        } catch (err) {
            setError('An error occurred while generating the adaptive strategy.');
        } finally {
            setIsLoading(false);
        }
    }, [workoutDescription, injuryDescription, injurySeverity]);


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


    const handleCloseModal = () => {
        setStrategy(null);
        setAdaptiveStrategy(null);
    }
    
    const handleFullReset = () => {
        setWorkoutDescription('');
        setAnalyzedWorkout('');
        setLimiters([]);
        setTeamSize('individual');
        setStrategy(null);
        setMuscleActivation(null);
        setSimilarWorkouts({ elite: null, rx: null, intermediate: null, scaledBeginner: null });
        setSelectedLevel('rx');
        setIsSaved(false);
        setInjuryDescription('');
        setInjurySeverity('painful');
        setAdaptiveStrategy(null);
        setError(null);
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
                     <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-2 flex items-center justify-center gap-3">
                        {analysisMode === 'adaptive' && <ShieldCheckIcon className="w-10 h-10 text-brand-primary" />}
                        Workout Analyzer
                    </h2>
                    <p className="text-lg text-text-muted dark:text-dark-text-muted">Enter any workout to get a custom strategy, or an adaptive plan for an injury.</p>
                </div>

                <div className="bg-surface dark:bg-dark-surface rounded-lg p-6 shadow-lg border border-border-color dark:border-dark-border-color">
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-3">
                            Analysis Mode
                        </label>
                        <div className="flex bg-base dark:bg-dark-base rounded-lg border-2 border-border-color dark:border-dark-border-color p-1">
                            {(['standard', 'adaptive'] as AnalysisMode[]).map((mode) => {
                                const isSelected = analysisMode === mode;
                                return (
                                    <button
                                        key={mode}
                                        onClick={() => setAnalysisMode(mode)}
                                        className={`w-1/2 p-2 rounded-md text-sm font-bold transition-colors duration-200 capitalize flex items-center justify-center gap-2 ${
                                            isSelected 
                                            ? (mode === 'standard' ? 'bg-brand-secondary text-white shadow' : 'bg-brand-primary text-white shadow')
                                            : 'text-text-muted dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {mode === 'adaptive' && <ShieldCheckIcon className="w-5 h-5"/>}
                                        {mode === 'standard' ? 'Standard Strategy' : 'Adaptive Strategy'}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <label htmlFor="workout-description" className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                        {analysisMode === 'standard' ? "1. Enter Workout Details" : "1. Enter the Original Workout"}
                    </label>
                    <textarea
                        id="workout-description"
                        rows={analysisMode === 'standard' ? 8 : 6}
                        value={workoutDescription}
                        onChange={(e) => setWorkoutDescription(e.target.value)}
                        placeholder='Enter a benchmark WOD (e.g., "Fran", "DT") or describe your custom workout.'
                        className="w-full bg-base dark:bg-dark-base text-text-primary dark:text-dark-text-primary p-3 rounded-md border border-border-color dark:border-dark-border-color focus:ring-2 focus:ring-brand-primary focus:border-brand-primary dark:focus:border-brand-primary transition duration-200"
                    />

                    {analysisMode === 'standard' ? (
                        <>
                            <div className="mt-6">
                                <label className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-3">
                                    2. Who is this workout for?
                                </label>
                                <div className="flex bg-base dark:bg-dark-base rounded-lg border-2 border-border-color dark:border-dark-border-color p-1">
                                    {(['individual', 2, 4] as TeamSize[]).map((size) => {
                                        const label = size === 'individual' ? 'Individual' : `Team of ${size}`;
                                        const isSelected = teamSize === size;
                                        return (
                                            <button
                                                key={size}
                                                onClick={() => setTeamSize(size)}
                                                className={`w-1/3 p-2 rounded-md text-sm font-bold transition-colors duration-200 ${
                                                    isSelected 
                                                    ? 'bg-brand-secondary text-white shadow' 
                                                    : 'text-text-muted dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-3">
                                    3. What are your typical limiters? (Optional)
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
                                                        ? 'bg-brand-secondary/10 border-brand-secondary text-brand-secondary'
                                                        : 'bg-base dark:bg-dark-base border-border-color dark:border-dark-border-color hover:border-slate-400 dark:hover:border-slate-500 text-text-muted dark:text-dark-text-muted'
                                                    }`}
                                            >
                                                {isSelected && <CheckCircleIcon className="w-5 h-5 text-brand-secondary" />}
                                                {limiter}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mt-6">
                                <label htmlFor="injury-description" className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                                    2. Describe Your Injury/Limitation
                                </label>
                                <textarea
                                    id="injury-description"
                                    rows={4}
                                    value={injuryDescription}
                                    onChange={(e) => setInjuryDescription(e.target.value)}
                                    placeholder='e.g., "Left shoulder pain when pressing overhead" or "Sore lower back"'
                                    className="w-full bg-base dark:bg-dark-base text-text-primary dark:text-dark-text-primary p-3 rounded-md border border-border-color dark:border-dark-border-color focus:ring-2 focus:ring-brand-primary"
                                />
                            </div>
                            <div className="mt-6">
                                <label className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                                    3. How Severe is the Limitation?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                                    {severityLevels.map(({ id, label, description }) => {
                                        const isSelected = injurySeverity === id;
                                        return (
                                            <button
                                                key={id}
                                                onClick={() => setInjurySeverity(id)}
                                                className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                                                    isSelected
                                                    ? 'bg-brand-primary/10 border-brand-primary ring-2 ring-brand-primary/50'
                                                    : 'bg-base dark:bg-dark-base border-border-color dark:border-dark-border-color hover:border-slate-400 dark:hover:border-slate-500'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className={`font-bold ${isSelected ? 'text-brand-primary' : 'text-text-primary dark:text-dark-text-primary'}`}>{label}</span>
                                                    {isSelected && <CheckCircleIcon className="w-6 h-6 text-brand-primary" />}
                                                </div>
                                                <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">{description}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="mt-8">
                        <button
                            onClick={analysisMode === 'standard' ? handleGenerateStrategy : handleGenerateAdaptiveStrategy}
                            disabled={analysisMode === 'standard' ? !workoutDescription.trim() : !workoutDescription.trim() || !injuryDescription.trim()}
                            className="w-full flex items-center justify-center gap-2 bg-brand-secondary hover:bg-orange-600 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                        >
                            <SparklesIcon className="w-5 h-5" />
                            {analysisMode === 'standard' ? 'Analyze My Workout' : 'Generate Adaptive Strategy'}
                        </button>
                        {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2 text-center">{error}</p>}
                    </div>
                </div>
            </div>

            {/* Standard Strategy Modal */}
            <Modal 
                isOpen={!!strategy} 
                onClose={handleCloseModal} 
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
                {strategy && muscleActivation && (
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
                                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 mb-8 p-4 bg-base dark:bg-dark-base rounded-lg border border-border-color dark:border-dark-border-color">
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
                                    <StrategySection 
                                        title={<span className="text-brand-secondary">Muscle Activation</span>}
                                        content={
                                            <div className={`grid grid-cols-1 ${muscleActivation.primaryMuscles.length > 0 && muscleActivation.secondaryMuscles.length > 0 ? 'md:grid-cols-2' : ''} gap-x-8 gap-y-4`}>
                                                {muscleActivation.primaryMuscles.length > 0 && <div>
                                                    <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2 flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-brand-secondary flex-shrink-0"></div>
                                                        Primary Muscles
                                                    </h4>
                                                    <ul className="list-disc list-inside pl-1 text-text-muted dark:text-dark-text-muted space-y-1">
                                                        {muscleActivation.primaryMuscles.map(muscle => <li key={muscle}>{MUSCLE_MAP[muscle] || muscle.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>)}
                                                    </ul>
                                                </div>}
                                                {muscleActivation.secondaryMuscles.length > 0 && <div>
                                                    <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2 flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full bg-brand-primary flex-shrink-0"></div>
                                                        Secondary Muscles
                                                    </h4>
                                                    <ul className="list-disc list-inside pl-1 text-text-muted dark:text-dark-text-muted space-y-1">
                                                        {muscleActivation.secondaryMuscles.map(muscle => <li key={muscle}>{MUSCLE_MAP[muscle] || muscle.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>)}
                                                    </ul>
                                                </div>}
                                            </div>
                                        }
                                    />
                                    <StrategySection title={<span className="text-brand-secondary">Pacing & Rep Scheme Breakdown</span>} content={currentStrategy.pacing} />
                                    <StrategySection title={<span className="text-brand-secondary">Movement Efficiency Under Fatigue</span>} content={currentStrategy.efficiency} />
                                    <StrategySection title={<span className="text-brand-secondary">Transition Plan</span>} content={currentStrategy.transitions} />
                                    <StrategySection title={<span className="text-brand-secondary">Where to Push vs. Where to Conserve Energy</span>} content={currentStrategy.pushVsConserve} />
                                    <StrategySection title={<span className="text-brand-secondary">Breathing Strategy</span>} content={currentStrategy.breathing} />
                                    <StrategySection title={<span className="text-brand-secondary">How to Improve Your Limiters</span>} content={currentStrategy.improvementFocus} />
                                    
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
                                    <div className="mt-6 text-center">
                                        <button onClick={handleFullReset} className="text-brand-secondary font-semibold hover:underline">
                                            Analyze another workout
                                        </button>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                )}
            </Modal>
            
            {/* Adaptive Strategy Modal */}
            <Modal isOpen={!!adaptiveStrategy} onClose={handleCloseModal} title="Your Adaptive Workout Strategy" headerActions={<ThemeToggle />}>
                {adaptiveStrategy && (
                    <div className="max-h-[80vh] overflow-y-auto pr-2">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-4 rounded-r-lg mb-6">
                            <div className="flex">
                                <div className="py-1">
                                    <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500 mr-3" />
                                </div>
                                <div>
                                    <p className="font-bold">Safety First</p>
                                    <p className="text-sm">{adaptiveStrategy.safetyWarning}</p>
                                </div>
                            </div>
                        </div>

                        <StrategySection 
                            title="Movement Modifications" 
                            content={
                                <div className="space-y-4">
                                    {adaptiveStrategy.movementModifications.map((mod, index) => <MovementModificationCard key={index} mod={mod} />)}
                                </div>
                            } 
                            defaultOpen={true}
                        />
                        <StrategySection title="Revised Strategy & Goal" content={adaptiveStrategy.revisedStrategy} defaultOpen={true} />
                        <StrategySection title="Technique Focus" content={adaptiveStrategy.techniqueFocus} />
                        <StrategySection title="Targeted Warm-up" content={adaptiveStrategy.warmup} />
                        <StrategySection title="Targeted Cool-down" content={adaptiveStrategy.cooldown} />

                        <div className="mt-6 text-center">
                             <button onClick={handleFullReset} className="text-brand-primary font-semibold hover:underline">
                                Analyze another workout
                             </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}