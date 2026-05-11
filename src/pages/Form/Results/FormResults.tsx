import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { HomeNavbar } from '../../../components/NavBar/CommonNavBar/HomeNavbar';
import logoFace from '../../../assets/logo-face.svg';
import { useFormContext } from '../../../contexts/FormContext';
import { calculateDailyCheckin } from '../../../lib/checkinEngine';
import { saveDailyCheckin } from '../../../services/checkinService';
import { FACE_OPTIONS, FORM_RESULT_ITEMS } from '../../../data/formResultsOptions';
import { useEffect, useMemo, useState } from 'react';
import { useError } from '../../../contexts/ErrorContext';
import '../Form.css';
import './FormResults.css';
import type { FaceResult } from '../../../types/CheckinTypes';

export const FormResults = () => {
  const navigate = useNavigate();
  const { answers } = useFormContext();
  const { showError } = useError();
  const [isSaving, setIsSaving] = useState(false);

  const scores = useMemo(
    () => ({
      energy_score: answers[1] ?? 0,
      sleep_score: answers[2] ?? 0,
      mood_score: answers[3] ?? 2,
      stress_score: answers[4] ?? 0,
      daily_load_score: answers[5] ?? 0,
    }),
    [answers]
  );

  const engineResults = useMemo(() => calculateDailyCheckin(scores), [scores]);

  const face_result: FaceResult = FACE_OPTIONS[answers[3] ?? 2];

  const results = useMemo(
    () => ({ ...engineResults, face_result }),
    [engineResults, face_result]
  );

  useEffect(() => {
    const persistResult = async () => {
      try {
        setIsSaving(true);
        await saveDailyCheckin(scores, results);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save check-in';
        showError(message);
      } finally {
        setIsSaving(false);
      }
    };
    persistResult();
  }, [results, scores, showError]);

  const getMacrostateMessage = (state: string) => {
    switch (state) {
      case 'Recuperación Necesaria':
        return 'Your body needs some deep rest';
      case 'Regulación Emocional':
        return 'Prioritize your emotional well-being today';
      case 'Sobrecarga Académica':
        return 'Take things one step at a time';
      case 'Activación / Optimización':
        return 'You are in a great state to achieve your goals!';
      default:
        return 'You are having a balanced day';
    }
  };

  const formResultItems = FORM_RESULT_ITEMS.map((item) => ({
    icon: item.icon,
    alt: item.alt,
    label: item.label,
    value: item.values[scores[item.scoreKey]] ?? item.values[0],
  }));

  const handleRecommendationsClick = () => {
    // Keep the latest check-in in local storage so recommendations can be restored after reloads.
    try {
      localStorage.setItem(
        'tao:daily-check-in',
        JSON.stringify({
          answers,
          results,
          savedAt: new Date().toISOString(),
        })
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to persist daily check-in in local storage';
      showError(message);
    }

    navigate('/recommendations', { state: { source: 'form', results } });
  };

  return (
    <div className="form-page results-page">
      <HomeNavbar />
      <div className="form-container">
        <div className="form-inner-container">
          <button className="back-btn" onClick={() => navigate('/form/question/5')}>
            <IconArrowLeft size={16} />
            <span>Back</span>
          </button>

          <section className="form-results">
            <div className="results-header">
              <h1>
                All done!
                <img src={logoFace} alt="Tao Face" className="results-title-logo" />
              </h1>
            </div>

            <div className="results-card">
              <h3>{getMacrostateMessage(results.macrostate)}</h3>
              <ul className="results-list">
                {formResultItems.map((item) => (
                  <li key={item.label} className="result-item">
                    <div className="icon-wrapper">
                      <img src={item.icon} alt={item.alt} />
                    </div>
                    <div className="result-label">{item.label}</div>
                    <div className="result-val">{item.value}</div>
                  </li>
                ))}
              </ul>

              <div className="results-actions">
                <button
                  className="btn-primary"
                  onClick={handleRecommendationsClick}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Get recommendations'}
                </button>
                <button className="btn-secondary" onClick={() => navigate('/home')}>
                  Leave
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
