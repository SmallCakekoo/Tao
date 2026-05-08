
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import { supabase } from "../lib/supabaseClient";
import { getUserProfile } from "../services/profileService";
import type { User, Session } from "@supabase/supabase-js";
import type { UserProfile, AuthContextType } from "../types/AuthTypes";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSession = async (currentSession: Session | null) => {
    setSession(currentSession);
    const currentUser = currentSession?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      try {
        const userProfile = await getUserProfile(currentUser.id);
        setProfile(userProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      }
    } else {
      setProfile(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
