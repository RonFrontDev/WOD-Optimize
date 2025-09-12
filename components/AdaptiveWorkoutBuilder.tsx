import React, { useState, useCallback } from 'react';
import { generateAdaptiveStrategy } from '../services/geminiService';
import { ArrowLeftIcon, SparklesIcon, ExclamationTriangleIcon, ShieldCheckIcon, ForwardIcon, CheckCircleIcon } from './Icons';
import LoadingSpinner from './LoadingSpinner';
import type { AdaptiveWorkoutStrategy, MovementModification, InjurySeverity } from '../types';
import Modal from './Modal';
import ThemeToggle from './ThemeToggle';
import StrategySection from './StrategySection';

interface AdaptiveWorkoutBuilderProps {
    onBack: () => void;
}

const severityLevels: { id: InjurySeverity, label: string, description: string }[] = [
    { id: 'sore', label: 'Sore/Stiff', description: 'Can move with some discomfort.' },
    { id: 'painful', label: 'Painful to Use', description: 'Specific movements cause pain.' },
    { id: 'unusable', label: 'Completely Unusable', description: 'Cannot use or load the area at all.' }
];

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


export default function AdaptiveWorkoutBuilder({ onBack }: AdaptiveWorkoutBuilderProps): React.JSX.Element {
    const [workoutDescription, setWorkoutDescription] = useState<string>('');
    const [injuryDescription, setInjuryDescription] = useState<string>('');
    const [injurySeverity, setInjurySeverity] = useState<InjurySeverity>('painful');
    const [strategy, setStrategy] = useState<AdaptiveWorkoutStrategy | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateStrategy = useCallback(async () => {
        if (!workoutDescription.trim() || !injuryDescription.trim()) {
            setError('Please describe both the workout and your injury.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setStrategy(null);

        try {
            const result = await generateAdaptiveStrategy(workoutDescription, injuryDescription, injurySeverity);
            if (result) {
                setStrategy(result);
            } else {
                setError('An error occurred. The model may be unable to provide a safe modification for this workout/injury combination.');
            }
        } catch (err) {
            setError('An error occurred while generating the adaptive strategy.');
        } finally {
            setIsLoading(false);
        }
    }, [workoutDescription, injuryDescription, injurySeverity]);

    const handleReset = () => {
        setStrategy(null);
    };
    
    const handleFullReset = () => {
        setWorkoutDescription('');
        setInjuryDescription('');
        setInjurySeverity('painful');
        setStrategy(null);
        setError(null);
    }

    if (isLoading) {
        return (
            <div className="text-center animate-fade-in">
                <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Building Your Adaptive Plan...</h2>
                <p className="text-text-muted dark:text-dark-text-muted mb-8">Crafting a safe and effective strategy that works for you.</p>
                <LoadingSpinner />
            </div>
        );
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
                        <ShieldCheckIcon className="w-10 h-10 text-brand-primary" />
                        Adaptive WOD Analyzer
                    </h2>
                    <p className="text-lg text-text-muted dark:text-dark-text-muted">Get smart, safe workout modifications for your injuries or limitations.</p>
                </div>

                <div className="bg-surface dark:bg-dark-surface rounded-lg p-6 shadow-lg border border-border-color dark:border-dark-border-color">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="workout-description" className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                                1. Enter Workout Details
                            </label>
                            <textarea
                                id="workout-description"
                                rows={6}
                                value={workoutDescription}
                                onChange={(e) => setWorkoutDescription(e.target.value)}
                                placeholder='e.g., "Fran: 21-15-9 of Thrusters and Pull-ups"'
                                className="w-full bg-base dark:bg-dark-base text-text-primary dark:text-dark-text-primary p-3 rounded-md border border-border-color dark:border-dark-border-color focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>
                         <div>
                            <label htmlFor="injury-description" className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                                2. Describe Your Injury/Limitation
                            </label>
                            <textarea
                                id="injury-description"
                                rows={4}
                                value={injuryDescription}
                                onChange={(e) => setInjuryDescription(e.target.value)}
                                placeholder='e.g., "Left shoulder pain when pressing overhead" or "Sore lower back from deadlifts yesterday"'
                                className="w-full bg-base dark:bg-dark-base text-text-primary dark:text-dark-text-primary p-3 rounded-md border border-border-color dark:border-dark-border-color focus:ring-2 focus:ring-brand-secondary"
                            />
                        </div>

                        <div>
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
                    </div>
                    
                    <div className="mt-8">
                        <button
                            onClick={handleGenerateStrategy}
                            disabled={!workoutDescription.trim() || !injuryDescription.trim()}
                            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-cyan-600 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                        >
                            <SparklesIcon className="w-5 h-5" />
                            Generate Adaptive Strategy
                        </button>
                        {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2 text-center">{error}</p>}
                    </div>
                </div>
            </div>

            <Modal isOpen={!!strategy} onClose={handleReset} title="Your Adaptive Workout Strategy" headerActions={<ThemeToggle />}>
                {strategy && (
                    <div className="max-h-[80vh] overflow-y-auto pr-2">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200 p-4 rounded-r-lg mb-6">
                            <div className="flex">
                                <div className="py-1">
                                    <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500 mr-3" />
                                </div>
                                <div>
                                    <p className="font-bold">Safety First</p>
                                    <p className="text-sm">{strategy.safetyWarning}</p>
                                </div>
                            </div>
                        </div>

                        <StrategySection 
                            title="Movement Modifications" 
                            content={
                                <div className="space-y-4">
                                    {strategy.movementModifications.map((mod, index) => <MovementModificationCard key={index} mod={mod} />)}
                                </div>
                            } 
                            defaultOpen={true}
                        />
                        <StrategySection title="Revised Strategy & Goal" content={strategy.revisedStrategy} defaultOpen={true} />
                        <StrategySection title="Technique Focus" content={strategy.techniqueFocus} />
                        <StrategySection title="Targeted Warm-up" content={strategy.warmup} />
                        <StrategySection title="Targeted Cool-down" content={strategy.cooldown} />

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