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
  entryId: string,
  recommendationId: string,
  currentRecommendations: string[]
) => {

  const updated = [
    ...currentRecommendations,
    recommendationId,
  ];

  const { error } =
    await supabase
      .from("journal_entries")
      .update({
        saved_recommendations:
          updated,
      })
      .eq("id", entryId);

  if (error) throw error;
};