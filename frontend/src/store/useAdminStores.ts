import { create } from "zustand";
import { api, type ApiProduct, type ApiStore } from "../api/client";
import { mapApiProductToView, type ProductView } from "./useCatalogueStore";

export type AdminStore = ApiStore & { name: string; banned?: boolean };

export interface AdminStoreItem extends ProductView {
  itemId: string;
}

type ItemsByStore = Record<string, AdminStoreItem[]>;
type RemovedItemsByStore = Record<string, AdminStoreItem[]>;

const buildItemsMap = (products: ApiProduct[]): ItemsByStore => {
  return products.reduce<ItemsByStore>((acc, product) => {
    const mapped = mapApiProductToView(product);
    const storeId = mapped.storeId;
    const entry: AdminStoreItem = { ...mapped, itemId: mapped.id };
    if (!acc[storeId]) {
      acc[storeId] = [];
    }
    acc[storeId].push(entry);
    return acc;
  }, {});
};

interface AdminStoreState {
  stores: AdminStore[];
  itemsByStore: ItemsByStore;
  removedItemsByStore: RemovedItemsByStore;
  loading: boolean;
  error?: string;
  refresh: () => Promise<void>;
  addUserShop: (shopTitle: string, ownerId?: string) => Promise<void>;
  removeStore: (storeId: string) => void;
  toggleBanStore: (storeId: string) => void;
  removeItem: (storeId: string, itemId: string) => void;
  restoreItem: (storeId: string, itemId: string) => void;
  getStoreById: (storeId: string) => AdminStore | undefined;
  getItemsByStore: (storeId: string) => AdminStoreItem[];
}

const useAdminStores = create<AdminStoreState>((set, get) => ({
  stores: [],
  itemsByStore: {},
  removedItemsByStore: {},
  loading: false,
  error: undefined,
  refresh: async () => {
    set({ loading: true, error: undefined });
    try {
      const [stores, products] = await Promise.all([api.getStores(), api.getProducts()]);
      set({
        stores: stores.map((store) => ({ ...store, name: store.title, banned: store.status === "declined" })),
        itemsByStore: buildItemsMap(products),
        loading: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load stores";
      set({ error: message, loading: false });
    }
  },
  addUserShop: async (shopTitle: string, ownerId?: string) => {
    try {
      const trimmedTitle = shopTitle.trim();
      let newStore: AdminStore | null = null;
      if (ownerId) {
        const created = await api.requestStore({
          owner: ownerId,
          title: trimmedTitle,
          description: "User-submitted shop",
          phone: "N/A",
        });
        newStore = { ...created, name: created.title };
      } else {
        newStore = {
          id: `local-${Date.now()}`,
          name: trimmedTitle,
          title: trimmedTitle,
          description: "User-submitted shop",
          phone: "N/A",
          status: "pending",
          banned: false,
        };
      }
      set((state) => ({
        stores: newStore ? [...state.stores, newStore] : state.stores,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to add shop";
      set({ error: message });
    }
  },
  removeStore: (storeId) =>
    set((state) => {
      const rest = { ...state.itemsByStore };
      delete rest[storeId];
      return {
        stores: state.stores.filter((store) => store.id !== storeId),
        itemsByStore: rest,
      };
    }),
  toggleBanStore: (storeId) =>
    set((state) => ({
      stores: state.stores.map((store) =>
        store.id === storeId ? { ...store, banned: !store.banned } : store
      ),
    })),
  removeItem: (storeId, itemId) =>
    set((state) => {
      const items = state.itemsByStore[storeId] ?? [];
      const removedList = state.removedItemsByStore[storeId] ?? [];
      const itemToRemove = items.find((item) => item.itemId === itemId);
      const remaining = items.filter((item) => item.itemId !== itemId);

      return {
        itemsByStore: {
          ...state.itemsByStore,
          [storeId]: remaining,
        },
        removedItemsByStore: itemToRemove
          ? {
              ...state.removedItemsByStore,
              [storeId]: [...removedList, itemToRemove],
            }
          : state.removedItemsByStore,
      };
    }),
  restoreItem: (storeId, itemId) =>
    set((state) => {
      const removedList = state.removedItemsByStore[storeId] ?? [];
      const itemToRestore = removedList.find((item) => item.itemId === itemId);
      const remainingRemoved = removedList.filter((item) => item.itemId !== itemId);
      const currentItems = state.itemsByStore[storeId] ?? [];

      if (!itemToRestore) {
        return state;
      }

      return {
        itemsByStore: {
          ...state.itemsByStore,
          [storeId]: [...currentItems, itemToRestore],
        },
        removedItemsByStore: {
          ...state.removedItemsByStore,
          [storeId]: remainingRemoved,
        },
      };
    }),
  getStoreById: (storeId) => get().stores.find((store) => store.id === storeId),
  getItemsByStore: (storeId) => get().itemsByStore[storeId] ?? [],
}));

// Kick off an initial hydration so storefronts render without manual wiring.
useAdminStores
  .getState()
  .refresh()
  .catch(() => {
    // error is captured in store state
  });

export default useAdminStores;
