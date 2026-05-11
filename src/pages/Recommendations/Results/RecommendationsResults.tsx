import { useRef, useState, useEffect, type PointerEventHandler } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconArrowLeft,
} from '@tabler/icons-react';
import { HomeNavbar } from '../../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../../components/NavBar/MobileNavBar/MobileNavBar';
import logoFace from '../../../assets/logo-face.svg';
import yogaImg from '../../../assets/yoga.png';
import breatheImg from '../../../assets/breathe.png';
import type {
  RecommendationCard,
  ResultsState,
} from '../../../types/RecommendationViewTypes';
import { getPersonalizedRecommendations } from '../../../services/recommendationService';
import '../RecommendationsShared.css';
import './RecommendationsResults.css';

const CARDS_BY_VARIANT: Record<'A' | 'B', RecommendationCard[]> = {
  A: [
    {
      title: 'It is time to rest!',
      titleMuted: 'Tired',
      subtitle: '',
      body: [
        'Your energy and sleep levels suggest your body needs a pause.',
        'Take a moment to rest and listen to yourself. You will feel the difference later.',
      ],
      sideTone: 'peach',
      bodySpacing: 'spacious',
    },
    {
      title: 'Reconnect with your body',
      subtitle:
        'Rebuilding your energy starts with reconnecting to your body in a conscious way.',
      body: [
        'Practices like yoga can gently restore strength, flexibility, and mental clarity over time.',
        'You can explore local classes near you, or begin privately with guided sessions online.',
        'What matters most is consistency and presence, not intensity.',
      ],
      sideTone: 'blue',
      sideImage: yogaImg,
    },
    {
      title: 'Intentional rest break',
      subtitle: 'Sometimes the simplest solutions are the most effective.',
      body: [
        'A short nap can refresh your energy and restore focus for the rest of your day.',
        'Your body is not wasting time, it is recovering what it needs.',
      ],
      sideTone: 'blue',
      sideImage: yogaImg,
    },
  ],
  B: [
    {
      title: 'You don’t always have to be productive',
      subtitle: '',
      body: [
        'Today may be a good moment to intentionally create space for yourself and release the tension a situation might be causing.',
        'Stress does not only show up in your schedule. It can appear as muscle tension, headaches, irritability, or changes in appetite.',
        'If you notice these signals, it may be time to gently support your body and mind.',
      ],
      sideTone: 'blue',
    },
    {
      title: 'Breathing exercises',
      subtitle:
        'Rebuilding your energy starts with reconnecting to your body in a conscious way.',
      body: [
        'Take a few minutes to anchor yourself in the present moment.',
        'Breathe in slowly and exhale fully. Notice the sounds around you or the sensation of air on your skin.',
        'Return to your body. Return to now.',
      ],
      sideTone: 'blue',
      sideImage: breatheImg,
      ctaLabel: 'Try guided exercise',
      ctaRoute: '/recommendations/breathing',
    },
  ],
};

export const RecommendationsResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as ResultsState;

  const [cards, setCards] = useState<RecommendationCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartY = useRef<number | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      if (state.source === 'form' && state.results) {
        const fetched = await getPersonalizedRecommendations(state.results.macrostate);
        
        const mapped: RecommendationCard[] = fetched.map((rec, index) => ({
          id: rec.id,
          title: rec.title,
          subtitle: '',
          body: [rec.description],
          sideTone: index % 2 === 0 ? 'peach' : 'blue',
          titleMuted: index === 0 ? state.results?.macrostate : '',
          bodySpacing: 'normal',
        }));

        setCards(mapped);
      } else {
        const selectedFeeling = state.feeling ?? null;
        const variant: 'A' | 'B' = !selectedFeeling
          ? 'B'
          : selectedFeeling === 'tired' || selectedFeeling === 'body-hurts'
            ? 'A'
            : 'B';
        setCards(CARDS_BY_VARIANT[variant]);
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, [state]);

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

  const handleAddCardToDiary = () => {

    // TODO: Add logic to save to diary
  };

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

  if (loading) {
    return <div className="loading-state">Generating your recommendations...</div>;
  }

  if (cards.length === 0) {
    return (
      <div className="recommendations-page results-page">
        <HomeNavbar />
        <section className="results-empty">
          <h1>No recommendations found</h1>
          <button type="button" onClick={() => navigate('/form')}>Back to check-in</button>
        </section>
      </div>
    );
  }

  const content = cards[effectiveIndex];

  return (
    <div className="recommendations-page results-page">
      <HomeNavbar />
      <button className="results-back" onClick={() => navigate(-1)} aria-label="Go back">
        <IconArrowLeft size={16} />
        <span>Back</span>
      </button>
      <main className="recommendations-main">
        <section className="results-content">
          <img src={logoFace} alt="Tao face" className="results-face" />
          <h1>Your recommendations</h1>
          <p className="results-static-subtitle">
            Based on your state we recommend these activities.
          </p>

          <div className="focus-card-layout">
            <article
              className={`focus-card draggable-card ${isDragging ? "is-dragging" : ""}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerEnd}
              onPointerCancel={onPointerEnd}
              style={{ transform: `translateY(${dragOffset}px)` }}
            >
              <div className={`focus-card-text ${content.bodySpacing === "spacious" ? "spacious-body" : ""}`}>
                <h3 className={content.titleMuted ? "focus-title-with-muted" : ""}>
                  {content.title}
                  {content.titleMuted && (
                    <span className="focus-title-muted">{content.titleMuted}</span>
                  )}
                </h3>

                {content.subtitle && content.subtitle.trim() && (
                  <p className="focus-card-subtitle">{content.subtitle}</p>
                )}

                {content.body.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? "focus-body-first" : ""}>
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
                    className={`arrow-button ${canGoNext ? "active" : ""}`}
                    onClick={goNext}
                    disabled={!canGoNext}
                  >
                    <IconChevronDown size={22} />
                  </button>
                  <button
                    type="button"
                    className={`arrow-button ${canGoPrev ? "active" : ""}`}
                    onClick={goPrev}
                    disabled={!canGoPrev}
                  >
                    <IconChevronUp size={22} />
                  </button>
                </div>
              </div>

              <div className={`focus-card-side ${content.sideTone} ${content.sideImage ? "image-only-bg" : ""}`}>
                {content.sideImage && (
                  <img src={content.sideImage} alt="Visual" className="focus-side-image" />
                )}
                <button type="button" className="add-diary-btn" onClick={handleAddCardToDiary}>
                  <span>Add card to diary</span>
                  <span className="add-diary-icon">
                    <IconPlus size={24} />
                  </span>
                </button>
              </div>
            </article>

            <div className="drag-hint">
              <p>Drag down to see more</p>
              <IconChevronDown size={28} />
              <small>{effectiveIndex + 1} / {cards.length}</small>
            </div>
          </div>

          <div className="leave-actions">
            <button className="ready-leave" onClick={() => navigate("/home")}>
              I’m ready to leave
            </button>
          </div>
        </section>
      </main>
      <MobileNavBar />
    </div>
  );
};
