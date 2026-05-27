import type { MemoryCard as MemoryCardType } from '../../../types/MemoryGametTypes';
import './MemoryCard.css';

interface Props {
  card: MemoryCardType;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export const MemoryCard = ({ card, isFlipped, isMatched, onClick }: Props) => {
  const faceUp = isFlipped || isMatched;

  return (
    <div
      className={`memory-card ${faceUp ? 'memory-card--flipped' : ''} ${isMatched ? 'memory-card--matched' : ''}`}
      onClick={!isMatched ? onClick : undefined}
      aria-label={faceUp ? card.name : 'Carta oculta'}
      role="button"
    >
      <div className="memory-card__inner">
        <div className="memory-card__back">
          <span className="memory-card__back-icon">🌿</span>
        </div>
        <div className="memory-card__front">
          <img src={card.img} alt={card.name} draggable={false} />
        </div>
      </div>
    </div>
  );
};