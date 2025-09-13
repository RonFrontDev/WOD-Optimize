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
                aria-controls={`grip-section-${sectionId}`}
            >
                <h4 className="text-xl font-bold text-brand-secondary">{title}</h4>
                <ChevronDownIcon className={`w-6 h-6 text-text-muted dark:text-dark-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                id={`grip-section-${sectionId}`}
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


export default function HomePageGripGuide() {
    const sectionTitles = [
        "Types of Grip Materials",
        "Grip Styles: Finding Your Fit",
        "Which Grip for Which Bar?",
        "Pro-Tip: Chalk Usage & Hand Care"
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
                Hand grips are essential for protecting your hands, improving endurance on the rig, and helping you get those extra reps. Here's what you need to know to choose the right pair for you.
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
                <p><strong>Leather:</strong> The classic choice. Durable and provides excellent protection. Requires a break-in period and works best with chalk. Great for athletes who prefer a more traditional feel.</p>
                <p><strong>Carbon Fiber:</strong> The versatile workhorse. These grips are famous for sticking to any bar, with or without chalk. They are thin, require little to no break-in, and are a favorite for competitors.</p>
                <p><strong>Synthetic Fabrics (Microfiber, Vegan "Leather"):</strong> Often softer and more comfortable from day one than traditional leather. Performance varies by brand, but many offer a great balance of comfort and grip.</p>
                <p><strong>Rubber / "Sticky" Grips:</strong> These offer maximum grip, almost "gluing" you to the bar. They are fantastic for slick or powder-coated bars but are often not allowed in major competitions. They should not be used with chalk.</p>
            </Section>

            <Section
                title={sectionTitles[1]}
                isOpen={!!openSections[sectionTitles[1]]}
                onToggle={() => toggleSection(sectionTitles[1])}
            >
                 <p><strong>Finger Holes (2-Hole vs. 3-Hole):</strong></p>
                 <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>2-Hole:</strong> Covers the areas most likely to tear (base of middle and ring fingers). Offers more of a "barehand" connection to the bar.</li>
                    <li><strong>3-Hole:</strong> Provides more coverage across the palm for maximum protection. The standard for most athletes.</li>
                 </ul>
                 <p className="pt-2"><strong>Fingerless (No Holes):</strong></p>
                 <p>These grips are designed for the fastest transitions. You can simply flip them back and forth without having to pull your fingers out. Great for workouts that mix barbell work and gymnastics.</p>
                 <p className="pt-2"><strong>Dowel Effect:</strong></p>
                 <p>Many modern grips create a "dowel effect" by folding over the bar. This creates a small ridge that can significantly reduce grip fatigue, allowing you to hang on longer. This technique works best with fingerless grips or by not using the finger holes on holed grips.</p>
            </Section>

            <Section
                title={sectionTitles[2]}
                isOpen={!!openSections[sectionTitles[2]]}
                onToggle={() => toggleSection(sectionTitles[2])}
            >
                 <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>Slick / Powder-Coated Bars:</strong> Carbon Fiber or Rubber/Sticky grips are your best bet here. Leather can be too slick on these surfaces.</li>
                    <li><strong>Standard Knurled / Competition Bars:</strong> All grip types work well. It comes down to personal preference. Carbon and leather are the most common choices.</li>
                    <li><strong>Wooden Rings:</strong> Most athletes prefer to use no grips or just chalk on wooden rings, as the surface already provides excellent grip. If you do use grips, a thin leather or synthetic pair is best.</li>
                 </ul>
            </Section>

            <Section
                title={sectionTitles[3]}
                isOpen={!!openSections[sectionTitles[3]]}
                onToggle={() => toggleSection(sectionTitles[3])}
            >
                <p><strong>Chalk is for DRYING, not for GRIPPING.</strong> A light dusting is all you need to absorb sweat. Too much chalk can become cakey and actually make the surface more slippery.</p>
                <p><strong>Manage Your Calluses!</strong> The biggest cause of hand rips is thick, unmanaged calluses getting caught on the bar. Use a pumice stone or callus shaver after a shower (when skin is soft) to keep them smooth and level with the rest of your palm.</p>
            </Section>
        </div>
    );
}