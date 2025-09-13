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
                aria-controls={`team-guide-section-${sectionId}`}
            >
                <h4 className="text-xl font-bold text-brand-secondary">{title}</h4>
                <ChevronDownIcon className={`w-6 h-6 text-text-muted dark:text-dark-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                id={`team-guide-section-${sectionId}`}
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

export default function TeamWorkoutGuide() {
    const sectionTitles = [
        "Communication is Key",
        "Play to Your Strengths",
        "Team Size Strategy: Pairs vs. Quads",
        "Stepping Up for Competition",
        "Master Your Transitions",
        "Pace it Right: The Golden Rule",
        "Stay Positive & Lift Each Other Up"
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
                Partner and team workouts are a staple of CrossFit. Success isn't just about fitness; it's about strategy, communication, and working as a single unit. Here’s how to dominate your next team WOD.
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
                <p><strong>Before the Clock Starts:</strong> Don't just read the workout; build a game plan. Discuss how you'll split the reps. Who is stronger at which movement? What's a realistic pace? This 5-minute conversation can save you 2 minutes in the workout.</p>
                <p><strong>During the Workout:</strong> Communicate constantly. Use short, clear cues. "3 reps left!", "Your turn next!", "Keep breathing!". Knowing what your partner is doing and feeling is crucial for smooth transitions and maintaining pace.</p>
            </Section>

            <Section
                title={sectionTitles[1]}
                isOpen={!!openSections[sectionTitles[1]]}
                onToggle={() => toggleSection(sectionTitles[1])}
            >
                 <p>Every team has specialists. Is your partner a cardio machine? Let them take longer pulls on the rower. Are you great at gymnastics? You should handle the larger sets of toes-to-bar.</p>
                 <p>For "you go, I go" style workouts, structure your breaks so the stronger athlete is tackling the movement they excel at, giving their partner more rest for a movement they find challenging.</p>
            </Section>

            <Section
                title={sectionTitles[2]}
                isOpen={!!openSections[sectionTitles[2]]}
                onToggle={() => toggleSection(sectionTitles[2])}
            >
                <p><strong className="text-text-primary dark:text-dark-text-primary">Working in Pairs (2s):</strong> The pace is often relentless. The work-to-rest ratio is typically 1:1, meaning one person works while the other rests. The resting partner's job isn't just to rest—it's to recover actively, breathe, and be ready to go the instant their turn comes. Transitions must be lightning-fast.</p>
                <p><strong className="text-text-primary dark:text-dark-text-primary">Working in Quads (4s):</strong> With a 1:3 work-to-rest ratio, you get more recovery time. This often means the "work" periods can be done at a much higher intensity. Strategy becomes more complex. You can create two pairs: one "pacer" pair that moves steadily and one "sprinter" pair that attacks their portion. Logistics are critical—managing four bodies and equipment in one lane requires a clear plan.</p>
            </Section>

            <Section
                title={sectionTitles[3]}
                isOpen={!!openSections[sectionTitles[3]]}
                onToggle={() => toggleSection(sectionTitles[3])}
            >
                <p>Competing as a team adds another layer of pressure and excitement. Here’s how to prepare:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong className="text-text-primary dark:text-dark-text-primary">Know the Standards Cold:</strong> Read the event description and watch the movement standards video multiple times. Practice to that exact standard. A single "no-rep" due to a misunderstanding can cost you dozens of places.</li>
                    <li><strong className="text-text-primary dark:text-dark-text-primary">Have a Flexible Game Plan:</strong> Plan your rep schemes and transitions, but also plan for when things go wrong. What if someone gets a no-rep? What if a piece of equipment is farther than expected? Discuss "what if" scenarios so you can adapt on the fly without panicking.</li>
                    <li><strong className="text-text-primary dark:text-dark-text-primary">Scout the Competition Floor:</strong> As soon as you're allowed in the venue, walk your lane. Understand the layout. What is the most efficient path from the rower to the pull-up bar? Where will you place your chalk bucket? These small details make a huge difference under pressure.</li>
                </ul>
            </Section>
            
            <Section
                title={sectionTitles[4]}
                isOpen={!!openSections[sectionTitles[4]]}
                onToggle={() => toggleSection(sectionTitles[4])}
            >
                <p>Workouts are often won or lost in the transitions. Choreograph your station. Where does the barbell go when you're done? Where does your partner stand while they wait? A clean, organized space prevents confusion and saves precious seconds.</p>
                <p>For partner-carry movements or synchronized work, practice the timing together. A smooth sync-up is faster than two individuals moving at their own max speed.</p>
            </Section>

            <Section
                title={sectionTitles[5]}
                isOpen={!!openSections[sectionTitles[5]]}
                onToggle={() => toggleSection(sectionTitles[5])}
            >
                 <p><strong>Your team's pace is dictated by the athlete who needs the most rest.</strong> Pushing so hard that your partner has no time to recover before their turn is a recipe for disaster. This leads to a "redline" situation where performance plummets.</p>
                 <p>Find a "comfortably uncomfortable" pace that all team members can sustain. It's better to move consistently for 10 minutes than to sprint for 2 and walk for 8.</p>
            </Section>

            <Section
                title={sectionTitles[6]}
                isOpen={!!openSections[sectionTitles[6]]}
                onToggle={() => toggleSection(sectionTitles[6])}
            >
                <p>Attitude is a performance multiplier. When the workout gets tough (and it will), your energy affects your partner. High-fives, words of encouragement ("You got this!", "Great set!"), and a positive mindset can pull a team through the darkest moments of a WOD.</p>
                <p>Never show frustration with your partner. You succeed as a team, and you fail as a team. Be a rock for them, and they'll be one for you.</p>
            </Section>
        </div>
    );
}