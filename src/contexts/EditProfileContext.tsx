import { createContext, useContext, type PropsWithChildren } from 'react';

import { useAuth } from './AuthContext';
import { useProfile } from './ProfileContext';
import { useNavigate } from 'react-router-dom';
import {
  updateProfileName,
  updateQuote,
  signOutUser,
} from '../services/editProfileServices';
import type { EditProfileContextType } from '../types/ProfileTypes';

const EditProfileContext = createContext<EditProfileContextType | undefined>(undefined);

export const EditProfileProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const { profile, refreshProfile } = useProfile();
  const navigate = useNavigate();

  const userId = user?.id ?? '';
  const name = profile?.name ?? '';

  const updateName = async (newName: string) => {
    await updateProfileName(userId, newName);
    await refreshProfile();
  };

  const saveQuote = async (quote: string, author: string) => {
    await updateQuote(userId, quote, author);
  };

  const signOut = async () => {
    await signOutUser();
    navigate('/');
  };

  return (
    <EditProfileContext.Provider value={{ name, userId, updateName, saveQuote, signOut }}>
      {children}
    </EditProfileContext.Provider>
  );
};

export const useEditProfile = () => {
  const context = useContext(EditProfileContext);

  if (!context) {
    throw new Error('useEditProfile must be used within EditProfileProvider');
  }

  return context;
};
