import { create } from 'zustand'

interface AuthStore {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;
