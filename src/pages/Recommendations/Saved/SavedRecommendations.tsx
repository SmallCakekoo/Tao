import { useState, useRef } from 'react';
import './SavedRecommendations.css';
import type { PointerEventHandler } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

import type { SavedRecommendationsProps } from '../../../types/RecommendationViewTypes';
import { useNavigate } from 'react-router-dom';

export const SavedRecommendations = ({
  recommendations,
  closeOverlay,
}: SavedRecommendationsProps) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartY = useRef<number | null>(null);

  const effectiveIndex = Math.min(
    currentIndex,
    recommendations.length > 0 ? recommendations.length - 1 : 0
  );
  const canGoNext = effectiveIndex < recommendations.length - 1;
  const canGoPrev = effectiveIndex > 0;

  const goNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const content = recommendations[effectiveIndex];

  const onPointerDown: PointerEventHandler<HTMLElement> = (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('button')) return;
    dragStartY.current = event.clientY;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove: PointerEventHandler<HTMLElement> = (event) => {
    if (dragStartY.current === null) return;
    const delta = event.clientY - dragStartY.current;
    setDragOffset(Math.max(-100, Math.min(100, delta)));
  };

  const onPointerEnd: PointerEventHandler<HTMLElement> = () => {
    if (dragOffset > 64) goNext();
    else if (dragOffset < -64) goPrev();
    dragStartY.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  if (!content) {
    return (
      <div className="overlay-bg">
        <div className="saved-overlay">
          <button onClick={closeOverlay}>Close</button>
          <p>No saved recommendations found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay-bg">
      <div className="saved-overlay">
        <button onClick={closeOverlay}>Close</button>

        <div className="focus-card-layout">
          <article
            className={`focus-card draggable-card ${isDragging ? 'is-dragging' : ''}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            style={{ transform: `translateY(${dragOffset}px)` }}
          >
            <div
              className={`focus-card-text ${content.bodySpacing === 'spacious' ? 'spacious-body' : ''}`}
            >
              <h3 className={content.titleMuted ? 'focus-title-with-muted' : ''}>
                {content.title}
                {content.titleMuted && (
                  <span className="focus-title-muted">{content.titleMuted}</span>
                )}
              </h3>

              {content.subtitle && content.subtitle.trim() && (
                <p className="focus-card-subtitle">{content.subtitle}</p>
              )}

              {content.body.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? 'focus-body-first' : ''}>
                  {paragraph}
                </p>
              ))}

              {content.ctaLabel && (
                <button
                  type="button"
                  className="button result-inline-cta"
                  onClick={() => content.ctaRoute && navigate(content.ctaRoute)}
                >
                  {content.ctaLabel}
                </button>
              )}

              <div className="focus-arrows">
                <button
                  type="button"
                  className={`arrow-button ${canGoNext ? 'active' : ''}`}
                  onClick={goNext}
                  disabled={!canGoNext}
                >
                  <IconChevronDown size={22} />
                </button>
                <button
                  type="button"
                  className={`arrow-button ${canGoPrev ? 'active' : ''}`}
                  onClick={goPrev}
                  disabled={!canGoPrev}
                >
                  <IconChevronUp size={22} />
                </button>
              </div>
            </div>

            <div
              className={`focus-card-side ${content.sideTone} ${content.sideImage ? 'image-only-bg' : ''}`}
            >
              {content.sideImage && (
                <img src={content.sideImage} alt="Visual" className="focus-side-image" />
              )}
            </div>
          </article>

          <div className="drag-hint" style={{ color: 'white' }}>
            <p>Drag down to see more</p>
            <IconChevronDown size={28} />
            <small style={{ color: 'white' }}>
              {effectiveIndex + 1} / {recommendations.length}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
