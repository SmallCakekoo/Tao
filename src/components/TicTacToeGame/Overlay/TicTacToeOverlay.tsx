import { useEffect } from 'react';
import { TicTacToeProvider, useTicTacToe } from '../../../contexts/TicTacToeContext';
import { TicTacToeBoard } from '../Board/TicTacToeBoard';
import './TicTacToeOverlay.css';

interface Props {
  onClose: () => void;
}

const TicTacToeContent = ({ onClose }: Props) => {
  const { state, resetAll } = useTicTacToe();

  // Close with Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    resetAll();
    onClose();
  };

  const titleLabel =
    state.status === 'idle'
      ? 'TicTacToe'
      : state.mode === '1vsCPU'
      ? 'TicTacToe · vs CPU'
      : 'TicTacToe · vs Amigo';

  return (
    <div
      className="ttt-overlay__backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="TicTacToe"
    >
      <div className="ttt-overlay__panel">
        {/* Header */}
        <div className="ttt-overlay__header">
          <span className="ttt-overlay__title">{titleLabel}</span>
          <button
            className="ttt-overlay__close"
            onClick={handleClose}
            aria-label="Cerrar juego"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="ttt-overlay__content">
          <TicTacToeBoard />
        </div>
      </div>
    </div>
  );
};

// Exported with its own provider — Profile no necesita saber nada del contexto
export const TicTacToeOverlay = ({ onClose }: Props) => (
  <TicTacToeProvider>
    <TicTacToeContent onClose={onClose} />
  </TicTacToeProvider>
);