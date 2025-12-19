import { create } from "zustand";
import { api, type ApiProduct, type ApiStore } from "../api/client";
import type { CatalogueItem } from "../data/catalogue";

export type ProductView = CatalogueItem & { storeId: string };

interface CatalogueState {
  products: ProductView[];
  stores: ApiStore[];
  loading: boolean;
  error?: string;
  fetchStores: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  refresh: () => Promise<void>;
  getProductsByStore: (storeId: string) => ProductView[];
  resetError: () => void;
}

export const mapApiProductToView = (product: ApiProduct): ProductView => ({
  id: product.id,
  storeId: typeof product.store === "string" ? product.store : product.store.id,
  image: product.images?.[0] ?? "",
  images: product.images ?? [],
  name: product.name,
  namee: product.subtitle || product.name,
  price: `$${product.price}`,
  priceValue: product.price,
  description: product.description ?? "",
  ratings: `(${product.reviewsCount ?? 0})`,
  by: typeof product.store === "string" ? "Store" : product.store.title ?? "Store",
  category: product.category ?? "General",
  reviews: [],
});

const useCatalogueStore = create<CatalogueState>((set, get) => ({
  products: [],
  stores: [],
  loading: false,
  error: undefined,
  fetchStores: async () => {
    set({ loading: true, error: undefined });
    try {
      const stores = await api.getStores();
      set({ stores, loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load stores";
      set({ error: message, loading: false });
    }
  },
  fetchProducts: async () => {
    set({ loading: true, error: undefined });
    try {
      const products = await api.getProducts();
      set({ products: products.map(mapApiProductToView), loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load products";
      set({ error: message, loading: false });
    }
  },
  refresh: async () => {
    set({ loading: true, error: undefined });
    try {
      const [stores, products] = await Promise.all([api.getStores(), api.getProducts()]);
      set({
        stores,
        products: products.map(mapApiProductToView),
        loading: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load catalogue";
      set({ error: message, loading: false });
    }
  },
  getProductsByStore: (storeId: string) =>
    get().products.filter((product) => product.storeId === storeId),
  resetError: () => set({ error: undefined }),
}));

useCatalogueStore
  .getState()
  .refresh()
  .catch(() => {
    // any error is stored on state
  });

export default useCatalogueStore;
