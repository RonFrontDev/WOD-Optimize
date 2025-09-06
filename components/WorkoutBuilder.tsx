import React, { useState, useCallback } from 'react';
import { generateWorkoutStrategy } from '../services/geminiService';
import { ArrowLeftIcon, SparklesIcon, ClockIcon, CheckCircleIcon, ClipboardListIcon, ChevronDownIcon } from './Icons';
import LoadingSpinner from './LoadingSpinner';
import type { WorkoutStrategy } from '../types';
import { BENCHMARK_WORKOUTS } from '../constants';
import Modal from './Modal';

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

const StrategySection = ({ title, content, defaultOpen = false }: { title: string, content: string, defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    if (!content) return null;

    return (
        <div className="border-b border-border-color dark:border-dark-border-color last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                aria-expanded={isOpen}
                aria-controls={`strategy-section-${title.replace(/\s+/g, '-')}`}
            >
                <h4 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{title}</h4>
                <ChevronDownIcon className={`w-6 h-6 text-text-muted dark:text-dark-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <div
              id={`strategy-section-${title.replace(/\s+/g, '-')}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="pt-2 pb-6">
                        <p className="whitespace-pre-wrap font-sans text-base leading-relaxed">{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function WorkoutBuilder({ onBack }: WorkoutBuilderProps): React.JSX.Element {
    const [workoutDescription, setWorkoutDescription] = useState<string>('');
    const [analyzedWorkout, setAnalyzedWorkout] = useState<string>('');
    const [limiters, setLimiters] = useState<string[]>([]);
    const [strategy, setStrategy] = useState<WorkoutStrategy | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<keyof WorkoutStrategy>('rx');

    const handleLimiterChange = (limiter: string) => {
        setLimiters(prev =>
            prev.includes(limiter)
                ? prev.filter(l => l !== limiter)
                : [...prev, limiter]
        );
    };

    const handleGenerateStrategy = useCallback(async () => {
        if (!workoutDescription.trim()) {
            setError('Please enter a workout description.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setStrategy(null);

        const upperCaseInput = workoutDescription.trim().toUpperCase();
        const benchmarkDescription = BENCHMARK_WORKOUTS[upperCaseInput as keyof typeof BENCHMARK_WORKOUTS];
        const descriptionForAnalysis = benchmarkDescription || workoutDescription;
        setAnalyzedWorkout(descriptionForAnalysis);

        try {
            const result = await generateWorkoutStrategy(descriptionForAnalysis, limiters);
            if (result) {
                setStrategy(result);
            } else {
                setError('An error occurred while generating the strategy.');
            }
        } catch (err) {
            setError('An error occurred while generating the strategy.');
        } finally {
            setIsLoading(false);
        }
    }, [workoutDescription, limiters]);

    const handleReset = () => {
        setWorkoutDescription('');
        setStrategy(null);
        setError(null);
        setLimiters([]);
        setSelectedLevel('rx');
        setAnalyzedWorkout('');
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
            <Modal isOpen={!!strategy} onClose={handleReset} title="Your Workout Strategy">
                {strategy && (
                    <div className="max-h-[80vh] overflow-y-auto pr-2">
                         <p className="text-text-primary dark:text-dark-text-primary mb-6 px-1">Select your level to see a custom tactical guide.</p>
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
                            return (
                                <div className="px-1">
                                    <div className="grid md:grid-cols-2 gap-6 mb-8 p-4 bg-base dark:bg-dark-base rounded-lg border border-border-color dark:border-dark-border-color">
                                        <div className="flex items-start gap-4">
                                            <ClockIcon className="w-8 h-8 text-text-muted dark:text-dark-text-muted flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-md font-semibold text-text-muted dark:text-dark-text-muted">Target Time</h3>
                                                <p className="text-xl font-bold text-text-primary dark:text-dark-text-primary">{currentStrategy.timeEstimate}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 md:border-l md:border-border-color md:dark:border-dark-border-color md:pl-6">
                                            <ClipboardListIcon className="w-8 h-8 text-text-muted dark:text-dark-text-muted flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="text-md font-semibold text-text-muted dark:text-dark-text-muted">Your Workout</h3>
                                                <p className="text-sm text-text-primary dark:text-dark-text-primary whitespace-pre-wrap">{analyzedWorkout}</p>
                                            </div>
                                        </div>
                                    </div>
    
                                 <StrategySection
  title="Overall Strategy & Goal"
  content={<div className="text-black">{currentStrategy.goal}</div>}
  defaultOpen={true}
/>

<StrategySection
  title="Pacing & Rep Scheme Breakdown"
  content={<div className="text-black">{currentStrategy.pacing}</div>}
/>

<StrategySection
  title="Movement Efficiency Under Fatigue"
  content={<div className="text-black">{currentStrategy.efficiency}</div>}
/>

<StrategySection
  title="Transition Plan"
  content={<div className="text-black">{currentStrategy.transitions}</div>}
/>

<StrategySection
  title="Where to Push vs. Where to Conserve Energy"
  content={<div className="text-black">{currentStrategy.pushVsConserve}</div>}
/>

<StrategySection
  title="Breathing Strategy"
  content={<div className="text-black">{currentStrategy.breathing}</div>}
/>

<StrategySection
  title="How to Improve Your Limiters"
  content={<div className="text-black">{currentStrategy.improvementFocus}</div>}
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