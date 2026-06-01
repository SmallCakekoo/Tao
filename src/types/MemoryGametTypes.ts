// ─── Difficulty Levels ───────────────────────────────────────────────────────

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  label: string;
  totalCards: number; // includes pairs (e.g. 10 cards = 5 pairs)
  cols: number;       // CSS grid columns
}

export const DIFFICULTY_CONFIG: Record<DifficultyLevel, DifficultyConfig> = {
  easy:   { label: 'Fácil',   totalCards: 10, cols: 5 },
  medium: { label: 'Medio',   totalCards: 16, cols: 4 },
  hard:   { label: 'Difícil', totalCards: 20, cols: 5 },
};

// ─── Card ────────────────────────────────────────────────────────────────────

export interface MemoryCard {
  id: number;       // unique position index in the shuffled board
  pairId: number;   // shared by the two cards that form a pair
  name: string;     // asset name used as alt text
  img: string;      // imported asset path
}

// ─── Game State ──────────────────────────────────────────────────────────────

export type GameStatus = 'idle' | 'playing' | 'won';

export interface MemoryGameState {
  cards: MemoryCard[];
  flipped: number[];       // indices of currently face-up (unmatched) cards
  matched: number[];       // pairIds that have been matched
  moves: number;
  status: GameStatus;
  difficulty: DifficultyLevel;
}

// ─── Context ─────────────────────────────────────────────────────────────────

export interface MemoryGameContextType {
  state: MemoryGameState;
  flipCard: (index: number) => void;
  startGame: (difficulty: DifficultyLevel) => void;
  resetGame: () => void;
}