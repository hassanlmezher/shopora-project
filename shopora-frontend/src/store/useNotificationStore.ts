import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ShopRequestStatus = "pending" | "accepted" | "declined";

export interface ShopRequestNotification {
  id: string;
  shopTitle: string;
  description: string;
  phone: string;
  status: ShopRequestStatus;
  submittedAt: number;
}

interface NotificationStore {
  requests: ShopRequestNotification[];
  submitShopRequest: (payload: Omit<ShopRequestNotification, "id" | "status" | "submittedAt">) => void;
  updateRequestStatus: (id: string, status: ShopRequestStatus) => void;
  clearRequests: () => void;
}

const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      requests: [],
      submitShopRequest: (payload) =>
        set((state) => {
          const newRequest: ShopRequestNotification = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            status: "pending",
            submittedAt: Date.now(),
            ...payload,
          };
          return { requests: [...state.requests, newRequest] };
        }),
      updateRequestStatus: (id, status) =>
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === id ? { ...request, status } : request
          ),
        })),
      clearRequests: () => set({ requests: [] }),
    }),
    {
      name: "shopora-notifications",
    }
  )
);

export default useNotificationStore;
