import type {
  DailyCheckInSnapshot,
  DailyFormAnswers,
  DailyQuestionId,
  FormQuestion,
  Step,
} from './FormTypes';

export type RecommendationFlow = 'preset' | 'personalized';

export type PresetFeeling = 'tired' | 'stressed' | 'bored' | 'body-hurts' | 'distracted';

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

export type {
  DailyCheckInSnapshot,
  DailyFormAnswers,
  DailyQuestionId,
  FormQuestion,
  Step,
};
