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
  ownerEmail?: string;
}

export const EMPTY_USER_SHOP_ITEMS: UserShopItem[] = [];

type ShopRequestPayload = {
  shopTitle: string;
  description: string;
  phone: string;
  ownerEmail: string;
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
  latestReadRequestCount: number;
  markNotificationsRead: () => void;
}

const useNotificationStore = create<NotificationStore>()(
  persist(
  (set) => ({
    requests: [],
    latestReadRequestCount: 0,
    submitShopRequest: (payload) =>
      set((state) => {
          const normalizedOwnerEmail = payload.ownerEmail.trim().toLowerCase();
          const hasActiveRequest = state.requests.some(
            (request) =>
              request.ownerEmail === normalizedOwnerEmail && request.status !== "declined"
          );
          if (hasActiveRequest) {
            return state;
          }
          const { items = [], ownerEmail, ...rest } = payload;
          const newRequest: ShopRequestNotification = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            status: "pending",
            submittedAt: Date.now(),
            items,
            ownerEmail: normalizedOwnerEmail,
            ...rest,
          };
          return { requests: [...state.requests, newRequest] };
      }),
    markNotificationsRead: () =>
      set((state) => ({
        latestReadRequestCount: state.requests.length,
      })),
      updateRequestStatus: (id, status) =>
        set((state) => {
          const updatedRequests = state.requests.map((request) =>
            request.id === id ? { ...request, status } : request
          );
          // If the status is "accepted", add the shop to admin stores
          if (status === "accepted") {
            const acceptedRequest = updatedRequests.find((request) => request.id === id);
            if (acceptedRequest) {
              // Import useAdminStores here to avoid circular dependency
              import("../store/useAdminStores").then(({ default: useAdminStores }) => {
                useAdminStores.getState().addUserShop(acceptedRequest.shopTitle);
              });
            }
          }
          return { requests: updatedRequests };
        }),
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
