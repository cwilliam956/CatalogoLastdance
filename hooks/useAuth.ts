import { create } from 'zustand';

interface User {
  name: string;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: async (email, password) => {
    if (email === 'admin' && password === 'admin') {
      set({ user: { name: 'Admin' } });
      return true;
    }
    return false;
  },
  logout: async () => set({ user: null }),
}));