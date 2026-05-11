import type { UserProfile } from './AuthTypes';

export type ProfileContextType = {
  profile: UserProfile | null;
  loadingProfile: boolean;
  refreshProfile: () => Promise<void>;
};

export type EditProfileContextType = {
  name: string;
  userId: string;
  updateName: (newName: string) => Promise<void>;
  saveQuote: (quote: string, author: string) => Promise<void>;
  signOut: () => Promise<void>;
};
