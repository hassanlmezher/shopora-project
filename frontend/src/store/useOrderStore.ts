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

export interface Order {
  id: string;
  items: OrderedItem[];
  orderedAt: number;
  status: 'pending' | 'delivered';
}

interface OrderState {
  orders: Order[];
  reviewedItems: string[];
  addOrders: (items: CartLineItem[]) => void;
  markReviewed: (itemId: string) => void;
  hasOrdered: (itemId: string) => boolean;
  hasReviewed: (itemId: string) => boolean;
  clearOrders: () => void;
  getAllOrders: () => Order[];
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
          const timestamp = Date.now();
          const orderId = `order-${timestamp}`;
          const orderItems: OrderedItem[] = items.map((item) => ({
            id: normalizeItemId(item.name, item.namee),
            image: item.image,
            name: item.name,
            namee: item.namee,
            by: item.by,
            price: item.price,
            quantity: item.quantity,
            orderedAt: timestamp,
          }));

          const newOrder: Order = {
            id: orderId,
            items: orderItems,
            orderedAt: timestamp,
            status: 'pending',
          };

          return { orders: [...state.orders, newOrder] };
        }),
      markReviewed: (itemId) =>
        set((state) =>
          state.reviewedItems.includes(itemId)
            ? state
            : { reviewedItems: [...state.reviewedItems, itemId], orders: state.orders }
        ),
      hasOrdered: (itemId) => get().orders.some((order) => order.items.some((item) => item.id === itemId)),
      hasReviewed: (itemId) => get().reviewedItems.includes(itemId),
      clearOrders: () => set({ orders: [], reviewedItems: [] }),
      getAllOrders: () => {
        const state = get();
        const now = Date.now();
        const updatedOrders = state.orders.map((order) => {
          if (order.status === 'pending' && now - order.orderedAt >= 5 * 60 * 1000) {
            return { ...order, status: 'delivered' as const };
          }
          return order;
        });

        if (updatedOrders.some((order, index) => order.status !== state.orders[index].status)) {
          set({ orders: updatedOrders });
        }

        return updatedOrders.sort((a, b) => b.orderedAt - a.orderedAt);
      },
    }),
    {
      name: "shopora-orders2",
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (version < 2) {
          // Migrate from old format (OrderedItem[]) to new format (Order[])
          const oldOrders = persistedState.orders || [];
          const migratedOrders: Order[] = [];
          const groupedByTime: { [key: number]: OrderedItem[] } = {};

          oldOrders.forEach((item: OrderedItem) => {
            if (!groupedByTime[item.orderedAt]) {
              groupedByTime[item.orderedAt] = [];
            }
            groupedByTime[item.orderedAt].push(item);
          });

          Object.entries(groupedByTime).forEach(([timestamp, items]) => {
            const orderId = `order-${timestamp}`;
            migratedOrders.push({
              id: orderId,
              items,
              orderedAt: parseInt(timestamp),
              status: 'delivered', // Assume old orders are delivered
            });
          });

          persistedState.orders = migratedOrders;
        }
        return persistedState;
      },
    }
  )
);

export default useOrderStore;
