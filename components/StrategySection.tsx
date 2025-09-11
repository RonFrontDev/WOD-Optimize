import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';

interface StrategySectionProps {
    title: React.ReactNode;
    content: React.ReactNode;
    defaultOpen?: boolean;
}

const StrategySection: React.FC<StrategySectionProps> = ({ title, content, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    if (!content) return null;

    const sectionId = typeof title === 'string' ? title.replace(/\s+/g, '-') : Math.random().toString(36).substring(2, 9);

    return (
        <div className="border-b border-border-color dark:border-dark-border-color last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                aria-expanded={isOpen}
                aria-controls={`strategy-section-${sectionId}`}
            >
                <h4 className="text-lg font-semibold">{title}</h4>
                <ChevronDownIcon className={`w-6 h-6 text-text-muted dark:text-dark-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <div
              id={`strategy-section-${sectionId}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="pt-2 pb-6">
                        <div className="whitespace-pre-wrap font-sans text-base leading-relaxed text-slate-900 dark:text-slate-100">{content}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrategySection;
