import { supabase } from '../lib/supabaseClient';
import type { SignInParams, SignUpParams } from '../types/AuthTypes';

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
    if (error.message.includes("User already registered")) {
      throw new Error("This email is already registered");
    }

    throw new Error("Could not create account");
  }

  if (!data.user) {
    throw new Error("User was not created");
  }

  return data.user;
};

export const signInUser = async ({email, password}: SignInParams) => {
  const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new Error('Hmm, that email or password doesn’t look right...');
      } else {
        throw new Error('Something went wrong, try again');
      }
    }
    return data.user;
}

// Gets current authenticated user from local Supabase session
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

// Signs out current user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
