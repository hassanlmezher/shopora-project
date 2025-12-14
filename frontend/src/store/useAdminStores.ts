import { create } from "zustand";
import { adminStoresSeed, type AdminStoreSeed } from "../data/adminStores";
import { catalogue, type CatalogueItem } from "../data/catalogue";

export type AdminStore = AdminStoreSeed & { banned?: boolean };

export interface AdminStoreItem extends CatalogueItem {
  itemId: string;
  storeId: string;
}

type ItemsByStore = Record<string, AdminStoreItem[]>;
type RemovedItemsByStore = Record<string, AdminStoreItem[]>;

const normalizeKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const buildItemsMap = (): ItemsByStore => {
  return adminStoresSeed.reduce<ItemsByStore>((acc, store) => {
    const storeItems = catalogue
      .filter((item) => item.by === store.name)
      .map<AdminStoreItem>((item, index) => ({
        ...item,
        itemId: `${store.id}-${index}-${normalizeKey(item.name)}-${normalizeKey(item.namee)}`,
        storeId: store.id,
      }));
    acc[store.id] = storeItems;
    return acc;
  }, {});
};

interface AdminStoreState {
  stores: AdminStore[];
  itemsByStore: ItemsByStore;
  removedItemsByStore: RemovedItemsByStore;
  addUserShop: (shopTitle: string) => void;
  removeStore: (storeId: string) => void;
  toggleBanStore: (storeId: string) => void;
  removeItem: (storeId: string, itemId: string) => void;
  restoreItem: (storeId: string, itemId: string) => void;
  getStoreById: (storeId: string) => AdminStore | undefined;
  getItemsByStore: (storeId: string) => AdminStoreItem[];
  reset: () => void;
}

const initialItems = buildItemsMap();

const useAdminStores = create<AdminStoreState>((set, get) => ({
  stores: adminStoresSeed,
  itemsByStore: initialItems,
  removedItemsByStore: {},
  addUserShop: (shopTitle) =>
    set((state) => ({
      stores: [
        ...state.stores,
        {
          id: `user-shop-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: shopTitle,
          owner: "User",
          email: "user@example.com",
          category: "General",
          joined: new Date().toLocaleDateString(),
          status: "active",
          description: "User created shop",
          banned: false,
        },
      ],
      itemsByStore: state.itemsByStore, // No items for user shops initially
    })),
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
  reset: () =>
    set({
      stores: adminStoresSeed,
      itemsByStore: buildItemsMap(),
      removedItemsByStore: {},
    }),
}));

export default useAdminStores;
