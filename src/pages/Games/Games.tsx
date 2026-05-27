import { useMemoryGame } from '../../contexts/MemoryGameContext';
import { DifficultySelector } from '../../components/MemoryGame/DifficultySelector/DifficultySelector';
import { MemoryBoard } from '../../components/MemoryGame/Board/Memoryboard';
import './Games.css';

/**
 * MemoryGame page
 *
 * Drop this page into your router, for example:
 *   <Route path="/memory" element={<MemoryGame />} />
 *
 * And wrap it (or wrap App) with <MemoryGameProvider>:
 *   import { MemoryGameProvider } from '../../contexts/MemoryGameContext';
 *   <MemoryGameProvider><MemoryGame /></MemoryGameProvider>
 */
export const MemoryGame = () => {
  const { state } = useMemoryGame();

  return (
    <main className="memory-game-page">
      {state.status === 'idle' ? <DifficultySelector /> : <MemoryBoard />}
    </main>
  );
};