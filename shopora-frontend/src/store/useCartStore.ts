import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLineItem {
    id: string;
    image: string;
    name: string;
    namee: string;
    by: string;
    price: number;
    quantity: number;
}

type CartItemInput = Omit<CartLineItem, "quantity">;

interface CartStore {
    items: CartLineItem[];
    addItem: (item: CartItemInput) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    removeItem: (id: string) => void;
    clear: () => void;
}

const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
    items: [],
    addItem: (item) =>
        set((state) => {
            const existing = state.items.find((line) => line.id === item.id);
            if (existing) {
                return {
                    items: state.items.map((line) =>
                        line.id === item.id
                            ? { ...line, quantity: line.quantity + 1 }
                            : line
                    ),
                };
            }

            return {
                items: [...state.items, { ...item, quantity: 1 }],
            };
        }),
    incrementQuantity: (id) =>
        set((state) => ({
            items: state.items.map((line) =>
                line.id === id ? { ...line, quantity: line.quantity + 1 } : line
            ),
        })),
    decrementQuantity: (id) =>
        set((state) => ({
            items: state.items
                .map((line) =>
                    line.id === id
                        ? {
                              ...line,
                              quantity: Math.max(1, line.quantity - 1),
                          }
                        : line
                )
                .filter((line) => line.quantity > 0),
        })),
    removeItem: (id) =>
        set((state) => ({
            items: state.items.filter((line) => line.id !== id),
        })),
            clear: () => set({ items: [] }),
        }),
        {
            name: "shopora-cart",
        }
    )
);

export default useCartStore;
