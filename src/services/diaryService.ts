  import { supabase } from "../lib/supabaseClient";
  import type { PromptKey } from "../types/PromptKey";
  
  export const fetchPrompts = async (prompt: PromptKey) => {
    const { data, error } = await supabase.from('prompts').select('*').eq('mood', prompt);

    if (error) {
      return [];
    }

    return data?.[0]?.prompts ?? [];
  };