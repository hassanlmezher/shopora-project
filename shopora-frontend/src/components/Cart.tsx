import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "./CartCard";
import useCartStore from "../store/useCartStore";
import useOrderStore from "../store/useOrderStore";
import PopupMessage from "./PopupMessage";

const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })}`;

type ShippingOption = "pickup" | "delivery";

function Cart() {
    const navigate = useNavigate();
    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clear);
    const addOrders = useOrderStore((state) => state.addOrders);
    const [shippingOption, setShippingOption] = useState<ShippingOption>("pickup");
    const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const subtotal = useMemo(
        () =>
            items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            ),
        [items]
    );

    const shippingCost = shippingOption === "pickup" ? 0 : 9.99;
    const total = subtotal + shippingCost;

    useEffect(() => {
        return () => {
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
            }
        };
    }, []);

    const showToast = (message: string, variant: "success" | "error") => {
        setToast({ message, variant });
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
        }
        hideTimerRef.current = setTimeout(() => {
            setToast(null);
            hideTimerRef.current = null;
        }, 1500);
    };

    const triggerRemovedPopup = () => {
        showToast("Item removed from cart!", "error");
    };

    const handleCheckout = () => {
        if (!items.length) {
            return;
        }
        addOrders(items);
        clearCart();
        showToast("Order confirmed! Review once you receive it.", "success");
    };

    return (
        <div className="fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-[#123169]/80" />
            <div className="relative ml-auto flex h-full w-full max-w-[460px] flex-col overflow-y-auto bg-gradient-to-b from-[#0F3D73] to-[#1F5BB4] p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-white md:text-4xl">
                        My Cart
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/DashboardLoggedIn")}
                        className="flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm font-semibold uppercase text-[#0F3D73] transition hover:bg-[#0F3D73] hover:text-white"
                    >
                        Close
                    </button>
                </div>

                <div className="mt-10 flex flex-1 flex-col gap-6">
                    {items.length > 0 ? (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <CartCard key={item.id} item={item} onRemove={triggerRemovedPopup} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-white/60 bg-white/10 p-8 text-center text-base font-semibold uppercase tracking-wide text-white/80 shadow-inner">
                            Your cart is empty. Keep exploring and add products you love!
                        </div>
                    )}

                    {items.length > 0 && (
                        <div className="rounded-3xl border border-white/30 bg-white/10 p-6 shadow-inner">
                            <h2 className="text-lg font-semibold uppercase tracking-wide text-white/80">
                                Choose shipping mode:
                            </h2>
                            <div className="mt-4 space-y-3">
                                {[
                                    {
                                        label: "Store pickup",
                                        detail: "Pick up your items from the nearest Shopora store.",
                                        value: "pickup",
                                        cost: "Free",
                                    },
                                    {
                                        label: "Delivery at home",
                                        detail: "Fast courier delivery right to your doorstep.",
                                        value: "delivery",
                                        cost: "$9.99",
                                    },
                                ].map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/30 bg-white/5 px-4 py-3 transition hover:border-white/70"
                                    >
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value={option.value}
                                            checked={shippingOption === option.value}
                                            onChange={() => setShippingOption(option.value as ShippingOption)}
                                            className="h-5 w-5 accent-white"
                                        />
                                        <div>
                                            <p className="text-base font-semibold text-white">
                                                {option.label}
                                                <span className="ml-2 text-sm font-normal text-white/70">
                                                    ({option.cost})
                                                </span>
                                            </p>
                                            <p className="text-sm text-white/80">
                                                {option.detail}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-6 space-y-3 text-sm text-white/70">
                                <div className="flex justify-between">
                                    <span>Cart total price:</span>
                                    <span className="font-semibold text-white">
                                        {formatCurrency(subtotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span className="font-semibold text-white">
                                        {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-white/20 pt-4 text-xl font-bold text-white">
                                    <span>Total:</span>
                                    <span className="text-white">
                                        {formatCurrency(total)}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleCheckout}
                                className="mt-6 w-full rounded-full bg-white py-3 text-lg font-semibold text-[#0F3D73] transition hover:bg-white/80"
                            >
                                Complete order
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <PopupMessage message={toast?.message ?? ""} isVisible={Boolean(toast)} variant={toast?.variant ?? "success"} />
        </div>
    );
}

export default Cart;
