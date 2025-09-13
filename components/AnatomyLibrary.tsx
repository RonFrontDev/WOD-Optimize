import React, { useState } from 'react';
import { ANATOMY_DATA } from '../constants/anatomyConstants';
import type { Muscle } from '../constants/anatomyConstants';
import { ArrowLeftIcon } from './Icons';

type AnatomyView = 'anterior' | 'posterior';

const MuscleInfoCard: React.FC<{ muscle: Muscle; onBack: () => void; }> = ({ muscle, onBack }) => {
    return (
        <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg border border-border-color dark:border-dark-border-color w-full h-full flex flex-col animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 mb-4 text-sm text-brand-primary hover:underline md:hidden">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Anatomy View
            </button>
            <h3 className="text-2xl font-bold text-brand-secondary mb-2">{muscle.name}</h3>
            <p className="text-text-muted dark:text-dark-text-muted italic mb-4">{muscle.function}</p>
            
            <div className="space-y-4 overflow-y-auto pr-2">
                <div>
                    <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">Common Exercises:</h4>
                    <ul className="list-disc list-inside text-text-muted dark:text-dark-text-muted">
                        {muscle.commonExercises.map(ex => <li key={ex}>{ex}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">Common Injuries / Issues:</h4>
                    <ul className="list-disc list-inside text-text-muted dark:text-dark-text-muted">
                        {muscle.commonInjuries.map(inj => <li key={inj}>{inj}</li>)}
                    </ul>
                </div>
            </div>
             <div className="mt-auto pt-4">
                <p className="text-sm text-center text-text-muted dark:text-dark-text-muted">Select another muscle group to learn more.</p>
            </div>
        </div>
    );
};


const AnatomyFigure: React.FC<{ view: AnatomyView, selectedMuscleId: string | null, onSelectMuscle: (id: string) => void }> = ({ view, selectedMuscleId, onSelectMuscle }) => {
    
    const getMuscleStyle = (id: string) => {
        const isSelected = selectedMuscleId === id;
        const baseStyle = "transition-all duration-200 cursor-pointer";
        if (isSelected) {
            return `${baseStyle} fill-brand-secondary stroke-white dark:stroke-dark-surface stroke-2`;
        }
        return `${baseStyle} fill-slate-300 dark:fill-slate-600 hover:fill-brand-primary/80`;
    }
    
    const anteriorVisible = view === 'anterior' ? 'opacity-100' : 'opacity-0 pointer-events-none';
    const posteriorVisible = view === 'posterior' ? 'opacity-100' : 'opacity-0 pointer-events-none';

    return (
        <div className="relative w-full max-w-sm mx-auto aspect-[2/3]">
             <svg viewBox="0 0 200 300" className={`absolute inset-0 transition-opacity duration-300 ${anteriorVisible}`}>
                <title>Anterior Muscle View</title>
                {/* Anterior Muscles */}
                <path onClick={() => onSelectMuscle('deltoids')} className={getMuscleStyle('deltoids')} d="M55 78 A 20 20 0 0 1 90 85 L 90 100 L 60 100 Z" />
                <path onClick={() => onSelectMuscle('deltoids')} className={getMuscleStyle('deltoids')} d="M145 78 A 20 20 0 0 0 110 85 L 110 100 L 140 100 Z" />
                <path onClick={() => onSelectMuscle('pectorals')} className={getMuscleStyle('pectorals')} d="M90 90 L 100 90 L 100 120 L 90 115 Z" />
                <path onClick={() => onSelectMuscle('pectorals')} className={getMuscleStyle('pectorals')} d="M110 90 L 100 90 L 100 120 L 110 115 Z" />
                <path onClick={() => onSelectMuscle('biceps')} className={getMuscleStyle('biceps')} d="M60 105 A 10 10 0 0 1 80 105 L 80 125 L 60 125 Z" />
                <path onClick={() => onSelectMuscle('biceps')} className={getMuscleStyle('biceps')} d="M140 105 A 10 10 0 0 0 120 105 L 120 125 L 140 125 Z" />
                <path onClick={() => onSelectMuscle('abdominals')} className={getMuscleStyle('abdominals')} d="M95 122 H 105 V 150 H 95 Z" />
                <path onClick={() => onSelectMuscle('obliques')} className={getMuscleStyle('obliques')} d="M90 122 L 95 122 L 95 150 L 90 150 Z M105 122 L 110 122 L 110 150 L 105 150 Z" />
                <path onClick={() => onSelectMuscle('forearms')} className={getMuscleStyle('forearms')} d="M60 130 L 80 130 L 80 160 L 60 160 Z" />
                <path onClick={() => onSelectMuscle('forearms')} className={getMuscleStyle('forearms')} d="M120 130 L 140 130 L 140 160 L 120 160 Z" />
                <path onClick={() => onSelectMuscle('quadriceps')} className={getMuscleStyle('quadriceps')} d="M85 155 L 100 155 L 100 220 L 85 220 Z" />
                <path onClick={() => onSelectMuscle('quadriceps')} className={getMuscleStyle('quadriceps')} d="M115 155 L 100 155 L 100 220 L 115 220 Z" />
                <path onClick={() => onSelectMuscle('calves')} className={getMuscleStyle('calves')} d="M88 230 L 98 230 L 98 280 L 88 280 Z" />
                <path onClick={() => onSelectMuscle('calves')} className={getMuscleStyle('calves')} d="M112 230 L 102 230 L 102 280 L 112 280 Z" />
            </svg>
            <svg viewBox="0 0 200 300" className={`absolute inset-0 transition-opacity duration-300 ${posteriorVisible}`}>
                <title>Posterior Muscle View</title>
                {/* Posterior Muscles */}
                <path onClick={() => onSelectMuscle('trapezius')} className={getMuscleStyle('trapezius')} d="M90 75 L 110 75 L 105 95 L 95 95 Z" />
                <path onClick={() => onSelectMuscle('deltoids')} className={getMuscleStyle('deltoids')} d="M55 78 A 20 20 0 0 1 90 85 L 90 100 L 60 100 Z" />
                <path onClick={() => onSelectMuscle('deltoids')} className={getMuscleStyle('deltoids')} d="M145 78 A 20 20 0 0 0 110 85 L 110 100 L 140 100 Z" />
                <path onClick={() => onSelectMuscle('triceps')} className={getMuscleStyle('triceps')} d="M60 105 A 10 10 0 0 1 80 105 L 80 125 L 60 125 Z" />
                <path onClick={() => onSelectMuscle('triceps')} className={getMuscleStyle('triceps')} d="M140 105 A 10 10 0 0 0 120 105 L 120 125 L 140 125 Z" />
                <path onClick={() => onSelectMuscle('lats')} className={getMuscleStyle('lats')} d="M90 100 L 110 100 L 110 140 L 90 140 Z" />
                <path onClick={() => onSelectMuscle('erectors')} className={getMuscleStyle('erectors')} d="M97 125 H 103 V 150 H 97 Z" />
                <path onClick={() => onSelectMuscle('forearms')} className={getMuscleStyle('forearms')} d="M60 130 L 80 130 L 80 160 L 60 160 Z" />
                <path onClick={() => onSelectMuscle('forearms')} className={getMuscleStyle('forearms')} d="M120 130 L 140 130 L 140 160 L 120 160 Z" />
                <path onClick={() => onSelectMuscle('glutes')} className={getMuscleStyle('glutes')} d="M85 152 A 15 15 0 0 1 100 152 V 170 H 85 Z" />
                <path onClick={() => onSelectMuscle('glutes')} className={getMuscleStyle('glutes')} d="M115 152 A 15 15 0 0 0 100 152 V 170 H 115 Z" />
                <path onClick={() => onSelectMuscle('hamstrings')} className={getMuscleStyle('hamstrings')} d="M85 172 L 100 172 L 100 220 L 85 220 Z" />
                <path onClick={() => onSelectMuscle('hamstrings')} className={getMuscleStyle('hamstrings')} d="M115 172 L 100 172 L 100 220 L 115 220 Z" />
                <path onClick={() => onSelectMuscle('calves')} className={getMuscleStyle('calves')} d="M88 230 L 98 230 L 98 280 L 88 280 Z" />
                <path onClick={() => onSelectMuscle('calves')} className={getMuscleStyle('calves')} d="M112 230 L 102 230 L 102 280 L 112 280 Z" />
            </svg>
        </div>
    )
};


export default function AnatomyLibrary() {
    const [view, setView] = useState<AnatomyView>('anterior');
    const [selectedMuscleId, setSelectedMuscleId] = useState<string | null>('quadriceps');

    const selectedMuscle = ANATOMY_DATA.find(m => m.id === selectedMuscleId);
    
    return (
        <div className="mt-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Left Side: Figure and Toggle */}
                <div className={`lg:col-span-2 ${selectedMuscleId && 'hidden md:block'}`}>
                    <div className="flex justify-center mb-4">
                        <div className="flex bg-base dark:bg-dark-base rounded-lg border-2 border-border-color dark:border-dark-border-color p-1">
                            {(['anterior', 'posterior'] as AnatomyView[]).map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setView(v)}
                                    className={`w-28 p-2 rounded-md font-bold transition-colors duration-200 capitalize ${
                                        view === v 
                                        ? 'bg-brand-secondary text-white shadow' 
                                        : 'text-text-muted dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>
                    <AnatomyFigure view={view} selectedMuscleId={selectedMuscleId} onSelectMuscle={setSelectedMuscleId} />
                </div>

                {/* Right Side: Info Card */}
                <div className={`w-full ${!selectedMuscleId && 'hidden md:block'}`}>
                     {selectedMuscle ? (
                        <MuscleInfoCard muscle={selectedMuscle} onBack={() => setSelectedMuscleId(null)} />
                    ) : (
                         <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg border border-border-color dark:border-dark-border-color h-full flex flex-col justify-center items-center text-center">
                            <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">Select a Muscle</h3>
                            <p className="text-text-muted dark:text-dark-text-muted mt-2">Click on a highlighted area of the model to learn about its function, related exercises, and common injuries.</p>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
}