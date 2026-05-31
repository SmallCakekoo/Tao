// ─── Players ─────────────────────────────────────────────────────────────────

export type Player = 'X' | 'O';

export type Cell = Player | null;

// ─── Game state ───────────────────────────────────────────────────────────────

export type TicTacToeStatus = 'idle' | 'playing' | 'won' | 'draw';

export type GameMode = '1vsCPU' | '1vs1';

export interface TicTacToeState {
  board: Cell[];           // 9 cells, index 0-8
  currentPlayer: Player;
  status: TicTacToeStatus;
  winner: Player | null;
  winningCells: number[];  // indices of the three winning cells
  mode: GameMode;
  scores: Record<Player, number>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

export interface TicTacToeContextType {
  state: TicTacToeState;
  selectCell: (index: number) => void;
  startGame: (mode: GameMode) => void;
  resetRound: () => void;   // new round, keep scores
  resetAll: () => void;     // back to mode selector, clear scores
}