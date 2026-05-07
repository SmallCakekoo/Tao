import { supabase } from "../lib/supabaseClient";
import type { CreateAccountParams } from "../types/AuthTypes";


export const createAccount = async ({
  id,
  name,
}: CreateAccountParams) => {
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id,
      name,
    });

  if (profileError) throw profileError;

  const { error: quoteError } = await supabase
    .from("quotes")
    .insert({
      quote:
        "The key is not to prioritize what's on your schedule, but to schedule your priorities",
      author: "Stephen Covey",
      user_id: id,
    });

  if (quoteError) throw quoteError;
};