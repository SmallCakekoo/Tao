import type { FaceResult } from '../types/CheckinTypes';
import energyIcon from '../assets/energy.png';
import moonIcon from '../assets/moon.png';
import faceIcon from '../assets/face.png';
import messIcon from '../assets/mess.png';
import boxIcon from '../assets/box.png';

export const FACE_OPTIONS: FaceResult[] = ['awful', 'bad', 'neutral', 'good', 'great'];

export const FORM_RESULT_ITEMS = [
  {
    icon: energyIcon,
    alt: 'Energy',
    label: 'Energy level',
    values: [
      'Very low energy today',
      'Energy is a bit low',
      'Energy level is balanced',
      "You're full of energy!",
    ],
    scoreKey: 'energy_score',
  },
  {
    icon: moonIcon,
    alt: 'Sleep',
    label: 'Sleep time',
    values: [
      'Hardly any sleep (0-3h)',
      'A bit short on sleep (4-6h)',
      'Decent amount of sleep (7-9h)',
      'Lots of rest today (10h+)',
    ],
    scoreKey: 'sleep_score',
  },
  {
    icon: faceIcon,
    alt: 'Mood',
    label: 'Mood',
    values: [
      'Feeling quite awful',
      'A bit of a bad mood',
      'Mood is neutral',
      "You're in a good mood",
      'Feeling absolutely great!',
    ],
    scoreKey: 'mood_score',
  },
  {
    icon: messIcon,
    alt: 'Stress',
    label: 'Stress level',
    values: [
      'Very calm and relaxed',
      'Feeling some stress',
      'Stress levels are high',
      'Heavily overwhelmed by stress',
    ],
    scoreKey: 'stress_score',
  },
  {
    icon: boxIcon,
    alt: 'Daily load',
    label: 'Daily load',
    values: [
      'A light and easy day',
      'Your load is manageable',
      'Carrying a heavy load',
      'Completely overwhelmed',
    ],
    scoreKey: 'daily_load_score',
  },
] as const;
