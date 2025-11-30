import { create } from "zustand";
import { adminStoresSeed, type AdminStoreSeed } from "../data/adminStores";
import { catalogue, type CatalogueItem } from "../data/catalogue";
import profileImage from "../images/profile.png";
import { api, type ItemPayload, type ItemResponse, type StoreResponse } from "../api/client";

export type AdminStore = {
  id: string;
  name: string;
  owner: string;
  email: string;
  category: string;
  joined: string;
  status: string;
  description: string;
  banned?: boolean;
  image?: string;
};

export interface AdminStoreItem extends CatalogueItem {
  itemId: string;
  storeId: string;
}

type ItemsByStore = Record<string, AdminStoreItem[]>;

const normalizeKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const normalizeStore = (store: StoreResponse | AdminStoreSeed): AdminStore => {
  const base = store as Partial<StoreResponse>;
  const id = base._id ? String(base._id) : (store as AdminStoreSeed).id;
  const owner = "owner" in store && store.owner ? store.owner : "Owner";
  const email = "email" in store && store.email ? store.email : "";
  return {
    id,
    name: store.name ?? "Storefront",
    owner,
    email,
    category: store.category ?? "General",
    joined: store.joined
      ? new Date(store.joined).toLocaleDateString()
      : new Date().toLocaleDateString(),
    status: store.status ?? "active",
    description: store.description ?? "",
    banned: Boolean((store as StoreResponse).banned),
    image: (base.image as string) ?? profileImage,
  };
};

const normalizeItem = (item: ItemResponse, storeName: string): AdminStoreItem => {
  const storeId = typeof item.storeId === "string" ? item.storeId : String(item.storeId);
  return {
    itemId: item._id ?? item.itemId,
    storeId,
    image: item.image || profileImage,
    name: item.name,
    namee: item.namee || item.name,
    price: `$${item.price}`,
    priceValue: item.price,
    description: item.description ?? "",
    ratings: item.ratings ?? "(0)",
    by: storeName,
    category: item.category ?? "General",
    reviews: [],
  };
};

const buildItemsMap = (stores: AdminStore[]): ItemsByStore => {
  return stores.reduce<ItemsByStore>((acc, store) => {
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

const fallbackStores = adminStoresSeed.map(normalizeStore);
const initialItems = buildItemsMap(fallbackStores);

interface AdminStoreState {
  stores: AdminStore[];
  itemsByStore: ItemsByStore;
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
  fetchStores: () => Promise<void>;
  fetchItemsForStore: (storeId: string) => Promise<void>;
  addUserShop: (shopTitle: string) => Promise<void>;
  createItem: (payload: ItemPayload) => Promise<AdminStoreItem | null>;
  removeItem: (storeId: string, itemId: string) => Promise<void>;
  toggleBanStore: (storeId: string) => Promise<void>;
  getStoreById: (storeId: string) => AdminStore | undefined;
  getItemsByStore: (storeId: string) => AdminStoreItem[];
  reset: () => void;
}

const useAdminStores = create<AdminStoreState>((set, get) => ({
  stores: fallbackStores,
  itemsByStore: initialItems,
  loading: false,
  error: null,
  hasFetched: false,
  async fetchStores() {
    if (get().loading || (get().hasFetched && !get().error)) return;
    set({ loading: true });
    try {
      const stores = await api.getStores();
      if (stores.length === 0) {
        set({ stores: fallbackStores, hasFetched: true, loading: false, error: null });
        return;
      }
      const normalized = stores.map(normalizeStore);
      set({ stores: normalized, hasFetched: true, loading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load stores";
      set({ error: message, hasFetched: true, loading: false });
    }
  },
  async fetchItemsForStore(storeId) {
    try {
      const storeName = get().stores.find((store) => store.id === storeId)?.name ?? "Store";
      const items = await api.getStoreItems(storeId);
      const normalized = items.map((item) => normalizeItem(item, storeName));
      set((state) => ({
        itemsByStore: { ...state.itemsByStore, [storeId]: normalized },
      }));
    } catch (error) {
      const fallback = initialItems[storeId] ?? [];
      set((state) => ({
        itemsByStore: { ...state.itemsByStore, [storeId]: fallback },
      }));
    }
  },
  async addUserShop(shopTitle: string) {
    try {
      const created = await api.createStore({ name: shopTitle });
      const store = normalizeStore(created);
      set((state) => ({
        stores: [...state.stores, store],
        itemsByStore: { ...state.itemsByStore, [store.id]: [] },
      }));
    } catch {
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
            image: profileImage,
          },
        ],
        itemsByStore: state.itemsByStore,
      }));
    }
  },
  async createItem(payload) {
    try {
      const created = await api.createItem(payload);
      const storeName = get().stores.find((store) => store.id === payload.storeId)?.name ?? "Store";
      const item = normalizeItem(created, storeName);
      set((state) => ({
        itemsByStore: {
          ...state.itemsByStore,
          [payload.storeId]: [...(state.itemsByStore[payload.storeId] ?? []), item],
        },
      }));
      return item;
    } catch {
      return null;
    }
  },
  async removeItem(storeId, itemId) {
    try {
      await api.deleteItem(itemId);
    } catch {
      // Fall through to optimistic update
    }
    set((state) => {
      const items = state.itemsByStore[storeId] ?? [];
      return {
        itemsByStore: {
          ...state.itemsByStore,
          [storeId]: items.filter((item) => item.itemId !== itemId),
        },
      };
    });
  },
  async toggleBanStore(storeId) {
    const current = get().stores.find((store) => store.id === storeId);
    const nextValue = !current?.banned;
    set((state) => ({
      stores: state.stores.map((store) =>
        store.id === storeId ? { ...store, banned: nextValue } : store
      ),
    }));
    try {
      await api.updateStore(storeId, { banned: nextValue });
    } catch {
      set((state) => ({
        stores: state.stores.map((store) =>
          store.id === storeId ? { ...store, banned: current?.banned } : store
        ),
      }));
    }
  },
  getStoreById: (storeId) => get().stores.find((store) => store.id === storeId),
  getItemsByStore: (storeId) => get().itemsByStore[storeId] ?? [],
  reset: () =>
    set({
      stores: fallbackStores,
      itemsByStore: initialItems,
      loading: false,
      error: null,
      hasFetched: false,
    }),
}));

if (typeof window !== "undefined") {
  const state = useAdminStores.getState();
  if (!state.hasFetched) {
    state.fetchStores().catch(() => undefined);
  }
}

export default useAdminStores;
