import type { PromptKey } from './PromptKey';

export type IntentionBtnProps = {
  content: string;
  prompt: PromptKey;
  selectPrompt: (prompt: PromptKey) => void;
  isSelected: boolean;
};
