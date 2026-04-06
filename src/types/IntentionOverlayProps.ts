import type { PromptKey } from './PromptKey';
export type IntentionOverlayProps = {
  getPrompt: (prompt: PromptKey) => void;
  closeOverlay: () => void;
  selectPrompt: (prompt: PromptKey) => void;
  selected: PromptKey | null;
};
