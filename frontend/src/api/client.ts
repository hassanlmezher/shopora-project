import type { FavoriteItem } from "../store/useFavoritesStore";

// Avoid Chrome-blocked ports (e.g., 6000); fall back to 6001 if no env is provided.
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:6001";

interface ApiError extends Error {
  status?: number;
}

async function request<TResponse>(path: string, options: RequestInit = {}): Promise<TResponse> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const body = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error((body as any)?.message ?? `Request failed: ${response.status}`) as ApiError;
    error.status = response.status;
    throw error;
  }

  return body as TResponse;
}

export interface ApiUser {
  id: string;
  email: string;
  role: "user" | "admin";
}

export interface ApiStore {
  id: string;
  title: string;
  description: string;
  phone: string;
  status: "pending" | "approved" | "declined";
  owner?: ApiUser;
}

export interface ApiProduct {
  id: string;
  store: ApiStore | string;
  name: string;
  subtitle: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  ratings: number;
  reviewsCount: number;
}

export interface ApiReview {
  id: string;
  user: ApiUser | string;
  product: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ApiCart {
  id?: string;
  user?: string;
  items: Array<{
    product: ApiProduct | string;
    quantity: number;
  }>;
}

export interface ApiOrder {
  id: string;
  user: string;
  items: Array<{
    product: ApiProduct | string;
    quantity: number;
    priceAtPurchase: number;
  }>;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  createdAt?: string;
}

export const api = {
  signup: (payload: { email: string; password: string }) =>
    request<ApiUser>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  login: (payload: { email: string; password: string }) =>
    request<ApiUser>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getStores: () => request<ApiStore[]>("/api/stores"),
  requestStore: (payload: { owner: string; title: string; description: string; phone: string }) =>
    request<ApiStore>("/api/stores", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateStoreStatus: (storeId: string, status: ApiStore["status"]) =>
    request<ApiStore>(`/api/stores/${storeId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  getProducts: () => request<ApiProduct[]>("/api/products"),
  createProduct: (payload: Omit<ApiProduct, "id" | "ratings" | "reviewsCount" | "store"> & { store: string }) =>
    request<ApiProduct>("/api/products", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  deleteProduct: (productId: string) =>
    request<{ message: string }>(`/api/products/${productId}`, { method: "DELETE" }),
  getReviews: (productId: string) => request<ApiReview[]>(`/api/reviews/product/${productId}`),
  addReview: (payload: { user: string; product: string; rating: number; comment: string }) =>
    request<ApiReview>("/api/reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getCart: (userId: string) => request<ApiCart>(`/api/cart/${userId}`),
  addToCart: (payload: { user: string; item: { product: string; quantity?: number } }) =>
    request<ApiCart>("/api/cart", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateCartItem: (userId: string, productId: string, quantity: number) =>
    request<ApiCart>(`/api/cart/${userId}/items/${productId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),
  removeCartItem: (userId: string, productId: string) =>
    request<ApiCart>(`/api/cart/${userId}/items/${productId}`, { method: "DELETE" }),
  clearCart: (userId: string) => request<ApiCart>(`/api/cart/${userId}`, { method: "DELETE" }),
  toggleFavorite: (payload: { user: string; product: string }) =>
    request<{ products: string[] } | FavoriteItem>("/api/favorites", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getFavorites: (userId: string) => request<ApiProduct[]>(`/api/favorites/${userId}`),
  createOrder: (payload: { user: string; items: Array<{ product: string; quantity: number; priceAtPurchase: number }> }) =>
    request<ApiOrder>("/api/orders", { method: "POST", body: JSON.stringify(payload) }),
  getOrders: (userId: string) => request<ApiOrder[]>(`/api/orders/${userId}`),
};
