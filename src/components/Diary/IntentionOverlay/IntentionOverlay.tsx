import { IntentionButton } from '../IntentionBtn/IntentionBtn';
import type { IntentionOverlayProps } from '../../../types/IntentionOverlayProps';
import type { PromptKey } from '../../../types/PromptKey';
import './IntentionOverlay.css';

export const IntentionOverlay = ({
  getPrompt,
  closeOverlay,
  selectPrompt,
  selected,
}: IntentionOverlayProps) => {
  const intentions: { content: string; prompt: PromptKey }[] = [
    { content: 'Be more calm', prompt: 'calm' },
    { content: 'Be motivated', prompt: 'motivated' },
    { content: 'Organize my mind', prompt: 'organize' },
    { content: 'Recognize achievements', prompt: 'recognize' },
    { content: 'Process something hard', prompt: 'process' },
    { content: 'Understand my patterns', prompt: 'patterns' },
  ];
  return (
    <div className="intention-overlay">
      <h5>What's your intention for today?</h5>
      {intentions && intentions.map((item) => (
        <IntentionButton
          key={item.prompt}
          content={item.content}
          prompt={item.prompt}
          selectPrompt={() => selectPrompt(item.prompt)}
          isSelected={selected === item.prompt}
        />
      ))}
        <button
        className='continue'
        disabled={!selected}
        onClick={() => {
            if (!selected) return;
            getPrompt(selected);
            closeOverlay();
        }}
        >
        Continue
        </button>
    </div>
  );
};
