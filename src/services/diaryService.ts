import { supabase } from '../lib/supabaseClient';
import type { PromptKey } from '../types/PromptKey';
import type { SaveDiaryEntryParams } from '../types/DiaryEntryParams';
import { formatLocalDate } from '../utils/date';

export const fetchPrompts = async (prompt: PromptKey) => {
  const { data, error } = await supabase.from('prompts').select('*').eq('mood', prompt);

  if (error) {
    return [];
  }

  return data?.[0]?.prompts ?? [];
};

export const getDiaryEntryByDate = async (userId: string, date: Date) => {
  const formattedDate = formatLocalDate(date);

  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .eq('entry_date', formattedDate)
    .maybeSingle();

  if (error) {
    throw new Error('Could not fetch diary entry');
  }

  return data;
};

export const saveDiaryEntry = async ({
  userId,
  date,
  content,
  intention,
}: SaveDiaryEntryParams) => {
  const formattedDate = formatLocalDate(date);

  const { error } = await supabase.from('journal_entries').upsert(
  {
    user_id: userId,
    entry_date: formattedDate,
    content,
    intention,
    updated_at: new Date(),
  },
  {
    onConflict: "user_id,entry_date",
  }
)

  if (error) {
    throw new Error('Could not save diary entry');
  }
};

export const saveRecommendationToDiary = async (
  userId: string,
  date: Date,
  recommendationId: string
) => {
  const formattedDate =
    formatLocalDate(date);

  const { data } = await supabase
    .from('journal_entries')
    .select('saved_recommendations')
    .eq('user_id', userId)
    .eq('entry_date', formattedDate)
    .single();

  const current =
    data?.saved_recommendations ?? [];

  const updated = current.includes(recommendationId)
    ? current
    : [...current, recommendationId];

  const { error } = await supabase
    .from('journal_entries')
    .upsert(
      {
        user_id: userId,
        entry_date: formattedDate,
        saved_recommendations: updated,
        updated_at: new Date(),
      },
      {
        onConflict:
          'user_id,entry_date',
      }
    );

  if (error) {
    throw error;
  }
};