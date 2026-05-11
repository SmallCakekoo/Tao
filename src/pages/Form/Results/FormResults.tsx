import { useNavigate, useOutletContext } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { HomeNavbar } from '../../../components/NavBar/CommonNavBar/HomeNavbar';
import logoFace from '../../../assets/logo-face.svg';
import type { FormOutletContext } from '../../../types/FormTypes';
import type { FaceResult } from '../../../types/CheckinTypes';
import { calculateDailyCheckin } from '../../../lib/checkinEngine';
import { saveDailyCheckin } from '../../../services/checkinService';
import { useEffect, useMemo, useState } from 'react';
import '../Form.css';
import './FormResults.css';

const FACE_OPTIONS: FaceResult[] = ['awful', 'bad', 'neutral', 'good', 'great'];

export const FormResults = () => {
  const navigate = useNavigate();
  const { answers } = useOutletContext<FormOutletContext>();
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
        console.error('Failed to save check-in', err);
      } finally {
        setIsSaving(false);
      }
    };
    persistResult();
  }, [results, scores]);

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

  const formResultItems = [
    {
      icon: new URL('../../../assets/energy.png', import.meta.url).href,
      alt: 'Energy',
      label: 'Energy level',
      value: [
        'Very low energy today',
        'Energy is a bit low',
        'Energy level is balanced',
        "You're full of energy!",
      ][scores.energy_score],
    },
    {
      icon: new URL('../../../assets/moon.png', import.meta.url).href,
      alt: 'Sleep',
      label: 'Sleep time',
      value: [
        'Hardly any sleep (0-3h)',
        'A bit short on sleep (4-6h)',
        'Decent amount of sleep (7-9h)',
        'Lots of rest today (10h+)',
      ][scores.sleep_score],
    },
    {
      icon: new URL('../../../assets/face.png', import.meta.url).href,
      alt: 'Mood',
      label: 'Mood',
      value: [
        'Feeling quite awful',
        'A bit of a bad mood',
        'Mood is neutral',
        "You're in a good mood",
        'Feeling absolutely great!',
      ][scores.mood_score],
    },
    {
      icon: new URL('../../../assets/mess.png', import.meta.url).href,
      alt: 'Stress',
      label: 'Stress level',
      value: [
        'Very calm and relaxed',
        'Feeling some stress',
        'Stress levels are high',
        'Heavily overwhelmed by stress',
      ][scores.stress_score],
    },
    {
      icon: new URL('../../../assets/box.png', import.meta.url).href,
      alt: 'Daily load',
      label: 'Daily load',
      value: [
        'A light and easy day',
        'Your load is manageable',
        'Carrying a heavy load',
        'Completely overwhelmed',
      ][scores.daily_load_score],
    },
  ];

  const handleRecommendationsClick = () => {
    localStorage.setItem(
      'tao:daily-check-in',
      JSON.stringify({
        answers,
        results,
        savedAt: new Date().toISOString(),
      })
    );

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
