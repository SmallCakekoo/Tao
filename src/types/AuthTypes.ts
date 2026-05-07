import type { User, Session } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  name: string;
}

export type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
};
