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

const SubSection: React.FC<{ title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="mt-4 pl-2 border-l-4 border-brand-primary/20">
        <h6 className="font-bold text-lg text-text-primary dark:text-dark-text-primary mb-2">{title}</h6>
        <div className="space-y-3">{children}</div>
    </div>
);


export default function BarbellCyclingGuide() {
    const sectionTitles = [
        "The Foundations of Efficient Cycling",
        "Movement-Specific Cycling Strategies",
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
                <SubSection title="Deadlifts">
                    <p>Deadlifts feature in everything from sprint couplets to long, heavy chippers. The right strategy depends entirely on the workout's demands.</p>
                    <p><strong>Touch-and-Go (TNG):</strong> Best for lighter loads in short, intense workouts (e.g., "Diane," or rounds of 10-15 reps). The goal is speed. The key is maintaining a perfectly flat back. As the plates touch the ground, use the rebound to immediately initiate the next pull by driving your legs. Do not let your hips shoot up first. A single missed rep from a rounded back isn't worth the few seconds saved.</p>
                    <p><strong>Fast Singles:</strong> The superior strategy for heavier loads or longer workouts where grip and back endurance are the limiters. Drop the bar from the top, quickly reset your feet and grip (mixed or hook), take a big breath to brace your core, and pull. This method allows for a brief mental and physical reset on every rep, ensuring better form and sustainability.</p>
                </SubSection>

                 <SubSection title="Cleans (Power & Squat)">
                    <p>Cycling cleans is a staple in workouts like "DT" or classic couplets with movements like burpees or pull-ups.</p>
                    <p><strong>Touch-and-Go (TNG):</strong> Ideal for very light loads where you can maintain perfect form. After receiving the bar, control the descent by keeping it close to your body. As the bar passes your knees, "chase" it to the floor and meet it with your hips low and back flat, ready to use the rebound for the next pull. This is a high-skill technique that saves time but costs more energy and grip.</p>
                    <p><strong>Fast Singles:</strong> The most common and effective method for moderate to heavy cleans. Drop the bar from the shoulders, take a single step back and forward to reset, re-establish your hook grip, breathe, and execute the next lift. This creates a sustainable, repeatable rhythm, saves your grip, and ensures a powerful setup for every single rep.</p>
                </SubSection>

                <SubSection title="Snatches (Power & Squat)">
                    <p>Due to the wide grip and technical complexity, snatches are almost always cycled as fast singles.</p>
                    <p><strong>Touch-and-Go (TNG):</strong> Only attempted by elite athletes with exceptional mobility, and only with very light weight (e.g., 34 kg / 25 kg). For 99% of athletes, this is inefficient and unsafe as form degrades almost immediately. Avoid it.</p>
                    <p><strong>Fast Singles:</strong> The standard for cycling snatches in any workout, from "Isabel" (30 snatches for time) to AMRAPs. The rhythm is king: drop the bar from overhead, let it settle for a split second, approach the bar, set your hook grip and back, breathe, and pull. Practicing this "drop and reset" sequence until it's automatic is key to fast times.</p>
                </SubSection>
                
                <SubSection title="Overhead Lifts (Thrusters, Push Press, Jerks)">
                    <p>These movements are all about linking reps efficiently to maintain momentum, common in workouts like "Fran" (thrusters) or couplets with push press.</p>
                    <p><strong>Linking Reps:</strong> The secret is catching the "bounce" or momentum. As you lower the bar from overhead, absorb the impact by immediately dipping for the next rep. Don't catch it stiff-legged and then re-dip. It should be one fluid motion—down into up. For thrusters, this means you absorb the bar directly into the bottom of your next front squat.</p>
                    <p><strong>Breathing:</strong> This is critical and workout-dependent. For a sprint like "Fran", a common pattern is to inhale on the way down, and exhale explosively as you drive overhead. For longer sets of push press, you might take a quick breath at the top with the bar locked out. Find a rhythm that prevents you from holding your breath and redlining.</p>
                </SubSection>
            </Section>

            <Section
                title={sectionTitles[2]}
                isOpen={!!openSections[sectionTitles[2]]}
                onToggle={() => toggleSection(sectionTitles[2])}
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
                title={sectionTitles[3]}
                isOpen={!!openSections[sectionTitles[3]]}
                onToggle={() => toggleSection(sectionTitles[3])}
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
                title={sectionTitles[4]}
                isOpen={!!openSections[sectionTitles[4]]}
                onToggle={() => toggleSection(sectionTitles[4])}
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
                title={sectionTitles[5]}
                isOpen={!!openSections[sectionTitles[5]]}
                onToggle={() => toggleSection(sectionTitles[5])}
            >
                <p><strong>Barbell Complexes:</strong> Combine multiple movements without dropping the bar (e.g., 1 Deadlift + 1 Hang Power Clean + 1 Front Squat + 1 Push Jerk). This builds technique under fatigue and improves your flow.</p>
                <p><strong>EMOMs (Every Minute On the Minute):</strong> A fantastic tool for pacing. Example: EMOM for 10 minutes, perform 5 touch-and-go Power Cleans. This forces you to work while partially recovered.</p>
                <p><strong>Tempo Lifts:</strong> Perform lifts with a slow eccentric (lowering) phase (e.g., 3-5 seconds down). This builds incredible positional strength and control, which translates directly to better cycling.</p>
            </Section>
        </div>
    );
}