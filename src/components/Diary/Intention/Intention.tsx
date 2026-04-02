import {
  IconArrowsDiagonalMinimize2,
  IconArrowsDiagonal2,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { IntentionOverlay } from '../IntentionOverlay/IntentionOverlay';
import type { PromptKey } from '../../../types/PromptKey';

import './Intention.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export const Intention = () => {
  const [maximized, setMaximized] = useState(false);
  const [promptList, setPromptList] = useState<string[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selected, setSelected] = useState<PromptKey | null>(null);
  const [index, setIndex] = useState(0);

  const hasPrompts = promptList.length > 0;
  const listLength = promptList.length - 1;

  const prompts = {
    calm: [
      'What’s bothering you right now and what’s the first small step you can do to work on it?',
      'What part of this situation is under your control?',
      'Write down 3 things you can hear, 3 you can touch and 3 you can see.',
      'What is something that you’re grateful for today?',
      'If you gave your body 10 minutes of real rest, what would you choose to do?',
    ],
    motivated: [''],
    organize: [''],
    recognize: [''],
    process: [''],
    patterns: [''],
  };

  const selectPrompt = (prompt: PromptKey) => {
    setSelected(prompt);
  };

  const getPrompt = (prompt: PromptKey) => {
    const promptList = prompts[prompt];
    setPromptList(promptList);
    setIndex(0);
  };

  return (
    <>
      {showOverlay &&
        createPortal(
          <div className="overlay-bg">
            <IntentionOverlay
              getPrompt={getPrompt}
              closeOverlay={() => setShowOverlay(false)}
              selectPrompt={selectPrompt}
              selected={selected}
            />
          </div>,
          document.body
        )}
      <div className={`intention ${maximized ? 'expanded' : 'collapsed'}`}>
        <div className={`top ${maximized ? 'expanded' : 'collapsed'}`}>
          <p className={`what ${maximized ? 'expanded' : 'collapsed'}`}>
            {hasPrompts ? promptList[index] : "What's your intention for today?"}
          </p>
          {maximized ? (
            <IconArrowsDiagonalMinimize2
              size={20}
              onClick={() => setMaximized(false)}
              className="icon"
            />
          ) : (
            <IconArrowsDiagonal2
              size={20}
              className="icon"
              onClick={() => setMaximized(true)}
            />
          )}
        </div>
        <div className={`int-content ${maximized ? 'show' : ''}`}>
          {!hasPrompts ? (
            <>
              <p className="small-text">
                By setting a journaling intention you can explore and write about
                different topics.
              </p>
              <button className="small-btn" onClick={() => setShowOverlay(true)}>
                Set intention
              </button>
            </>
          ) : (
            <>
              <p className="small-text">
                Reflect and write based on the journaling prompt that suits your needs.
              </p>
              {hasPrompts && (
                <div className="arrows">
                  <IconChevronLeft
                    onClick={() => {
                      if (index === 0) return;
                      setIndex((prev) => prev - 1);
                    }}
                    className={`icon ${index === 0 ? 'disabled' : ''}`}
                  />
                  <IconChevronRight
                    onClick={() => {
                      if (index === listLength - 1) return;
                      setIndex((prev) => prev + 1);
                    }}
                    className={`icon ${index === listLength - 1 ? 'disabled' : ''}`}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
