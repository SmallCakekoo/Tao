import { useEffect, useState, useRef } from 'react';
import type { PointerEventHandler } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

import { getRecommendationsByIds } from '../../../services/recommendationService';
import type { RecommendationCard } from '../../../types/RecommendationViewTypes';
import { useNavigate } from 'react-router-dom';

type Props = {
  recommendationIds: string[];
  closeOverlay: () => void;
};

export const SavedRecommendations = ({ recommendationIds, closeOverlay }: Props) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<RecommendationCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartY = useRef<number | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getRecommendationsByIds(recommendationIds);

        setCards(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, [recommendationIds]);

  const effectiveIndex = Math.min(currentIndex, cards.length > 0 ? cards.length - 1 : 0);
  const canGoNext = effectiveIndex < cards.length - 1;
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

  const content = cards[effectiveIndex];

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
              className={`focus-card-text`}
            >
              <h3 className={content.titleMuted}>
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

          <div className="drag-hint">
            <p>Drag down to see more</p>
            <IconChevronDown size={28} />
            <small>
              {effectiveIndex + 1} / {cards.length}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
