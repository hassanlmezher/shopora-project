import { create } from "zustand";
import { adminStoresSeed, type AdminStoreSeed } from "../data/adminStores";
import { catalogue, type CatalogueItem } from "../data/catalogue";

export type AdminStore = AdminStoreSeed;

export interface AdminStoreItem extends CatalogueItem {
  itemId: string;
  storeId: string;
}

type ItemsByStore = Record<string, AdminStoreItem[]>;

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
  stores: AdminStoreSeed[];
  itemsByStore: ItemsByStore;
  removeStore: (storeId: string) => void;
  removeItem: (storeId: string, itemId: string) => void;
  getStoreById: (storeId: string) => AdminStoreSeed | undefined;
  getItemsByStore: (storeId: string) => AdminStoreItem[];
  reset: () => void;
}

const initialItems = buildItemsMap();

const useAdminStores = create<AdminStoreState>((set, get) => ({
  stores: adminStoresSeed,
  itemsByStore: initialItems,
  removeStore: (storeId) =>
    set((state) => {
      const rest = { ...state.itemsByStore };
      delete rest[storeId];
      return {
        stores: state.stores.filter((store) => store.id !== storeId),
        itemsByStore: rest,
      };
    }),
  removeItem: (storeId, itemId) =>
    set((state) => {
      const items = state.itemsByStore[storeId] ?? [];
      return {
        itemsByStore: {
          ...state.itemsByStore,
          [storeId]: items.filter((item) => item.itemId !== itemId),
        },
      };
    }),
  getStoreById: (storeId) => get().stores.find((store) => store.id === storeId),
  getItemsByStore: (storeId) => get().itemsByStore[storeId] ?? [],
  reset: () =>
    set({
      stores: adminStoresSeed,
      itemsByStore: buildItemsMap(),
    }),
}));

export default useAdminStores;