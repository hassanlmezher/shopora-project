import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../api/client";

interface AuthStore {
  isLoggedIn: boolean;
  userEmail: string | null;
  token: string | null;
  user: AuthUser | null;
  login: (payload: { user: AuthUser; token: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userEmail: null,
      token: null,
      user: null,
      login: ({ user, token }) =>
        set({
          isLoggedIn: true,
          userEmail: user.email,
          user,
          token,
        }),
      logout: () => set({ isLoggedIn: false, userEmail: null, token: null, user: null }),
    }),
    { name: "shopora-auth" }
  )
);

export default useAuthStore;
