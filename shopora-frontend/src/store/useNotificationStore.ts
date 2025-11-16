import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ShopRequestStatus = "pending" | "accepted" | "declined";

export interface UserShopItem {
  id: string;
  image: string;
  images?: string[];
  name: string;
  namee: string;
  price: string;
  priceValue: number;
  description: string;
  by: string;
  category: string;
  ratings: string;
  reviews: Array<{ reviewer: string; rating: number; text: string }>;
}

export type UserShopItemPayload = Omit<UserShopItem, "id">;

export interface ShopRequestNotification {
  id: string;
  shopTitle: string;
  description: string;
  phone: string;
  status: ShopRequestStatus;
  submittedAt: number;
  items: UserShopItem[];
}

export const EMPTY_USER_SHOP_ITEMS: UserShopItem[] = [];

type ShopRequestPayload = Omit<ShopRequestNotification, "id" | "status" | "submittedAt"> & {
  items?: UserShopItem[];
};

interface NotificationStore {
  requests: ShopRequestNotification[];
  submitShopRequest: (payload: ShopRequestPayload) => void;
  updateRequestStatus: (id: string, status: ShopRequestStatus) => void;
  addUserShopItem: (requestId: string, item: UserShopItemPayload) => void;
  updateUserShopItem: (requestId: string, item: UserShopItem) => void;
  deleteUserShopItem: (requestId: string, itemId: string) => void;
  clearRequests: () => void;
}

const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      requests: [],
      submitShopRequest: (payload) =>
        set((state) => {
          const hasActiveRequest = state.requests.some((request) => request.status !== "declined");
          if (hasActiveRequest) {
            return state;
          }
          const { items = [], ...rest } = payload;
          const newRequest: ShopRequestNotification = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            status: "pending",
            submittedAt: Date.now(),
            items,
            ...rest,
          };
          return { requests: [...state.requests, newRequest] };
        }),
      updateRequestStatus: (id, status) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === id ? { ...request, status } : request
          ),
        })),
      addUserShopItem: (requestId, item) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === requestId
              ? {
                  ...request,
                  items: [
                    ...request.items,
                    {
                      id: `${requestId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                      ...item,
                    },
                  ],
                }
              : request
          ),
        })),
      updateUserShopItem: (requestId, item) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === requestId
              ? {
                  ...request,
                  items: request.items.map((existing) =>
                    existing.id === item.id ? item : existing
                  ),
                }
              : request
          ),
        })),
      deleteUserShopItem: (requestId, itemId) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === requestId
              ? {
                  ...request,
                  items: request.items.filter((existing) => existing.id !== itemId),
                }
              : request
          ),
        })),
      clearRequests: () => set({ requests: [] }),
    }),
    {
      name: "shopora-notifications1",
    }
  )
);

export default useNotificationStore;
