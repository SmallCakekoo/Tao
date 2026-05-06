import { supabase } from '../lib/supabaseClient';

// Obtiene el usuario autenticado actual desde la sesión local de Supabase
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

// Obtiene el perfil del usuario desde la tabla 'profiles' (si existe en tu base de datos)
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

// Cierra la sesión
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
