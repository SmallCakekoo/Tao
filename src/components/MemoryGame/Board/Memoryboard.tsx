import './Memoryboard.css';
import type { MemoryCard } from '../../../types/MemoryGametTypes';
import { MemoryCardTile } from '../Cardtile/Memorycardtile';

interface MemoryBoardProps {
  cards: MemoryCard[];
  cols: number;
  onFlip: (id: number) => void;
  disabled: boolean;
}

export const MemoryBoard = ({ cards, cols, onFlip, disabled }: MemoryBoardProps) => {
  const visible = cards.filter((c) => c.image !== 'JOKER');

  return (
    <div
      className="memory-board"
      style={{ '--memory-cols': cols } as React.CSSProperties}
    >
      {visible.map((card) => (
        <MemoryCardTile
          key={card.id}
          card={card}
          onFlip={onFlip}
          disabled={disabled}
        />
      ))}
    </div>
  );
};