import { create } from 'zustand'

interface AuthStore {
    isLoggedIn: boolean;
    userEmail: string | null;
    login: (email: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    userEmail: null,
    login: (email: string) => set({ isLoggedIn: true, userEmail: email }),
    logout: () => set({ isLoggedIn: false, userEmail: null }),
}));

export default useAuthStore;