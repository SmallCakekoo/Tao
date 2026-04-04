import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import type {
  FormOutletContext,
  FormQuestion as FormQuestionType,
  DailyQuestionId,
} from '../../../types/FormTypes';
import '../Form.css';
import './FormQuestion.css';

const FORM_QUESTIONS = [
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
] satisfies FormQuestionType[];

const FORM_FACE_MAP = {
  awful: new URL('../../../assets/stickers/awful.svg', import.meta.url).href,
  bad: new URL('../../../assets/stickers/bad.svg', import.meta.url).href,
  neutral: new URL('../../../assets/stickers/neutral.svg', import.meta.url).href,
  good: new URL('../../../assets/stickers/good.svg', import.meta.url).href,
  great: new URL('../../../assets/stickers/great.svg', import.meta.url).href,
} as const;

export const FormQuestion = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { answers, setAnswers } = useOutletContext<FormOutletContext>();

  const parsedQuestionId = Number(questionId) as DailyQuestionId;
  const question = FORM_QUESTIONS.find((entry) => entry.id === parsedQuestionId);

  useEffect(() => {
    if (!question) {
      navigate('/form', { replace: true });
    }
  }, [navigate, question]);

  if (!question) {
    return null;
  }

  const selectedOption = answers[question.id];

  const handleBack = () => {
    if (question.id === 1) {
      navigate('/form');
      return;
    }

    navigate(`/form/question/${question.id - 1}`);
  };

  const handleNext = () => {
    if (question.id === FORM_QUESTIONS.length) {
      navigate('/form/results');
      return;
    }

    navigate(`/form/question/${question.id + 1}`);
  };

  return (
    <div className="form-page question-page">
      <div className="form-container">
        <div className="form-inner-container">
          <button className="back-btn" onClick={handleBack}>
            <IconArrowLeft size={16} />
            <span>Back</span>
          </button>

          <section className="form-question">
            <div className="progress-bar">
              {FORM_QUESTIONS.map((entry) => (
                <div
                  key={entry.id}
                  className={`progress-segment ${entry.id <= question.id ? 'active' : ''}`}
                />
              ))}
            </div>

            <div className="question-content">
              <h2>{question.title}</h2>
              <p className="question-subtitle">{question.subtitle}</p>

              {question.id === 3 ? (
                <div className="faces-list">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      className={`face-btn ${selectedOption === option ? 'selected' : ''}`}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [question.id]: option }))
                      }
                    >
                      <img
                        src={FORM_FACE_MAP[option as keyof typeof FORM_FACE_MAP]}
                        alt={option}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="options-list">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [question.id]: option }))
                      }
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
          </section>
        </div>
      </div>
    </div>
  );
};
