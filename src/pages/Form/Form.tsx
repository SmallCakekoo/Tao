import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import './Form.css';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import logoFace from '../../assets/logo-face.svg';
import type {
  DailyFormAnswers,
  DailyQuestionId,
  FormQuestion,
  Step,
} from '../../types/RecommendationTypes';

// Import result images
import energyImg from '../../assets/energy.png';
import moonImg from '../../assets/moon.png';
import messImg from '../../assets/mess.png';
import faceImg from '../../assets/face.png';
import boxImg from '../../assets/box.png';

import awfulImg from '../../assets/stickers/awful.svg';
import badImg from '../../assets/stickers/bad.svg';
import neutralImg from '../../assets/stickers/neutral.svg';
import goodImg from '../../assets/stickers/good.svg';
import greatImg from '../../assets/stickers/great.svg';

const facesMap = {
  awful: awfulImg,
  bad: badImg,
  neutral: neutralImg,
  good: goodImg,
  great: greatImg,
};

export const Form = () => {
  const [step, setStep] = useState<Step>('intro');
  const [answers, setAnswers] = useState<DailyFormAnswers>({});
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 'intro') setStep(1);
    else if (typeof step === 'number' && step < 5) setStep((step + 1) as Step);
    else if (step === 5) setStep('results');
  };

  const handleBack = () => {
    if (step === 'intro') navigate('/home');
    else if (step === 1) setStep('intro');
    else if (typeof step === 'number') setStep((step - 1) as Step);
    else if (step === 'results') setStep(5);
  };

  const selectOption = (option: string) => {
    if (typeof step === 'number') {
      const questionId = step as DailyQuestionId;
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

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

  const questions: FormQuestion[] = [
    {
      id: 1,
      title: 'How does your body feel today?',
      subtitle: 'Check in with your body and your energy levels for the day.',
      options: ['Low energy', 'Medium energy', 'High energy', 'Very high energy'],
    },
    {
      id: 2,
      title: 'How much did you sleep?',
      subtitle: 'Think back on how many hours you slept.',
      options: ['0-3 Hours', '4-6 Hours', '7-9 Hours', '10+ Hours'],
    },
    {
      id: 3,
      title: 'How are you feeling today?',
      subtitle: 'Select which mood represents you best today.',
      options: ['awful', 'bad', 'neutral', 'good', 'great'],
    },
    {
      id: 4,
      title: 'How stressed do you feel today?',
      subtitle: 'Breathe and think about how your stress levels are today.',
      options: [
        'Low stress or no stress',
        'Medium stress',
        'High stress',
        'Very high stress',
      ],
    },
    {
      id: 5,
      title: 'How’s your daily load?',
      subtitle: 'Think about how heavy your work load feels today.',
      options: ['Light', 'Manageable', 'Heavy', 'Overwhelming'],
    },
  ];

  const renderIntro = () => (
    <div className="form-intro">
      <div className="intro-content">
        <div className="intro-text">
          <h1>
            Let's take a moment to check in.
            <img src={logoFace} alt="Tao Face" className="intro-title-logo" />
          </h1>
          <p>
            Let's observe how things feel today so far by doing a quick check-in and
            answering a few quick questions.
          </p>
          <div className="intro-actions">
            <button className="btn-primary" onClick={handleNext}>
              Start
            </button>
            <span className="intro-hint">You can edit your answers later.</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestion = () => {
    const q: FormQuestion | undefined = questions.find(
      (question: FormQuestion) => question.id === step
    );
    if (!q) return null;

    const selectedOption: string | undefined = answers[q.id as DailyQuestionId];

    return (
      <div className="form-question">
        <div className="progress-bar">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`progress-segment ${typeof step === 'number' && i <= step ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="question-content">
          <h2>{q.title}</h2>
          <p className="question-subtitle">{q.subtitle}</p>
          {q.id === 3 ? (
            <div className="faces-list">
              {q.options.map((option: string) => (
                <button
                  key={option}
                  className={`face-btn ${selectedOption === option ? 'selected' : ''}`}
                  onClick={() => selectOption(option)}
                >
                  <img src={facesMap[option as keyof typeof facesMap]} alt={option} />
                </button>
              ))}
            </div>
          ) : (
            <div className="options-list">
              {q.options.map((option: string) => (
                <button
                  key={option}
                  className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                  onClick={() => selectOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          <button
            className="btn-primary continue-btn"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="form-results">
      <div className="results-header">
        <h1>
          All done!
          <img src={logoFace} alt="Tao Face" className="results-title-logo" />
        </h1>
      </div>
      <div className="results-card">
        <h3>Today your body needs some rest</h3>
        <ul className="results-list">
          <li className="result-item">
            <div className="icon-wrapper">
              <img src={energyImg} alt="Energy" />
            </div>
            <div className="result-label">Energy level</div>
            <div className="result-val">Lower energy level than usual</div>
          </li>
          <li className="result-item">
            <div className="icon-wrapper">
              <img src={moonImg} alt="Sleep" />
            </div>
            <div className="result-label">Sleep time</div>
            <div className="result-val">Lower sleep hours than usual</div>
          </li>
          <li className="result-item">
            <div className="icon-wrapper">
              <img src={faceImg} alt="Mood" />
            </div>
            <div className="result-label">Mood</div>
            <div className="result-val">Lower mood than usual</div>
          </li>
          <li className="result-item">
            <div className="icon-wrapper">
              <img src={messImg} alt="Stress" />
            </div>
            <div className="result-label">Stress level</div>
            <div className="result-val">Higher stress level than usual</div>
          </li>
          <li className="result-item">
            <div className="icon-wrapper">
              <img src={boxImg} alt="Daily load" />
            </div>
            <div className="result-label">Daily load</div>
            <div className="result-val">Lower load than usual</div>
          </li>
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
    </div>
  );

  return (
    <div
      className={`form-page ${step === 'intro' ? 'intro-step' : ''} ${typeof step === 'number' ? 'question-step' : ''} ${step === 'results' ? 'results-step' : ''}`}
    >
      {(step === 'intro' || step === 'results') && <HomeNavbar />}
      <div className={`form-container ${typeof step === 'number' ? 'no-nav' : ''}`}>
        <div className="form-inner-container">
          <button className="back-btn" onClick={handleBack}>
            <IconArrowLeft size={16} />
            <span>Back</span>
          </button>
          {step === 'intro' && renderIntro()}
          {typeof step === 'number' && renderQuestion()}
          {step === 'results' && renderResults()}
        </div>
      </div>
    </div>
  );
};
