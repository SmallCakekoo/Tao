import { supabase } from '../lib/supabaseClient';
import type {
  DailyCheckinScores,
  CalculatedCheckin,
  FullDailyCheckin,
} from '../types/CheckinTypes';

export const saveDailyCheckin = async (
  scores: DailyCheckinScores,
  results: CalculatedCheckin,
  date?: string
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'No user found' };

  const d = date ? new Date(date) : new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const { error } = await supabase.from('daily_checkins').upsert(
    {
      user_id: user.id,
      checkin_date: today,
      // Raw Scores
      energy_score: scores.energy_score,
      sleep_score: scores.sleep_score,
      mood_score: scores.mood_score,
      stress_score: scores.stress_score,
      daily_load_score: scores.daily_load_score,
      // Categories & Results
      f_category: results.f_category,
      e_category: results.e_category,
      c_category: results.c_category,
      macrostate: results.macrostate,
      face_result: results.face_result,
    },
    { onConflict: 'user_id,checkin_date' }
  );

  if (error) {
    console.error('Error saving check-in:', error);
    return { success: false, error };
  }

  return { success: true };
};

export const getTodaysCheckin = async (): Promise<FullDailyCheckin | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const { data, error } = await supabase
    .from('daily_checkins')
    .select('*')
    .eq('user_id', user.id)
    .eq('checkin_date', today)
    .maybeSingle();

  if (error) {
    console.error("Error fetching today's check-in:", error);
    return null;
  }

  return data;
};

export const getWeeklyCheckins = async (): Promise<FullDailyCheckin[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  // Calcular lunes y domingo de la semana actual
  const today = new Date();
  const currentDay = today.getDay();
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const format = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const { data, error } = await supabase
    .from('daily_checkins')
    .select('*')
    .eq('user_id', user.id)
    .gte('checkin_date', format(monday))
    .lte('checkin_date', format(sunday))
    .order('checkin_date', { ascending: true });

  if (error) {
    console.error('Error fetching weekly check-ins:', error);
    return [];
  }

  return data ?? [];
};
