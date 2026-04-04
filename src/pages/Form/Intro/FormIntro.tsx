import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { HomeNavbar } from '../../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../../components/NavBar/MobileNavBar/MobileNavBar';
import logoFace from '../../../assets/logo-face.svg';
import { useEffect, useState } from 'react';
import '../Form.css';
import './FormIntro.css';

const INTRO_COPY = {
  title: "Let's take a moment to check in.",
  body: "Let's observe how things feel today so far by doing a quick check-in and answering a few quick questions.",
  hint: 'You can edit your answers later.',
};

export const FormIntro = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="form-page intro-page">
      {!isMobile && <HomeNavbar />}
      <div className="form-container">
        <div className="form-inner-container">
          <button className="back-btn" onClick={() => navigate('/home')}>
            <IconArrowLeft size={16} />
            <span>Back</span>
          </button>

          <section className="form-intro">
            <div className="intro-content">
              <div className="intro-text">
                <h1>
                  {INTRO_COPY.title}
                  <img src={logoFace} alt="Tao Face" className="intro-title-logo" />
                </h1>
                <p>{INTRO_COPY.body}</p>
                <div className="intro-actions">
                  <button className="btn-primary" onClick={() => navigate('question/1')}>
                    Start
                  </button>
                  <span className="intro-hint">{INTRO_COPY.hint}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <MobileNavBar />
    </div>
  );
};
