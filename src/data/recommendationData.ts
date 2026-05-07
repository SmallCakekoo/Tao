import tiredIcon from '../assets/tired.png';
import stressedIcon from '../assets/stressed.png';
import boredIcon from '../assets/bored.png';
import hurtsIcon from '../assets/hurts.png';
import distractedIcon from '../assets/distracted.png';
import type { PresetFeeling } from '../types/RecommendationTypes';

export const PRESET_OPTIONS: Array<{ feeling: PresetFeeling; label: string; icon: string }> = [
  { feeling: 'tired', label: 'I feel tired', icon: tiredIcon },
  { feeling: 'stressed', label: 'I feel stressed', icon: stressedIcon },
  { feeling: 'bored', label: 'I feel bored', icon: boredIcon },
  { feeling: 'body-hurts', label: 'My body hurts', icon: hurtsIcon },
  { feeling: 'distracted', label: 'I feel distracted', icon: distractedIcon },
];
