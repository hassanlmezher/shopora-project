const API_URL = import.meta.env.VITE_API_URL ?? "/api";

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

const getToken = () => {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem("shopora-auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const method = options.method || "GET";
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    method,
    headers: {
      ...(method !== "GET" || options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: token } : {}),
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
  _id?: string;
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
  phone?: string;
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
    request<{ message: string }>("/auth/signup", {
      method: "POST",
      ...withJson({ name, email, password }),
    }),
  getStores: () => request<StoreResponse[]>("/shops"),
  createStore: (payload: StorePayload) =>
    request<StoreResponse>("/shops/request", {
      method: "POST",
      ...withJson({
        shopTitle: payload.name,
        description: payload.description,
        phone: payload.phone,
        category: payload.category,
        image: payload.image,
        email: payload.email,
        name: payload.name,
      }),
    }),
  updateStore: (id: string, payload: Partial<StorePayload & { banned?: boolean; status?: string }>) =>
    request<StoreResponse>(`/shops/${id}`, { method: "PATCH", ...withJson(payload) }),
  getStoreItems: (storeId: string) => request<ItemResponse[]>(`/items/${storeId}`),
  createItem: (payload: ItemPayload) =>
    request<ItemResponse>("/items", {
      method: "POST",
      ...withJson({
        shopId: payload.storeId,
        image: payload.image,
        name: payload.name,
        namee: payload.namee,
        price: payload.price,
        description: payload.description,
        category: payload.category,
      }),
    }),
  deleteItem: (id: string) => request<{ success: boolean }>(`/items/${id}`, { method: "DELETE" }),
  getRequests: () => request<RequestResponse[]>("/orders"),
  createRequest: (payload: RequestPayload) =>
    request<RequestResponse>("/orders", { method: "POST", ...withJson(payload) }),
  updateRequestStatus: (id: string, status: string) =>
    request<RequestResponse>(`/orders/${id}`, { method: "PATCH", ...withJson({ status }) }),
};

export const apiConfig = { API_URL };
