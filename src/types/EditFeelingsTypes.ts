export type MoodValue = 'awful' | 'bad' | 'neutral' | 'good' | 'great';

export type SelectKey = 'energy' | 'sleep' | 'stress' | 'dailyLoad';

export type MoodOption = {
  value: MoodValue;
  image: string;
  label: string;
};
