import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  name: string;
}

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

export type CreateAccountParams = {
  id: string;
  name: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  name: string;
};

export type SignInParams = {
  email: string;
  password: string;
};
