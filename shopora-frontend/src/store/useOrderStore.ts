import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CartLineItem } from "./useCartStore";

export interface OrderedItem {
  id: string;
  image: string;
  name: string;
  namee: string;
  by: string;
  price: number;
  quantity: number;
  orderedAt: number;
}

interface OrderState {
  orders: OrderedItem[];
  reviewedItems: string[];
  addOrders: (items: CartLineItem[]) => void;
  markReviewed: (itemId: string) => void;
  hasOrdered: (itemId: string) => boolean;
  hasReviewed: (itemId: string) => boolean;
  clearOrders: () => void;
}

export const normalizeItemId = (name: string, namee: string) =>
  `${name}-${namee}`.replace(/\s+/g, "-").toLowerCase();

const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      reviewedItems: [],
      addOrders: (items) =>
        set((state) => {
          const nextOrders = [...state.orders];
          const timestamp = Date.now();
          items.forEach((item) => {
            const itemId = normalizeItemId(item.name, item.namee);
            const existing = nextOrders.find((entry) => entry.id === itemId);
            if (existing) {
              existing.quantity += item.quantity;
              existing.orderedAt = timestamp;
            } else {
              nextOrders.push({
                id: itemId,
                image: item.image,
                name: item.name,
                namee: item.namee,
                by: item.by,
                price: item.price,
                quantity: item.quantity,
                orderedAt: timestamp,
              });
            }
          });
          return { orders: nextOrders };
        }),
      markReviewed: (itemId) =>
        set((state) =>
          state.reviewedItems.includes(itemId)
            ? state
            : { reviewedItems: [...state.reviewedItems, itemId], orders: state.orders }
        ),
      hasOrdered: (itemId) => get().orders.some((entry) => entry.id === itemId),
      hasReviewed: (itemId) => get().reviewedItems.includes(itemId),
      clearOrders: () => set({ orders: [], reviewedItems: [] }),
    }),
    {
      name: "shopora-orders",
    }
  )
);

export default useOrderStore;
