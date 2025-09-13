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
                aria-controls={`shoe-section-${sectionId}`}
            >
                <h4 className="text-xl font-bold text-brand-secondary">{title}</h4>
                <ChevronDownIcon className={`w-6 h-6 text-text-muted dark:text-dark-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                id={`shoe-section-${sectionId}`}
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

export default function ShoeGuide() {
    const sectionTitles = [
        "The All-Rounder: CrossFit Trainers",
        "The Specialist: Weightlifting Shoes ('Lifters')",
        "The Engine: Running Shoes",
        "Building Your Shoe 'Quiver'"
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
                Your shoes are the only piece of equipment you wear for every single workout. They are your connection to the ground, and having the right pair can dramatically improve performance, safety, and comfort.
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
                <p>This is your "do-it-all" shoe and the one you'll wear for 80% of your workouts. It's designed to be a hybrid, balancing features for lifting, gymnastics, and cardio.</p>
                <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">Key Features:</h5>
                <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>Stable Heel:</strong> A firm, relatively flat heel provides a solid base for squats, deadlifts, and overhead lifts.</li>
                    <li><strong>Flexible Forefoot:</strong> Allows your foot to bend naturally during box jumps, burpees, and short runs.</li>
                    <li><strong>Durable Outsole:</strong> Often features a tough rubber compound that wraps up the sides (a "rope guard") to protect against abrasion during rope climbs.</li>
                    <li><strong>Low Heel-to-Toe Drop:</strong> Usually 4-7mm, which keeps you closer to the ground for better stability compared to running shoes.</li>
                </ul>
                <p className="pt-2"><strong>When to Wear:</strong> Nearly every classic CrossFit WOD (e.g., Fran, Cindy, Murph).</p>
                <h5 className="font-semibold text-text-primary dark:text-dark-text-primary mt-4">Popular Models:</h5>
                <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>Reebok Nano Series:</strong> The original CrossFit shoe. Known for its wide toe box and all-around comfort and performance.</li>
                    <li><strong>Nike Metcon Series:</strong> Famous for its stability, featuring a wide heel and a removable "Hyperlift" insert to increase the heel drop for heavy lifts.</li>
                    <li><strong>NOBULL Trainer:</strong> Valued for its durability, minimalist aesthetic, and stable platform.</li>
                    <li><strong>R.A.D One:</strong> A newer favorite, praised for its comfort and versatility, especially in workouts with more running.</li>
                </ul>
            </Section>

            <Section
                title={sectionTitles[1]}
                isOpen={!!openSections[sectionTitles[1]]}
                onToggle={() => toggleSection(sectionTitles[1])}
            >
                 <p>When the workout is all about heavy lifting, lifters are the right tool for the job. They are designed for one purpose: to help you lift as much weight as possible, as safely as possible.</p>
                 <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">Key Features:</h5>
                 <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>Elevated, Solid Heel:</strong> This is the most important feature. The raised heel (usually around 1.9 cm / 19mm) allows for a deeper, more upright squat by increasing ankle range of motion. The heel is made of wood or hard TPU plastic and does not compress under load.</li>
                    <li><strong>Midfoot Strap(s):</strong> One or two straps lock your foot onto the platform, preventing any movement within the shoe.</li>
                    <li><strong>Stiff, Rigid Sole:</strong> Provides maximum power transfer from your body into the ground.</li>
                 </ul>
                 <p className="pt-2"><strong>When to Wear:</strong> Max-effort squats, snatches, clean and jerks. Workouts like "Grace" or "Isabel".</p>
                 <p className="pt-2 font-bold"><strong>When NOT to Wear:</strong> Any workout with running, box jumps, or burpees. They are heavy, inflexible, and unsafe for these movements.</p>
                 <h5 className="font-semibold text-text-primary dark:text-dark-text-primary mt-4">Popular Models:</h5>
                <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>Nike Romaleos:</strong> Considered a gold standard for their incredibly stable base and dual midfoot straps for a locked-down feel.</li>
                    <li><strong>Adidas Adipower:</strong> Known for being slightly more flexible and lighter than other lifters, making them a bit more versatile.</li>
                    <li><strong>Reebok Legacy Lifter:</strong> A heavy-duty, ultra-stable shoe with a high heel, favored by many powerlifters and strongmen.</li>
                </ul>
            </Section>

            <Section
                title={sectionTitles[2]}
                isOpen={!!openSections[sectionTitles[2]]}
                onToggle={() => toggleSection(sectionTitles[2])}
            >
                 <p>For workouts that are purely running or have a very heavy running component, a dedicated running shoe will save your joints and improve your time.</p>
                 <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">Key Features:</h5>
                 <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>Significant Cushioning:</strong> Designed to absorb impact over many miles.</li>
                    <li><strong>Higher Heel-to-Toe Drop:</strong> Typically 8-12mm, which can help promote a healthier running gait for some athletes.</li>
                    <li><strong>Lightweight & Flexible:</strong> Built for forward propulsion, not lateral stability.</li>
                 </ul>
                 <p className="pt-2"><strong>When to Wear:</strong> 5k runs, workouts with over 800m of running per round.</p>
                 <p className="pt-2 font-bold"><strong>When NOT to Wear:</strong> Any workout with moderate to heavy barbell work. The soft, compressible sole is unstable and unsafe for lifting.</p>
                 <h5 className="font-semibold text-text-primary dark:text-dark-text-primary mt-4">Popular Brands in CrossFit:</h5>
                <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>Hoka:</strong> Known for maximum cushioning, which is excellent for saving your joints during high-volume running WODs.</li>
                    <li><strong>Brooks:</strong> A running-purist brand that offers a wide variety of shoes for different foot types and gaits. The "Ghost" is a popular neutral choice.</li>
                    <li><strong>On Running:</strong> Gaining popularity for their unique "CloudTec" cushioning, offering a firm yet cushioned ride that feels responsive.</li>
                </ul>
            </Section>
            
            <Section
                title={sectionTitles[3]}
                isOpen={!!openSections[sectionTitles[3]]}
                onToggle={() => toggleSection(sectionTitles[3])}
            >
                 <p>Just as a golfer has different clubs, a serious CrossFitter will eventually build a "quiver" of shoes:</p>
                 <ul className="list-disc list-inside pl-4 space-y-2">
                    <li><strong>Start Here:</strong> A good pair of all-around CrossFit trainers. This is your first and most important purchase.</li>
                    <li><strong>Next Step:</strong> If you are serious about your strength numbers, a pair of weightlifting shoes is the next logical addition.</li>
                    <li><strong>The Final Piece:</strong> If you find yourself running a lot or have sensitive joints, a dedicated pair of running shoes for those long-chipper WODs is a great investment.</li>
                 </ul>
                 <p className="pt-2">Having the right shoe for the workout not only boosts performance but is a key part of long-term injury prevention.</p>
            </Section>
        </div>
    );
}