import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import {
  IconArrowsDiagonalMinimize2,
  IconArrowsDiagonal2,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';

import { IntentionOverlay } from '../IntentionOverlay/IntentionOverlay';
import type { PromptKey } from '../../../types/PromptKey';
import { fetchPrompts } from '../../../services/diaryService';

import './Intention.css';
import type { IntentionProps } from '../../../types/ComponentProps';

export const Intention = ({ selected, setSelected }: IntentionProps) => {
  const [maximized, setMaximized] = useState(false);
  const [promptList, setPromptList] = useState<string[]>([]);
  // Track which intention the current prompts belong to so we do not show stale data.
  const [loadedFor, setLoadedFor] = useState<PromptKey | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [index, setIndex] = useState(0);

  // Only consider prompts valid when they match the currently selected intention.
  const hasPrompts = selected !== null && loadedFor === selected && promptList.length > 0;
  const listLength = promptList.length - 1;

  const selectPrompt = (prompt: PromptKey) => {
    setSelected(prompt);
  };

  const getPrompt = async (prompt: PromptKey) => {
    try {
      const prompts = await fetchPrompts(prompt);

      setPromptList(prompts);
      setLoadedFor(prompt);
      setIndex(0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selected) return;

    // Load prompts asynchronously so the effect does not set state synchronously.
    void fetchPrompts(selected)
      .then((prompts) => {
        setPromptList(prompts);
        setLoadedFor(selected);
        setIndex(0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selected]);

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
                      if (index === listLength) return;
                      setIndex((prev) => prev + 1);
                    }}
                    className={`icon ${index === listLength ? 'disabled' : ''}`}
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
