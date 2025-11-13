import { create } from "zustand";
import { persist } from  "zustand/middleware";

export type ShopRequestStatus = "pending" | "accepted" | "declined";

export interface ShopRequestNotification {
    id: string;
    shopTitle: string;
    description: string;
    phone: string;
    status: ShopRequestStatus;
    submittedAt: number;
}

interface NotificationStore{
    requests: ShopRequestNotification[];
    submitShopRequest: (payload: Omit<ShopRequestNotification, "id" | "status" | "submittedAt">) => void;
    updateRequestStatus: (id: string, status: ShopRequestStatus) => void;
    clearRequests: () => void;
}
