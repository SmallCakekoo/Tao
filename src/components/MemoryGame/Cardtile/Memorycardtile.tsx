import './Memorycardtile.css';
import type { MemoryCard } from '../../../types/MemoryGametTypes';

// Vite importa todas las imágenes de la carpeta y las convierte en URLs correctas
const images = import.meta.glob('../../../assets/recs-images/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function getImageUrl(filename: string): string {
  const key = `../../../assets/recs-images/${filename}`;
  return images[key] ?? '';
}

interface MemoryCardTileProps {
  card: MemoryCard;
  onFlip: (id: number) => void;
  disabled: boolean;
}

export const MemoryCardTile = ({ card, onFlip, disabled }: MemoryCardTileProps) => {
  const isClickable = !disabled && !card.isFlipped && !card.isMatched;

  return (
    <div
      className={[
        'memory-card',
        card.isFlipped || card.isMatched ? 'memory-card--flipped' : '',
        card.isMatched ? 'memory-card--matched' : '',
      ].join(' ')}
      role="button"
      tabIndex={isClickable ? 0 : -1}
      aria-label={card.isFlipped ? card.image.replace(/_/g, ' ').replace('.png', '') : 'Hidden card'}
      onClick={() => isClickable && onFlip(card.id)}
      onKeyDown={(e) => e.key === 'Enter' && isClickable && onFlip(card.id)}
    >
      <div className="memory-card-inner">
        <div className="memory-card-back">
          <span className="memory-card-back-icon">✦</span>
        </div>

        <div className="memory-card-front">
          <img
            src={getImageUrl(card.image)}
            alt={card.image.replace(/_/g, ' ').replace('.png', '')}
            className="memory-card-img"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};