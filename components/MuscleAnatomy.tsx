import React from 'react';

interface MuscleAnatomyProps {
  primaryMuscles: string[];
  secondaryMuscles: string[];
  className?: string;
}

const MUSCLE_MAP: Record<string, string> = {
  deltoids: 'Deltoids',
  chest: 'Chest',
  biceps: 'Biceps',
  abdominals: 'Abdominals',
  obliques: 'Obliques',
  quadriceps: 'Quadriceps',
  traps: 'Trapezius',
  triceps: 'Triceps',
  lats: 'Lats',
  lower_back: 'Lower Back',
  glutes: 'Glutes',
  hamstrings: 'Hamstrings',
  calves: 'Calves',
  forearms: 'Forearms',
};

export default function MuscleAnatomy({ primaryMuscles, secondaryMuscles, className = '' }: MuscleAnatomyProps) {
  const getMuscleClass = (muscleId: string) => {
    if (primaryMuscles.includes(muscleId)) return 'fill-brand-secondary/80 transition-all duration-300';
    if (secondaryMuscles.includes(muscleId)) return 'fill-brand-primary/80 transition-all duration-300';
    return 'fill-slate-300 dark:fill-slate-600 transition-all duration-300';
  };
  
  const activatedMuscles = [...new Set([...primaryMuscles, ...secondaryMuscles])];

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4 text-center">Muscle Activation</h3>
      <div className="grid grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 330 500" xmlns="http://www.w3.org/2000/svg" aria-labelledby="muscle-chart-title">
          <title id="muscle-chart-title">Anatomy chart showing activated muscles</title>
          {/* ANTERIOR */}
          <g id="figure-anterior" transform="translate(15, 0)">
            <path id="chest" className={getMuscleClass('chest')} d="M82 135c-4 1-13 14-13 22s2 24 10 27l25-10v-30l-22-9z M148 135c4 1 13 14 13 22s-2 24-10 27l-25-10v-30l22-9z" />
            <path id="deltoids" className={getMuscleClass('deltoids')} d="M68 120c-15 5-20 20-18 30s15 15 25 10l12-30-19-10z M162 120c15 5 20 20 18 30s-15 15-25 10l-12-30 19-10z" />
            <path id="biceps" className={getMuscleClass('biceps')} d="M60 160c-5 10-5 25 0 35s15 15 20 5l5-30-25-10z M170 160c5 10 5 25 0 35s-15 15-20 5l-5-30 25-10z" />
            <path id="forearms" className={getMuscleClass('forearms')} d="M55 200c-3 15 0 30 5 40s15 10 20 0l5-40-30-0z M175 200c3 15 0 30-5 40s-15 10-20 0l-5-40 30-0z" />
            <path id="obliques" className={getMuscleClass('obliques')} d="M90 190h-5l-5 50h15l-5-50z M145 190h5l5 50h-15l5-50z" />
            <path id="abdominals" className={getMuscleClass('abdominals')} d="M100 190h30v50h-30z" />
            <path id="quadriceps" className={getMuscleClass('quadriceps')} d="M85 260h-5l5 100h20l-5-100z M145 260h5l-5 100h-20l5-100z" />
            <path id="calves" className={getMuscleClass('calves')} d="M85 390h25l-5 70h-15z M120 390h25l-5 70h-15z" />
          </g>
          {/* POSTERIOR */}
          <g id="figure-posterior" transform="translate(165, 0)">
            <path id="traps" className={getMuscleClass('traps')} d="M60 100c15-10 45-10 60 0l-10 30h-40z" />
            <path id="deltoids_p" className={getMuscleClass('deltoids')} d="M48 120c-15 5-20 20-18 30s15 15 25 10l12-30-19-10z M142 120c15 5 20 20 18 30s-15 15-25 10l-12-30 19-10z" />
            <path id="triceps" className={getMuscleClass('triceps')} d="M40 160c-5 10-5 25 0 35s15 15 20 5l5-30-25-10z M150 160c5 10 5 25 0 35s-15 15-20 5l-5-30 25-10z" />
            <path id="forearms_p" className={getMuscleClass('forearms')} d="M35 200c-3 15 0 30 5 40s15 10 20 0l5-40-30-0z M155 200c3 15 0 30-5 40s-15 10-20 0l-5-40 30-0z" />
            <path id="lats" className={getMuscleClass('lats')} d="M65 150c-10 5-15 20-10 40s20 30 35 30h20c15 0 30-10 35-30s5-35-10-40l-35 10z" />
            <path id="lower_back" className={getMuscleClass('lower_back')} d="M80 220h40v30h-40z" />
            <path id="glutes" className={getMuscleClass('glutes')} d="M55 260 c0,0 20,-10 45,0 v30 c-25,10 -45,10 -45,0z M100 260 c0,0 20,-10 45,0 v30 c-25,10 -45,10 -45,0z" />
            <path id="hamstrings" className={getMuscleClass('hamstrings')} d="M65 300h20v80h-20z M115 300h20v80h-20z" />
            <path id="calves_p" className={getMuscleClass('calves')} d="M65 390h25l-5 70h-15z M100 390h25l-5 70h-15z" />
          </g>
        </svg>

        <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-brand-secondary"></div>
                <span className="font-semibold text-text-primary dark:text-dark-text-primary">Primary</span>
            </div>
             <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-brand-primary"></div>
                <span className="font-semibold text-text-primary dark:text-dark-text-primary">Secondary</span>
            </div>
            <ul className="space-y-1 text-sm text-text-muted dark:text-dark-text-muted">
              {activatedMuscles.length > 0 ? (
                Object.keys(MUSCLE_MAP)
                  .filter(key => activatedMuscles.includes(key))
                  .sort((a,b) => (primaryMuscles.includes(b) ? 1 : -1)) // Show primary muscles first
                  .map(key => (
                    <li key={key} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${primaryMuscles.includes(key) ? 'bg-brand-secondary' : 'bg-brand-primary'}`}></div>
                        {MUSCLE_MAP[key]}
                    </li>
                  ))
              ) : (
                <li>No specific muscles identified.</li>
              )}
            </ul>
        </div>
      </div>
    </div>
  );
}