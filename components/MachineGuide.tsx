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
                aria-controls={`machine-guide-section-${sectionId}`}
            >
                <h4 className="text-xl font-bold text-brand-secondary">{title}</h4>
                <ChevronDownIcon className={`w-6 h-6 text-text-muted dark:text-dark-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                id={`machine-guide-section-${sectionId}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="pt-2 pb-6 space-y-4 text-text-muted dark:text-dark-text-muted leading-relaxed">
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


export default function MachineGuide() {
    const sectionTitles = [
        "The Air Bike (Assault/Echo)",
        "The Concept2 Rower",
        "The SkiErg"
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
                <SubSection title="1. Machine Setup is Crucial">
                    <p><strong>Seat Height:</strong> Adjust the seat so that when your foot is at the bottom of the pedal stroke, your leg has a slight, athletic bend. Too low and you'll burn out your quads; too high and you'll rock your hips and lose power.</p>
                    <p><strong>Seat Position (Forward/Back):</strong> Set the horizontal position so that when the pedals are level, your front kneecap is roughly over the ball of your foot. This ensures an efficient pedaling position.</p>
                </SubSection>

                <SubSection title="2. Understanding the Monitor">
                     <p><strong>RPM (Revolutions Per Minute):</strong> Your speed. This is the BEST metric for pacing. Holding a consistent RPM is the key to sustainable effort.</p>
                     <p><strong>Watts:</strong> Your power output. A great metric for sprints and measuring pure force production.</p>
                     <p><strong>Calories:</strong> A measure of work done. Remember that the machine's calorie calculation is an algorithm, not a perfect science. The faster you go, the exponentially more calories you burn per minute.</p>
                </SubSection>

                <SubSection title="3. Pacing Strategies & Drills">
                    <div>
                        <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">All-Out Sprint (10-60 seconds)</h5>
                        <p><strong>Technique:</strong> It's a full-body explosion. Drive hard with your legs while aggressively pushing with one arm and pulling with the other. Keep your chest up to allow for maximum oxygen intake.</p>
                        <p><strong>Monitor Focus:</strong> Watts or Cal/Hr. Aim for the highest numbers you can possibly hit.</p>
                        <div>
                            <strong>How to Improve:</strong>
                            <ul className="list-disc list-inside pl-4 mt-1">
                                <li><strong>10s Max Watt Sprints:</strong> Rest 50s, repeat 8-10 times.</li>
                                <li><strong>Tabata Intervals:</strong> 20s on, 10s off for 8 rounds. Try to hold the same high RPM across all rounds.</li>
                            </ul>
                        </div>
                    </div>
                     <div>
                        <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">Sustainable Pace (2-10 Minutes)</h5>
                        <p><strong>Technique:</strong> Find a "comfortably uncomfortable" rhythm. Focus on smooth, full pedal strokes—think of scraping mud off the bottom of your shoe on the upstroke. Control your breathing from the start.</p>
                        <p><strong>Monitor Focus:</strong> RPM. Pick a number and lock it in. For men, 60-68 RPM is a common target. For women, 50-58 RPM. Stare at that number and do not deviate.</p>
                        <div>
                            <strong>How to Improve:</strong>
                            <ul className="list-disc list-inside pl-4 mt-1">
                                <li><strong>EMOMs:</strong> Every minute on the minute for 10-15 minutes, bike 12/9 calories. The goal is consistent time each round.</li>
                                <li><strong>Longer Intervals:</strong> 4 rounds of 3 minutes on at your target RPM, 90 seconds easy recovery spin.</li>
                            </ul>
                        </div>
                    </div>
                     <div>
                        <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">The Long Haul (10+ Minutes)</h5>
                        <p><strong>Technique:</strong> This is a mental game of efficiency. Relax your grip, jaw, and shoulders. Let your legs do most of the work, using your arms just enough to keep the rhythm. Focus on deep, diaphragmatic breathing.</p>
                        <p><strong>Monitor Focus:</strong> RPM. Choose a lower, more conservative number (e.g., Men: 52-58 RPM, Women: 45-52 RPM) that you know you can hold without your heart rate redlining.</p>
                        <div>
                            <strong>How to Improve:</strong>
                            <ul className="list-disc list-inside pl-4 mt-1">
                                <li><strong>Steady State:</strong> 20-30 minute ride at a pace where you could hold a conversation.</li>
                                <li><strong>Negative Splits:</strong> Bike 5000m. Start at a very easy pace and increase your RPM by 1-2 every 1000m.</li>
                            </ul>
                        </div>
                    </div>
                </SubSection>
                <SubSection title="4. Common Faults & Fixes">
                    <p><strong>Fault: Bouncing in the seat.</strong><br/><em>Fix:</em> You're "mashing" the pedals. Focus on a smoother, circular motion and pull up on the backstroke as much as you push down.</p>
                    <p><strong>Fault: Slouching posture.</strong><br/><em>Fix:</em> Sit up tall and keep your chest proud. This opens your diaphragm for more efficient breathing, which is crucial on the bike.</p>
                    <p><strong>Fault: Ignoring the push-pull of the arms.</strong><br/><em>Fix:</em> Don't just let your arms go for a ride. Actively push with one and pull with the other. This contributes significant power to your total output.</p>
                </SubSection>
            </Section>

            <Section
                title={sectionTitles[1]}
                isOpen={!!openSections[sectionTitles[1]]}
                onToggle={() => toggleSection(sectionTitles[1])}
            >
                <SubSection title="1. Machine Setup is Crucial">
                    <p><strong>Damper Setting:</strong> The damper is not resistance; it's gearing. A setting of 3-5 is ideal for most CrossFit workouts, simulating a sleek, fast boat. Higher settings (6-8) are for pure strength work and can burn out your legs quickly.</p>
                    <p><strong>Foot Straps:</strong> Adjust the footbeds so the strap crosses over the widest part of your foot (the ball of your foot). This allows for a powerful leg drive and a flexible heel.</p>
                </SubSection>
                <SubSection title="2. Understanding the Monitor">
                     <p><strong>Pace /500m:</strong> The gold standard for rowing. It shows how long it would take you to row 500 meters at your current speed. This is the best metric for pacing intervals and longer rows.</p>
                     <p><strong>SPM (Strokes Per Minute):</strong> Your cadence. It's important, but it's not everything. A high SPM with no power is "spinning your wheels."</p>
                     <p><strong>Watts/Calories:</strong> Good for sprints and direct comparison to other machines.</p>
                </SubSection>
                 <SubSection title="3. Pacing Strategies & Drills">
                    <div>
                        <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">All-Out Sprint (up to 500m)</h5>
                        <p><strong>Technique:</strong> A compressed, violent, and powerful sequence of Legs-Back-Arms. The recovery is quick to get to the next stroke, but the drive is still initiated by a massive push from the legs.</p>
                        <p><strong>Monitor Focus:</strong> Pace/500m. Aim for the lowest split you can hold. SPM will be high (32-40+).</p>
                        <div>
                            <strong>How to Improve:</strong>
                            <ul className="list-disc list-inside pl-4 mt-1">
                                <li><strong>100m Sprints:</strong> 8-10 rounds of 100m all-out, with 45-60s rest.</li>
                                <li><strong>30s Max Calorie Rows:</strong> A classic test of power endurance. Rest 90s, repeat 5 times.</li>
                            </ul>
                        </div>
                    </div>
                     <div>
                        <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">Sustainable Pace (500m - 2000m)</h5>
                        <p><strong>Technique:</strong> This is where the 1:2 Drive-to-Recovery ratio is king. Focus on a powerful 1-second drive, and a patient 2-second recovery (Arms → Hips → Knees). Breathe out on the drive, in on the recovery.</p>
                        <p><strong>Monitor Focus:</strong> Pace/500m. Pick your goal pace and do not deviate by more than 1-2 seconds. SPM should be steady at 26-30.</p>
                        <div>
                            <strong>How to Improve:</strong>
                            <ul className="list-disc list-inside pl-4 mt-1">
                                <li><strong>500m Repeats:</strong> 6-8 sets of 500m at your target 2k pace, with a 1:1 work-to-rest ratio.</li>
                                <li><strong>4x4 Minute Intervals:</strong> Row for 4 minutes at a hard, sustainable pace. Rest 2 minutes. Repeat 4 times.</li>
                            </ul>
                        </div>
                    </div>
                     <div>
                        <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">The Long Haul (2000m+)</h5>
                        <p><strong>Technique:</strong> Lengthen your stroke and relax. The drive is still powerful, but the recovery is even more patient. Focus on getting a full, deep breath on every recovery. Maintain good posture to avoid lower back fatigue.</p>
                        <p><strong>Monitor Focus:</strong> Pace/500m and SPM. Settle into a lower SPM (22-26) and a conservative pace. Aim to "negative split" (make the second half faster than the first).</p>
                        <div>
                            <strong>How to Improve:</strong>
                            <ul className="list-disc list-inside pl-4 mt-1">
                                <li><strong>5k/10k Rows:</strong> The best way to build an aerobic base on the rower. Pick a pace you know you can hold and stick to it.</li>
                                <li><strong>30-minute Rows:</strong> Row for 30 minutes, varying the SPM every 5 minutes (e.g., 22-24-26-24-22-26) while trying to keep your pace consistent.</li>
                            </ul>
                        </div>
                    </div>
                </SubSection>
                <SubSection title="4. Common Faults & Fixes">
                    <p><strong>Fault: Shooting the slide.</strong><br/><em>Fix:</em> Your legs extend but your shoulders don't move. Push with the legs first, keeping your back angle consistent, *then* swing your torso open. The handle should pass your knees before your knees start to rise on the recovery.</p>
                    <p><strong>Fault: Opening the back too early.</strong><br/><em>Fix:</em> This is a sequence error. The power is LEGS, then BACK, then ARMS. Think of it as a deadlift into a row. Don't blend them.</p>
                    <p><strong>Fault: Rushing the recovery.</strong><br/><em>Fix:</em> Be patient. The recovery should be twice as long as the drive. This is your time to breathe and prepare for the next powerful stroke.</p>
                </SubSection>
            </Section>
            
            <Section
                title={sectionTitles[2]}
                isOpen={!!openSections[sectionTitles[2]]}
                onToggle={() => toggleSection(sectionTitles[2])}
            >
                <SubSection title="1. Machine Setup is Crucial">
                    <p><strong>Damper Setting:</strong> Similar to the rower, the damper controls the feel, not just the resistance. A setting of 5-7 is a great starting point for most workouts. Lower settings require a faster turnover, while higher settings require more power per stroke.</p>
                </SubSection>
                <SubSection title="2. Understanding the Monitor">
                     <p><strong>Pace /500m:</strong> Just like the rower, this is the best metric for consistent pacing in intervals and longer workouts.</p>
                     <p><strong>SPM (Strokes Per Minute):</strong> Cadence on the skierg is naturally higher than the rower. Pacing is often done by feel, linked to a target pace.</p>
                     <p><strong>Watts/Calories:</strong> Excellent for sprints and comparing output across different workouts.</p>
                </SubSection>
                 <SubSection title="3. Pacing Strategies & Drills">
                    <div>
                        <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">All-Out Sprint (up to 45 seconds)</h5>
                        <p><strong>Technique:</strong> Think of a violent, repetitive kettlebell swing. Aggressively hinge at the hips, using your bodyweight to drive the handles down. Keep arms straight for as long as possible, only breaking at the elbows to finish the pull past your hips.</p>
                        <p><strong>Monitor Focus:</strong> Pace/500m or Watts. The goal is maximum power output. SPM will be very high (45-55+).</p>
                        <div>
                            <strong>How to Improve:</strong>
                            <ul className="list-disc list-inside pl-4 mt-1">
                                <li><strong>10-Calorie Sprints:</strong> Perform 10-15 rounds of 10-cal sprints, resting until you feel ready to go again (about 60-90s).</li>
                                <li><strong>Max Watts in 5 Pulls:</strong> From a dead stop, see what your max wattage is in just 5 powerful strokes.</li>
                            </ul>
                        </div>
                    </div>
                     <div>
                        <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">Sustainable Pace (2-10 Minutes)</h5>
                        <p><strong>Technique:</strong> Find a powerful rhythm. Focus on a full reach at the top to engage your lats, followed by a strong crunch and hip hinge. The recovery should be controlled, not rushed.</p>
                        <p><strong>Monitor Focus:</strong> Pace/500m. Lock into a split that feels challenging but repeatable. SPM will likely be in the 40-48 range.</p>
                        <div>
                            <strong>How to Improve:</strong>
                            <ul className="list-disc list-inside pl-4 mt-1">
                                <li><strong>30/30 Intervals:</strong> 10-15 rounds of 30s hard effort, 30s easy recovery pull.</li>
                                <li><strong>2-Minute Intervals:</strong> 5 rounds of 2 minutes at your target pace, with 90 seconds rest.</li>
                            </ul>
                        </div>
                    </div>
                     <div>
                        <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">The Long Haul (10+ Minutes)</h5>
                        <p><strong>Technique:</strong> Less aggressive hip hinge and more focus on a smooth, continuous motion. Maintain a strong, flat back to protect your spine. Use the recovery to get a full breath.</p>
                        <p><strong>Monitor Focus:</strong> Pace/500m and SPM. Lower your SPM to 35-42 to conserve energy. Pick a conservative pace you can hold and aim to negative split.</p>
                        <div>
                            <strong>How to Improve:</strong>
                            <ul className="list-disc list-inside pl-4 mt-1">
                                <li><strong>2000m Repeats:</strong> Perform 3-4 sets of 2000m at a steady pace, resting 3-4 minutes between.</li>
                                <li><strong>20 Mins for Meters:</strong> See how many meters you can accumulate in 20 minutes at a low, consistent stroke rate.</li>
                            </ul>
                        </div>
                    </div>
                </SubSection>
                <SubSection title="4. Common Faults & Fixes">
                    <p><strong>Fault: Pulling only with the arms.</strong><br/><em>Fix:</em> This is a full-body movement. The power comes from your hips and core crunching down. Your arms are just connecting your bodyweight to the handles.</p>
                    <p><strong>Fault: Bending arms too early.</strong><br/><em>Fix:</em> Keep your arms relatively straight at the top of the pull. The power is in the hinge, not an arm pull-down. Let your bodyweight do the work.</p>
                    <p><strong>Fault: Hunching over at the bottom.</strong><br/><em>Fix:</em> Maintain a strong, flat back throughout the stroke. Hinge at your hips; don't round your spine. This is safer and more powerful.</p>
                </SubSection>
            </Section>
        </div>
    );
}