import { supabase } from "../lib/supabaseClient";

export const updateProfileName = async (userId: string, name: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ name })
    .eq("id", userId)
    .select();

  if (error) throw error;
  return data;
};

export const updateQuote = async (
  userId: string,
  quote: string,
  author: string
) => {
  const { data, error } = await supabase
    .from("quotes")
    .update({ quote, author })
    .eq("user_id", userId)
    .select();

  if (error) throw error;
  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};