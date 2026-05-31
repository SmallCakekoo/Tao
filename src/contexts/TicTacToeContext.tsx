import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type PropsWithChildren,
} from 'react';

import type {
  Cell,
  Player,
  TicTacToeContextType,
  TicTacToeState,
  GameMode,
} from '../types/TicTacToeTypes';

// ─── Win patterns ─────────────────────────────────────────────────────────────

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diagonals
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function checkWinner(board: Cell[]): { winner: Player; cells: number[] } | null {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, cells: [a, b, c] };
    }
  }
  return null;
}

function isDraw(board: Cell[]): boolean {
  return board.every((cell) => cell !== null) && !checkWinner(board);
}

// ─── Bot logic (same strategy as original code) ───────────────────────────────

function findWinningMove(board: Cell[], player: Player): number {
  for (const [a, b, c] of WIN_PATTERNS) {
    const line = [board[a], board[b], board[c]];
    const indices = [a, b, c];
    const playerCount = line.filter((v) => v === player).length;
    const emptyIdx = indices.find((i) => board[i] === null);
    if (playerCount === 2 && emptyIdx !== undefined) return emptyIdx;
  }
  return -1;
}

function getBotMove(board: Cell[]): number {
  // 1. Win if possible
  const win = findWinningMove(board, 'O');
  if (win !== -1) return win;

  // 2. Block player from winning
  const block = findWinningMove(board, 'X');
  if (block !== -1) return block;

  // 3. Take center
  if (board[4] === null) return 4;

  // 4. Take a corner
  const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

  // 5. Take any available cell
  const available = board.map((v, i) => (v === null ? i : -1)).filter((i) => i !== -1);
  return available[Math.floor(Math.random() * available.length)];
}

// ─── Initial state ────────────────────────────────────────────────────────────

const EMPTY_BOARD: Cell[] = Array(9).fill(null);

const INITIAL_STATE: TicTacToeState = {
  board: EMPTY_BOARD,
  currentPlayer: 'X',
  status: 'idle',
  winner: null,
  winningCells: [],
  mode: '1vsCPU',
  scores: { X: 0, O: 0 },
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'START_GAME'; mode: GameMode }
  | { type: 'SELECT_CELL'; index: number }
  | { type: 'BOT_MOVE' }
  | { type: 'RESET_ROUND' }
  | { type: 'RESET_ALL' };

function reducer(state: TicTacToeState, action: Action): TicTacToeState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...INITIAL_STATE,
        mode: action.mode,
        scores: state.scores, // keep scores across rounds when mode doesn't change
        status: 'playing',
      };

    case 'SELECT_CELL': {
      const { board, currentPlayer, status } = state;
      if (status !== 'playing' || board[action.index] !== null) return state;

      const newBoard = [...board];
      newBoard[action.index] = currentPlayer;

      const result = checkWinner(newBoard);
      if (result) {
        return {
          ...state,
          board: newBoard,
          status: 'won',
          winner: result.winner,
          winningCells: result.cells,
          scores: {
            ...state.scores,
            [result.winner]: state.scores[result.winner] + 1,
          },
        };
      }

      if (isDraw(newBoard)) {
        return { ...state, board: newBoard, status: 'draw' };
      }

      return {
        ...state,
        board: newBoard,
        currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      };
    }

    case 'BOT_MOVE': {
      if (state.status !== 'playing' || state.currentPlayer !== 'O') return state;

      const index = getBotMove(state.board);
      const newBoard = [...state.board];
      newBoard[index] = 'O';

      const result = checkWinner(newBoard);
      if (result) {
        return {
          ...state,
          board: newBoard,
          status: 'won',
          winner: result.winner,
          winningCells: result.cells,
          scores: {
            ...state.scores,
            O: state.scores.O + 1,
          },
        };
      }

      if (isDraw(newBoard)) {
        return { ...state, board: newBoard, status: 'draw' };
      }

      return { ...state, board: newBoard, currentPlayer: 'X' };
    }

    case 'RESET_ROUND':
      return {
        ...state,
        board: EMPTY_BOARD,
        currentPlayer: 'X',
        status: 'playing',
        winner: null,
        winningCells: [],
      };

    case 'RESET_ALL':
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const TicTacToeContext = createContext<TicTacToeContextType | undefined>(undefined);

export const TicTacToeProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Bot move: triggers whenever it's O's turn in CPU mode
  useEffect(() => {
    if (state.mode === '1vsCPU' && state.currentPlayer === 'O' && state.status === 'playing') {
      const timeout = setTimeout(() => {
        dispatch({ type: 'BOT_MOVE' });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [state.currentPlayer, state.mode, state.status]);

  const selectCell = useCallback((index: number) => {
    dispatch({ type: 'SELECT_CELL', index });
  }, []);

  const startGame = useCallback((mode: GameMode) => {
    dispatch({ type: 'START_GAME', mode });
  }, []);

  const resetRound = useCallback(() => {
    dispatch({ type: 'RESET_ROUND' });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: 'RESET_ALL' });
  }, []);

  return (
    <TicTacToeContext.Provider value={{ state, selectCell, startGame, resetRound, resetAll }}>
      {children}
    </TicTacToeContext.Provider>
  );
};

export const useTicTacToe = () => {
  const context = useContext(TicTacToeContext);
  if (context === undefined) {
    throw new Error('useTicTacToe must be used inside <TicTacToeProvider>');
  }
  return context;
};