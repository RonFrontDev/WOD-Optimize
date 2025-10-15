// FIX: Create the RecoveryGuide component to be displayed in the app. This resolves the module not found error in App.tsx.
import React, { useState } from 'react';
import { DAILY_RECOVERY_PLANS, COMPETITION_RECOVERY_PLAN } from '../constants/recoveryConstants';
import type { RecoveryPlan, RecoveryStep, RecoveryContext, TrainingFrequency } from '../types';
import {
    UtensilsIcon,
    DropletIcon,
    BodyStretchIcon,
    BedIcon,
    BrainCircuitIcon,
    TrophyIcon,
    ClockIcon,
    CheckCircleIcon,
} from './Icons';

// Helper to get icon component from string
const getIcon = (iconName: RecoveryStep['icon']) => {
    switch (iconName) {
        case 'UtensilsIcon': return <UtensilsIcon className="w-8 h-8 text-white" />;
        case 'DropletIcon': return <DropletIcon className="w-8 h-8 text-white" />;
        case 'BodyStretchIcon': return <BodyStretchIcon className="w-8 h-8 text-white" />;
        case 'BedIcon': return <BedIcon className="w-8 h-8 text-white" />;
        case 'BrainCircuitIcon': return <BrainCircuitIcon className="w-8 h-8 text-white" />;
        case 'TrophyIcon': return <TrophyIcon className="w-8 h-8 text-white" />;
        case 'ClockIcon': return <ClockIcon className="w-8 h-8 text-white" />;
        default: return null;
    }
};

const RecoveryStepComponent: React.FC<{ step: RecoveryStep }> = ({ step }) => {
    return (
        <div className="flex items-start md:gap-6">
            <div className="relative z-10 hidden md:flex items-center justify-center mt-1">
                <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center shadow-md flex-shrink-0">
                    {getIcon(step.icon)}
                </div>
            </div>
            <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg border border-border-color dark:border-dark-border-color w-full">
                <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">{step.title}</h3>
                <p className="text-text-muted dark:text-dark-text-muted mb-4 font-semibold">{step.description}</p>
                <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-primary dark:text-dark-text-primary">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                            <span dangerouslySetInnerHTML={{ __html: detail.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const RecoveryPlanComponent: React.FC<{ plan: RecoveryPlan }> = ({ plan }) => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">{plan.title}</h2>
            <p className="text-lg text-text-muted dark:text-dark-text-muted mb-8">{plan.summary}</p>
            <ul className="flex flex-col gap-8">
                {plan.steps.map((step, index) => (
                    <RecoveryStepComponent key={index} step={step} />
                ))}
            </ul>
        </div>
    );
};

export default function RecoveryGuide() {
    const [context, setContext] = useState<RecoveryContext>('training');
    const [frequency, setFrequency] = useState<TrainingFrequency>('1x');
    const [competitionProtocol, setCompetitionProtocol] = useState<'between' | 'end'>('between');

    const trainingFrequencies: { id: TrainingFrequency, label: string }[] = [
        { id: '1x', label: 'Once a Day' },
        { id: '2x', label: 'Twice a Day' },
        { id: '3x', label: 'Three Times a Day' }
    ];
    
    const competitionProtocols: { id: 'between' | 'end', label: string }[] = [
        { id: 'between', label: 'Between Events' },
        { id: 'end', label: 'End of Day' }
    ];

    const plansToDisplay = context === 'training'
        ? DAILY_RECOVERY_PLANS[frequency]
        : COMPETITION_RECOVERY_PLAN.filter((_plan, index) => {
            if (competitionProtocol === 'between') return index === 0;
            if (competitionProtocol === 'end') return index === 1;
            return false;
        });

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="text-center mb-12">
                 <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text-primary mt-4 mb-4">
                    Recovery Hub
                </h1>
                <p className="text-lg md:text-xl text-text-muted dark:text-dark-text-muted">
                    Smart recovery is the key to consistent training and long-term progress. Select your context to see a tailored protocol.
                </p>
            </div>

            <div className="sticky top-16 bg-base/80 dark:bg-dark-base/80 backdrop-blur-sm z-20 py-4 mb-8">
                <div className="max-w-xl mx-auto space-y-4">
                    {/* Context Selector */}
                    <div>
                        <label className="block text-center text-sm font-bold text-text-muted dark:text-dark-text-muted mb-2 uppercase tracking-wider">Select Context</label>
                        <div className="flex items-center justify-center gap-3 mt-2">
                            {(['training', 'competition'] as RecoveryContext[]).map(ctx => {
                                const isSelected = context === ctx;
                                const label = ctx === 'training' ? 'Daily Training' : 'Competition';
                                return (
                                    <button
                                        key={ctx}
                                        onClick={() => setContext(ctx)}
                                        className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 capitalize ${
                                            isSelected 
                                            ? 'bg-brand-primary text-white shadow' 
                                            : 'bg-surface dark:bg-dark-surface text-text-muted dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-slate-700 border border-border-color dark:border-dark-border-color'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Competition Protocol Selector */}
                    <div className={`transition-all duration-300 ease-in-out ${context === 'competition' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 invisible'}`}>
                        {context === 'competition' && (
                             <div>
                                <label className="block text-center text-sm font-bold text-text-muted dark:text-dark-text-muted mb-2 uppercase tracking-wider">Protocol</label>
                                <div className="flex items-center justify-center gap-3 flex-wrap">
                                    {competitionProtocols.map(({ id, label }) => {
                                        const isSelected = competitionProtocol === id;
                                        return (
                                            <button
                                                key={id}
                                                onClick={() => setCompetitionProtocol(id)}
                                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                                                    isSelected 
                                                    ? 'bg-brand-secondary text-white shadow' 
                                                    : 'bg-surface dark:bg-dark-surface text-text-muted dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-slate-700 border border-border-color dark:border-dark-border-color'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Frequency Selector */}
                    <div className={`transition-all duration-300 ease-in-out ${context === 'training' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 invisible'}`}>
                        {context === 'training' && (
                             <div>
                                <label className="block text-center text-sm font-bold text-text-muted dark:text-dark-text-muted mb-2 uppercase tracking-wider">Training Frequency</label>
                                <div className="flex items-center justify-center gap-3 flex-wrap">
                                    {trainingFrequencies.map(({ id, label }) => {
                                        const isSelected = frequency === id;
                                        return (
                                            <button
                                                key={id}
                                                onClick={() => setFrequency(id)}
                                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                                                    isSelected 
                                                    ? 'bg-brand-secondary text-white shadow' 
                                                    : 'bg-surface dark:bg-dark-surface text-text-muted dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-slate-700 border border-border-color dark:border-dark-border-color'
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-12">
                {plansToDisplay.map((plan, index) => (
                    <RecoveryPlanComponent key={`${context}-${frequency}-${competitionProtocol}-${index}`} plan={plan} />
                ))}
            </div>
        </div>
    );
}