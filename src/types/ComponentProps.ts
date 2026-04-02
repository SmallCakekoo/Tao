import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import type { PresetFeeling } from './RecommendationTypes';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'nav';
  to?: string;
};

export type GradientBoxProps = {
  mtop: string;
  mbot: string;
};

export type DiaryButtonsProps = {
  setCamera: () => void;
};

export type DraggableStickerProps = {
  emotionSrc: string;
  size?: number;
  hasGravity?: boolean;
  className?: string;
  style?: CSSProperties;
  getGroundY?: (centerX: number) => number;
};

export type AnimatedLineProps = {
  variant?: 'first' | 'second';
  className?: string;
  triggerSelector?: string;
};

export type PresetFeelingButtonProps = {
  label: string;
  icon: string;
  feeling: PresetFeeling;
  onSelect: (feeling: PresetFeeling) => void;
};
