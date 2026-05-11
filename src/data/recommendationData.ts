import tiredIcon from '../assets/tired.png';
import stressedIcon from '../assets/stressed.png';
import boredIcon from '../assets/bored.png';
import hurtsIcon from '../assets/hurts.png';
import distractedIcon from '../assets/distracted.png';
import type { PresetFeeling } from '../types/RecommendationTypes';
import type { Macrostate } from '../types/CheckinTypes';

export const PRESET_OPTIONS: Array<{ feeling: PresetFeeling; label: string; icon: string; macrostate: Macrostate }> = [
  { feeling: 'tired', label: 'I feel tired', icon: tiredIcon, macrostate: 'Exhausted' },
  { feeling: 'stressed', label: 'I feel stressed', icon: stressedIcon, macrostate: 'Stressed' },
  { feeling: 'bored', label: 'I feel bored', icon: boredIcon, macrostate: 'Productive' },
  { feeling: 'body-hurts', label: 'My body hurts', icon: hurtsIcon, macrostate: 'Balanced' },
  { feeling: 'distracted', label: 'I feel distracted', icon: distractedIcon, macrostate: 'Overloaded' },
];

