import type { RecoveryPlan, TrainingFrequency, RecoveryContext } from '../types';

const POST_WORKOUT_PROTOCOL: RecoveryPlan = {
    title: 'Post-Workout Protocol (The 4 R\'s)',
    summary: 'This protocol should be initiated as soon as possible after every training session to kickstart the recovery process.',
    steps: [
        {
            title: 'Refuel',
            icon: 'UtensilsIcon',
            description: 'Replenish energy stores and provide protein to repair muscle.',
            details: [
                'Consume 20-40g of high-quality protein (e.g., whey shake, Greek yogurt) within 60 minutes.',
                'Combine with 40-80g of fast-digesting carbohydrates (e.g., banana, rice cakes, dextrose) to restore muscle glycogen.',
                'Have a full, balanced meal within 2-3 hours of your workout.'
            ]
        },
        {
            title: 'Rehydrate',
            icon: 'DropletIcon',
            description: 'Restore fluid balance lost through sweat.',
            details: [
                'Aim to drink 1.5 liters of fluid for every 1 kg of bodyweight lost during training.',
                'If you\'re a heavy sweater or training in the heat, add electrolytes to your water.',
                'Monitor your urine color; it should be a pale yellow.'
            ]
        },
        {
            title: 'Repair',
            icon: 'BodyStretchIcon',
            description: 'Address muscle tightness and improve range of motion.',
            details: [
                'Perform 5-10 minutes of gentle static stretching, focusing on the muscles used in the workout. Hold each stretch for 30-60 seconds.',
                'Use a foam roller or lacrosse ball to address any specific areas of tightness (myofascial release).',
                'Consider a contrast shower (hot/cold) to help reduce muscle soreness.'
            ]
        },
        {
            title: 'Rest',
            icon: 'BedIcon',
            description: 'Allow your body and nervous system to begin calming down.',
            details: [
                'Take 5-10 minutes for diaphragmatic breathing (deep belly breaths) to switch from a "fight or flight" to a "rest and digest" state.',
                'Avoid jumping immediately into stressful tasks post-workout.',
                'Prioritize quality sleep, as this is when the majority of muscle repair and hormone regulation occurs.'
            ]
        },
    ]
};

export const DAILY_RECOVERY_PLANS: Record<TrainingFrequency, RecoveryPlan[]> = {
  '1x': [
    {
      title: 'Daily Plan: Training Once per Day',
      summary: 'With one session, your focus is on maximizing the recovery window before the next day. Quality over quantity.',
      steps: [
        {
          title: 'Morning',
          icon: 'ClockIcon',
          description: 'Start the day hydrated and mobile.',
          details: ['Drink 500ml of water upon waking.', 'Perform a 5-10 minute mobility routine focusing on hips and shoulders.']
        },
        ...POST_WORKOUT_PROTOCOL.steps,
        {
          title: 'Evening',
          icon: 'BedIcon',
          description: 'Optimize for a deep, restorative sleep.',
          details: ['Avoid screens (blue light) for at least 60 minutes before bed.', 'Ensure your room is cool, dark, and quiet.', 'Consider a magnesium supplement to aid muscle relaxation and sleep quality.']
        }
      ]
    }
  ],
  '2x': [
     {
      title: 'Daily Plan: Training Twice per Day',
      summary: 'Recovery between sessions is the key to performance in your second workout. Fueling and rest are critical.',
      steps: [
        {
          title: 'Post-Session 1',
          icon: 'UtensilsIcon',
          description: 'Quickly initiate recovery to prepare for the next session.',
          details: ['Consume a protein/carb shake immediately.', 'Have a full, balanced meal 60-90 minutes later.', 'Perform a brief 5-minute targeted stretching routine.']
        },
        {
          title: 'Between Sessions',
          icon: 'BedIcon',
          description: 'Maximize the recovery window.',
          details: ['If possible, take a 20-30 minute "power nap".', 'Stay hydrated throughout the day.', 'Avoid stressful activities. Focus on rest.']
        },
        {
          title: 'Post-Session 2 & Evening',
          icon: 'BodyStretchIcon',
          description: 'Focus on a deep recovery overnight.',
          details: ['Follow the full 4 R\'s Post-Workout Protocol.', 'Eat a larger, nutrient-dense dinner.', 'Spend 10-15 minutes on foam rolling or mobility work before bed.', 'Prioritize getting 8+ hours of sleep.']
        }
      ]
    }
  ],
  '3x': [
     {
      title: 'Daily Plan: Training Three Times per Day (Elite)',
      summary: 'This is a professional-level schedule. Recovery is not an afterthought; it is a planned part of your day.',
      steps: [
        {
          title: 'Post-Session 1 & 2',
          icon: 'UtensilsIcon',
          description: 'Rapid, efficient refueling is the priority.',
          details: ['Consume a liquid nutrition shake (protein/carbs) immediately as you leave the gym.', 'Have pre-cooked meals ready to eat. There is no time to cook.', 'Perform essential, targeted mobility only. 5 minutes max.']
        },
        {
          title: 'Between Sessions',
          icon: 'BedIcon',
          description: 'Naps and active recovery are non-negotiable.',
          details: ['A 60-90 minute nap between sessions is ideal for hormone release.', 'A very light 10-15 minute walk or bike ride can help flush out waste products.', 'Stay on top of hydration and electrolytes constantly.']
        },
        {
          title: 'Post-Session 3 & Evening',
          icon: 'BrainCircuitIcon',
          description: 'System-wide recovery is the goal.',
          details: ['Follow the full 4 R\'s Post-Workout Protocol.', 'Consider an ice bath or contrast shower to significantly reduce inflammation.', 'Eat a very large, calorie-dense final meal.', 'Have a strict bedtime and sleep routine. Every minute of sleep counts.']
        }
      ]
    }
  ],
};

export const COMPETITION_RECOVERY_PLAN: RecoveryPlan[] = [
    {
        title: 'Between-Event Protocol',
        summary: 'During a competition, the goal is to recover just enough to perform optimally in the next event without creating more fatigue.',
        steps: [
            {
                title: 'Fuel & Hydrate',
                icon: 'UtensilsIcon',
                description: 'Small, frequent, and easily digestible.',
                details: [
                    'Sip on water with electrolytes and simple carbs (e.g., sports drink) continuously.',
                    'Immediately after an event, consume a small snack like a banana, rice cake, or a handful of gummies.',
                    'Avoid heavy, fatty, or high-fiber foods that are slow to digest.'
                ]
            },
            {
                title: 'Manage the Body',
                icon: 'BodyStretchIcon',
                description: 'Stay warm and loose without getting tired.',
                details: [
                    'Keep moving. A slow walk is better than sitting down immediately.',
                    'Find a space to do some light, dynamic stretching.',
                    'Use a massage gun on a low setting or a foam roller very gently to keep muscles from tightening up.'
                ]
            },
            {
                title: 'Reset the Mind',
                icon: 'BrainCircuitIcon',
                description: 'Control your adrenaline and focus on the next task.',
                details: [
                    'Find a quiet spot. Put on headphones with calming music.',
                    'Spend 5 minutes visualizing your strategy for the NEXT event.',
                    'Debrief the last event for 2 minutes, then let it go completely, good or bad.'
                ]
            }
        ]
    },
    {
        title: 'End-of-Day Protocol',
        summary: 'Your goal is to give your body everything it needs to repair overnight for Day 2.',
        steps: [
             {
                title: 'Systemic Recovery',
                icon: 'BedIcon',
                description: 'Reduce inflammation and prepare for sleep.',
                details: [
                    'Take a 10-15 minute ice bath or a contrast shower (1 min cold, 2 min hot).',
                    'Eat a large meal rich in protein, carbs, and anti-inflammatory fats (like avocado or olive oil).',
                    'Rehydrate completely. Drink water until your urine is clear.'
                ]
            },
            {
                title: 'Prepare for Tomorrow',
                icon: 'TrophyIcon',
                description: 'Set yourself up for success.',
                details: [
                    'Lay out all your gear, clothes, and food for the next day. Reduce morning stress.',
                    'Review the next day\'s events and your strategy for 5-10 minutes.',
                    'Get to bed as early as possible. Sleep is your most powerful recovery tool.'
                ]
            }
        ]
    }
];

export const RECOVERY_FOOD_GUIDE: RecoveryPlan[] = [
    {
        title: 'Athlete\'s Fueling Guide',
        summary: 'Nutrition is the cornerstone of recovery. What you eat, and when, dictates how quickly you repair muscle, replenish energy, and adapt to training.',
        steps: [
            {
                title: 'The Foundation: Macronutrients for Repair',
                icon: 'UtensilsIcon',
                description: 'Your daily diet should be built on these pillars to support high performance and recovery.',
                details: [
                    '**Protein:** The building blocks for muscle repair. Aim for 1.6-2.2g per kg of bodyweight. Sources: Lean meats, fish, eggs, whey protein, Greek yogurt.',
                    '**Carbohydrates:** Your primary energy source. They refill muscle glycogen depleted during workouts. Sources: Oats, sweet potatoes, rice, quinoa, fruits.',
                    '**Fats:** Crucial for hormone function and reducing inflammation. Sources: Avocado, nuts, seeds, olive oil, fatty fish (salmon).'
                ]
            },
            {
                title: 'Fast Fuel: Between Events & Workouts',
                icon: 'ClockIcon',
                description: 'When time is short, you need energy that is easy to digest and works quickly.',
                details: [
                    '**Simple Carbohydrates:** Quickly absorbed for immediate energy. Aim for 25-50g. Examples: Bananas, a handful of gummies, rice cakes with honey, sports drinks.',
                    '**Easily Digestible Protein:** A small amount to stop muscle breakdown without slowing digestion. Examples: A scoop of whey isolate in water, EAA/BCAA supplement.',
                    '**What to Avoid:** High-fiber, high-fat, and heavy foods. These slow digestion and can cause gastrointestinal discomfort during your next workout.'
                ]
            },
            {
                title: 'Endurance Fuel: For the Long Haul',
                icon: 'TrophyIcon',
                description: 'For long training days, multi-event competitions, or endurance-focused WODs, you need sustained energy.',
                details: [
                    '**Complex Carbohydrates:** These digest slowly, providing a steady release of energy. Consume 1-2 hours before the event. Examples: Oatmeal with berries, sweet potato, whole wheat toast with banana.',
                    '**Moderate Protein & Fat:** A small amount of protein and healthy fat helps with satiety and provides a secondary, slower-burning fuel source. Example: Chicken breast with quinoa and avocado.',
                    '**Intra-Workout Fueling:** For events lasting over 90 minutes, sip on a carbohydrate drink to maintain energy levels and prevent crashing.'
                ]
            }
        ]
    }
];