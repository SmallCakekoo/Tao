import './MemoryResultOverlay.css';
import type { MemoryGameState } from '../../../types/MemoryGametTypes';

interface MemoryResultOverlayProps {
  state: MemoryGameState;
  onPlayAgain: () => void;
  onClose: () => void;
}

export const MemoryResultOverlay = ({
  state,
  onPlayAgain,
  onClose,
}: MemoryResultOverlayProps) => {
  const [p1, p2] = state.players;
  const isDraw = p1.score === p2.score;
  const winner = p1.score > p2.score ? p1 : p2;

  return (
    <div className="memory-result-backdrop" role="dialog" aria-modal="true">
      <section className="memory-result-card" aria-labelledby="memory-result-title">
        <h2 id="memory-result-title">
          {isDraw ? "It's a tie!" : `${winner.name} wins!`}
        </h2>
        <p className="memory-result-copy">
          {isDraw
            ? 'Great game, both players played equally well.'
            : `Well played! Keep training your memory.`}
        </p>

        <div className="memory-result-scores" aria-label="Final scores">
          <div className={p1.score >= p2.score ? 'memory-result-scores--highlight' : ''}>
            <strong>{p1.score}</strong>
            <span>{p1.name}</span>
          </div>
          <div className={p2.score >= p1.score ? 'memory-result-scores--highlight' : ''}>
            <strong>{p2.score}</strong>
            <span>{p2.name}</span>
          </div>
        </div>

        <div className="memory-result-actions">
          <button
            type="button"
            className="memory-result-secondary"
            onClick={onClose}
          >
            Leave game
          </button>
          <button
            type="button"
            className="memory-result-primary"
            onClick={onPlayAgain}
          >
            Play again
          </button>
        </div>
      </section>
    </div>
  );
};