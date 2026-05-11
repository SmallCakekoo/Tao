import type { CalculatedCheckin } from './CheckinTypes';
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
  id: string;
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

export type SavedRecommendationsProps = {
  recommendations: RecommendationCard[];
  closeOverlay: () => void;
};

export type PersonalizedRedirectOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};
