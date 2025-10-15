import React, { useState, useMemo } from 'react';
import { REHAB_DATA } from '../constants/rehabConstants';
import type { RehabPlan, BodyPart, RehabStep } from '../types';
import { 
    SearchIcon, ArrowLeftIcon, RehabIcon,
    ShoulderIcon, KneeIcon, BackIcon, ElbowIcon, WristIcon, AnkleIcon, HipIcon, ShinIcon,
    SnowflakeIcon, HeartPulseIcon, BarbellIcon, ShieldCheckIcon,
    CheckCircleIcon, AnatomyIcon
} from './Icons';
import AnatomyLibrary from './AnatomyLibrary';

const BODY_PARTS: { name: BodyPart; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { name: 'Shoulder', icon: ShoulderIcon },
    { name: 'Elbow', icon: ElbowIcon },
    { name: 'Wrist', icon: WristIcon },
    { name: 'Lower Back', icon: BackIcon },
    { name: 'Hip', icon: HipIcon },
    { name: 'Knee', icon: KneeIcon },
    { name: 'Shin', icon: ShinIcon },
    { name: 'Ankle', icon: AnkleIcon },
];

const BodyPartCard: React.FC<{ name: BodyPart; icon: React.FC<any>; onClick: () => void }> = ({ name, icon: Icon, onClick }) => (
    <button
        onClick={onClick}
        className="group bg-surface dark:bg-dark-surface rounded-lg p-6 flex flex-col items-center justify-center text-center border-2 border-border-color dark:border-dark-border-color hover:border-brand-primary dark:hover:border-brand-primary hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-all duration-300 transform hover:-translate-y-1"
    >
        <Icon className="w-16 h-16 text-brand-primary mb-4 transition-transform duration-300 group-hover:scale-110 hidden md:block" />
        <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">{name}</h3>
    </button>
);

const InjuryListItem: React.FC<{ plan: RehabPlan; onClick: () => void }> = ({ plan, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left bg-surface dark:bg-dark-surface rounded-lg p-4 border border-border-color dark:border-dark-border-color hover:shadow-lg hover:border-brand-secondary/50 transition-all duration-200"
    >
        <h4 className="text-lg font-semibold text-brand-secondary">{plan.name}</h4>
        <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">{plan.description}</p>
    </button>
);

const RehabStepComponent: React.FC<{ step: RehabStep, index: number, totalSteps: number }> = ({ step, index, totalSteps }) => {
    const getIcon = (iconName: RehabStep['icon']) => {
        switch (iconName) {
            case 'SnowflakeIcon': return <SnowflakeIcon className="w-8 h-8 text-white" />;
            case 'HeartPulseIcon': return <HeartPulseIcon className="w-8 h-8 text-white" />;
            case 'BarbellIcon': return <BarbellIcon className="w-8 h-8 text-white" />;
            case 'ShieldCheckIcon': return <ShieldCheckIcon className="w-8 h-8 text-white" />;
            default: return null;
        }
    };
    
    return (
        <li className="relative flex-1 group">
            {/* Timeline Line */}
            {index < totalSteps - 1 && <div className="absolute top-8 left-8 h-full w-0.5 bg-border-color dark:bg-dark-border-color group-last:hidden hidden md:block" />}
            
            <div className="flex items-start md:gap-6">
                {/* Icon and Circle */}
                <div className="relative z-10 hidden md:flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center shadow-md">
                        {getIcon(step.icon)}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg border border-border-color dark:border-dark-border-color w-full">
                    <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                        <span className="text-brand-primary">Phase {index + 1}:</span> {step.title}
                    </h3>
                    <p className="text-text-muted dark:text-dark-text-muted mb-4 font-semibold">{step.summary}</p>
                    <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-3 text-text-primary dark:text-dark-text-primary">
                                <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                                <span dangerouslySetInnerHTML={{ __html: detail.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            </li>
                        ))}
                    </ul>
                    {step.externalResource && (
                        <a 
                            href={step.externalResource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-brand-primary font-semibold hover:underline"
                        >
                            {step.externalResource.label} &rarr;
                        </a>
                    )}
                </div>
            </div>
        </li>
    );
};


const InjuryRoadmap: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<RehabPlan | null>(null);

    const filteredPlans = useMemo(() => {
        if (!searchQuery && !selectedBodyPart) {
            return [];
        }

        return REHAB_DATA.filter(plan => {
            const matchesBodyPart = selectedBodyPart ? plan.bodyPart === selectedBodyPart : true;
            const matchesSearch = searchQuery
                ? plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  plan.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()))
                : true;
            
            return matchesBodyPart && matchesSearch;
        });
    }, [searchQuery, selectedBodyPart]);
    
    const handleClear = () => {
        setSelectedBodyPart(null);
        setSelectedPlan(null);
        setSearchQuery('');
    };

    const handleSelectBodyPart = (part: BodyPart) => {
        setSelectedBodyPart(part);
        setSelectedPlan(null);
        setSearchQuery('');
    }

    if (selectedPlan) {
        return (
            <div className="animate-fade-in max-w-4xl mx-auto">
                <button onClick={() => setSelectedPlan(null)} className="flex items-center gap-2 mb-6 text-sm text-brand-primary hover:underline">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to {selectedPlan.bodyPart} Injuries
                </button>
                <div className="bg-surface dark:bg-dark-surface rounded-lg shadow-lg border border-border-color dark:border-dark-border-color p-6 md:p-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-2">{selectedPlan.name}</h2>
                    <p className="text-lg text-text-muted dark:text-dark-text-muted mb-8">{selectedPlan.description}</p>
                    <ul className="flex flex-col gap-8">
                        {selectedPlan.roadmap.map((step, index) => (
                            <RehabStepComponent 
                                key={index} 
                                step={step} 
                                index={index} 
                                totalSteps={selectedPlan.roadmap.length} 
                            />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="my-12 max-w-3xl mx-auto">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <SearchIcon className="w-5 h-5 text-text-muted dark:text-dark-text-muted" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search for an injury (e.g., 'jumper's knee', 'impingement')..."
                      value={searchQuery}
                      onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setSelectedBodyPart(null);
                      }}
                      className="w-full bg-surface dark:bg-dark-surface text-text-primary dark:text-dark-text-primary placeholder-text-muted dark:placeholder-dark-text-muted pl-12 pr-4 py-4 rounded-full border-2 border-border-color dark:border-dark-border-color focus:ring-2 focus:ring-brand-primary focus:border-brand-primary dark:focus:border-brand-primary transition duration-200"
                      aria-label="Search injuries"
                    />
                </div>
            </div>

            {(selectedBodyPart || searchQuery) && (
                <div className="text-center mb-12">
                     <button onClick={handleClear} className="bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary/20 font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm">
                        {selectedBodyPart ? `Clear filter: ${selectedBodyPart}` : 'Clear Search'} &times;
                    </button>
                </div>
            )}
            
            {filteredPlans.length > 0 ? (
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">{selectedBodyPart ? `${selectedBodyPart} Injuries` : 'Search Results'}</h2>
                    <div className="space-y-4">
                        {filteredPlans.map(plan => (
                            <InjuryListItem key={plan.id} plan={plan} onClick={() => setSelectedPlan(plan)} />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {searchQuery && (
                        <div className="text-center text-text-muted dark:text-dark-text-muted">
                            <p>No results found for "{searchQuery}".</p>
                        </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
                        {BODY_PARTS.map(part => (
                            <BodyPartCard
                                key={part.name}
                                name={part.name}
                                icon={part.icon}
                                onClick={() => handleSelectBodyPart(part.name)}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    )

}

type RehabView = 'roadmap' | 'anatomy';

export default function RehabGuide() {
    const [activeView, setActiveView] = useState<RehabView>('roadmap');

    return (
        <div className="animate-fade-in">
            <div className="text-center max-w-3xl mx-auto">
                 <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text-primary mt-4 mb-4">
                    Rehab
                </h1>
                <p className="text-lg md:text-xl text-text-muted dark:text-dark-text-muted">
                    Explore common injury roadmaps or dive into our interactive anatomy library to understand your body better.
                </p>
            </div>

            <div className="my-8 max-w-md mx-auto">
                <div className="flex bg-base dark:bg-dark-base rounded-lg border-2 border-border-color dark:border-dark-border-color p-1">
                    <button
                        onClick={() => setActiveView('roadmap')}
                        className={`w-1/2 p-2 rounded-md font-bold transition-colors duration-200 flex items-center justify-center md:gap-2 ${
                            activeView === 'roadmap' 
                            ? 'bg-brand-primary text-white shadow' 
                            : 'text-text-muted dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                    >
                        <RehabIcon className="w-5 h-5 hidden md:inline-block" /> Injury Roadmaps
                    </button>
                    <button
                        onClick={() => setActiveView('anatomy')}
                        className={`w-1/2 p-2 rounded-md font-bold transition-colors duration-200 flex items-center justify-center md:gap-2 ${
                            activeView === 'anatomy' 
                            ? 'bg-brand-secondary text-white shadow' 
                            : 'text-text-muted dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                    >
                        <AnatomyIcon className="w-5 h-5 hidden md:inline-block" /> Anatomy Library
                    </button>
                </div>
            </div>
            
            {activeView === 'roadmap' ? <InjuryRoadmap /> : <AnatomyLibrary />}

        </div>
    );
}