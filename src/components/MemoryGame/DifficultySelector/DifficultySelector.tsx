import type { DifficultyLevel } from '../../../types/MemoryGametTypes';
import { DIFFICULTY_CONFIG } from '../../../types/MemoryGametTypes';
import { useMemoryGame } from '../../../contexts/MemoryGameContext';
import './DifficultySelector.css';
import easyIcon from '../../../assets/stickers/great.svg';
import mediumIcon from '../../../assets/stickers/neutral.svg';
import hardIcon from '../../../assets/stickers/bad.svg';

const DIFFICULTY_ICONS: Record<DifficultyLevel, string> = {
  easy:   easyIcon,
  medium: mediumIcon,
  hard:   hardIcon,
};

const DIFFICULTY_DESCRIPTIONS: Record<DifficultyLevel, string> = {
  easy:   '5 pares · 10 cartas',
  medium: '8 pares · 16 cartas',
  hard:   '10 pares · 20 cartas',
};

export const DifficultySelector = () => {
  const { startGame } = useMemoryGame();

  return (
    <div className="difficulty-selector">
      <p className="difficulty-selector__subtitle">
        Encuentra todas las parejas. Elige tu nivel para comenzar.
      </p>

      <div className="difficulty-selector__cards">
        {(Object.keys(DIFFICULTY_CONFIG) as DifficultyLevel[]).map((level) => (
          <button
            key={level}
            className={`difficulty-selector__option difficulty-selector__option--${level}`}
            onClick={() => startGame(level)}
          >
            <img
              src={DIFFICULTY_ICONS[level]}
              alt={level}
              className="difficulty-selector__icon"
            />
            <div className="difficulty-selector__text">
              <span className="difficulty-selector__label">
                {DIFFICULTY_CONFIG[level].label}
              </span>
              <span className="difficulty-selector__desc">
                {DIFFICULTY_DESCRIPTIONS[level]}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};