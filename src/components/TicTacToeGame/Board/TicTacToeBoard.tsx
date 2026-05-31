import { useTicTacToe } from '../../../contexts/TicTacToeContext';
import type { GameMode } from '../../../types/TicTacToeTypes';
import './TicTacToeBoard.css';

// ─── Mode selector ────────────────────────────────────────────────────────────

const ModeSelector = () => {
  const { startGame } = useTicTacToe();

  const modes: { id: GameMode; icon: string; label: string; desc: string }[] = [
    { id: '1vsCPU', icon: '🤖', label: 'vs CPU',   desc: 'Juega contra el bot' },
    { id: '1vs1',   icon: '🧑‍🤝‍🧑', label: 'vs Amigo', desc: 'Dos jugadores, un dispositivo' },
  ];

  return (
    <div className="ttt-mode-selector">
      <p className="ttt-mode-selector__subtitle">Elige un modo para comenzar</p>
      <div className="ttt-mode-selector__options">
        {modes.map((m) => (
          <button
            key={m.id}
            className="ttt-mode-selector__option"
            onClick={() => startGame(m.id)}
          >
            <span className="ttt-mode-selector__icon">{m.icon}</span>
            <div className="ttt-mode-selector__text">
              <span className="ttt-mode-selector__label">{m.label}</span>
              <span className="ttt-mode-selector__desc">{m.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Board ────────────────────────────────────────────────────────────────────

export const TicTacToeBoard = () => {
  const { state, selectCell, resetRound, resetAll } = useTicTacToe();
  const { board, currentPlayer, status, winner, winningCells, mode, scores } = state;

  const isBotThinking = mode === '1vsCPU' && currentPlayer === 'O' && status === 'playing';
  const isDisabled = status !== 'playing' || isBotThinking;

  const statusText = () => {
    if (status === 'won') return winner === 'X' ? '¡Ganaste! 🎉' : mode === '1vsCPU' ? 'Ganó el bot 🤖' : '¡Ganó O! 🎉';
    if (status === 'draw') return '¡Empate! 🤝';
    if (isBotThinking) return 'El bot está pensando...';
    return `Turno de ${currentPlayer === 'X' ? 'X' : mode === '1vsCPU' ? 'bot (O)' : 'O'}`;
  };

  if (status === 'idle') return <ModeSelector />;

  return (
    <div className="ttt-board">
      {/* Scoreboard */}
      <div className="ttt-scoreboard">
        <div className={`ttt-score ttt-score--x ${currentPlayer === 'X' && status === 'playing' ? 'ttt-score--active' : ''}`}>
          <span className="ttt-score__symbol">✕</span>
          <span className="ttt-score__points">{scores.X}</span>
          <span className="ttt-score__label">Tú</span>
        </div>

        <div className="ttt-status">{statusText()}</div>

        <div className={`ttt-score ttt-score--o ${currentPlayer === 'O' && status === 'playing' ? 'ttt-score--active' : ''}`}>
          <span className="ttt-score__symbol">○</span>
          <span className="ttt-score__points">{scores.O}</span>
          <span className="ttt-score__label">{mode === '1vsCPU' ? 'Bot' : 'Amigo'}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="ttt-grid" aria-label="Tablero de TicTacToe">
        {board.map((cell, i) => {
          const isWinning = winningCells.includes(i);
          return (
            <button
              key={i}
              className={[
                'ttt-cell',
                cell === 'X' ? 'ttt-cell--x' : cell === 'O' ? 'ttt-cell--o' : '',
                isWinning ? 'ttt-cell--winning' : '',
                !cell && !isDisabled ? 'ttt-cell--hoverable' : '',
              ].join(' ')}
              onClick={() => selectCell(i)}
              disabled={!!cell || isDisabled}
              aria-label={cell ? `Celda ${i + 1}: ${cell}` : `Celda ${i + 1}: vacía`}
            >
              {cell === 'X' && <span className="ttt-cell__mark">✕</span>}
              {cell === 'O' && <span className="ttt-cell__mark">○</span>}
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="ttt-actions">
        <button className="ttt-btn ttt-btn--ghost" onClick={resetRound}>
          Nueva partida
        </button>
        <button className="ttt-btn ttt-btn--ghost" onClick={resetAll}>
          Cambiar modo
        </button>
      </div>
    </div>
  );
};