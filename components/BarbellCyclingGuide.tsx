import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';

const Section: React.FC<{
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}> = ({ title, children, isOpen, onToggle }) => {
    const sectionId = title.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className="border-b border-border-color dark:border-dark-border-color last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                aria-expanded={isOpen}
                aria-controls={`cycling-guide-section-${sectionId}`}
            >
                <h4 className="text-xl font-bold text-brand-secondary">{title}</h4>
                <ChevronDownIcon className={`w-6 h-6 text-text-muted dark:text-dark-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                id={`cycling-guide-section-${sectionId}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="pt-2 pb-6 space-y-3 text-text-muted dark:text-dark-text-muted leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function BarbellCyclingGuide() {
    const sectionTitles = [
        "The Foundations of Efficient Cycling",
        "Cycling Light Loads (<50% 1RM)",
        "Cycling Moderate Loads (50-75% 1RM)",
        "Cycling Heavy Loads (75%+ 1RM)",
        "Drills to Build Your Engine"
    ];

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        [sectionTitles[0]]: true,
    });

    const toggleSection = (title: string) => {
        setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
    };

    const isAnySectionOpen = Object.values(openSections).some(isOpen => isOpen);

    const toggleAll = () => {
        const nextState = !isAnySectionOpen;
        const allSectionsState: Record<string, boolean> = {};
        sectionTitles.forEach(title => {
            allSectionsState[title] = nextState;
        });
        setOpenSections(allSectionsState);
    };

    return (
        <div className="text-text-primary dark:text-dark-text-primary">
            <p className="mb-6 text-lg">
                Barbell cycling is the ability to perform multiple, consecutive repetitions of a barbell movement with maximum efficiency and minimal rest. Mastering this skill is crucial for improving your times in benchmark workouts and metcons.
            </p>

            <div className="flex justify-end mb-4">
                <button
                    onClick={toggleAll}
                    className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                    {isAnySectionOpen ? 'Collapse All' : 'Expand All'}
                </button>
            </div>

            <Section
                title={sectionTitles[0]}
                isOpen={!!openSections[sectionTitles[0]]}
                onToggle={() => toggleSection(sectionTitles[0])}
            >
                <p><strong>The Hook Grip is Non-Negotiable:</strong> For Olympic lifts (cleans, snatches), the hook grip is your superpower. It locks you to the bar, reduces grip fatigue, and allows for more powerful reps. Tape your thumbs and practice it on every lift.</p>
                <p><strong>Breathing is Pacing:</strong> Don't hold your breath. Find a rhythm. For light loads, aim for one breath per rep (exhale on exertion). For heavier loads, you may need a full breath and reset at the top or bottom of each rep.</p>
                <p><strong>Master the Bar Path:</strong> The shortest distance between two points is a straight line. Keep the bar close to your body. An efficient bar path saves energy and is significantly faster.</p>
                <p><strong>Use Your Legs, Save Your Back:</strong> The power for every barbell lift comes from your legs and hips. Your arms are just guides. A tired back is a sign of inefficient mechanics, not a lack of strength.</p>
            </Section>

            <Section
                title={sectionTitles[1]}
                isOpen={!!openSections[sectionTitles[1]]}
                onToggle={() => toggleSection(sectionTitles[1])}
            >
                 <p>This is where you see workouts like "Grace" and "Isabel". The goal is speed, minimal rest, and unbroken sets if possible.</p>
                 <p><strong>Technique: Touch-and-Go (TNG).</strong> You must learn to use the kinetic energy from the floor or the eccentric phase to your advantage.</p>
                 <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>From the Floor (Cleans/Snatches/Deadlifts):</strong> Control the bar down, keeping it close. As the plates touch the ground, use the "rebound" to immediately initiate the next pull. This requires a consistently flat back.</li>
                    <li><strong>From Overhead (Jerks/Thrusters):</strong> Don't just drop the bar to your shoulders. Guide it down smoothly and absorb the impact by immediately starting the descent of your next squat or dip. Let gravity help you reload.</li>
                 </ul>
                 <p className="pt-2"><strong>Breathing:</strong> Fast and rhythmic. Try to link your breath to the movement, such as exhaling explosively at the top of every lift.</p>
            </Section>

            <Section
                title={sectionTitles[2]}
                isOpen={!!openSections[sectionTitles[2]]}
                onToggle={() => toggleSection(sectionTitles[2])}
            >
                 <p>This is the bread and butter of most daily WODs. The focus shifts from pure speed to smart, sustainable sets and maintaining technique under growing fatigue.</p>
                 <p><strong>Technique: Small, Planned Sets.</strong> Large, unbroken sets are a trap. They feel great at first but lead to premature burnout. A plan like "5-5-5" is often much faster than one big set of 12 followed by slow singles.</p>
                 <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>Controlled Eccentrics:</strong> You can still do touch-and-go for small sets, but consider dropping the first rep of a set to save your grip and back.</li>
                    <li><strong>Step Away:</strong> For movements like power cleans, dropping the bar, taking one step back and one step forward, breathing, and then lifting is a repeatable and sustainable rhythm for small sets or fast singles.</li>
                 </ul>
                 <p className="pt-2"><strong>Breathing:</strong> More deliberate. You might take 2-3 quick breaths between sets of 3-5 reps. The goal is to keep your heart rate from redlining.</p>
            </Section>

            <Section
                title={sectionTitles[3]}
                isOpen={!!openSections[sectionTitles[3]]}
                onToggle={() => toggleSection(sectionTitles[3])}
            >
                 <p>This is common in strength-biased metcons or lifting ladders. The goal is safety, consistency, and managing your central nervous system.</p>
                 <p><strong>Technique: Fast Singles.</strong> All reps are dropped from the top. "Cycling" here refers to minimizing the time between these singles. It's a choreographed dance.</p>
                 <ol className="list-decimal list-inside pl-4 space-y-2">
                    <li><strong>Lift:</strong> Execute the lift with maximal power and perfect technique.</li>
                    <li><strong>Drop:</strong> Let the bar drop in a controlled way in front of you. Don't chase it.</li>
                    <li><strong>Reset:</strong> As soon as it settles, step to the bar, reset your feet, reset your hands (and hook grip), take a deep belly breath, and brace.</li>
                    <li><strong>Go:</strong> Initiate the next pull.</li>
                 </ol>
                 <p className="pt-2"><strong>Breathing:</strong> A full, complete breath and brace for every single rep. This is non-negotiable for protecting your spine under heavy load.</p>
            </Section>

            <Section
                title={sectionTitles[4]}
                isOpen={!!openSections[sectionTitles[4]]}
                onToggle={() => toggleSection(sectionTitles[4])}
            >
                <p><strong>Barbell Complexes:</strong> Combine multiple movements without dropping the bar (e.g., 1 Deadlift + 1 Hang Power Clean + 1 Front Squat + 1 Push Jerk). This builds technique under fatigue and improves your flow.</p>
                <p><strong>EMOMs (Every Minute On the Minute):</strong> A fantastic tool for pacing. Example: EMOM for 10 minutes, perform 5 touch-and-go Power Cleans. This forces you to work while partially recovered.</p>
                <p><strong>Tempo Lifts:</strong> Perform lifts with a slow eccentric (lowering) phase (e.g., 3-5 seconds down). This builds incredible positional strength and control, which translates directly to better cycling.</p>
            </Section>
        </div>
    );
}