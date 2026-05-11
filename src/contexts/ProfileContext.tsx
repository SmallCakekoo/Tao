import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

import { useAuth } from './AuthContext';
import { getUserProfile } from '../services/profileService';
import type { ProfileContextType } from '../types/ProfileTypes';
import type { UserProfile } from '../types/AuthTypes';

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loadingProfile, setLoadingProfile] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoadingProfile(false);
      return;
    }

    try {
      const data = await getUserProfile(user.id);
      setProfile(data);
    } catch (error) {
      console.error(error);
      setProfile(null);
    } finally {
      setLoadingProfile(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loadingProfile,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }

  return context;
};
