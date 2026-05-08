import type { UserProfile } from "./AuthTypes";

export type ProfileContextType = {
  profile: UserProfile | null;
  loadingProfile: boolean;
  refreshProfile: () => Promise<void>;
};