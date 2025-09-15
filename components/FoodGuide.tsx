import React from 'react';
import { RECOVERY_FOOD_GUIDE } from '../constants/recoveryConstants';
import type { RecoveryPlan, RecoveryStep } from '../types';
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
            <div className="hidden md:flex relative z-10 items-center justify-center mt-1">
                <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center shadow-md flex-shrink-0">
                    {getIcon(step.icon)}
                </div>
            </div>
            <div className="bg-surface dark:bg-dark-surface p-4 md:p-6 rounded-lg border border-border-color dark:border-dark-border-color w-full">
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
            <ul className="flex flex-col gap-8">
                {plan.steps.map((step, index) => (
                    <RecoveryStepComponent key={index} step={step} />
                ))}
            </ul>
        </div>
    );
};

export default function FoodGuide() {
    const foodPlan = RECOVERY_FOOD_GUIDE[0]; // There is only one plan in this constant

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
             <div className="bg-surface dark:bg-dark-surface rounded-lg shadow-lg border border-border-color dark:border-dark-border-color p-6 md:p-8">
                <h2 id="food-guide-heading" className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                    {foodPlan.title}
                </h2>
                <p className="text-md text-text-muted dark:text-dark-text-muted mb-8">{foodPlan.summary}</p>
                <RecoveryPlanComponent plan={foodPlan} />
            </div>
        </div>
    );
}