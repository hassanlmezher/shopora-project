import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../images/back.png";
import CartCard from "./CartCard";
import useCartStore from "../store/useCartStore";

const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })}`;

type ShippingOption = "pickup" | "delivery";

function Cart() {
    const navigate = useNavigate();
    const items = useCartStore((state) => state.items);
    const [shippingOption, setShippingOption] = useState<ShippingOption>("pickup");

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

    return (
        <div className="min-h-screen bg-[#5AB688] pb-20">
            <div className="mx-auto max-w-6xl px-6 pt-10">
                <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold text-white md:text-5xl">
                        My Cart
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/DashboardLoggedIn")}
                        className="flex items-center gap-3 rounded-full bg-black px-6 py-3 text-lg font-semibold text-white transition hover:bg-black/80"
                    >
                        <img className="w-6" src={back} alt="" />
                        Back
                    </button>
                </div>

                <div className="mt-12 space-y-6">
                    {items.length > 0 ? (
                        items.map((item) => <CartCard key={item.id} item={item} />)
                    ) : (
                        <div className="rounded-3xl border-2 border-dashed border-white/60 bg-white/20 p-10 text-center text-lg font-semibold text-white shadow-inner">
                            Your cart is empty. Keep exploring and add products you love!
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="mt-12 grid gap-8 rounded-3xl bg-white p-10 shadow-lg md:grid-cols-[2fr_1fr]">
                        <div>
                            <h2 className="text-2xl font-semibold text-[#3D3D3D]">
                                Choose shipping mode:
                            </h2>
                            <div className="mt-6 space-y-4">
                                <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#E5E5E5] px-6 py-4 transition hover:border-[#65CD99]">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="pickup"
                                        checked={shippingOption === "pickup"}
                                        onChange={() => setShippingOption("pickup")}
                                        className="h-5 w-5 accent-[#65CD99]"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-[#3D3D3D]">
                                            Store pickup
                                            <span className="ml-3 text-base font-normal text-[#65CD99]">
                                                (Free)
                                            </span>
                                        </p>
                                        <p className="text-sm text-[#7A7A7A]">
                                            Pick up your items from the nearest Shopora store.
                                        </p>
                                    </div>
                                </label>
                                <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#E5E5E5] px-6 py-4 transition hover:border-[#65CD99]">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="delivery"
                                        checked={shippingOption === "delivery"}
                                        onChange={() => setShippingOption("delivery")}
                                        className="h-5 w-5 accent-[#65CD99]"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold text-[#3D3D3D]">
                                            Delivery at home
                                            <span className="ml-3 text-base font-normal text-[#7A7A7A]">
                                                ($9.99)
                                            </span>
                                        </p>
                                        <p className="text-sm text-[#7A7A7A]">
                                            Fast courier delivery right to your doorstep.
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <aside className="flex h-full flex-col justify-between rounded-2xl border border-[#E5E5E5] bg-[#F7F9F8] p-8">
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between">
                                    <span className="text-[#7A7A7A]">
                                        Cart total price:
                                    </span>
                                    <span className="font-semibold text-[#65CD99]">
                                        {formatCurrency(subtotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#7A7A7A]">Shipping:</span>
                                    <span className="font-semibold text-[#65CD99]">
                                        {shippingCost === 0
                                            ? "Free"
                                            : formatCurrency(shippingCost)}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-[#E5E5E5] pt-4 text-xl font-bold text-[#3D3D3D]">
                                    <span>Total:</span>
                                    <span className="text-[#65CD99]">
                                        {formatCurrency(total)}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mt-8 w-full rounded-full bg-[#FF6B6B] py-4 text-xl font-semibold text-white transition hover:bg-[#e35959]"
                            >
                                Checkout
                            </button>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
