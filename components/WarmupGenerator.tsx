import React, { useState, useCallback } from 'react';
import { generateWarmup } from '../services/geminiService';
import type { WarmupPlan, GeneralWarmupStep, DynamicStretchingStep, MovementSpecificStep, WorkoutPrepStep } from '../types';
import { SparklesIcon, FlameIcon } from './Icons';
import LoadingSpinner from './LoadingSpinner';
import StrategySection from './StrategySection';

// FIX: The type guards and rendering logic for different warm-up step types were incorrect, causing type errors.
// The logic has been restructured to correctly identify and render each step type.
const renderStep = (step: GeneralWarmupStep | DynamicStretchingStep | MovementSpecificStep | WorkoutPrepStep) => {
    if ('activity' in step) {
        // This is GeneralWarmupStep, DynamicStretchingStep, or MovementSpecificStep
        if ('details' in step) {
            // This is MovementSpecificStep
            return (
                <div>
                    <span className="font-semibold text-text-primary dark:text-dark-text-primary">{step.activity}</span>
                    <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">{step.details}</p>
                </div>
            );
        }
        
        // This is GeneralWarmupStep or DynamicStretchingStep
        let detail = '';
        if ('duration' in step) {
            detail = step.duration;
        } else if ('reps' in step) {
            detail = step.reps;
        }

        return (
            <div className="flex justify-between items-center">
                <span>{step.activity}</span>
                <span className="font-semibold text-text-primary dark:text-dark-text-primary">
                    {detail}
                </span>
            </div>
        );
    }
    
    if ('round' in step) {
        // This is WorkoutPrepStep
        return (
            <div>
                <span className="font-semibold text-text-primary dark:text-dark-text-primary">{step.round}</span>
                <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">{step.details}</p>
            </div>
        );
    }

    return null;
};

export default function WarmupGenerator() {
    const [workoutDescription, setWorkoutDescription] = useState('');
    const [warmupPlan, setWarmupPlan] = useState<WarmupPlan | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!workoutDescription.trim()) {
            setError('Please enter a workout description.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setWarmupPlan(null);

        try {
            const result = await generateWarmup(workoutDescription);
            if (result) {
                setWarmupPlan(result);
            } else {
                setError('Could not create a warm-up. Please check your workout description and try again.');
            }
        } catch (err) {
            setError('An error occurred while creating your warm-up.');
        } finally {
            setIsLoading(false);
        }
    }, [workoutDescription]);

    const handleReset = () => {
        setWorkoutDescription('');
        setWarmupPlan(null);
        setError(null);
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="text-center mb-8">
                 <h2 className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-2 flex items-center justify-center md:gap-3">
                    <FlameIcon className="w-10 h-10 text-brand-secondary hidden md:inline-block" />
                    Dynamic Warm-up Planner
                </h2>
                <p className="text-lg text-text-muted dark:text-dark-text-muted">Enter your workout or a specific movement to get a tailored warm-up plan.</p>
            </div>

            {!warmupPlan && (
                <div className="bg-surface dark:bg-dark-surface rounded-lg p-6 shadow-lg border border-border-color dark:border-dark-border-color">
                    <label htmlFor="workout-description" className="block text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                        Enter Your Workout or Movement
                    </label>
                    <textarea
                        id="workout-description"
                        rows={6}
                        value={workoutDescription}
                        onChange={(e) => setWorkoutDescription(e.target.value)}
                        placeholder='e.g., "Fran: 21-15-9 Thrusters and Pull-ups" or "Heavy Deadlifts"'
                        className="w-full bg-base dark:bg-dark-base text-text-primary dark:text-dark-text-primary p-3 rounded-md border border-border-color dark:border-dark-border-color focus:ring-2 focus:ring-brand-primary focus:border-brand-primary dark:focus:border-brand-primary transition duration-200"
                    />
                     <div className="mt-6">
                        <button
                            onClick={handleGenerate}
                            disabled={!workoutDescription.trim() || isLoading}
                            className="w-full flex items-center justify-center md:gap-2 bg-brand-secondary hover:bg-orange-600 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
                        >
                            {isLoading ? <LoadingSpinner /> : <><SparklesIcon className="w-5 h-5 hidden md:inline-block" /> Let's Warm Up</>}
                        </button>
                        {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2 text-center">{error}</p>}
                    </div>
                </div>
            )}
            
            {warmupPlan && (
                <div className="bg-surface dark:bg-dark-surface rounded-lg p-6 shadow-lg border border-border-color dark:border-dark-border-color animate-fade-in">
                    <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-1">Your Tailored Warm-up</h3>
                    <p className="text-text-muted dark:text-dark-text-muted mb-6">For: {workoutDescription}</p>

                    <StrategySection 
                        title="Phase 1: General Warm-up"
                        content={<div className="space-y-3">{warmupPlan.general.map((step, i) => <div key={i} className="p-3 bg-base dark:bg-dark-base rounded">{renderStep(step)}</div>)}</div>}
                        defaultOpen={true}
                    />
                     <StrategySection 
                        title="Phase 2: Dynamic Stretching & Mobility"
                        content={<div className="space-y-3">{warmupPlan.dynamicStretching.map((step, i) => <div key={i} className="p-3 bg-base dark:bg-dark-base rounded">{renderStep(step)}</div>)}</div>}
                        defaultOpen={true}
                    />
                    <StrategySection 
                        title="Phase 3: Movement-Specific Activation"
                        content={<div className="space-y-3">{warmupPlan.movementSpecific.map((step, i) => <div key={i} className="p-3 bg-base dark:bg-dark-base rounded">{renderStep(step)}</div>)}</div>}
                        defaultOpen={true}
                    />
                    <StrategySection 
                        title="Phase 4: Workout Prep"
                        content={<div className="space-y-3">{warmupPlan.workoutPrep.map((step, i) => <div key={i} className="p-3 bg-base dark:bg-dark-base rounded">{renderStep(step)}</div>)}</div>}
                        defaultOpen={true}
                    />

                    <div className="mt-6 text-center">
                        <button onClick={handleReset} className="text-brand-secondary font-semibold hover:underline">
                            Create Another Plan
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}