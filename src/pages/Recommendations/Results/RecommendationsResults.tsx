import { useRef, useState, useEffect, type PointerEventHandler } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconChevronDown, IconChevronUp, IconPlus } from '@tabler/icons-react';
import { HomeNavbar } from '../../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../../components/NavBar/MobileNavBar/MobileNavBar';
import logoFace from '../../../assets/logo-face.svg';
import type {
  RecommendationCard,
  ResultsState,
} from '../../../types/RecommendationViewTypes';
import { getPersonalizedRecommendations } from '../../../services/recommendationService';
import { PRESET_OPTIONS } from '../../../data/recommendationData';
import '../RecommendationsShared.css';
import './RecommendationsResults.css';
import { useAuth } from '../../../contexts/AuthContext';
import { saveRecommendationToDiary } from '../../../services/diaryService';

export const RecommendationsResults = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultsState | undefined;

  const [cards, setCards] = useState<RecommendationCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartY = useRef<number | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);

      let macrostate = state?.results?.macrostate;

      if (!macrostate && state?.feeling) {
        const option = PRESET_OPTIONS.find((o) => o.feeling === state.feeling);
        if (option) {
          macrostate = option.macrostate;
        }
      }

      if (macrostate) {
        const fetched = await getPersonalizedRecommendations(macrostate);

        const mapped: RecommendationCard[] = fetched.map((rec, index) => {
          let imageUrl = undefined;
          if (rec.image_name) {
            imageUrl = new URL(
              `../../../assets/recs-images/${rec.image_name}`,
              import.meta.url
            ).href;
          }

          return {
            id: rec.id,
            title: rec.title,
            subtitle: '',
            body: [rec.description],
            sideTone: index % 2 === 0 ? 'peach' : 'blue',
            titleMuted: index === 0 ? macrostate : '',
            bodySpacing: 'normal',
            sideImage: imageUrl,
          };
        });

        setCards(mapped);
      } else {
        setCards([]);
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

  const handleAddCardToDiary = async () => {
    if (!user) return;

    try {
      await saveRecommendationToDiary(user.id, new Date(), content.id);
    } catch (error) {
      console.error(error);
    }
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
          <button type="button" onClick={() => navigate('/form')}>
            Back to check-in
          </button>
        </section>
      </div>
    );
  }

  const content = cards[effectiveIndex];

  return (
    <div className="recommendations-page results-page">
      <HomeNavbar />
      <main className="recommendations-main">
        <section className="results-content">
          <img src={logoFace} alt="Tao face" className="results-face" />
          <h1>Your recommendations</h1>
          <p className="results-static-subtitle">
            Based on your state we recommend these activities.
          </p>

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
                  <img
                    src={content.sideImage}
                    alt="Visual"
                    className="focus-side-image"
                  />
                )}
                <button
                  type="button"
                  className="add-diary-btn"
                  onClick={handleAddCardToDiary}
                >
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
              <small>
                {effectiveIndex + 1} / {cards.length}
              </small>
            </div>
          </div>

          <div className="leave-actions">
            <button className="ready-leave" onClick={() => navigate('/home')}>
              I’m ready to leave
            </button>
          </div>
        </section>
      </main>
      <MobileNavBar />
    </div>
  );
};
