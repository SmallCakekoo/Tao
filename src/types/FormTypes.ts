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
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
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
