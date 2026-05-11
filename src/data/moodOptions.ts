import awfulImg from '../assets/stickers/awful.svg';
import badImg from '../assets/stickers/bad.svg';
import neutralImg from '../assets/stickers/neutral.svg';
import goodImg from '../assets/stickers/good.svg';
import greatImg from '../assets/stickers/great.svg';
import type { MoodOption } from '../types/EditFeelingsTypes';

export const energyOptions = [
  'Low Energy',
  'Medium Energy',
  'High Energy',
  'Very high Energy',
];
export const sleepOptions = ['0-3 Hours', '4-6 Hours', '7-9 Hours', '10+ Hours'];
export const stressOptions = [
  'Low stress or no stress',
  'Medium stress',
  'High stress',
  'Very high stress',
];
export const loadOptions = ['Light', 'Manageable', 'Heavy', 'Overwhelming'];

export const moodOptions: MoodOption[] = [
  { value: 'awful', image: awfulImg, label: 'Awful mood' },
  { value: 'bad', image: badImg, label: 'Bad mood' },
  { value: 'neutral', image: neutralImg, label: 'Neutral mood' },
  { value: 'good', image: goodImg, label: 'Good mood' },
  { value: 'great', image: greatImg, label: 'Great mood' },
];
