import { useNavigate } from 'react-router-dom';
import pencilImg from '../../assets/pencil.png';
import type { PersonalizedRedirectOverlayProps } from '../../types/RecommendationViewTypes';
import { useCheckin } from '../../contexts/CheckinContext';
import './PersonalizedRedirectOverlay.css';

export const PersonalizedRedirectOverlay = ({
  isOpen,
  onClose,
}: PersonalizedRedirectOverlayProps) => {
  const navigate = useNavigate();
  const { todaysCheckin, loading } = useCheckin();

  if (!isOpen) {
    return null;
  }


  return (
    <div className="personalized-overlay-backdrop" role="dialog" aria-modal="true">
      <div className="personalized-overlay-card">
        {loading ? (
          <div className="overlay-loading">Checking status...</div>
        ) : todaysCheckin ? (
          <>
            <h3>Recommendations Ready!</h3>
            <p className="overlay-description">
              You've already registered your feelings today. Your state is:
              <br />
              <strong>{todaysCheckin.macrostate}</strong>
            </p>

            <div className="personalized-overlay-actions">
              <button type="button" className="overlay-secondary" onClick={onClose}>
                Back
              </button>
              <button
                type="button"
                className="overlay-primary"
                onClick={() =>
                  navigate('/recommendations/results', {
                    state: { source: 'form', results: todaysCheckin },
                  })
                }
              >
                See Results
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>Almost ready!</h3>
            <p className="overlay-description">
              You need to register today's feelings first.
            </p>

            <img src={pencilImg} alt="Pencil illustration" className="overlay-pencil" />

            <div className="personalized-overlay-actions">
              <button type="button" className="overlay-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="overlay-primary"
                onClick={() => navigate('/form')}
              >
                Register
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
