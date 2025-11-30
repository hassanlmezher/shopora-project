const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions extends RequestInit {
  method?: HttpMethod;
}

const withJson = (body?: unknown): RequestOptions =>
  body
    ? {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    : {};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof data?.error === "string" ? data.error : response.statusText;
    throw new Error(message || "Request failed");
  }

  return data as T;
}

export interface AuthUser {
  _id: string;
  name?: string;
  email: string;
  role?: "user" | "admin";
}

export interface StorePayload {
  name: string;
  image?: string;
  description?: string;
  owner?: string;
  email?: string;
  category?: string;
}

export interface StoreResponse extends StorePayload {
  _id: string;
  joined?: string;
  status?: string;
  banned?: boolean;
}

export interface ItemPayload {
  name: string;
  namee?: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
  storeId: string;
}

export interface ItemResponse extends ItemPayload {
  _id: string;
}

export interface RequestPayload {
  storeId: string;
  items: Array<{ itemId: string; quantity?: number }>;
}

export interface RequestResponse extends RequestPayload {
  _id: string;
  status: string;
}

export const api = {
  login: (email: string, password: string) =>
    request<{ token: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      ...withJson({ email, password }),
    }),
  register: (name: string, email: string, password: string) =>
    request<AuthUser>("/auth/register", {
      method: "POST",
      ...withJson({ name, email, password }),
    }),
  getStores: () => request<StoreResponse[]>("/stores"),
  createStore: (payload: StorePayload) =>
    request<StoreResponse>("/stores", { method: "POST", ...withJson(payload) }),
  updateStore: (id: string, payload: Partial<StorePayload & { banned?: boolean }>) =>
    request<StoreResponse>(`/stores/${id}`, { method: "PATCH", ...withJson(payload) }),
  getStoreItems: (storeId: string) => request<ItemResponse[]>(`/items/${storeId}`),
  createItem: (payload: ItemPayload) =>
    request<ItemResponse>("/items", { method: "POST", ...withJson(payload) }),
  deleteItem: (id: string) => request<{ success: boolean }>(`/items/${id}`, { method: "DELETE" }),
  getRequests: () => request<RequestResponse[]>("/requests"),
  createRequest: (payload: RequestPayload) =>
    request<RequestResponse>("/requests", { method: "POST", ...withJson(payload) }),
  updateRequestStatus: (id: string, status: string) =>
    request<RequestResponse>(`/requests/${id}`, { method: "PATCH", ...withJson({ status }) }),
};

export const apiConfig = { API_URL };
