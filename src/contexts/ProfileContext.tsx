import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

import { useAuth } from './AuthContext';
import { useError } from './ErrorContext';
import { getUserProfile } from '../services/profileService';
import type { ProfileContextType } from '../types/ProfileTypes';
import type { UserProfile } from '../types/AuthTypes';

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const { showError } = useError();

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
      const message = error instanceof Error ? error.message : 'Failed to load profile';
      showError(message);
      setProfile(null);
    } finally {
      setLoadingProfile(false);
    }
  }, [user, showError]);

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
