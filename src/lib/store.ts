import { create } from 'zustand';

interface Profile {
  id: string;
  username: string;
  email: string;
  coins: number;
  badges: string[];
  groupIds: string[];
  profileIcon: string;
}

interface AuthState {
  isAuthenticated: boolean;
  profile: Profile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<Profile>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  profile: null,
  login: async (email: string, password: string) => {
    // TODO: Implement actual authentication
    set({
      isAuthenticated: true,
      profile: {
        id: '1',
        username: 'demo_user',
        email,
        coins: 1000,
        badges: ['early_adopter', 'bet_master'],
        groupIds: ['1', '2'],
        profileIcon: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo_user',
      },
    });
  },
  logout: () => {
    set({ isAuthenticated: false, profile: null });
  },
  updateProfile: (profile) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...profile } : null,
    }));
  },
}));