import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, type ApiUser } from "../api/client";

interface AuthStore {
  user: ApiUser | null;
  isLoading: boolean;
  error?: string;
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: undefined,
      isLoggedIn: false,
      userEmail: null,
      login: async (email, password) => {
        set({ isLoading: true, error: undefined });
        try {
          const user = await api.login({ email, password });
          set({ user, isLoading: false, isLoggedIn: true, userEmail: user.email });
          return true;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Login failed";
          set({ error: message, isLoading: false, user: null, isLoggedIn: false, userEmail: null });
          return false;
        }
      },
      signup: async (email, password) => {
        set({ isLoading: true, error: undefined });
        try {
          const user = await api.signup({ email, password });
          set({ user, isLoading: false, isLoggedIn: true, userEmail: user.email });
          return true;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Signup failed";
          set({ error: message, isLoading: false, isLoggedIn: false });
          return false;
        }
      },
      logout: () => set({ user: null, error: undefined, isLoggedIn: false, userEmail: null }),
    }),
    { name: "shopora-auth" }
  )
);

export default useAuthStore;
