import useCartStore, { type CartLineItem } from "../store/useCartStore";

interface CartCardProps {
    item: CartLineItem;
    onRemove?: (item: CartLineItem) => void;
}

const formatCurrency = (value: number) =>
    `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })}`;

function CartCard({ item, onRemove }: CartCardProps) {
    const increment = useCartStore((state) => state.incrementQuantity);
    const decrement = useCartStore((state) => state.decrementQuantity);
    const removeItem = useCartStore((state) => state.removeItem);

    const handleIncrement = () => increment(item.id);
    const handleDecrement = () => {
        if (item.quantity > 1) {
            decrement(item.id);
        }
    };
    const handleRemove = () => {
        removeItem(item.id);
        onRemove?.(item);
    };

    const displayName = `${item.name} ${item.namee}`.trim();
    const lineTotal = item.price * item.quantity;

    return (
        <div className="grid gap-4 rounded-2xl border border-[#e3e8f4] bg-white px-5 py-4 shadow-lg md:grid-cols-[auto,1fr]">
            <div className="flex items-start gap-3">
                <img
                    className="h-20 w-20 rounded-xl object-cover"
                    src={item.image}
                    alt={displayName}
                />
                <div className="space-y-1">
                    <p className="text-lg font-bold text-[#2b2d28]">{displayName}</p>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8DB9FF]">
                        {formatCurrency(item.price)}
                    </p>
                    <p className="text-xs text-[#7B7B7B]">{item.by}</p>
                    <button
                        type="button"
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B6B] transition hover:text-[#c84a4a]"
                        onClick={handleRemove}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl bg-[#F6F8FF] p-3 text-slate-700 shadow-inner md:items-end">
                <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe4f2] bg-white text-xl font-semibold text-[#1F3D90] transition hover:border-[#7CA6FF] disabled:cursor-not-allowed disabled:border-[#D9D9D9] disabled:text-[#B5B5B5]"
                            onClick={handleDecrement}
                            aria-label={`Decrease quantity of ${displayName}`}
                            disabled={item.quantity === 1}
                        >
                            -
                        </button>
                        <span className="w-8 text-center text-lg font-bold text-[#1F3D90]">
                            {item.quantity}
                        </span>
                        <button
                            type="button"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3875F0] bg-[#3875F0] text-lg font-bold text-white transition hover:bg-[#2d54d5]"
                            onClick={handleIncrement}
                            aria-label={`Increase quantity of ${displayName}`}
                        >
                            +
                        </button>
                    </div>
                    <p className="text-lg font-bold text-[#1F3D90]">
                        {formatCurrency(lineTotal)}
                    </p>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Item total
                </p>
            </div>
        </div>
    );
}

export default CartCard;