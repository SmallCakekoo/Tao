// Why use Context here?
// The authenticated user is a global state for the entire application. It is needed in:
// 1. Protected routes (to redirect to login if no active session).
// 2. UI components like the Navbar, to show the username or profile picture.
// 3. Different views (Home, Profile, Forms) that need the user ID for requests or saving data.
// Using Context avoids passing the session or user through "props" from component to component.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import { supabase } from "../lib/supabaseClient";
import { getUserProfile } from "../services/authService";
import type { User, Session } from "@supabase/supabase-js";
import type { UserProfile, AuthContextType } from "../types/AuthTypes";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to handle state when session changes
  const handleSession = async (currentSession: Session | null) => {
    setSession(currentSession);
    const currentUser = currentSession?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      try {
        // Get profile using the service we created
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
    // 1. Get current session when loading the app for the first time
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // 2. Listen for auth state changes 
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

// Custom hook to use authentication easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
