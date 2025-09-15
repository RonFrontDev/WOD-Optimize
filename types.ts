import type { ReactNode } from "react";

export type AppView = 'home' | 'movements' | 'gripGuide' | 'teamGuide' | 'shoeGuide' | 'rehab' | 'recovery' | 'foodGuide' | 'warmup';

export type Equipment = 'Barbell' | 'Dumbbell' | 'Kettlebell' | 'Bodyweight' | 'Machine' | 'Specialty';

export type InjurySeverity = 'sore' | 'painful' | 'unusable';

export interface Movement {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'Weightlifting' | 'Gymnastics' | 'Monostructural' | 'Kettlebell' | 'Strongman' | 'Machines';
  equipment: Equipment;
  commonFaults: { fault: string; fix: string; iconId: string; }[];
}

export interface Drill {
  name: string;
  description: string;
}

export interface MobilityExercise {
  name: string;
  description: string;
}

export interface TransitionTip {
  name: string;
  description: string;
}

export interface EnergySavingTip {
  name: string;
  description: string;
}

export interface StrategyDetails {
  goal: string;
  timeEstimate: string;
  pacing: string;
  efficiency: string;
  transitions: string;
  pushVsConserve: string;
  breathing: string;
  improvementFocus: string;
}

export interface WorkoutStrategy {
  elite: StrategyDetails;
  rx: StrategyDetails;
  intermediate: StrategyDetails;
  scaledBeginner: StrategyDetails;
}

export interface HeatmapPoint {
  x: number;
  y: number;
  label: string;
  type: 'positive' | 'improvement';
}

export interface AnalysisSession {
  id: number;
  date: string;
  imageDataUrl: string;
  feedback: string;
  heatmapPoints?: HeatmapPoint[];
}

export interface SuggestedWorkout {
  name: string;
  description: string;
  goal: string;
}

export interface MuscleActivation {
  primaryMuscles: string[];
  secondaryMuscles: string[];
}

export interface SavedWorkoutStrategy {
  id: number;
  date: string;
  workoutDescription: string;
  analyzedWorkout: string;
  limiters: string[];
  strategy: WorkoutStrategy;
  muscleActivation: MuscleActivation;
}

export interface MovementModification {
  originalMovement: string;
  modifiedMovement: string;
  reasoning: string;
}

export interface AdaptiveWorkoutStrategy {
  safetyWarning: string;
  movementModifications: MovementModification[];
  techniqueFocus: string;
  warmup: string;
  cooldown: string;
  revisedStrategy: string;
}


export interface CollapsibleSectionProps {
  title: string;
  category: Movement['category'];
  movements: Movement[];
  onSelectMovement: (movement: Movement) => void;
  isInitiallyOpen?: boolean;
  searchQuery?: string;
}

// Fix: Constrain generic type T to be a valid key type for Record.
export interface TabbedContentProps<T extends string | number | symbol> {
  tabs: {
    id: T;
    label: string;
    icon: ReactNode;
  }[];
  content: Record<T, ReactNode>;
  defaultTab: T;
}

export type BodyPart = 'Shoulder' | 'Knee' | 'Lower Back' | 'Elbow' | 'Wrist' | 'Ankle';

export interface RehabStep {
  title: string;
  icon: 'SnowflakeIcon' | 'HeartPulseIcon' | 'BarbellIcon' | 'ShieldCheckIcon';
  summary: string;
  details: string[];
  externalResource?: {
    label: string;
    url: string;
  };
}

export interface RehabPlan {
  id: string;
  name: string;
  bodyPart: BodyPart;
  description: string;
  keywords: string[];
  roadmap: RehabStep[];
}

// Recovery Guide Types
export type RecoveryContext = 'training' | 'competition';
export type TrainingFrequency = '1x' | '2x' | '3x';

export interface RecoveryStep {
  title: string;
  icon: 'UtensilsIcon' | 'DropletIcon' | 'BodyStretchIcon' | 'BedIcon' | 'BrainCircuitIcon' | 'TrophyIcon' | 'ClockIcon';
  description: string;
  details: string[];
}

export interface RecoveryPlan {
  title: string;
  summary: string;
  steps: RecoveryStep[];
}

// Warm-up Generator Types
export interface GeneralWarmupStep {
    activity: string;
    duration: string;
}
export interface DynamicStretchingStep {
    activity: string;
    reps: string;
}
export interface MovementSpecificStep {
    activity: string;
    details: string;
}
export interface WorkoutPrepStep {
    round: string;
    details: string;
}

export interface WarmupPlan {
    general: GeneralWarmupStep[];
    dynamicStretching: DynamicStretchingStep[];
    movementSpecific: MovementSpecificStep[];
    workoutPrep: WorkoutPrepStep[];
}