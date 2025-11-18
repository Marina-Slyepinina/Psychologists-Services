import type { User } from "firebase/auth";
import { create } from "zustand";

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));