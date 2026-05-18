import './MemoryGame.css';
import { useState, useCallback, useRef } from 'react';
import { useError } from '../../../contexts/ErrorContext';
import {
  buildCards,
  cpuForgetAll,
  cpuRemember,
  cpuChooseCards,
  getGridCols,
} from '../../../utils/memoryGameLogic';
import type {
  GameMode,
  GridSize,
  MemoryGameState,
  Player,
} from '../../../types/MemoryGametTypes';
import { MemoryScorebar } from './MemoryScorebar';
import { MemoryBoard } from './MemoryBoard';
import { MemoryResultOverlay } from './MemoryResultOverlay';

interface MemoryGameProps {
  mode: GameMode;
  gridSize: GridSize;
  onClose: () => void;
}

function createInitialState(mode: GameMode, gridSize: GridSize): MemoryGameState {
  cpuForgetAll();
  return {
    mode,
    gridSize,
    cards: buildCards(gridSize),
    players: [
      { name: mode === '1vsCPU' ? 'You' : 'Player 1', score: 0, isActive: true },
      { name: mode === '1vsCPU' ? 'CPU' : 'Player 2', score: 0, isActive: false },
    ],
    currentPlayer: 1,
    selectedCards: [],
    isLocked: false,
    isFinished: false,
    cpuThinking: false,
  };
}

function switchTurn(prev: MemoryGameState): MemoryGameState {
  const next: Player = prev.currentPlayer === 1 ? 2 : 1;
  return {
    ...prev,
    currentPlayer: next,
    players: prev.players.map((p, i) => ({
      ...p,
      isActive: i === next - 1,
    })) as MemoryGameState['players'],
  };
}

export const MemoryGame = ({ mode, gridSize, onClose }: MemoryGameProps) => {
  const { showError } = useError();
  const [state, setState] = useState<MemoryGameState>(() =>
    createInitialState(mode, gridSize)
  );
  const cpuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCpuTimer = () => {
    if (cpuTimer.current) clearTimeout(cpuTimer.current);
  };

  const restart = useCallback(() => {
    clearCpuTimer();
    setState(createInitialState(mode, gridSize));
  }, [mode, gridSize]);

  // ── Turno de la CPU ────────────────────────────────────────
  const runCpuTurn = useCallback(() => {
    clearCpuTimer();

    // Pausa breve para que se note que "piensa"
    cpuTimer.current = setTimeout(() => {
      setState((prev) => ({ ...prev, cpuThinking: true }));

      cpuTimer.current = setTimeout(() => {
        setState((prev) => {
          if (!prev.cpuThinking) return prev;
          try {
            const [firstId, secondId] = cpuChooseCards(prev.cards);
            const firstCard = prev.cards.find((c) => c.id === firstId)!;
            const secondCard = prev.cards.find((c) => c.id === secondId)!;

            cpuRemember(firstId, firstCard.image);
            cpuRemember(secondId, secondCard.image);

            const flipped = prev.cards.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isFlipped: true } : c
            );

            // Par correcto
            if (firstCard.pairId === secondCard.pairId) {
              const matched = flipped.map((c) =>
                c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
              );
              const newPlayers = prev.players.map((p, i) =>
                i === 1 ? { ...p, score: p.score + 1 } : p
              ) as MemoryGameState['players'];

              return {
                ...prev,
                cards: matched,
                selectedCards: [],
                players: newPlayers,
                isFinished: matched.every((c) => c.isMatched),
                cpuThinking: false,
              };
            }

            // CPU falla → mostrar cartas 950ms y voltear de vuelta
            cpuTimer.current = setTimeout(() => {
              setState((p) => ({
                ...switchTurn(p),
                cards: p.cards.map((c) =>
                  c.id === firstId || c.id === secondId
                    ? { ...c, isFlipped: false }
                    : c
                ),
                selectedCards: [],
                isLocked: false,
                cpuThinking: false,
              }));
            }, 950);

            return {
              ...prev,
              cards: flipped,
              selectedCards: [firstId, secondId],
              isLocked: true,
              cpuThinking: false,
            };
          } catch (err) {
            showError(err instanceof Error ? err.message : 'CPU error');
            return { ...prev, cpuThinking: false };
          }
        });
      }, 1100);
    }, 550);
  }, [showError]);

  // ── Voltear carta (jugador humano) ─────────────────────────
  const flipCard = useCallback(
    (cardId: number) => {
      setState((prev) => {
        if (prev.isLocked || prev.isFinished) return prev;
        if (prev.mode === '1vsCPU' && prev.currentPlayer === 2) return prev;

        const card = prev.cards.find((c) => c.id === cardId);
        if (!card || card.isFlipped || card.isMatched) return prev;
        if (prev.selectedCards.includes(cardId)) return prev;

        const newCards = prev.cards.map((c) =>
          c.id === cardId ? { ...c, isFlipped: true } : c
        );
        const newSelected = [...prev.selectedCards, cardId];
        cpuRemember(cardId, card.image);

        // Primera carta → esperar segunda
        if (newSelected.length < 2) {
          return { ...prev, cards: newCards, selectedCards: newSelected };
        }

        // Segunda carta → evaluar par
        const [firstId] = newSelected;
        const first = newCards.find((c) => c.id === firstId)!;
        const second = newCards.find((c) => c.id === cardId)!;

        if (first.pairId === second.pairId) {
          const matched = newCards.map((c) =>
            c.id === firstId || c.id === cardId ? { ...c, isMatched: true } : c
          );
          const newPlayers = prev.players.map((p, i) =>
            i === prev.currentPlayer - 1 ? { ...p, score: p.score + 1 } : p
          ) as MemoryGameState['players'];

          return {
            ...prev,
            cards: matched,
            selectedCards: [],
            players: newPlayers,
            isFinished: matched.every((c) => c.isMatched),
          };
        }

        // No hay match → bloquear, mostrar 900ms y cambiar turno
        setTimeout(() => {
          setState((p) => {
            const next = {
              ...switchTurn(p),
              cards: p.cards.map((c) =>
                c.id === firstId || c.id === cardId ? { ...c, isFlipped: false } : c
              ),
              selectedCards: [],
              isLocked: false,
            };
            if (next.mode === '1vsCPU' && next.currentPlayer === 2) {
              setTimeout(runCpuTurn, 0);
            }
            return next;
          });
        }, 900);

        return { ...prev, cards: newCards, selectedCards: newSelected, isLocked: true };
      });
    },
    [runCpuTurn]
  );

  const cols = getGridCols(state.gridSize);

  return (
    <div className="memory-backdrop" role="dialog" aria-modal="true" aria-label="Memory game">
      <div className="memory-panel">
        <MemoryScorebar state={state} onClose={onClose} />
        <MemoryBoard cards={state.cards} cols={cols} onFlip={flipCard} disabled={
          state.isLocked ||
          state.isFinished ||
          state.cpuThinking ||
          (state.mode === '1vsCPU' && state.currentPlayer === 2)
        } />
      </div>

      {state.isFinished && (
        <MemoryResultOverlay
          state={state}
          onPlayAgain={restart}
          onClose={onClose}
        />
      )}
    </div>
  );
};