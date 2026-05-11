import type {
  FCategory,
  ECategory,
  CCategory,
  Macrostate,
  DailyCheckinScores,
  CalculatedCheckin,
} from '../types/CheckinTypes';

/**
 * Calculates the Physiological category (F) based on energy and sleep.
 * Range: 0-6.
 */
export const computeFCategory = (
  energy: number,
  sleep: number
): { score: number; category: FCategory } => {
  const score = energy + sleep;
  let category: FCategory = 'F1';

  if (score <= 1) category = 'F1';
  else if (score <= 3) category = 'F2';
  else if (score <= 5) category = 'F3';
  else category = 'F4';

  return { score, category };
};

/**
 * Calculates the Emotional category (E) based on mood and stress.
 */
export const computeECategory = (
  mood: number,
  stress: number
): { score: number; category: ECategory } => {
  const score = mood + (3 - stress);
  let category: ECategory = 'E1';

  const isLowMood = mood <= 1;
  const isHighStress = stress >= 2;
  const isMediumStress = stress === 1;

  if (isHighStress && isLowMood) {
    category = 'E4';
  } else if (isHighStress || (isMediumStress && isLowMood)) {
    category = 'E3';
  } else if ((stress === 0 && isLowMood) || (isMediumStress && mood > 1)) {
    category = 'E2';
  } else {
    category = 'E1';
  }

  return { score, category };
};

/**
 * Calculates the Load category (C) based on daily load score.
 */
export const computeCCategory = (
  load: number
): { score: number; category: CCategory } => {
  const score = load;
  const category: CCategory = load >= 2 ? 'C2' : 'C1';
  return { score, category };
};

/**
 * Computes the Macrostate based on F, E, C categories and raw stress.
 */
export const computeMacrostate = (
  f: FCategory,
  e: ECategory,
  c: CCategory,
  stress: number
): Macrostate => {
  if (f === 'F1') return 'Exhausted';
  if (e === 'E4') return 'Stressed';

  if (c === 'C2' && (e === 'E3' || stress >= 1)) {
    return 'Overloaded';
  }

  if ((f === 'F3' || f === 'F4') && c === 'C1' && (e === 'E1' || e === 'E2')) {
    return 'Productive';
  }

  return 'Balanced';
};

/**
 * Main function to calculate all daily check-in metrics.
 * face_result is NOT calculated here — it comes directly from the user's selection in the form.
 */
export const calculateDailyCheckin = (
  scores: DailyCheckinScores
): Omit<CalculatedCheckin, 'face_result'> => {
  const { score: f_score, category: f_category } = computeFCategory(
    scores.energy_score,
    scores.sleep_score
  );
  const { score: e_score, category: e_category } = computeECategory(
    scores.mood_score,
    scores.stress_score
  );
  const { score: c_score, category: c_category } = computeCCategory(
    scores.daily_load_score
  );

  const macrostate = computeMacrostate(
    f_category,
    e_category,
    c_category,
    scores.stress_score
  );

  return {
    f_score,
    f_category,
    e_score,
    e_category,
    c_score,
    c_category,
    macrostate,
  };
};
