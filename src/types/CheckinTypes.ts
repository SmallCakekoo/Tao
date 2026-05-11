export type FCategory = 'F1' | 'F2' | 'F3' | 'F4';
export type ECategory = 'E1' | 'E2' | 'E3' | 'E4';
export type CCategory = 'C1' | 'C2';

export type Macrostate =
  | 'Balanced'
  | 'Productive'
  | 'Overloaded'
  | 'Stressed'
  | 'Exhausted';

export type FaceResult = 'awful' | 'bad' | 'neutral' | 'good' | 'great';

export interface DailyCheckinScores {
  energy_score: number; // 0-3
  sleep_score: number; // 0-3
  mood_score: number; // 0-4
  stress_score: number; // 0-3
  daily_load_score: number; // 0-3
}

export interface CalculatedCheckin {
  f_score: number;
  f_category: FCategory;
  e_score: number;
  e_category: ECategory;
  c_score: number;
  c_category: CCategory;
  macrostate: Macrostate;
  face_result: FaceResult;
}

export interface FullDailyCheckin extends DailyCheckinScores, CalculatedCheckin {
  user_id: string;
  checkin_date: string;
}

export type WeeklyDataPoint = {
  day: string;
  value: number;
  checkin_date: string;
};

export type FeelingProps = {
  checkin?: FullDailyCheckin | null;
};

export type CheckinContextType = {
  todaysCheckin: FullDailyCheckin | null;
  weeklyData: WeeklyDataPoint[];
  loading: boolean;
  refreshCheckin: () => Promise<void>;
};
