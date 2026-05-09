import { supabase } from '../lib/supabaseClient';
import type { PromptKey } from '../types/PromptKey';
import type { SaveDiaryEntryParams } from '../types/DiaryEntryParams';

export const fetchPrompts = async (prompt: PromptKey) => {
  const { data, error } = await supabase.from('prompts').select('*').eq('mood', prompt);

  if (error) {
    return [];
  }

  return data?.[0]?.prompts ?? [];
};

export const getDiaryEntryByDate = async (userId: string, date: Date) => {
  const formattedDate = date.toISOString().split('T')[0];

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

export const saveDiaryEntry = async ({ userId, date, content, intention }: SaveDiaryEntryParams) => {
  const formattedDate = date.toISOString().split('T')[0];

  const { error } = await supabase.from('journal_entries').upsert({
    user_id: userId,
    entry_date: formattedDate,
    intention: intention,
    content,
    
    updated_at: new Date(),
  });

  if (error) {
    throw new Error('Could not save diary entry');
  }
};
