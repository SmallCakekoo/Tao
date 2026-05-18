import './MemoryScorebar.css';
import type { MemoryGameState } from '../../../types/MemoryGametTypes';

interface MemoryScorebarProps {
  state: MemoryGameState;
  onClose: () => void;
}

export const MemoryScorebar = ({ state, onClose }: MemoryScorebarProps) => {
  const [p1, p2] = state.players;

  return (
    <div className="memory-scorebar">
      {/* Jugador 1 */}
      <div className={`memory-scorebar-player ${p1.isActive ? 'memory-scorebar-player--active' : ''}`}>
        <span className="memory-scorebar-icon">
          {state.mode === '1vsCPU' ? '🧠' : '🧠'}
        </span>
        <div className="memory-scorebar-info">
          <span className="memory-scorebar-name">{p1.name}</span>
          {p1.isActive && (
            <span className="memory-scorebar-badge">Your turn</span>
          )}
        </div>
        <strong className="memory-scorebar-score">{p1.score}</strong>
      </div>

      {/* Centro */}
      <div className="memory-scorebar-center">
        {state.cpuThinking
          ? <span className="memory-scorebar-thinking">thinking…</span>
          : <span className="memory-scorebar-vs">vs</span>
        }
        <button
          type="button"
          className="memory-scorebar-close"
          onClick={onClose}
          aria-label="Close game"
        >
          ✕
        </button>
      </div>

      {/* Jugador 2 */}
      <div className={`memory-scorebar-player memory-scorebar-player--right ${p2.isActive ? 'memory-scorebar-player--active' : ''}`}>
        <strong className="memory-scorebar-score">{p2.score}</strong>
        <div className="memory-scorebar-info memory-scorebar-info--right">
          <span className="memory-scorebar-name">{p2.name}</span>
          {p2.isActive && (
            <span className="memory-scorebar-badge">
              {state.cpuThinking ? '...' : 'Turn'}
            </span>
          )}
        </div>
        <span className="memory-scorebar-icon">
          {state.mode === '1vsCPU' ? '🤖' : '👾'}
        </span>
      </div>
    </div>
  );
};