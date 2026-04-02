import { useNavigate, useOutletContext } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { HomeNavbar } from '../../../components/NavBar/CommonNavBar/HomeNavbar';
import logoFace from '../../../assets/logo-face.svg';
import type { FormOutletContext, FormResultItem } from '../../../types/FormTypes';
import '../Form.css';
import './FormResults.css';

// Se usa import.meta.url para resolver correctamente las rutas de estos assets dentro del módulo.
const FORM_RESULT_ITEMS = [
  {
    icon: new URL('../../../assets/energy.png', import.meta.url).href,
    alt: 'Energy',
    label: 'Energy level',
    value: 'Lower energy level than usual',
  },
  {
    icon: new URL('../../../assets/moon.png', import.meta.url).href,
    alt: 'Sleep',
    label: 'Sleep time',
    value: 'Lower sleep hours than usual',
  },
  {
    icon: new URL('../../../assets/face.png', import.meta.url).href,
    alt: 'Mood',
    label: 'Mood',
    value: 'Lower mood than usual',
  },
  {
    icon: new URL('../../../assets/mess.png', import.meta.url).href,
    alt: 'Stress',
    label: 'Stress level',
    value: 'Higher stress level than usual',
  },
  {
    icon: new URL('../../../assets/box.png', import.meta.url).href,
    alt: 'Daily load',
    label: 'Daily load',
    value: 'Lower load than usual',
  },
] satisfies FormResultItem[];

export const FormResults = () => {
  const navigate = useNavigate();
  const { answers } = useOutletContext<FormOutletContext>();

  const handleRecommendationsClick = () => {
    localStorage.setItem(
      'tao:daily-check-in',
      JSON.stringify({
        answers,
        savedAt: new Date().toISOString(),
      })
    );

    navigate('/recommendations', { state: { source: 'form' } });
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
              <h3>Today your body needs some rest</h3>
              <ul className="results-list">
                {FORM_RESULT_ITEMS.map((item) => (
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
                <button className="btn-primary" onClick={handleRecommendationsClick}>
                  Get recommendations
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
