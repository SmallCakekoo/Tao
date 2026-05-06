import type { CalculatedCheckin } from './CheckinEngineTypes';
import type { PresetFeeling } from './RecommendationTypes';

export type LoadingState = {
  feeling?: PresetFeeling;
};

export type ResultsState = {
  feeling?: PresetFeeling;
  source?: 'form' | 'preset';
  results?: CalculatedCheckin;
};

export type RecommendationCard = {
  title: string;
  subtitle: string;
  body: string[];
  sideTone: 'blue' | 'peach';
  sideImage?: string;
  ctaLabel?: string;
  ctaRoute?: string;
  titleMuted?: string;
  bodySpacing?: 'normal' | 'spacious';
};

export type PersonalizedRedirectOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};
