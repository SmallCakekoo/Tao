import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { HomeNavbar } from '../../../components/NavBar/CommonNavBar/HomeNavbar';
import { AnimatedLine } from '../../../components/Home/AnimatedLine/AnimatedLine';
import { PersonalizedRedirectOverlay } from '../../../components/RecommendationsOverlay/PersonalizedRedirectOverlay';
import type { RecommendationRouteState } from '../../../types/RecommendationTypes';
import '../RecommendationsShared.css';
import './Recommendations.css';

export const Recommendations = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = (location.state ?? {}) as RecommendationRouteState;

  // const DAILY_CHECK_IN_KEY = 'tao:daily-check-in';
  // const raw = localStorage.getItem(DAILY_CHECK_IN_KEY);
  // let lastCheckInDate: string | null = null;
  // if (raw) {
  //   try {
  //     const parsed = JSON.parse(raw);
  //     if (parsed?.savedAt) {
  //       lastCheckInDate = new Date(parsed.savedAt).toLocaleDateString();
  //     }
  //   } catch {}
  // } This logic is for the last check-in date, but theres no an local key, temporarily.
  const lastCheckInDate: string | null = null;

  return (
    <div className="recommendations-page recommendations-hub-page">
      <HomeNavbar />
      <AnimatedLine />

      <main className="recommendations-main recommendations-hub-main">
        <button className="recs-back" onClick={() => navigate(-1)}>
          <IconArrowLeft size={16} />
          <span>Back</span>
        </button>

        <section className="recommendations-hero">
          <h1>Recommendations</h1>
          <p>
            Welcome to your recommendations hub. Choose preset options for quick support
            or go through your daily check-in for personalized guidance.
          </p>
          {routeState.source === 'form' && (
            <small className="recs-source-hint">
              Daily check-in saved. You can now explore recommendation paths.
            </small>
          )}
          {lastCheckInDate && (
            <small className="recs-source-hint">
              Last daily check-in: {lastCheckInDate}
            </small>
          )}
        </section>

        <section className="recommendations-choice-grid">
          <article className="recommendation-choice-card">
            <h3>
              <span>Preset</span> recommendations
            </h3>
            <p>Based on preset worries and options.</p>
            <button type="button" onClick={() => navigate('/recommendations/preset')}>
              Get recommendations
            </button>
          </article>

          <article className="recommendation-choice-card">
            <h3>
              <span>Personalized</span> recommendations
            </h3>
            <p>Built from your daily form answers and trends.</p>
            <button type="button" onClick={() => setIsOverlayOpen(true)}>
              Get recommendations
            </button>
          </article>
        </section>
      </main>

      <PersonalizedRedirectOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </div>
  );
};
