import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import logoFace from '../../../assets/logo-face.svg';
import type { LoadingState } from '../../../types/RecommendationViewTypes';
import '../RecommendationsShared.css';
import './RecommendationsLoading.css';

export const RecommendationsLoading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as LoadingState;

  useEffect(() => {
    if (!state.feeling) {
      navigate('/recommendations/preset', { replace: true });
      return;
    }

    const timer = window.setTimeout(() => {
      navigate('/recommendations/results', { state: { feeling: state.feeling } });
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [navigate, state.feeling]);

  return (
    <div className="recommendations-page loading-page">
      <button className="loading-back" onClick={() => navigate(-1)} aria-label="Go back">
        <IconArrowLeft size={16} />
        <span>Back</span>
      </button>
      <main className="loading-content">
        <img src={logoFace} alt="Tao face" className="loading-face" />
        <p>Just a moment...</p>
        <h1>Getting your recommendations ready...</h1>
      </main>
    </div>
  );
};
