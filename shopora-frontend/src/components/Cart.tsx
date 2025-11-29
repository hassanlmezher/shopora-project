import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "./CartCard";
import useCartStore from "../store/useCartStore";
import useOrderStore from "../store/useOrderStore";
import useAdminStores, { type AdminStore } from "../store/useAdminStores";
import PopupMessage from "./PopupMessage";

const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })}`;

type ShippingOption = "pickup" | "delivery";

type CartProps = {
    onClose?: () => void;
};

const shippingOptions = [
    {
        label: "Store pickup",
        detail: "Collect from your closest Shopora store.",
        value: "pickup" as const,
        cost: "Free",
    },
    {
        label: "Delivery at home",
        detail: "Courier delivery right to your doorstep.",
        value: "delivery" as const,
        cost: "$9.99",
    },
];

function Cart({ onClose }: CartProps) {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const transitionDuration = 280;

    useEffect(() => {
        const frame = requestAnimationFrame(() => setIsVisible(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clear);
    const addOrders = useOrderStore((state) => state.addOrders);
    const bannedStores = useAdminStores((state: { stores: AdminStore[] }) => state.stores.filter((store: AdminStore) => store.banned).map((store: AdminStore) => store.name.toLowerCase()));
    const filteredItems = items.filter((item) => !bannedStores.includes(item.by.toLowerCase()));
    const [shippingOption, setShippingOption] = useState<ShippingOption>("pickup");
    const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const subtotal = useMemo(
        () =>
            filteredItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            ),
        [filteredItems]
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
        if (!filteredItems.length) {
            return;
        }
        addOrders(filteredItems);
        clearCart();
        showToast("Order confirmed! Review once you receive it.", "success");
    };

    const isOverlay = Boolean(onClose);

    const itemsSection = (
        <section className="space-y-4">
            {items.length > 0 ? (
                <div className="space-y-4">
                    {items.map((item) => (
                        <CartCard key={item.id} item={item} onRemove={triggerRemovedPopup} />
                    ))}
                </div>
            ) : (
                <div className="rounded-[28px] border border-dashed border-white/60 bg-white/70 px-6 py-8 text-center text-base font-semibold text-slate-600 shadow">
                    Your bag is empty. Keep shopping for deals.
                </div>
            )}
        </section>
    );

    const renderShippingInputs = (titleClass: string, detailClass: string, borderClass: string, bgClass: string) => (
        <div className="space-y-3">
            {shippingOptions.map((option) => (
                <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-2 transition ${borderClass} ${bgClass}`}
                >
                    <input
                        type="radio"
                        name="shipping"
                        value={option.value}
                        checked={shippingOption === option.value}
                        onChange={() => setShippingOption(option.value)}
                        className="mt-1 h-4 w-4 accent-slate-900"
                    />
                    <div>
                        <p className={`text-sm font-semibold ${titleClass}`}>
                            {option.label}
                            <span className={`ml-2 text-xs font-medium ${detailClass}`}>
                                ({option.cost})
                            </span>
                        </p>
                        <p className={detailClass}>{option.detail}</p>
                    </div>
                </label>
            ))}
        </div>
    );

    const summaryDetails = (
        <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-slate-900">
                    {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
                </span>
            </div>
            <div className="border-t border-slate-200 pt-3 text-lg font-bold text-slate-900">
                <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    );

    if (isOverlay) {
        return (
            <div className="fixed inset-0 z-40 flex">
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xl" />
                <div
                    className={`relative ml-auto flex h-full w-full max-w-[450px] flex-col overflow-y-hidden rounded-l-4xl bg-linear-to-b from-[#1F3B88] to-[#2555C0] px-6 py-8 shadow-2xl shadow-slate-900/60 transition-transform duration-300 ${
                        isVisible ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold text-white">My Cart</p>
                        <button
                            type="button"
                            onClick={() => {
                                setIsVisible(false);
                                setTimeout(() => {
                                    onClose?.();
                                }, transitionDuration);
                            }}
                            className="flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#0F3D73] shadow-sm transition hover:bg-[#0F3D73] hover:text-white"
                        >
                            Close
                        </button>
                    </div>

                    <div className="mt-6 flex flex-1 flex-col gap-6 overflow-y-auto pr-1">
                        <div className="space-y-4">
                            {itemsSection}
                        </div>

                        {filteredItems.length > 0 && (
                            <div className="space-y-4 rounded-[28px] bg-white/95 p-5 shadow-lg">
                                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
                                    Shipping
                                </p>
                                {renderShippingInputs("text-slate-900", "text-slate-500", "border-slate-200", "bg-white/50")}
                                {summaryDetails}
                                <button
                                    type="button"
                                    onClick={handleCheckout}
                                    className="w-full rounded-[999px] bg-[#1F3B88] py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition hover:bg-[#122c66]"
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

    return (
        <div className="min-h-screen bg-linear-to-b from-[#0a1f36] via-[#132c5d] to-[#194ea7] pt-12 pb-16 text-white">
            <div className="mx-auto max-w-6xl px-4">
                <div className="rounded-[36px] bg-white/80 p-8 text-slate-900 shadow-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">Shopping bag</p>
                    <div className="mt-3 flex items-end justify-between">
                        <div>
                            <h1 className="text-4xl font-bold">Your cart</h1>
                            <p className="text-sm text-slate-500">Review items and prepare for checkout.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate("/DashboardLoggedIn")}
                            className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-700 transition hover:bg-slate-100"
                        >
                            Continue shopping
                        </button>
                    </div>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_0.7fr]">
                    <section className="rounded-4xl bg-white/90 p-6 shadow-xl">
                        <div className="flex items-center justify-between pb-3">
                            <h2 className="text-xl font-semibold text-slate-700">Items ({filteredItems.length})</h2>
                            {filteredItems.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        clearCart();
                                        showToast("Cart cleared", "success");
                                    }}
                                    className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3875F0]"
                                >
                                    Clear cart
                                </button>
                            )}
                        </div>
                        <div className="space-y-4">
                            {itemsSection}
                        </div>
                    </section>

                    {filteredItems.length > 0 && (
                        <section className="flex flex-col gap-6 rounded-4xl bg-white/90 p-6 shadow-xl">
                            <div className="space-y-4">
                                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">Shipping</p>
                                {renderShippingInputs("text-slate-900", "text-slate-500", "border-slate-200", "bg-slate-50")}
                            </div>
                            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                                {summaryDetails}
                            </div>
                            <button
                                type="button"
                                onClick={handleCheckout}
                                className="w-full rounded-[999px] bg-[#1F3B88] py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#122c66]"
                            >
                                Complete order
                            </button>
                        </section>
                    )}
                </div>
            </div>

            <PopupMessage message={toast?.message ?? ""} isVisible={Boolean(toast)} variant={toast?.variant ?? "success"} />
        </div>
    );
}

export default Cart;
