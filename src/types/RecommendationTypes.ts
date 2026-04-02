export type RecommendationFlow = 'preset' | 'personalized';

export type PresetFeeling = 'tired' | 'stressed' | 'bored' | 'body-hurts' | 'distracted';

export type DailyQuestionId = 1 | 2 | 3 | 4 | 5;

export type Step = 'intro' | DailyQuestionId | 'results';

export interface FormQuestion {
  id: DailyQuestionId;
  title: string;
  subtitle: string;
  options: string[];
}

export interface DailyFormAnswers {
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  5?: string;
}

export interface DailyCheckInSnapshot {
  answers: DailyFormAnswers;
  savedAt: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  durationMinutes?: number;
}

export interface PresetOption {
  feeling: PresetFeeling;
  label: string;
  icon: string;
}

export interface RecommendationRouteState {
  source?: 'home' | 'form' | 'direct';
}
