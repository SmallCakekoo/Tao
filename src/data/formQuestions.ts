import type { FormQuestion as FormQuestionType } from '../types/FormTypes';

export const FORM_QUESTIONS: FormQuestionType[] = [
  {
    id: 1,
    title: 'How does your body feel today?',
    subtitle: 'Check in with your body and your energy levels for the day.',
    options: ['Low energy', 'Medium energy', 'High energy', 'Very high energy'],
  },
  {
    id: 2,
    title: 'How much did you sleep?',
    subtitle: 'Think back on how many hours you slept.',
    options: ['0-3 Hours', '4-6 Hours', '7-9 Hours', '10+ Hours'],
  },
  {
    id: 3,
    title: 'How are you feeling today?',
    subtitle: 'Select which mood represents you best today.',
    options: ['awful', 'bad', 'neutral', 'good', 'great'],
  },
  {
    id: 4,
    title: 'How stressed do you feel today?',
    subtitle: 'Breathe and think about how your stress levels are today.',
    options: [
      'Low stress or no stress',
      'Medium stress',
      'High stress',
      'Very high stress',
    ],
  },
  {
    id: 5,
    title: 'How’s your daily load?',
    subtitle: 'Think about how heavy your work load feels today.',
    options: ['Light', 'Manageable', 'Heavy', 'Overwhelming'],
  },
];
