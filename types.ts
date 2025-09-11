export interface Movement {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'Weightlifting' | 'Gymnastics' | 'Monostructural' | 'Kettlebell' | 'Strongman';
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

export interface AnalysisSession {
  id: number;
  date: string;
  imageDataUrl: string;
  feedback: string;
}

export interface SuggestedWorkout {
  name: string;
  description: string;
}