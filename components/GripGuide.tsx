import React from 'react';
import type { Movement } from '../types';

interface GripGuideProps {
  category: Movement['category'];
}

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8 animate-fade-in">
        <h4 className="text-xl font-bold text-brand-secondary mb-3 pb-2 border-b-2 border-border-color dark:border-dark-border-color">{title}</h4>
        <div className="space-y-4 text-text-muted dark:text-dark-text-muted leading-relaxed">
            {children}
        </div>
    </div>
);

const WeightliftingGuide: React.FC = () => (
    <>
        <Section title="The Hook Grip: Your Best Friend">
            <p>For any lift involving a barbell (snatch, clean, deadlift), the hook grip is non-negotiable for maximizing strength and security. It prevents the bar from rolling and saves your grip strength.</p>
            <h5 className="font-semibold text-text-primary dark:text-dark-text-primary">How to Hook Grip:</h5>
            <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>Wrap your thumb around the bar first.</li>
                <li>Wrap your index and middle fingers (as many as can fit) on top of your thumb, pressing it into the bar.</li>
                <li>It will be uncomfortable at first. Stick with it! Your thumb will adapt over a few weeks.</li>
                <li>Use tape around your thumb (not the joint) to reduce friction and improve comfort.</li>
            </ol>
        </Section>
        <Section title="Using Lifting Straps">
            <p>Straps are a tool to use when your grip is the single limiting factor on a lift, allowing you to train the target muscles beyond your grip endurance (e.g., heavy deadlifts, RDLs, or high-rep barbell cycling).</p>
            <p className="font-bold text-text-primary dark:text-dark-text-primary">When NOT to use them:</p>
            <p>Avoid using straps on Olympic lifts like the snatch and clean and jerk in regular training, as they can interfere with the proper turnover and release of the bar.</p>
        </Section>
    </>
);

const GymnasticsGuide: React.FC = () => (
    <>
        <Section title="Choosing Your Gymnastic Grips">
            <p>Grips protect your hands from rips and improve your endurance on the pull-up bar or rings.</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong className="text-text-primary dark:text-dark-text-primary">Leather Grips:</strong> A classic choice. Durable and require a break-in period. They work best with a good amount of chalk.</li>
                <li><strong className="text-text-primary dark:text-dark-text-primary">Carbon Fiber/Synthetic Grips:</strong> Very popular as they work well on almost any surface, with or without chalk. Little to no break-in time.</li>
                <li><strong className="text-text-primary dark:text-dark-text-primary">Dowel vs. No Dowel:</strong> Grips with a dowel create a small pocket of space between your hand and the bar, making it easier to re-grip during cyclic movements like kipping pull-ups or muscle-ups.</li>
            </ul>
        </Section>
        <Section title="The Art of Chalk">
             <p>Chalk is meant to absorb sweat and improve friction, not to be caked on like frosting.</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Apply a thin, even layer to your palms and fingers.</li>
                <li>Clapping your hands into the chalk bucket creates a cloud of wasted chalk and does little for your grip.</li>
                <li>Too much chalk can actually become slippery and lead to rips. If you see thick white buildup, you've used too much.</li>
            </ul>
        </Section>
         <Section title="Hand Care is Health Care">
            <p>The best way to prevent rips is to manage your calluses.</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
                <li>After a shower when your skin is soft, gently file or shave down the thick calluses on your hands using a pumice stone or callus shaver.</li>
                <li>The goal is to have smooth, even skin, not thick ridges that can get caught and tear.</li>
                <li>Moisturize your hands regularly to keep the skin pliable and healthy.</li>
            </ul>
        </Section>
    </>
);

const KettlebellGuide: React.FC = () => (
    <>
        <Section title="Hinge vs. Crush Grip">
            <p>The correct grip for kettlebell movements depends on the exercise.</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong className="text-text-primary dark:text-dark-text-primary">Swings & Snatches (Ballistic):</strong> Use a relaxed "hook" grip with your fingers, not a full death grip. The handle should rest in your finger hooks, allowing the bell to move freely. This saves your grip and forearms.</li>
                <li><strong className="text-text-primary dark:text-dark-text-primary">Presses & Get-ups (Grinds):</strong> Use a "crush" grip. Squeeze the handle hard to create tension throughout your entire arm, shoulder, and core. This promotes stability.</li>
            </ul>
        </Section>
    </>
);

const StrongmanGuide: React.FC = () => (
    <>
        <Section title="Mastering the Mixed Grip & Hook Grip">
            <p>For maximal deadlifts, you have two primary options:</p>
             <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong className="text-text-primary dark:text-dark-text-primary">Mixed Grip:</strong> One palm forward, one palm back. This is very strong but creates a slight rotational force on the spine. It's important to switch your mixed grip regularly to avoid imbalances.</li>
                <li><strong className="text-text-primary dark:text-dark-text-primary">Hook Grip:</strong> As with weightlifting, this is the strongest and most balanced grip, but it is very demanding on the thumbs. It's the preferred grip for many elite strongmen.</li>
            </ul>
        </Section>
        <Section title="Grip for Carries & Holds">
            <p>For Farmer's Carries, Yoke walks (stabilizing), and other loaded carries, the goal is endurance. Squeeze the implement as hard as you can (crush grip) to create full-body tension and stability. Train your grip specifically with heavy holds and carries.</p>
        </Section>
    </>
);

const MonostructuralGuide: React.FC = () => (
    <>
        <Section title="Relaxation is Key">
            <p>On machines like the rower, ski erg, or bike, a "death grip" is your enemy. It creates unnecessary tension in your arms, shoulders, and neck, leading to rapid fatigue.</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
                 <li><strong className="text-text-primary dark:text-dark-text-primary">Rower/Ski Erg:</strong> Use a light "hook" grip with your fingers. Your hands are just there to connect you to the handle; the power comes from your legs and hips.</li>
                 <li><strong className="text-text-primary dark:text-dark-text-primary">Assault Bike:</strong> Keep a firm but not overly tight grip on the handles. Your arms should be active in pushing and pulling, but your hands and forearms can stay relatively relaxed.</li>
            </ul>
        </Section>
    </>
);


export default function GripGuide({ category }: GripGuideProps): React.JSX.Element {
    
    const renderGuide = () => {
        switch (category) {
            case 'Weightlifting':
                return <WeightliftingGuide />;
            case 'Gymnastics':
                return <GymnasticsGuide />;
            case 'Kettlebell':
                return <KettlebellGuide />;
            case 'Strongman':
                return <StrongmanGuide />;
            case 'Monostructural':
                return <MonostructuralGuide />;
            default:
                return <p>No specific grip information available for this category.</p>;
        }
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Grip Guide</h3>
            {renderGuide()}
        </div>
    );
}