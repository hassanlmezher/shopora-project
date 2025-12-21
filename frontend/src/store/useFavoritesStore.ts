import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteItem {
  id: string;
  image: string;
  images?: string[];
  name: string;
  namee: string;
  price: string;
  priceValue: number;
  description: string;
  reviews: Array<{ reviewer: string; rating: number; text: string }>;
  by: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleFavorite: (item) =>
        set((state) => {
          const exists = state.items.some((fav) => fav.id === item.id);
          if (exists) {
            return { items: state.items.filter((fav) => fav.id !== item.id) };
          }
          return { items: [...state.items, item] };
        }),
      isFavorite: (id) => get().items.some((fav) => fav.id === id),
      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: "shopora-favorites1",
    }
  )
);

export default useFavoritesStore;