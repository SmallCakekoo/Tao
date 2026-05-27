import { useMemoryGame } from '../../../contexts/MemoryGameContext';
import { MemoryCard } from '../MemoryCard/MemoryCard';
import { DIFFICULTY_CONFIG } from '../../../types/MemoryGametTypes';
import './MemoryBoard.css';

export const MemoryBoard = () => {
  const { state, flipCard, startGame, resetGame } = useMemoryGame();
  const { cards, flipped, matched, moves, status, difficulty } = state;

  const config = DIFFICULTY_CONFIG[difficulty];
  const totalPairs = cards.length / 2;

  return (
    <div className="memory-board">
      {/* ── HUD ── */}
      <div className="memory-board__hud">
        <div className="memory-board__stat">
          <span className="memory-board__stat-label">Pares</span>
          <span className="memory-board__stat-value">{matched.length}/{totalPairs}</span>
        </div>
        <span className="memory-board__difficulty">{config.label}</span>
        <div className="memory-board__stat">
          <span className="memory-board__stat-label">Intentos</span>
          <span className="memory-board__stat-value">{moves}</span>
        </div>
      </div>

      {/* ── Grid ── */}
      <div
        className="memory-board__grid"
        style={{ '--cols': config.cols } as React.CSSProperties}
      >
        {cards.map((card, index) => (
          <MemoryCard
            key={card.id}
            card={card}
            isFlipped={flipped.includes(index)}
            isMatched={matched.includes(card.pairId)}
            onClick={() => flipCard(index)}
          />
        ))}
      </div>

      {/* ── Win banner (inline, not a fixed overlay — the panel already is one) ── */}
      {status === 'won' && (
        <div className="memory-board__win-banner">
          <div className="memory-board__win-text">
            <p className="memory-board__win-title">¡You made it!</p>
            <p className="memory-board__win-desc">
              {moves} {moves === 1 ? 'attempt' : 'attempts'}
            </p>
          </div>
          <div className="memory-board__win-actions">
            <button
              className="memory-board__btn memory-board__btn--primary"
              onClick={() => startGame(difficulty)}
            >
              Again
            </button>
            <button
              className="memory-board__btn memory-board__btn--ghost"
              onClick={resetGame}
            >
              Change level
            </button>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      {status === 'playing' && (
        <div className="memory-board__footer">
          <button
            className="memory-board__btn memory-board__btn--ghost"
            onClick={() => startGame(difficulty)}
          >
            Restart
          </button>
          <button
            className="memory-board__btn memory-board__btn--ghost"
            onClick={resetGame}
          >
            Cambiar nivel
          </button>
        </div>
      )}
    </div>
  );
};