import minus from "../images/minus.png";
import plus from "../images/plus.png";
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

    const handleIncrement = () => {
        increment(item.id);
    };

    const handleDecrement = () => {
        if (item.quantity === 1) {
            return;
        }
        decrement(item.id);
    };

    const handleRemove = () => {
        removeItem(item.id);
        onRemove?.(item);
    };

    const displayName = `${item.name} ${item.namee}`.trim();
    const lineTotal = item.price * item.quantity;

    return (
        <div className="flex flex-col gap-4 rounded-2xl border-2 border-[#6D6D6D]/60 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
                <img
                    className="w-20 rounded-xl object-cover"
                    src={item.image}
                    alt={displayName}
                />
                <div className="space-y-1">
                    <p className="font-bold text-xl text-[#6D6D6D]">
                        {displayName}
                    </p>
                    <p className="text-base font-semibold text-[#6D6D6D]">
                        {formatCurrency(item.price)}
                    </p>
                    <p className="text-xs text-[#6D6D6D]">{item.by}</p>
                    <button
                        type="button"
                        className="text-xs font-semibold text-[#FF6B6B] transition hover:text-[#c84a4a]"
                        onClick={handleRemove}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-end gap-6">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E4E4E4] bg-white text-2xl font-semibold text-[#1F3D90] shadow-[0_5px_12px_rgba(59,124,255,0.15)] transition hover:border-[#7CA6FF] hover:bg-[#F4F7FF] disabled:cursor-not-allowed disabled:border-[#D9D9D9] disabled:bg-[#F7F7F7] disabled:text-[#B5B5B5]"
                        onClick={handleDecrement}
                        aria-label={`Decrease quantity of ${displayName}`}
                        disabled={item.quantity === 1}
                    >
                        −
                    </button>
                    <p className="text-2xl font-bold text-[#1F3D90]">
                        {item.quantity}
                    </p>
                    <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center pb-1 rounded-2xl bg-[#3875F0] text-2xl font-bold text-white  shadow-[0_5px_12px_rgba(59,124,255,0.15)] transition hover:border hover:border-[#3875F0] hover:bg-[#F4F7FF] hover:text-[#3875F0]"
                        onClick={handleIncrement}
                        aria-label={`Increase quantity of ${displayName}`}
                    >
                        +
                    </button>
                </div>
                <p className="text-2xl font-bold text-[#8DB9FF]">
                    {formatCurrency(lineTotal)}
                </p>
            </div>
        </div>
    );
}

export default CartCard;
