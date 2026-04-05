import type { Dispatch, SetStateAction } from 'react';

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

export interface FormResultItem {
  icon: string;
  alt: string;
  label: string;
  value: string;
}

export interface FormOutletContext {
  answers: DailyFormAnswers;
  setAnswers: Dispatch<SetStateAction<DailyFormAnswers>>;
}
