import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { AnimatedLine } from '../../components/Home/AnimatedLine/AnimatedLine';
import { PresetFeelingButton } from '../../components/Recommendations/PresetFeelingButton';
import logoFace from '../../assets/logo-face.svg';
import type { PresetFeeling } from '../../types/RecommendationTypes';
import tiredIcon from '../../assets/tired.png';
import stressedIcon from '../../assets/stressed.png';
import boredIcon from '../../assets/bored.png';
import hurtsIcon from '../../assets/hurts.png';
import distractedIcon from '../../assets/distracted.png';
import './RecommendationsShared.css';
import './RecommendationsPreset.css';

const PRESET_OPTIONS: Array<{ feeling: PresetFeeling; label: string; icon: string }> = [
  { feeling: 'tired', label: 'I feel tired', icon: tiredIcon },
  { feeling: 'stressed', label: 'I feel stressed', icon: stressedIcon },
  { feeling: 'bored', label: 'I feel bored', icon: boredIcon },
  { feeling: 'body-hurts', label: 'My body hurts', icon: hurtsIcon },
  { feeling: 'distracted', label: 'I feel distracted', icon: distractedIcon },
];

export const RecommendationsPreset = () => {
  const navigate = useNavigate();

  const selectFeeling = (feeling: PresetFeeling) => {
    navigate('/recommendations/loading', { state: { feeling } });
  };

  return (
    <div className="recommendations-page preset-page">
      <AnimatedLine />
      <main className="recommendations-main preset-main">
        <button
          className="recs-back preset-back"
          onClick={() => navigate('/recommendations')}
        >
          <IconArrowLeft size={16} />
          <span>Back</span>
        </button>

        <section className="preset-header">
          <img src={logoFace} alt="Tao face" />
          <h1>
            How do you feel right <span>now</span>?
          </h1>
          <p>Get a recommendation based on one of our preset options.</p>
        </section>

        <section className="preset-grid" aria-label="Preset feelings">
          {PRESET_OPTIONS.map((option) => (
            <PresetFeelingButton
              key={option.feeling}
              label={option.label}
              icon={option.icon}
              feeling={option.feeling}
              onSelect={selectFeeling}
            />
          ))}
        </section>
      </main>
    </div>
  );
};
