// ¿Por qué usar Context aquí?
// El usuario autenticado es un estado global de toda la aplicación. Se necesita en:
// 1. Rutas protegidas (para redirigir al login si no hay sesión iniciada).
// 2. Componentes UI como el Navbar, para mostrar el nombre o foto de perfil del usuario.
// 3. Diferentes vistas (Home, Profile, Formularios) que necesitan el ID del usuario para hacer peticiones o guardar datos en la base de datos.
// Usar Context evita tener que pasar la sesión o el usuario por "props" componente por componente.

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

type AuthContextType = {
  user: User | null;
  profile: any | null; // Tipar esto según tu tabla de perfiles
  session: Session | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Función auxiliar para manejar el estado cuando cambia la sesión
  const handleSession = async (currentSession: Session | null) => {
    setSession(currentSession);
    const currentUser = currentSession?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      try {
        // Obtenemos el perfil usando el servicio que creamos
        const userProfile = await getUserProfile(currentUser.id);
        setProfile(userProfile);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        setProfile(null);
      }
    } else {
      setProfile(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    // 1. Obtener la sesión actual al cargar la app por primera vez
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // 2. Escuchar cambios de estado en la autenticación 
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

// Hook personalizado para usar la autenticación más fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
