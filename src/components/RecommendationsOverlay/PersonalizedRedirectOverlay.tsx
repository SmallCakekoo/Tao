import { useNavigate } from 'react-router-dom';
import pencilImg from '../../assets/pencil.png';
import type { PersonalizedRedirectOverlayProps } from '../../types/RecommendationViewTypes';
import './PersonalizedRedirectOverlay.css';

export const PersonalizedRedirectOverlay = ({
  isOpen,
  onClose,
}: PersonalizedRedirectOverlayProps) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="personalized-overlay-backdrop" role="dialog" aria-modal="true">
      <div className="personalized-overlay-card">
        <h3>Almost ready!</h3>

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
      </div>
    </div>
  );
};
