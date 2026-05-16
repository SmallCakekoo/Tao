export type GameMode = '1vsCPU' | '1vs1';
export type GridSize = '3x3' | '4x4' | '5x5';
export type Player = 1 | 2;

export interface MemoryCard {
  id: number;
  image: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface PlayerState {
  name: string;
  score: number;
  isActive: boolean;
}

export interface MemoryGameState {
  mode: GameMode;
  gridSize: GridSize;
  cards: MemoryCard[];
  players: [PlayerState, PlayerState];
  currentPlayer: Player;
  selectedCards: number[];
  isLocked: boolean;
  isFinished: boolean;
  cpuThinking: boolean;
}