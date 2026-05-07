import { supabase } from '../lib/supabaseClient';
import type { SignUpParams } from '../types/AuthTypes';

export const signUpUser = async ({
  email,
  password,
  name,
}: SignUpParams) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error("User was not created");
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: data.user.id,
      name,
    });

  if (profileError) {
    throw profileError;
  }

  const { error: quoteError } = await supabase
    .from("quotes")
    .insert({
      quote:
        "The key is not to prioritize what's on your schedule, but to schedule your priorities",
      author: "Stephen Covey",
      user_id: data.user.id,
    });

  if (quoteError) {
    throw quoteError;
  }

  return data.user;
};

// Gets current authenticated user from local Supabase session
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

// Gets user profile from 'profiles' table
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

// Signs out current user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
