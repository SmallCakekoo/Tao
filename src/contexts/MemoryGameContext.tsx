import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type PropsWithChildren,
} from 'react';

import type {
  MemoryCard,
  MemoryGameContextType,
  MemoryGameState,
  DifficultyLevel,
} from '../types/MemoryGametTypes';
import { DIFFICULTY_CONFIG } from '../types/MemoryGametTypes';


import breathe    from '../assets/breathe.png';
import meditation from '../assets/meditation.png';
import yoga       from '../assets/yoga.png';
import moon       from '../assets/moon.png';
import energy     from '../assets/energy.png';
import relaxPerson from '../assets/relax-person.png';
import bored      from '../assets/bored.png';
import distracted from '../assets/distracted.png';
import stressed   from '../assets/stressed.png';
import tired      from '../assets/tired.png';
import reflexion from '../assets/recs-images/1_reflexion.png';
import release_tension from '../assets/recs-images/2_selfcare_release_tension.png';
import nutrition from '../assets/recs-images/3_nutrition.png';
import shower from '../assets/recs-images//11_mindful_shower.png';
import social_connections from '../assets/recs-images/7_social_connections.png';


// ─── Card pool (10 unique images → supports up to hard level with 10 pairs) ──
const ALL_CARDS = [
  { name: 'breathe',     img: breathe },
  { name: 'meditation',  img: meditation },
  { name: 'yoga',        img: yoga },
  { name: 'moon',        img: moon },
  { name: 'energy',      img: energy },
  { name: 'relax',       img: relaxPerson },
  { name: 'bored',       img: bored },
  { name: 'distracted',  img: distracted },
  { name: 'stressed',    img: stressed },
  { name: 'tired',       img: tired },
  { name: 'reflexion',   img: reflexion },
  { name: 'release_tension', img: release_tension },
  { name: 'nutrition',   img: nutrition },
  { name: 'shower',      img: shower },
  { name: 'social_connections', img: social_connections },
];


function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildBoard(difficulty: DifficultyLevel): MemoryCard[] {
  const { totalCards } = DIFFICULTY_CONFIG[difficulty];
  const pairCount = totalCards / 2;

  // Pick the first `pairCount` images from the pool
  const selected = ALL_CARDS.slice(0, pairCount);

  // Duplicate each to create pairs, assign a shared pairId
  const doubled = selected.flatMap((card, pairId) => [
    { pairId, name: card.name, img: card.img },
    { pairId, name: card.name, img: card.img },
  ]);

  // Shuffle and assign a unique position id
  return shuffle(doubled).map((card, id) => ({ ...card, id }));
}

// Initial state

const INITIAL_STATE: MemoryGameState = {
  cards: [],
  flipped: [],
  matched: [],
  moves: 0,
  status: 'idle',
  difficulty: 'easy',
};

// Reducer 

type Action =
  | { type: 'START_GAME'; difficulty: DifficultyLevel }
  | { type: 'FLIP_CARD'; index: number }
  | { type: 'CHECK_MATCH' }
  | { type: 'RESET_FLIPPED' }
  | { type: 'RESET_GAME' };

function reducer(state: MemoryGameState, action: Action): MemoryGameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...INITIAL_STATE,
        cards: buildBoard(action.difficulty),
        difficulty: action.difficulty,
        status: 'playing',
      };

    case 'FLIP_CARD': {
      // Ignore if card is already matched or flipped, or two are already showing
      const card = state.cards[action.index];
      if (
        state.matched.includes(card.pairId) ||
        state.flipped.includes(action.index) ||
        state.flipped.length === 2
      ) {
        return state;
      }
      return { ...state, flipped: [...state.flipped, action.index] };
    }

    case 'CHECK_MATCH': {
      const [a, b] = state.flipped;
      const cardA = state.cards[a];
      const cardB = state.cards[b];
      const isMatch = cardA.pairId === cardB.pairId;

      const newMatched = isMatch
        ? [...state.matched, cardA.pairId]
        : state.matched;

      const totalPairs = state.cards.length / 2;
      const won = newMatched.length === totalPairs;

      return {
        ...state,
        matched: newMatched,
        flipped: [],
        moves: state.moves + 1,
        status: won ? 'won' : 'playing',
      };
    }

    case 'RESET_FLIPPED':
      return { ...state, flipped: [] };

    case 'RESET_GAME':
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

// Context

export const MemoryGameContext = createContext<MemoryGameContextType | undefined>(
  undefined
);

export const MemoryGameProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const startGame = useCallback((difficulty: DifficultyLevel) => {
    dispatch({ type: 'START_GAME', difficulty });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const flipCard = useCallback(
    (index: number) => {
      dispatch({ type: 'FLIP_CARD', index });

      // After flipping, if this would be the 2nd card, schedule the match check
      const newFlipped = [...state.flipped, index];
      if (newFlipped.length === 2) {
        setTimeout(() => {
          dispatch({ type: 'CHECK_MATCH' });
        }, 700);
      }
    },
    [state.flipped]
  );

  return (
    <MemoryGameContext.Provider value={{ state, flipCard, startGame, resetGame }}>
      {children}
    </MemoryGameContext.Provider>
  );
};

export const useMemoryGame = () => {
  const context = useContext(MemoryGameContext);
  if (context === undefined) {
    throw new Error('useMemoryGame must be used inside <MemoryGameProvider>');
  }
  return context;
};