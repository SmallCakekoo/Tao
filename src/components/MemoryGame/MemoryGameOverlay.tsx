import { useEffect } from 'react';
import { MemoryGameProvider, useMemoryGame } from '../../contexts/MemoryGameContext';
import { DifficultySelector } from './DifficultySelector/DifficultySelector';
import { MemoryBoard } from './Board/Memoryboard';
import './MemoryGameOverlay.css';

interface Props {
  onClose: () => void;
}

// Inner component that reads context
const MemoryGameContent = ({ onClose }: Props) => {
  const { state, resetGame } = useMemoryGame();

  // Close with Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    document.body.classList.add('overlay-open');
    return () => document.body.classList.remove('overlay-open');
  }, []);

  const handleClose = () => {
    resetGame();
    onClose();
  };

  return (
    <div
      className="mg-overlay__backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Memory Game"
    >
      <div className="mg-overlay__panel">
        {/* Header */}
        <div className="mg-overlay__header">
          <span className="mg-overlay__title">
            {state.status === 'idle' ? 'Memory Game' : `Memory · ${state.difficulty === 'easy' ? 'Fácil' : state.difficulty === 'medium' ? 'Medio' : 'Difícil'}`}
          </span>
          <button
            className="mg-overlay__close"
            onClick={handleClose}
            aria-label="Cerrar juego"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mg-overlay__content">
          {state.status === 'idle' ? <DifficultySelector /> : <MemoryBoard />}
        </div>
      </div>
    </div>
  );
};

// Exported wrapper — wraps its own provider so Profile doesn't need to know about it
export const MemoryGameOverlay = ({ onClose }: Props) => (
  <MemoryGameProvider>
    <MemoryGameContent onClose={onClose} />
  </MemoryGameProvider>
);
