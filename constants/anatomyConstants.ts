export interface Muscle {
    id: string;
    name: string;
    function: string;
    commonExercises: string[];
    relatedMovements: string[]; // Corresponds to Movement['id']
    commonInjuries: string[];
}

export const ANATOMY_DATA: Muscle[] = [
    {
        id: 'deltoids',
        name: 'Deltoids (Shoulders)',
        function: 'Abducts, flexes, extends, and rotates the arm. Essential for all overhead movements and stability.',
        commonExercises: ['Push Press', 'Handstand Push-ups', 'Overhead Squat', 'Dumbbell Snatch'],
        relatedMovements: ['push-press', 'handstand-push-up', 'overhead-squat', 'dumbbell-snatch'],
        commonInjuries: ['Impingement Syndrome', 'Rotator Cuff Strain', 'Tendonitis']
    },
    {
        id: 'pectorals',
        name: 'Pectoralis Major (Chest)',
        function: 'Flexes, adducts, and internally rotates the humerus. The primary pushing muscle of the upper body.',
        commonExercises: ['Push-up', 'Bench Press', 'Ring Dip', 'Burpee'],
        relatedMovements: ['push-up', 'ring-dip', 'burpee'],
        commonInjuries: ['Pec Strain/Tear', 'Shoulder Instability']
    },
    {
        id: 'biceps',
        name: 'Biceps Brachii',
        function: 'Flexes the elbow and supinates the forearm. Key for all pulling movements.',
        commonExercises: ['Pull-up', 'Rope Climb', 'Bar Muscle-up', 'Cleans'],
        relatedMovements: ['pull-up', 'rope-climb', 'bar-muscle-up', 'clean-and-jerk'],
        commonInjuries: ['Bicep Tendonitis', 'Distal Bicep Tear (rare, but serious)']
    },
    {
        id: 'abdominals',
        name: 'Rectus Abdominis (Abs)',
        function: 'Flexes the lumbar spine and provides core stability. Crucial for transferring force from the lower to upper body.',
        commonExercises: ['Toes-to-Bar', 'GHD Sit-up', 'L-Sit', 'Plank'],
        relatedMovements: ['toes-to-bar', 'ghd-sit-up', 'l-sit'],
        commonInjuries: ['Hernia', 'Core Instability leading to back pain']
    },
    {
        id: 'obliques',
        name: 'Obliques',
        function: 'Rotates and side-bends the trunk. Provides anti-rotation stability during asymmetrical movements.',
        commonExercises: ['Turkish Get-up', 'Dumbbell Snatch', 'Farmer\'s Carry', 'Man Maker'],
        relatedMovements: ['turkish-get-up', 'dumbbell-snatch', 'farmers-carry', 'man-maker'],
        commonInjuries: ['Side Strain']
    },
    {
        id: 'quadriceps',
        name: 'Quadriceps',
        function: 'A group of four muscles that extend the knee. The primary movers in squats, lunges, and jumping.',
        commonExercises: ['Back Squat', 'Front Squat', 'Wall Ball', 'Thruster', 'Pistol Squat'],
        relatedMovements: ['back-squat', 'front-squat', 'wall-ball', 'thruster', 'pistol-squat'],
        commonInjuries: ['Patellar Tendinopathy (Jumper\'s Knee)', 'Quad Strain']
    },
    {
        id: 'trapezius',
        name: 'Trapezius (Traps)',
        function: 'Elevates, retracts, and depresses the scapula. Heavily involved in shrugging motions like in Olympic lifts and deadlifts.',
        commonExercises: ['Deadlift', 'Snatch', 'Clean and Jerk', 'Farmer\'s Carry'],
        relatedMovements: ['deadlift', 'snatch', 'clean-and-jerk', 'farmers-carry'],
        commonInjuries: ['Neck/Shoulder Tightness', 'Headaches']
    },
    {
        id: 'triceps',
        name: 'Triceps Brachii',
        function: 'Extends the elbow. The primary muscle for locking out any press or dip.',
        commonExercises: ['Ring Dip', 'Push-up', 'Push Press', 'Jerk'],
        relatedMovements: ['ring-dip', 'push-up', 'push-press', 'clean-and-jerk'],
        commonInjuries: ['Elbow Tendonitis']
    },
    {
        id: 'lats',
        name: 'Latissimus Dorsi (Lats)',
        function: 'Extends, adducts, and internally rotates the arm. The powerhouse of pulling movements.',
        commonExercises: ['Pull-up', 'Rope Climb', 'Rowing', 'Bar Muscle-up'],
        relatedMovements: ['pull-up', 'rope-climb', 'rowing', 'bar-muscle-up'],
        commonInjuries: ['Lat Strain', 'Shoulder Impingement (if tight)']
    },
    {
        id: 'erectors',
        name: 'Erector Spinae',
        function: 'A group of muscles that run along the spine, responsible for extending the back and maintaining an upright posture.',
        commonExercises: ['Deadlift', 'Back Squat', 'Good Morning', 'GHD Hip Extension'],
        relatedMovements: ['deadlift', 'back-squat'],
        commonInjuries: ['Lower Back Strain', 'Spasms']
    },
    {
        id: 'glutes',
        name: 'Gluteal Muscles',
        function: 'The strongest muscle group in the body. Responsible for hip extension, which is the foundation of nearly all athletic movements.',
        commonExercises: ['Deadlift', 'Squat', 'Kettlebell Swing', 'Lunge', 'Box Jump'],
        relatedMovements: ['deadlift', 'back-squat', 'kettlebell-swing', 'lunge', 'box-jump'],
        commonInjuries: ['Piriformis Syndrome', 'Hip Bursitis']
    },
    {
        id: 'hamstrings',
        name: 'Hamstrings',
        function: 'A group of muscles that flex the knee and extend the hip. Crucial for deadlifts, swings, and running.',
        commonExercises: ['Deadlift', 'Kettlebell Swing', 'Good Morning', 'Running'],
        relatedMovements: ['deadlift', 'kettlebell-swing', 'running'],
        commonInjuries: ['Hamstring Strain/Tear']
    },
    {
        id: 'calves',
        name: 'Gastrocnemius & Soleus (Calves)',
        function: 'Plantarflexes the foot (points the toes). Essential for jumping, running, and the final "pop" in Olympic lifts.',
        commonExercises: ['Double-Under', 'Box Jump', 'Running', 'Rowing'],
        relatedMovements: ['double-under', 'box-jump', 'running', 'rowing'],
        commonInjuries: ['Achilles Tendonitis', 'Calf Strain']
    },
    {
        id: 'forearms',
        name: 'Forearm Muscles',
        function: 'Control flexion and extension of the wrist and fingers. Grip strength is a direct function of these muscles.',
        commonExercises: ['Farmer\'s Carry', 'Rope Climb', 'Heavy Deadlifts', 'Toes-to-Bar'],
        relatedMovements: ['farmers-carry', 'rope-climb', 'deadlift', 'toes-to-bar'],
        commonInjuries: ['Tennis Elbow (Lateral Epicondylitis)', 'Golfer\'s Elbow (Medial Epicondylitis)']
    }
];
